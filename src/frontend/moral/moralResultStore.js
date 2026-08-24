(function () {
  const AXES = ["常識", "対応力", "思いやり", "情報管理", "責任感"];
  const STORAGE_KEYS = {
    anonymousId: "team17:moral:anonymousId",
    themeResults: "team17:moral:themeResults",
    submissions: "team17:moral:submissionRecords"
  };

  const THEMES = [
    { id: "house", name: "家庭・近隣", href: "house_Kiyose/house.html" },
    { id: "office", name: "オフィス・取引先", href: "office_Arita/office.html" },
    { id: "online", name: "オンライン・Web会議", href: "online_Suzuki/online.html" },
    { id: "outsideCompany", name: "社外交流", href: "outsideCompany_Fukazawa/outsideCompany.html" },
    { id: "publicSpace", name: "公共空間・移動", href: "publicSpace_Kudo/publicSpace.html" }
  ];

  function readJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function createId(prefix) {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return `${prefix}-${window.crypto.randomUUID().slice(0, 8)}`;
    }
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  }

  function getAnonymousId() {
    const currentId = localStorage.getItem(STORAGE_KEYS.anonymousId);
    if (currentId) {
      return currentId;
    }
    const nextId = createId("anon");
    localStorage.setItem(STORAGE_KEYS.anonymousId, nextId);
    return nextId;
  }

  function createAxisTotals() {
    return AXES.reduce((totals, axis) => {
      totals[axis] = { score: 0, max: 0 };
      return totals;
    }, {});
  }

  function addAxisScores(totals, scores) {
    if (!scores) {
      return totals;
    }

    Object.entries(scores).forEach(([axis, value]) => {
      if (!AXES.includes(axis) || typeof value !== "number") {
        return;
      }
      totals[axis].score += Math.max(0, Math.min(5, value));
      totals[axis].max += 5;
    });

    return totals;
  }

  function buildAxisTotals(scoreEntries) {
    const totals = createAxisTotals();
    scoreEntries.forEach((scores) => addAxisScores(totals, scores));
    return totals;
  }

  function normalizeAxisTotals(axisTotals) {
    return AXES.reduce((normalized, axis) => {
      const item = axisTotals[axis] || { score: 0, max: 0 };
      normalized[axis] = {
        score: item.score,
        max: item.max,
        percent: item.max === 0 ? null : Math.round((item.score / item.max) * 100)
      };
      return normalized;
    }, {});
  }

  function getThemeResults() {
    return readJson(STORAGE_KEYS.themeResults, {});
  }

  function saveThemeResult(result) {
    const results = getThemeResults();
    results[result.themeId] = {
      ...result,
      anonymousId: getAnonymousId(),
      completedAt: new Date().toISOString()
    };
    writeJson(STORAGE_KEYS.themeResults, results);
  }

  function getSubmissionRecords() {
    const saved = readJson(STORAGE_KEYS.submissions, null);
    if (!saved) {
      return [];
    }
    if (Array.isArray(saved)) {
      return saved.slice(-1);
    }
    return [saved];
  }

  function saveSubmissionRecord(aggregate, markdown) {
    const anonymousId = getAnonymousId();
    const record = {
      id: `latest-${anonymousId}`,
      anonymousId,
      submittedAt: new Date().toISOString(),
      totalScore: aggregate.totalScore,
      completedCount: aggregate.completedCount,
      totalThemes: THEMES.length,
      axisScores: aggregate.axisScores,
      themeScores: aggregate.themeSummaries,
      markdown
    };
    writeJson(STORAGE_KEYS.submissions, record);
    return record;
  }

  function buildAggregate() {
    const results = getThemeResults();
    const axisTotals = createAxisTotals();
    let scoreEarned = 0;
    let scoreMax = 0;

    const themeSummaries = THEMES.map((theme) => {
      const result = results[theme.id] || null;
      if (!result) {
        return {
          ...theme,
          completed: false,
          scorePercent: null,
          completedAt: null
        };
      }

      Object.entries(result.axisTotals || {}).forEach(([axis, item]) => {
        if (!AXES.includes(axis) || !item) {
          return;
        }
        axisTotals[axis].score += item.score || 0;
        axisTotals[axis].max += item.max || 0;
      });

      const earned = result.score ? result.score.earned : 0;
      const max = result.score ? result.score.max : 0;
      scoreEarned += earned;
      scoreMax += max;

      return {
        ...theme,
        completed: true,
        scorePercent: max === 0 ? null : Math.round((earned / max) * 100),
        completedAt: result.completedAt,
        questionCount: result.questionCount,
        result
      };
    });

    const completedCount = themeSummaries.filter((theme) => theme.completed).length;

    return {
      anonymousId: getAnonymousId(),
      generatedAt: new Date().toISOString(),
      completedCount,
      totalThemes: THEMES.length,
      complete: completedCount === THEMES.length,
      scoreEarned,
      scoreMax,
      totalScore: scoreMax === 0 ? 0 : Math.round((scoreEarned / scoreMax) * 100),
      axisScores: normalizeAxisTotals(axisTotals),
      themeSummaries
    };
  }

  function getComment(aggregate) {
    const scoredAxes = Object.entries(aggregate.axisScores)
      .filter(([, value]) => value.percent !== null)
      .sort((a, b) => b[1].percent - a[1].percent);

    if (scoredAxes.length === 0) {
      return "まだ結果がありません。各テーマを回答すると、判断傾向が表示されます。";
    }

    const [strongAxis, strongValue] = scoredAxes[0];
    const [weakAxis, weakValue] = scoredAxes[scoredAxes.length - 1];

    if (aggregate.totalScore >= 80) {
      return `${strongAxis}が特に高く、全体的にも安定した判断ができています。${weakAxis}も${weakValue.percent}点あるので大きな弱点ではありませんが、迷う場面では一呼吸置いて確認するとさらに安定します。`;
    }

    if (aggregate.totalScore >= 60) {
      return `${strongAxis}は${strongValue.percent}点で強みとして出ています。一方で${weakAxis}は${weakValue.percent}点なので、その場の空気だけで決めず、必要な確認や周囲への配慮をもう一段足すと良くなります。`;
    }

    return `${strongAxis}は比較的出ていますが、全体としてはまだ伸ばせます。特に${weakAxis}が低めなので、判断に迷った時は「相手への影響」「ルール」「報告・相談」のどれが不足しているかを確認すると改善しやすいです。`;
  }

  function buildMarkdown(aggregate) {
    const lines = [
      "# モラルチェック集計結果",
      "",
      `- 匿名ID: ${aggregate.anonymousId}`,
      `- 作成日時: ${new Date(aggregate.generatedAt).toLocaleString("ja-JP")}`,
      `- 完了テーマ: ${aggregate.completedCount} / ${aggregate.totalThemes}`,
      `- 総合スコア: ${aggregate.totalScore} / 100`,
      "",
      "## テーマ別結果"
    ];

    aggregate.themeSummaries.forEach((theme) => {
      const status = theme.completed ? "完了" : "未完了";
      const score = theme.scorePercent === null ? "-" : `${theme.scorePercent}点`;
      lines.push(`- ${theme.name}: ${status} / ${score}`);
    });

    lines.push("", "## 5軸スコア");
    AXES.forEach((axis) => {
      const value = aggregate.axisScores[axis];
      const score = value.percent === null ? "未計測" : `${value.percent}点`;
      lines.push(`- ${axis}: ${score}`);
    });

    lines.push("", "## コメント", getComment(aggregate));
    return lines.join("\n");
  }

  window.MoralResultStore = {
    AXES,
    THEMES,
    getAnonymousId,
    createAxisTotals,
    addAxisScores,
    buildAxisTotals,
    normalizeAxisTotals,
    getThemeResults,
    saveThemeResult,
    buildAggregate,
    buildMarkdown,
    getComment,
    getSubmissionRecords,
    saveSubmissionRecord
  };
})();
