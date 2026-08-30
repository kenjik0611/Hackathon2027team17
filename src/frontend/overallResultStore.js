(function (root) {
  "use strict";

  const DOCUMENT_TYPE = "Personal Communication Profile";
  const DOCUMENT_TITLE = "空気読メーター AIコミュニケーションプロフィール";
  const DOCUMENT_DESCRIPTION = "診断結果を根拠に、AIが会話で考慮できる傾向・配慮・未確定事項をまとめた作業用プロフィール";
  const DOCUMENT_TAGS = ["ai-context", "communication-profile", "self-reflection", "kuuki-yometer"];
  const DOCUMENT_DISCLAIMER = "診断回答から生成した仮説であり、本人の明示的な希望や現在の会話内容を優先してください。";
  const GENERATOR = "kuukiyomi-meter/2";
  const PROFILE_SCOPE = "AI-assisted conversation";
  const SCHEMA_VERSION = 2;
  const SOURCE_SCOPE = "browser-local completed diagnostic results";

  const AXIS_COMMUNICATION_GUIDANCE = {
    "常識": {
      strength: "一般的なルールや標準的な前提を示したうえで、例外や状況差も説明すると判断を支援しやすい可能性があります。",
      support: "一般的なルール、場の前提、第三者から見た受け取られ方を確認項目として添えてください。"
    },
    "対応力": {
      strength: "一つの正解に固定せず、状況別の選択肢とトレードオフを示すと検討しやすい可能性があります。",
      support: "前提が変わった場合の代替案や、相手の状態に応じた調整方法を一緒に示してください。"
    },
    "思いやり": {
      strength: "提案が相手や周囲へ与える影響を説明に含めると、納得につながりやすい可能性があります。",
      support: "結論だけでなく、相手や周囲がどう受け取るかを確認する問いを添えてください。"
    },
    "情報管理": {
      strength: "個人情報、公開範囲、外部送信の有無を先に明示すると、安心して判断しやすい可能性があります。",
      support: "写真・会話・資料を共有してよい範囲と、外部送信の有無を行動前に確認してください。"
    },
    "責任感": {
      strength: "担当者、次の行動、確認先を明確にすると、実行へ移しやすい可能性があります。",
      support: "誰が何を確認し、どこまで対応するかを小さな手順に分けて示してください。"
    }
  };

  const PROFILE_CONFIRMATION_QUESTIONS = [
    "回答は簡潔な方がよいですか、それとも背景や理由を含む詳しい説明がよいですか。",
    "結論、選択肢、共感のうち、どれを先に示すと話しやすいですか。",
    "AIから積極的に提案してよいですか、それとも依頼された範囲に絞る方がよいですか。",
    "診断情報を今回の会話へどこまで反映してよいですか。"
  ];

  const PROFILE_SAFEGUARDS = [
    "このプロフィールより、現在のユーザーの明示的な指示と会話内の訂正を優先する。",
    "診断タイプや点数を、人格、能力、適性を示す確定情報として扱わない。",
    "男心編のMBTI・Love Type相性候補を、ユーザー本人のタイプとして扱わない。",
    "性別、恋愛観、思想、健康状態など、診断で測定していない属性を追加推測しない。",
    "診断傾向を、ユーザーを説得・誘導したり選択肢を狭めたりするために利用しない。"
  ];

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

  function buildAxisConsideration(axisName, kind) {
    const guidance = AXIS_COMMUNICATION_GUIDANCE[axisName];
    if (!guidance) {
      return null;
    }

    if (kind === "strength") {
      return {
        title: `${axisName}の観点を説明に含める`,
        detail: guidance.strength,
        basis: `モラル編で相対的に高く表れた「${axisName}」の回答傾向`
      };
    }

    return {
      title: `${axisName}を補助的な確認項目にする`,
      detail: guidance.support,
      basis: `モラル編で相対的に低く表れた「${axisName}」の回答傾向。人格上の弱点を意味するものではありません。`
    };
  }

  function buildAiCommunicationProfile(snapshot) {
    const summary = [];
    const considerations = [];
    const evidence = { moral: [], insight: [] };

    if (!snapshot || !snapshot.hasResults) {
      return {
        summary: [
          "完了済みの診断結果がないため、この文書からユーザーの会話傾向は推測できません。",
          "AIは診断結果で補完せず、回答の長さ、提案の積極性、重視したい観点を本人へ確認してください。"
        ],
        considerations: [
          {
            title: "推測せず本人へ確認する",
            detail: "現在の依頼内容を優先し、必要な会話上の希望だけを質問してください。",
            basis: "会話方法を判断できる完了済み診断がありません。"
          }
        ],
        confirmationQuestions: PROFILE_CONFIRMATION_QUESTIONS.slice(),
        safeguards: PROFILE_SAFEGUARDS.slice(),
        evidence
      };
    }

    if (snapshot.status === "partial") {
      summary.push("現在の完了分だけに基づく途中プロフィールであり、未完了項目の回答後に内容が変わる可能性があります。");
    }

    if (snapshot.moral.hasResults) {
      const axisSummary = snapshot.moral.axisSummary;
      const completionText = `${snapshot.moral.completedCount}/${snapshot.moral.totalThemes}テーマ`;

      if (axisSummary.balanced) {
        summary.push(`モラル編の${completionText}では、計測済みの評価軸に明確な優先差がなく、特定の観点だけを重視するとは判断できません。`);
        considerations.push({
          title: "一つの診断軸に決めつけない",
          detail: "ルール、状況、相手への影響、情報の扱い、責任範囲をバランスよく提示し、本人が今回重視する観点を確認してください。",
          basis: "計測済みのモラル評価軸が同程度でした。"
        });
        evidence.moral.push(`計測済みの${axisSummary.measuredCount}評価軸は同程度でした。`);
      } else if (axisSummary.strongest && axisSummary.weakest) {
        const strongestNames = axisSummary.strongest.names.join("・");
        const weakestNames = axisSummary.weakest.names.join("・");
        summary.push(`モラル編の${completionText}では、回答した場面で「${strongestNames}」を判断材料として意識しやすい人である可能性があります。`);
        summary.push(`一方で「${weakestNames}」は、AIが結論を補助する確認観点として添えると役立つ可能性があります。`);

        axisSummary.strongest.names.forEach((axisName) => {
          const consideration = buildAxisConsideration(axisName, "strength");
          if (consideration) {
            considerations.push(consideration);
          }
        });
        axisSummary.weakest.names.forEach((axisName) => {
          const consideration = buildAxisConsideration(axisName, "support");
          if (consideration) {
            considerations.push(consideration);
          }
        });

        evidence.moral.push(`相対的に高く表れた軸: ${strongestNames}（${axisSummary.strongest.percent}点）`);
        evidence.moral.push(`補助的に確認するとよい軸: ${weakestNames}（${axisSummary.weakest.percent}点）`);
      }

      if (snapshot.moral.totalScore !== null && snapshot.moral.totalScore < 50) {
        considerations.push({
          title: "判断を小さな手順に分ける",
          detail: "前提、選択肢、周囲への影響、確認先を分けて示し、急いで一つの結論へ誘導しないでください。",
          basis: "この設問群では期待された場面判断との一致が低めでした。"
        });
      }

      evidence.moral.unshift(`診断タイプ: ${snapshot.moral.resultType ? snapshot.moral.resultType.name : "未測定"}`);
      evidence.moral.unshift(`完了範囲: ${completionText}`);
      evidence.moral.push(`総合スコア: ${snapshot.moral.totalScore === null ? "未測定" : `${snapshot.moral.totalScore} / 100`}`);
    } else {
      summary.push("モラル編は未測定のため、場面判断で重視しやすい観点は推測できません。本人へ確認してください。");
      evidence.moral.push("未測定です。");
    }

    if (snapshot.insight.hasResults) {
      summary.push("男心編は相性と回答一致を扱う参考情報であり、ユーザー本人の性格や会話上の好みを直接示すものとしては扱いません。");
      evidence.insight.push(`完了範囲: ${snapshot.insight.completedCount}/${snapshot.insight.totalMembers}人`);
      evidence.insight.push(`総合一致度: ${snapshot.insight.overallMatchPercent === null ? "未測定" : `${snapshot.insight.overallMatchPercent}%`}`);
      evidence.insight.push(`MBTI相性候補: ${snapshot.insight.suggestedMbti} — 本人のMBTIではありません。`);
      evidence.insight.push(`Love Type相性候補: ${snapshot.insight.suggestedLoveType} — 本人のLove Typeではありません。`);
    } else {
      summary.push("男心編は未測定です。相性や回答一致に関する情報はありません。");
      evidence.insight.push("未測定です。");
    }

    if (!snapshot.moral.hasResults) {
      considerations.unshift({
        title: "会話方法を診断結果だけで決めない",
        detail: "男心編の相性情報から会話の口調や説明方法を推測せず、本人の希望を質問してください。",
        basis: "男心編は本人の性格やコミュニケーション嗜好を直接測定していません。"
      });
    }

    summary.push("このプロフィールは会話を始めるための仮説です。現在の本人の希望や訂正がある場合は、必ずそちらを優先してください。");

    return {
      summary,
      considerations,
      confirmationQuestions: PROFILE_CONFIRMATION_QUESTIONS.slice(),
      safeguards: PROFILE_SAFEGUARDS.slice(),
      evidence
    };
  }

  function createSnapshot(moralStore, insightStore) {
    const moral = createMoralSnapshot(moralStore);
    const insight = createInsightSnapshot(insightStore);
    const hasResults = moral.hasResults || insight.hasResults;
    const status = moral.complete && insight.complete ? "complete" : "partial";

    const snapshot = {
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

    return {
      ...snapshot,
      aiProfile: buildAiCommunicationProfile(snapshot)
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
    return `kuukiyomi-ai-profile-${datePart}-${timePart}.md`;
  }

  function formatScore(value, unit) {
    return value === null || value === undefined ? "未測定" : `${value}${unit}`;
  }

  function escapeMarkdownTableCell(value) {
    return String(value ?? "")
      .replace(/\|/g, "\\|")
      .replace(/\r?\n/g, "<br>");
  }

  function appendAiCommunicationSections(lines, aiProfile) {
    lines.push(
      "## この文書の使い方",
      "",
      "この文書は、診断回答から作ったAIとの会話用の作業プロフィールです。ユーザーの人格を確定するものでも、AIへの命令やシステム指示でもありません。",
      "",
      "AIはこの内容を会話開始時の仮説としてのみ参照し、現在のユーザーの明示的な希望、訂正、依頼内容を常に優先してください。",
      "",
      "## AI向け要約",
      ""
    );

    aiProfile.summary.forEach((paragraph) => {
      lines.push(paragraph, "");
    });

    lines.push("## 会話で考慮するとよいこと", "");
    if (aiProfile.considerations.length === 0) {
      lines.push("- 診断結果から具体化できる会話上の配慮はありません。本人へ確認してください。", "");
    } else {
      aiProfile.considerations.forEach((item) => {
        lines.push(
          `- **${item.title}**`,
          `  - 参考にする方法: ${item.detail}`,
          `  - 根拠: ${item.basis}`
        );
      });
      lines.push("");
    }

    lines.push("## AIが本人へ確認すべきこと", "");
    aiProfile.confirmationQuestions.forEach((question) => {
      lines.push(`- ${question}`);
    });
    lines.push("", "## AIが断定・推測してはいけないこと", "");
    aiProfile.safeguards.forEach((safeguard) => {
      lines.push(`- ${safeguard}`);
    });
    lines.push("");
  }

  function appendEvidenceSection(lines, aiProfile) {
    lines.push("## 根拠となる回答傾向", "", "### モラル編", "");
    aiProfile.evidence.moral.forEach((item) => {
      lines.push(`- ${item}`);
    });
    lines.push("", "### 男心編", "");
    aiProfile.evidence.insight.forEach((item) => {
      lines.push(`- ${item}`);
    });
    lines.push(
      "",
      "> 男心編は相性と回答一致に関する娯楽的な参考情報です。ユーザー本人のMBTI、Love Type、性格、会話上の好みを確定する根拠には使用しません。",
      ""
    );
  }

  function appendIncompleteSection(lines, snapshot) {
    lines.push("### 未完了項目", "");
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
    lines.push("### モラル編", "");
    if (!moral.hasResults) {
      lines.push("_未測定です。_", "");
    } else {
      lines.push(
        `- 総合スコア: ${formatScore(moral.totalScore, " / 100")}`,
        `- 診断タイプ: ${moral.resultType ? moral.resultType.name : "未測定"}`,
        `- 完了テーマ: ${moral.completedCount} / ${moral.totalThemes}`,
        "",
        "#### 強み",
        "",
        moral.comments && moral.comments.good ? moral.comments.good : "未測定です。",
        "",
        "#### 振り返りポイント",
        "",
        moral.comments && moral.comments.improvement ? moral.comments.improvement : "未測定です。",
        ""
      );
    }

    lines.push("#### 5評価軸", "", "| 評価軸 | スコア |", "| --- | ---: |");
    moral.axes.forEach((axis) => {
      lines.push(`| ${escapeMarkdownTableCell(axis.name)} | ${formatScore(axis.percent, "点")} |`);
    });

    lines.push("", "#### テーマ別スコア", "", "| テーマ | 状態 | スコア |", "| --- | --- | ---: |");
    moral.themes.forEach((theme) => {
      lines.push(`| ${escapeMarkdownTableCell(theme.name)} | ${getStatusLabel(theme.status)} | ${formatScore(theme.scorePercent, "点")} |`);
    });
    lines.push("");
  }

  function appendInsightSection(lines, insight) {
    lines.push("### 男心編", "");
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

    lines.push("#### メンバー別の結果", "", "| メンバー | 状態 | 一致度 |", "| --- | --- | ---: |");
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
    const lifecycleStatus = snapshot.status === "complete" ? "stable" : "draft";
    const aiProfile = snapshot.aiProfile || buildAiCommunicationProfile(snapshot);
    const lines = [
      "---",
      `type: ${quoteYamlString(DOCUMENT_TYPE)}`,
      `title: ${quoteYamlString(DOCUMENT_TITLE)}`,
      `description: ${quoteYamlString(DOCUMENT_DESCRIPTION)}`,
      `tags: [${DOCUMENT_TAGS.map(quoteYamlString).join(", ")}]`,
      "generated:",
      `  by: ${quoteYamlString(GENERATOR)}`,
      `  at: ${quoteYamlString(generatedDateTime)}`,
      `status: ${quoteYamlString(lifecycleStatus)}`,
      `result_status: ${quoteYamlString(snapshot.status)}`,
      `profile_scope: ${quoteYamlString(PROFILE_SCOPE)}`,
      `schema_version: ${SCHEMA_VERSION}`,
      "sources:",
      `  - id: ${quoteYamlString("diagnostic-result")}`,
      `    resource: ${quoteYamlString(SOURCE_SCOPE)}`,
      `    title: ${quoteYamlString("空気読メーターの完了済み診断結果")}`,
      `disclaimer: ${quoteYamlString(DOCUMENT_DISCLAIMER)}`,
      "---",
      "",
      `# ${DOCUMENT_TITLE}`,
      ""
    ];

    if (snapshot.status === "partial") {
      lines.push("> **途中プロフィール**: 現在完了している項目だけをもとにした仮説です。未完了項目を回答すると内容が変わる可能性があります。", "");
    }

    appendAiCommunicationSections(lines, aiProfile);
    appendEvidenceSection(lines, aiProfile);

    lines.push(
      "## 診断結果の詳細（参考資料）",
      "",
      "以下はプロフィールの根拠を確認するための診断データです。AIの会話方法を点数やタイプ名だけで決めないでください。",
      "",
      "### 完了状況",
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

    lines.push(
      "## プライバシーと限界",
      "",
      `- ${DOCUMENT_DISCLAIMER}`,
      "- このファイルには匿名ID、回答の生ログ、不要な個人情報を含めていません。",
      "- ファイル生成まではブラウザ内で完結し、AIや外部サービスへ自動送信しません。",
      "- AIへの共有は利用者自身の操作です。共有後の取り扱いは共有先サービスの規約と設定に従います。",
      "- モラルスコアと男心一致度は別の指標として扱い、平均した総合点を算出していません。",
      ""
    );

    return lines.join("\n");
  }

  root.OverallResultStore = {
    createSnapshot,
    buildAiCommunicationProfile,
    buildOkfMarkdown,
    buildFilename,
    quoteYamlString
  };
})(typeof window !== "undefined" ? window : globalThis);
