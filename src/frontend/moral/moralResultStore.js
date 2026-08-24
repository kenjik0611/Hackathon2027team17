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

  function getScoredAxes(aggregate) {
    return Object.entries(aggregate.axisScores)
      .filter(([, value]) => value.percent !== null)
      .sort((a, b) => b[1].percent - a[1].percent);
  }

  function getResultType(aggregate) {
    const scoredAxes = getScoredAxes(aggregate);

    if (scoredAxes.length === 0) {
      return {
        name: "未測定スターター",
        description: "まだ判断材料が少ない状態です。各テーマを回答すると、あなたらしいモラルタイプが見えてきます。",
        image: "assets/result-type-starter.png",
        themeClass: "type-starter"
      };
    }

    const [strongAxis, strongValue] = scoredAxes[0];
    const [, weakValue] = scoredAxes[scoredAxes.length - 1];
    const gap = strongValue.percent - weakValue.percent;

    if (aggregate.complete && aggregate.totalScore >= 85 && gap <= 18) {
      return {
        name: "モラルモンスター",
        description: "ルール・配慮・責任のバランスが高いタイプです。迷う場面でも極端に走らず、周囲が安心しやすい判断ができます。",
        image: "assets/result-type-moral-monster.png",
        themeClass: "type-monster"
      };
    }

    if (aggregate.totalScore < 50) {
      return {
        name: "伸びしろワイルドカード",
        description: "判断が場当たり的になりやすく、要注意なポイントを見落としがちなタイプです。勢いだけで進む前に、確認・相談・一呼吸を挟む必要があります。",
        image: "assets/result-type-wildcard.png",
        themeClass: "type-wildcard"
      };
    }

    const types = {
      "常識": {
        name: "常識ガーディアン",
        description: "場のルールや社会的な前提を押さえるのが得意なタイプです。まず外さない判断で、チームの安心感を支えます。",
        image: "assets/result-type-guardian.png",
        themeClass: "type-guardian"
      },
      "対応力": {
        name: "現場対応ナビゲーター",
        description: "状況を見て動きを調整するのが得意なタイプです。予定通りにいかない場面でも、落としどころを探せます。",
        image: "assets/result-type-navigator.png",
        themeClass: "type-navigator"
      },
      "思いやり": {
        name: "配慮チューナー",
        description: "相手の気持ちや周囲への影響を考えられるタイプです。場の空気を乱さず、関係性をなめらかに保てます。",
        image: "assets/result-type-tuner.png",
        themeClass: "type-tuner"
      },
      "情報管理": {
        name: "守秘キーパー",
        description: "写真・会話・資料など、扱いに注意が必要な情報への意識が高いタイプです。信頼を守る判断ができます。",
        image: "assets/result-type-keeper.png",
        themeClass: "type-keeper"
      },
      "責任感": {
        name: "責任感キャプテン",
        description: "自分の立場で何を引き受けるべきかを考えられるタイプです。見て見ぬふりをせず、必要な行動に移せます。",
        image: "assets/result-type-captain.png",
        themeClass: "type-captain"
      }
    };

    return types[strongAxis] || types["常識"];
  }

  function getCommentDetails(aggregate) {
    const scoredAxes = getScoredAxes(aggregate);

    if (scoredAxes.length === 0) {
      return {
        good: "まだ結果がありません。各テーマを回答すると、良い点と気をつけたい点が表示されます。",
        improvement: "まずは5テーマを一通り回答して、総合点と5軸のバランスを見るのがおすすめです。"
      };
    }

    const [strongAxis, strongValue] = scoredAxes[0];
    const [weakAxis, weakValue] = scoredAxes[scoredAxes.length - 1];
    const advice = {
      "常識": "一般的なルールや場の前提を確認する",
      "対応力": "その場の状況や相手の状態に合わせて選択を調整する",
      "思いやり": "相手や周囲がどう受け取るかを一段深く想像する",
      "情報管理": "写真・会話・資料などを外に出してよいか確認する",
      "責任感": "自分が気づいた立場として、どこまで関わるべきか考える"
    };
    const completion = aggregate.complete
      ? "5テーマすべての回答をもとに見ると"
      : `まだ${aggregate.completedCount}/${aggregate.totalThemes}テーマの途中結果ですが`;

    if (aggregate.totalScore < 50) {
      return {
        good: `${completion}、総合スコアは${aggregate.totalScore}点です。良い点を挙げるなら、${strongAxis}が${strongValue.percent}点で比較的まだ残っている部分です。ただし、全体としては判断の安定感が弱く、強みとして押し出すにはまだ少し危うい結果です。`,
        improvement: `特に${weakAxis}が${weakValue.percent}点で、かなり注意が必要です。迷った時に「たぶん大丈夫」で進めると、相手への配慮不足・確認不足・責任の所在のあいまいさにつながりやすいです。まずは「${advice[weakAxis]}」を意識して、答える前に一度立ち止まる癖をつけると改善しやすいです。`
      };
    }

    const good = `${completion}、総合スコアは${aggregate.totalScore}点です。特に${strongAxis}が${strongValue.percent}点と高く、判断の軸としてかなり強く出ています。場面に流されるだけでなく、「何を大事にすべきか」を自分なりに見つけられる傾向があります。`;
    const improvement = `一方で、相対的には${weakAxis}が${weakValue.percent}点で伸ばしどころです。迷った時は、すぐに答えを出す前に「${advice[weakAxis]}」を一度挟むと判断が安定します。正解・不正解だけで見るより、自分が抜かしやすい観点を把握しておくことが大切です。`;

    return { good, improvement };
  }

  function getComment(aggregate) {
    const details = getCommentDetails(aggregate);
    return `良い点: ${details.good}\n気をつけたい点: ${details.improvement}`;
  }

  function buildMarkdown(aggregate) {
    const resultType = getResultType(aggregate);
    const commentDetails = getCommentDetails(aggregate);
    const lines = [
      "# モラルチェック集計結果",
      "",
      `- 匿名ID: ${aggregate.anonymousId}`,
      `- 作成日時: ${new Date(aggregate.generatedAt).toLocaleString("ja-JP")}`,
      `- 完了テーマ: ${aggregate.completedCount} / ${aggregate.totalThemes}`,
      `- 総合スコア: ${aggregate.totalScore} / 100`,
      `- 診断タイプ: ${resultType.name}`,
      "",
      "## あなたはこういう人です",
      resultType.description,
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

    lines.push(
      "",
      "## コメント",
      "### 良い点",
      commentDetails.good,
      "",
      "### 気をつけたい点",
      commentDetails.improvement
    );
    return lines.join("\n");
  }

  function buildSheetPayload(aggregate, markdown) {
    const resultType = getResultType(aggregate);
    const commentDetails = getCommentDetails(aggregate);
    return {
      version: "1.0",
      anonymousId: aggregate.anonymousId,
      generatedAt: aggregate.generatedAt,
      completedCount: aggregate.completedCount,
      totalThemes: aggregate.totalThemes,
      complete: aggregate.complete,
      totalScore: aggregate.totalScore,
      scoreEarned: aggregate.scoreEarned,
      scoreMax: aggregate.scoreMax,
      axisScores: aggregate.axisScores,
      resultType,
      themeScores: aggregate.themeSummaries.map((theme) => ({
        id: theme.id,
        name: theme.name,
        completed: theme.completed,
        scorePercent: theme.scorePercent,
        completedAt: theme.completedAt || null,
        questionCount: theme.questionCount || null
      })),
      comment: getComment(aggregate),
      commentGood: commentDetails.good,
      commentImprovement: commentDetails.improvement,
      markdown
    };
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
    buildSheetPayload,
    getComment,
    getCommentDetails,
    getResultType,
    getSubmissionRecords,
    saveSubmissionRecord
  };
})();
