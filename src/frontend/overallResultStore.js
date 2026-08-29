(function (root) {
  "use strict";

  const DOCUMENT_TYPE = "Personal Diagnostic Result";
  const DOCUMENT_TITLE = "空気読メーター 診断結果";
  const DOCUMENT_DESCRIPTION = "モラル編と男心編の回答傾向をまとめた自己理解用の結果";
  const DOCUMENT_TAGS = ["self-reflection", "entertainment", "kuuki-yometer"];
  const DOCUMENT_DISCLAIMER = "この結果は学習・振り返り用であり、人格や適性、性別一般を断定するものではありません。";
  const GENERATOR = "kuukiyomi-meter/1";

  function toCount(value) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.round(number)) : 0;
  }

  function toPercent(value) {
    if (value === null || value === undefined || value === "") {
      return null;
    }

    const number = Number(value);
    if (!Number.isFinite(number)) {
      return null;
    }

    return Math.max(0, Math.min(100, Math.round(number)));
  }

  function getRequiredAggregate(store, methodName) {
    if (!store || typeof store[methodName] !== "function") {
      throw new Error(`集計処理 ${methodName} を読み込めませんでした。`);
    }
    return store[methodName]();
  }

  function getMoralProgress(store) {
    if (!store || typeof store.getThemeProgress !== "function") {
      return {};
    }
    return store.getThemeProgress() || {};
  }

  function getMoralResultType(store, aggregate, hasResults) {
    if (!hasResults || !store || typeof store.getResultType !== "function") {
      return null;
    }

    const resultType = store.getResultType(aggregate) || {};
    return {
      name: String(resultType.name || "未測定"),
      description: String(resultType.description || "")
    };
  }

  function getMoralComments(store, aggregate, hasResults) {
    if (!hasResults || !store || typeof store.getCommentDetails !== "function") {
      return null;
    }

    const comments = store.getCommentDetails(aggregate) || {};
    return {
      good: String(comments.good || ""),
      improvement: String(comments.improvement || "")
    };
  }

  function buildAxisSummary(axes) {
    const scoredAxes = axes
      .filter((axis) => axis.percent !== null)
      .map((axis, index) => ({ ...axis, index }))
      .sort((a, b) => b.percent - a.percent || a.index - b.index);

    if (scoredAxes.length === 0) {
      return {
        balanced: false,
        measuredCount: 0,
        strongest: null,
        weakest: null
      };
    }

    const strongestPercent = scoredAxes[0].percent;
    const weakestPercent = scoredAxes[scoredAxes.length - 1].percent;
    const balanced = strongestPercent === weakestPercent;
    const strongestNames = scoredAxes
      .filter((axis) => axis.percent === strongestPercent)
      .map((axis) => axis.name);
    const weakestNames = scoredAxes
      .filter((axis) => axis.percent === weakestPercent)
      .map((axis) => axis.name);

    return {
      balanced,
      measuredCount: scoredAxes.length,
      strongest: balanced ? null : { names: strongestNames, percent: strongestPercent },
      weakest: balanced ? null : { names: weakestNames, percent: weakestPercent }
    };
  }

  function createMoralSnapshot(store) {
    const aggregate = getRequiredAggregate(store, "buildAggregate");
    const progress = getMoralProgress(store);
    const completedCount = toCount(aggregate.completedCount);
    const configuredThemes = Array.isArray(store.THEMES) ? store.THEMES : [];
    const configuredAxes = Array.isArray(store.AXES) ? store.AXES : [];
    const totalThemes = toCount(aggregate.totalThemes) || configuredThemes.length;
    const hasResults = completedCount > 0;
    const aggregateThemes = Array.isArray(aggregate.themeSummaries) ? aggregate.themeSummaries : [];

    const themes = configuredThemes.map((theme) => {
      const aggregateTheme = aggregateThemes.find((item) => item.id === theme.id) || {};
      const completed = Boolean(aggregateTheme.completed);
      const inProgress = !completed && Boolean(progress[theme.id]);

      return {
        name: String(theme.name),
        href: `moral/${theme.href}`,
        completed,
        status: completed ? "complete" : inProgress ? "in_progress" : "not_started",
        scorePercent: completed ? toPercent(aggregateTheme.scorePercent) : null
      };
    });

    const axes = configuredAxes.map((axis) => {
      const value = aggregate.axisScores && aggregate.axisScores[axis];
      return {
        name: String(axis),
        percent: value ? toPercent(value.percent) : null
      };
    });

    return {
      hasResults,
      completedCount,
      totalThemes,
      complete: totalThemes > 0 && completedCount === totalThemes,
      totalScore: hasResults ? toPercent(aggregate.totalScore) : null,
      resultType: getMoralResultType(store, aggregate, hasResults),
      comments: getMoralComments(store, aggregate, hasResults),
      axisSummary: buildAxisSummary(axes),
      axes,
      themes
    };
  }

  function formatType(code, name) {
    if (!code || code === "未測定" || String(code).includes("-")) {
      return "未測定";
    }
    return name ? `${code}（${name}）` : String(code);
  }

  function createInsightSnapshot(store) {
    const aggregate = getRequiredAggregate(store, "getAggregate");
    const configuredMembers = Array.isArray(aggregate.members)
      ? aggregate.members
      : Array.isArray(store.members)
        ? store.members
        : [];
    const memberResults = aggregate.memberResults || {};
    const memberProgress = aggregate.memberProgress || {};
    const completedCount = toCount(aggregate.completedCount);
    const totalMembers = toCount(aggregate.totalMembers) || configuredMembers.length;
    const hasResults = completedCount > 0;

    const members = configuredMembers.map((member) => {
      const result = memberResults[member.id] || null;
      const progress = memberProgress[member.id] || null;
      const completed = Boolean(result && result.isComplete);
      const inProgress = !completed && Boolean(progress);

      return {
        name: String(member.name),
        href: `Otokogokoro/${member.path}`,
        completed,
        status: completed ? "complete" : inProgress ? "in_progress" : "not_started",
        matchPercent: completed ? toPercent(result.matchPercent) : null
      };
    });

    const bestMatchPercent = aggregate.bestMatchResult
      ? toPercent(aggregate.bestMatchResult.matchPercent)
      : null;
    const bestMatch = aggregate.bestMatchMember && bestMatchPercent !== null
      ? {
          name: String(aggregate.bestMatchMember.name),
          matchPercent: bestMatchPercent
        }
      : null;

    return {
      hasResults,
      completedCount,
      totalMembers,
      complete: totalMembers > 0 && completedCount === totalMembers,
      overallMatchPercent: hasResults ? toPercent(aggregate.overallMatchPercent) : null,
      bestMatch,
      suggestedMbti: hasResults
        ? formatType(aggregate.suggestedMbti, aggregate.suggestedMbtiName)
        : "未測定",
      suggestedLoveType: hasResults
        ? formatType(aggregate.suggestedLoveType, aggregate.suggestedLoveTypeName)
        : "未測定",
      members
    };
  }

  function getStatusLabel(status) {
    if (status === "in_progress") {
      return "途中";
    }
    if (status === "complete") {
      return "完了";
    }
    return "未着手";
  }

  function buildIncompleteItems(moral, insight) {
    const moralItems = moral.themes
      .filter((theme) => !theme.completed)
      .map((theme) => ({
        section: "モラル編",
        name: theme.name,
        status: theme.status,
        statusLabel: getStatusLabel(theme.status),
        href: theme.href
      }));
    const insightItems = insight.members
      .filter((member) => !member.completed)
      .map((member) => ({
        section: "男心編",
        name: member.name,
        status: member.status,
        statusLabel: getStatusLabel(member.status),
        href: member.href
      }));

    return [...moralItems, ...insightItems];
  }

  function buildMoralProfileSentence(moral) {
    if (!moral.hasResults || !moral.resultType) {
      return "モラル編は未測定です。";
    }

    if (moral.axisSummary.balanced) {
      const measuredAxis = moral.axes.find((axis) => axis.percent !== null);
      const scoreText = measuredAxis ? `${measuredAxis.percent}点` : "同程度";
      const axisLabel = moral.axisSummary.measuredCount === moral.axes.length
        ? "5評価軸"
        : `計測済みの${moral.axisSummary.measuredCount}評価軸`;
      return `モラル編は「${moral.resultType.name}」という結果で、${axisLabel}はすべて${scoreText}と同程度でした。`;
    }

    const strongest = moral.axisSummary.strongest;
    const weakest = moral.axisSummary.weakest;
    if (strongest && weakest) {
      const strongestNames = strongest.names.join("・");
      const weakestNames = weakest.names.join("・");
      const strongestText = strongest.names.length > 1
        ? `${strongestNames}がともに${strongest.percent}点で、同率の高い軸として現れ`
        : `${strongestNames}が${strongest.percent}点と相対的に高く`;
      const weakestText = weakest.names.length > 1
        ? `${weakestNames}が同率の振り返りポイント`
        : `${weakestNames}が振り返りポイント`;
      return `モラル編は「${moral.resultType.name}」という結果で、${strongestText}、${weakestText}です。`;
    }

    return `モラル編は「${moral.resultType.name}」という結果です。`;
  }

  function buildInsightProfileSentence(insight) {
    if (!insight.hasResults) {
      return "男心編は未測定です。";
    }

    const bestMatch = insight.bestMatch
      ? `${insight.bestMatch.name}（${insight.bestMatch.matchPercent}%）`
      : "未測定";
    return `男心編では、現在の相性トップは${bestMatch}で、MBTI相性候補は${insight.suggestedMbti}、Love Type相性候補は${insight.suggestedLoveType}です。`;
  }

  function buildOverallProfile(status, hasResults, moral, insight) {
    if (!hasResults) {
      return [
        "まだ診断結果がありません。モラル編または男心編を1項目完了すると、総合プロフィールが表示されます。",
        "結果は人格評価ではなく、回答した場面で何を大切にしたかを振り返る材料として利用してください。"
      ];
    }

    const sentences = [];
    if (status === "partial") {
      sentences.push("現在の完了分に基づく途中結果です。");
    }
    sentences.push(buildMoralProfileSentence(moral));
    sentences.push(buildInsightProfileSentence(insight));
    sentences.push("結果は人格評価ではなく、回答した場面で何を大切にしたかを振り返る材料として利用してください。");
    return sentences;
  }

  function createSnapshot(moralStore, insightStore) {
    const moral = createMoralSnapshot(moralStore);
    const insight = createInsightSnapshot(insightStore);
    const hasResults = moral.hasResults || insight.hasResults;
    const status = moral.complete && insight.complete ? "complete" : "partial";

    return {
      status,
      statusLabel: status === "complete" ? "完了" : "途中診断",
      hasResults,
      completedItemCount: moral.completedCount + insight.completedCount,
      totalItemCount: moral.totalThemes + insight.totalMembers,
      incompleteItems: buildIncompleteItems(moral, insight),
      moral,
      insight,
      profile: buildOverallProfile(status, hasResults, moral, insight)
    };
  }

  function quoteYamlString(value) {
    return JSON.stringify(String(value ?? ""))
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
  }

  function requireValidDate(value) {
    const date = value instanceof Date ? new Date(value.getTime()) : new Date(value);
    if (Number.isNaN(date.getTime())) {
      throw new Error("有効な作成日時を指定してください。");
    }
    return date;
  }

  function padNumber(value, length) {
    return String(value).padStart(length, "0");
  }

  function formatLocalDateTime(value) {
    const date = requireValidDate(value);
    const offsetMinutes = -date.getTimezoneOffset();
    const offsetSign = offsetMinutes >= 0 ? "+" : "-";
    const absoluteOffset = Math.abs(offsetMinutes);
    const offsetHours = padNumber(Math.floor(absoluteOffset / 60), 2);
    const offsetRemainder = padNumber(absoluteOffset % 60, 2);

    return [
      `${padNumber(date.getFullYear(), 4)}-${padNumber(date.getMonth() + 1, 2)}-${padNumber(date.getDate(), 2)}`,
      `T${padNumber(date.getHours(), 2)}:${padNumber(date.getMinutes(), 2)}:${padNumber(date.getSeconds(), 2)}`,
      `${offsetSign}${offsetHours}:${offsetRemainder}`
    ].join("");
  }

  function buildFilename(value) {
    const date = requireValidDate(value);
    const datePart = `${padNumber(date.getFullYear(), 4)}${padNumber(date.getMonth() + 1, 2)}${padNumber(date.getDate(), 2)}`;
    const timePart = `${padNumber(date.getHours(), 2)}${padNumber(date.getMinutes(), 2)}`;
    return `kuukiyomi-result-${datePart}-${timePart}.md`;
  }

  function formatScore(value, unit) {
    return value === null || value === undefined ? "未測定" : `${value}${unit}`;
  }

  function escapeMarkdownTableCell(value) {
    return String(value ?? "")
      .replace(/\|/g, "\\|")
      .replace(/\r?\n/g, "<br>");
  }

  function appendIncompleteSection(lines, snapshot) {
    lines.push("## 未完了項目", "");
    if (snapshot.incompleteItems.length === 0) {
      lines.push("- なし", "");
      return;
    }

    snapshot.incompleteItems.forEach((item) => {
      lines.push(`- ${item.section}: ${item.name}（${item.statusLabel}）`);
    });
    lines.push("");
  }

  function appendMoralSection(lines, moral) {
    lines.push("## モラル編", "");
    if (!moral.hasResults) {
      lines.push("_未測定です。_", "");
    } else {
      lines.push(
        `- 総合スコア: ${formatScore(moral.totalScore, " / 100")}`,
        `- 診断タイプ: ${moral.resultType ? moral.resultType.name : "未測定"}`,
        `- 完了テーマ: ${moral.completedCount} / ${moral.totalThemes}`,
        "",
        "### 強み",
        "",
        moral.comments && moral.comments.good ? moral.comments.good : "未測定です。",
        "",
        "### 振り返りポイント",
        "",
        moral.comments && moral.comments.improvement ? moral.comments.improvement : "未測定です。",
        ""
      );
    }

    lines.push("### 5評価軸", "", "| 評価軸 | スコア |", "| --- | ---: |");
    moral.axes.forEach((axis) => {
      lines.push(`| ${escapeMarkdownTableCell(axis.name)} | ${formatScore(axis.percent, "点")} |`);
    });

    lines.push("", "### テーマ別スコア", "", "| テーマ | 状態 | スコア |", "| --- | --- | ---: |");
    moral.themes.forEach((theme) => {
      lines.push(`| ${escapeMarkdownTableCell(theme.name)} | ${getStatusLabel(theme.status)} | ${formatScore(theme.scorePercent, "点")} |`);
    });
    lines.push("");
  }

  function appendInsightSection(lines, insight) {
    lines.push("## 男心編", "");
    if (!insight.hasResults) {
      lines.push("_未測定です。_", "");
    } else {
      const bestMatch = insight.bestMatch
        ? `${insight.bestMatch.name}（${insight.bestMatch.matchPercent}%）`
        : "未測定";
      lines.push(
        `- 総合一致度: ${formatScore(insight.overallMatchPercent, "%")}`,
        `- 相性トップ: ${bestMatch}`,
        `- MBTI相性候補: ${insight.suggestedMbti}`,
        `- Love Type相性候補: ${insight.suggestedLoveType}`,
        `- 完了人数: ${insight.completedCount} / ${insight.totalMembers}`,
        ""
      );
    }

    lines.push("### メンバー別の結果", "", "| メンバー | 状態 | 一致度 |", "| --- | --- | ---: |");
    insight.members.forEach((member) => {
      lines.push(`| ${escapeMarkdownTableCell(member.name)} | ${getStatusLabel(member.status)} | ${formatScore(member.matchPercent, "%")} |`);
    });
    lines.push("");
  }

  function buildOkfMarkdown(snapshot, generatedAt) {
    if (!snapshot || typeof snapshot !== "object") {
      throw new Error("診断結果を生成できませんでした。");
    }

    const generatedDateTime = formatLocalDateTime(generatedAt);
    const lines = [
      "---",
      `type: ${quoteYamlString(DOCUMENT_TYPE)}`,
      `title: ${quoteYamlString(DOCUMENT_TITLE)}`,
      `description: ${quoteYamlString(DOCUMENT_DESCRIPTION)}`,
      `tags: [${DOCUMENT_TAGS.map(quoteYamlString).join(", ")}]`,
      "generated:",
      `  by: ${quoteYamlString(GENERATOR)}`,
      `  at: ${quoteYamlString(generatedDateTime)}`,
      `result_status: ${quoteYamlString(snapshot.status)}`,
      "version: 1",
      `disclaimer: ${quoteYamlString(DOCUMENT_DISCLAIMER)}`,
      "---",
      "",
      `# ${DOCUMENT_TITLE}`,
      ""
    ];

    if (snapshot.status === "partial") {
      lines.push("> **途中診断**: 現在完了している項目だけをもとにした結果です。未完了項目を回答すると内容が変わる可能性があります。", "");
    }

    lines.push(
      "## 完了状況",
      "",
      `- 結果状態: ${snapshot.statusLabel}`,
      `- 作成日時: ${generatedDateTime}`,
      `- モラル編: ${snapshot.moral.completedCount} / ${snapshot.moral.totalThemes}テーマ完了`,
      `- 男心編: ${snapshot.insight.completedCount} / ${snapshot.insight.totalMembers}人完了`,
      ""
    );

    appendIncompleteSection(lines, snapshot);
    appendMoralSection(lines, snapshot.moral);
    appendInsightSection(lines, snapshot.insight);

    lines.push("## 総合プロフィール", "");
    snapshot.profile.forEach((sentence) => {
      lines.push(sentence, "");
    });

    lines.push(
      "## 利用上の注意",
      "",
      `- ${DOCUMENT_DISCLAIMER}`,
      "- このファイルには匿名ID、回答の生ログ、不要な個人情報を含めていません。",
      "- モラルスコアと男心一致度は別の指標として扱い、平均した総合点を算出していません。",
      ""
    );

    return lines.join("\n");
  }

  root.OverallResultStore = {
    createSnapshot,
    buildOkfMarkdown,
    buildFilename,
    quoteYamlString
  };
})(typeof window !== "undefined" ? window : globalThis);
