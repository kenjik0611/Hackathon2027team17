(function () {
  const STORAGE_KEY = "team17:otokogokoro:results:v1";

  const MEMBERS = [
    {
      id: "arita",
      name: "有田",
      path: "Arita/arita.html",
      mbti: "INTJ",
      mbtiLabel: "建築家",
      loveType: "LCRO",
      loveTypeLabel: "ボス猫"
    },
    {
      id: "kiyose",
      name: "清瀬",
      path: "Kiyose/kiyose.html",
      mbti: "ENFP",
      mbtiLabel: "運動家",
      loveType: "FCRO",
      loveTypeLabel: "ロマンスマジシャン"
    },
    {
      id: "suzuki",
      name: "鈴木",
      path: "Suzuki/suzuki.html",
      mbti: "ISTP",
      mbtiLabel: "巨匠",
      loveType: "FCRE",
      loveTypeLabel: "ちゃっかりうさぎ"
    },
    {
      id: "kudo",
      name: "工藤",
      path: "Kudo/kudo.html",
      mbti: "ENTJ",
      mbtiLabel: "指揮官",
      loveType: "LAPE",
      loveTypeLabel: "キャプテンライオン"
    },
    {
      id: "fukazawa",
      name: "深澤",
      path: "Fukazawa/fukazawa.html",
      mbti: "ESFJ",
      mbtiLabel: "領事",
      loveType: "FCPO",
      loveTypeLabel: "恋愛モンスター"
    }
  ];

  const MBTI_AXES = [
    { left: "E", leftLabel: "外向", right: "I", rightLabel: "内向" },
    { left: "S", leftLabel: "現実", right: "N", rightLabel: "直感" },
    { left: "T", leftLabel: "論理", right: "F", rightLabel: "感情" },
    { left: "J", leftLabel: "計画", right: "P", rightLabel: "柔軟" }
  ];

  const MBTI_NAMES = {
    INTJ: "建築家",
    INTP: "論理学者",
    ENTJ: "指揮官",
    ENTP: "討論者",
    INFJ: "提唱者",
    INFP: "仲介者",
    ENFJ: "主人公",
    ENFP: "運動家",
    ISTJ: "ロジスティシャン",
    ISFJ: "擁護者",
    ESTJ: "幹部",
    ESFJ: "領事",
    ISTP: "巨匠",
    ISFP: "冒険家",
    ESTP: "起業家",
    ESFP: "エンターテイナー"
  };

  const LOVE_TYPE_AXES = [
    { left: "L", leftLabel: "主導", right: "F", rightLabel: "相手に合わせる" },
    { left: "C", leftLabel: "甘えたい", right: "A", rightLabel: "受け止めたい" },
    { left: "R", leftLabel: "現実的", right: "P", rightLabel: "情熱的" },
    { left: "O", leftLabel: "自由寄り", right: "E", rightLabel: "一途寄り" }
  ];

  const LOVE_TYPE_NAMES = {
    LCRO: "ボス猫",
    LCRE: "隠れベイビー",
    LCPO: "主役体質",
    LCPE: "ツンデレヤンキー",
    LARO: "憧れの先輩",
    LARE: "カリスマバランサー",
    LAPO: "パーフェクトカメレオン",
    LAPE: "キャプテンライオン",
    FCRO: "ロマンスマジシャン",
    FCRE: "ちゃっかりうさぎ",
    FCPO: "恋愛モンスター",
    FCPE: "忠犬ハチ公",
    FARO: "不思議生命体",
    FARE: "敏腕マネージャー",
    FAPO: "デビル天使",
    FAPE: "最後の恋人"
  };

  function readState() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        results: parsed.results && typeof parsed.results === "object" ? parsed.results : {},
        progress: parsed.progress && typeof parsed.progress === "object" ? parsed.progress : {},
        updatedAt: parsed.updatedAt || ""
      };
    } catch (error) {
      return { results: {}, progress: {}, updatedAt: "" };
    }
  }

  function writeState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function clampPercent(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) {
      return null;
    }
    return Math.max(0, Math.min(100, Math.round(number)));
  }

  function toNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function getMember(memberId) {
    return MEMBERS.find((member) => member.id === memberId) || null;
  }

  function normalizeResult(memberId, rawResult) {
    const result = rawResult && typeof rawResult === "object" ? rawResult : {};
    const questionCount = Math.max(0, Math.round(toNumber(result.questionCount)));
    const answeredCount = Math.max(0, Math.round(toNumber(result.answeredCount)));
    const maxMatchScore = Math.max(0, toNumber(result.maxMatchScore));
    const matchScore = Math.max(0, toNumber(result.matchScore));
    const calculatedPercent = maxMatchScore > 0 ? (matchScore / maxMatchScore) * 100 : null;
    const matchPercent = clampPercent(result.matchPercent ?? result.percent ?? calculatedPercent);
    const isComplete = Boolean(result.isComplete || result.completed || (questionCount > 0 && answeredCount >= questionCount));

    return {
      memberId,
      questionCount,
      answeredCount,
      matchScore,
      maxMatchScore,
      matchPercent,
      mbtiScores: result.mbtiScores && typeof result.mbtiScores === "object" ? result.mbtiScores : {},
      loveTypeScores: result.loveTypeScores && typeof result.loveTypeScores === "object" ? result.loveTypeScores : {},
      isComplete,
      completedAt: result.completedAt || (isComplete ? new Date().toISOString() : ""),
      updatedAt: new Date().toISOString()
    };
  }

  function normalizeProgress(memberId, rawProgress) {
    const progress = rawProgress && typeof rawProgress === "object" ? rawProgress : {};
    const questionIds = Array.isArray(progress.questionIds)
      ? progress.questionIds.filter((questionId) => typeof questionId === "string")
      : [];
    const questionCount = Math.max(0, Math.round(toNumber(progress.questionCount || questionIds.length)));
    const answeredCount = Math.max(0, Math.min(questionCount || Number.MAX_SAFE_INTEGER, Math.round(toNumber(progress.answeredCount))));
    const currentIndex = Math.max(0, Math.min(Math.max(questionCount - 1, 0), Math.round(toNumber(progress.currentIndex))));

    return {
      memberId,
      questionIds,
      questionCount,
      answeredCount,
      currentIndex,
      matchScore: Math.max(0, toNumber(progress.matchScore)),
      maxMatchScore: Math.max(0, toNumber(progress.maxMatchScore)),
      mbtiScores: progress.mbtiScores && typeof progress.mbtiScores === "object" ? progress.mbtiScores : {},
      loveTypeScores: progress.loveTypeScores && typeof progress.loveTypeScores === "object" ? progress.loveTypeScores : {},
      isComplete: false,
      startedAt: progress.startedAt || "",
      updatedAt: progress.updatedAt || new Date().toISOString()
    };
  }

  function saveMemberResult(memberId, result) {
    if (!getMember(memberId)) {
      return null;
    }

    const state = readState();
    const normalized = normalizeResult(memberId, result);
    state.results[memberId] = normalized;
    if (normalized.isComplete) {
      delete state.progress[memberId];
    }
    state.updatedAt = normalized.updatedAt;
    writeState(state);
    return normalized;
  }

  function saveMemberProgress(memberId, progress) {
    if (!getMember(memberId)) {
      return null;
    }

    const state = readState();
    const normalized = normalizeProgress(memberId, progress);
    state.progress[memberId] = normalized;
    state.updatedAt = normalized.updatedAt;
    writeState(state);
    return normalized;
  }

  function resetMemberResult(memberId) {
    const state = readState();
    delete state.results[memberId];
    delete state.progress[memberId];
    state.updatedAt = new Date().toISOString();
    writeState(state);
  }

  function resetAllResults() {
    writeState({ results: {}, progress: {}, updatedAt: new Date().toISOString() });
  }

  function getMemberResult(memberId) {
    const state = readState();
    const result = state.results[memberId];
    return result ? normalizeResult(memberId, result) : null;
  }

  function getMemberProgress(memberId) {
    const state = readState();
    const progress = state.progress[memberId];
    return progress ? normalizeProgress(memberId, progress) : null;
  }

  function clearMemberProgress(memberId) {
    const state = readState();
    delete state.progress[memberId];
    state.updatedAt = new Date().toISOString();
    writeState(state);
  }

  function addScores(target, source) {
    Object.keys(source || {}).forEach((key) => {
      target[key] = toNumber(target[key]) + toNumber(source[key]);
    });
  }

  function buildAxisPairs(axes, scores) {
    return axes.map((axis) => {
      const leftScore = toNumber(scores[axis.left]);
      const rightScore = toNumber(scores[axis.right]);
      const total = leftScore + rightScore;

      if (total <= 0) {
        return {
          ...axis,
          leftPercent: 50,
          rightPercent: 50,
          preferred: "",
          hasScore: false
        };
      }

      const leftPercent = Math.round((leftScore / total) * 100);

      return {
        ...axis,
        leftPercent,
        rightPercent: 100 - leftPercent,
        preferred: leftPercent >= 50 ? axis.left : axis.right,
        hasScore: true
      };
    });
  }

  function createCodeFromPairs(pairs) {
    if (!pairs.some((pair) => pair.hasScore)) {
      return "";
    }
    return pairs.map((pair) => pair.preferred || "-").join("");
  }

  function getAggregate() {
    const state = readState();
    const memberResults = {};
    const memberProgress = {};
    const mbtiScores = {};
    const loveTypeScores = {};
    const completedResults = [];

    MEMBERS.forEach((member) => {
      const result = state.results[member.id] ? normalizeResult(member.id, state.results[member.id]) : null;
      const progress = state.progress[member.id] ? normalizeProgress(member.id, state.progress[member.id]) : null;
      memberResults[member.id] = result;
      memberProgress[member.id] = progress;

      if (result && result.isComplete) {
        completedResults.push(result);
        addScores(mbtiScores, result.mbtiScores);
        addScores(loveTypeScores, result.loveTypeScores);
      }
    });

    const completedCount = completedResults.length;
    const bestMatchResult = completedResults.reduce((best, result) => {
      if (!best || toNumber(result.matchPercent) > toNumber(best.matchPercent)) {
        return result;
      }
      return best;
    }, null);
    const bestMatchMember = bestMatchResult ? getMember(bestMatchResult.memberId) : null;
    const matchTotal = completedResults.reduce((sum, result) => sum + toNumber(result.matchPercent), 0);
    const overallMatchPercent = completedCount > 0 ? Math.round(matchTotal / completedCount) : null;
    const mbtiPairs = buildAxisPairs(MBTI_AXES, mbtiScores);
    const loveTypePairs = buildAxisPairs(LOVE_TYPE_AXES, loveTypeScores);
    const suggestedMbti = createCodeFromPairs(mbtiPairs);
    const suggestedLoveType = createCodeFromPairs(loveTypePairs);

    return {
      members: MEMBERS,
      memberResults,
      memberProgress,
      totalMembers: MEMBERS.length,
      completedCount,
      incompleteMembers: MEMBERS.filter((member) => !memberResults[member.id] || !memberResults[member.id].isComplete),
      bestMatchResult,
      bestMatchMember,
      overallMatchPercent,
      mbtiPairs,
      loveTypePairs,
      suggestedMbti: suggestedMbti || "未測定",
      suggestedMbtiName: MBTI_NAMES[suggestedMbti] || "",
      suggestedLoveType: suggestedLoveType || "未測定",
      suggestedLoveTypeName: LOVE_TYPE_NAMES[suggestedLoveType] || "",
      updatedAt: state.updatedAt
    };
  }

  window.OtokogokoroResultStore = {
    members: MEMBERS,
    mbtiAxes: MBTI_AXES,
    mbtiNames: MBTI_NAMES,
    loveTypeAxes: LOVE_TYPE_AXES,
    loveTypeNames: LOVE_TYPE_NAMES,
    readState,
    saveMemberResult,
    saveMemberProgress,
    resetMemberResult,
    resetAllResults,
    clearMemberProgress,
    getMember,
    getMemberResult,
    getMemberProgress,
    getAggregate
  };
})();
