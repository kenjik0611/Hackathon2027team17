(function attachMoralCore(root, factory) {
  const api = factory(root);

  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }

  root.Team17Moral = api;
})(typeof window !== "undefined" ? window : globalThis, function createMoralCore(root) {
  "use strict";

  const STORAGE_KEY = "hackathon2027team17.moralResults.v1";
  const SCHEMA_VERSION = 1;
  const AXIS_KEYS = ["commonSense", "response", "empathy"];
  const PARTS = [
    { id: "house", name: "家庭" },
    { id: "office", name: "職場" },
    { id: "online", name: "オンライン" },
    { id: "outside", name: "社外" },
    { id: "public", name: "公共の場" }
  ];

  const part = (id) => PARTS.find((item) => item.id === id);
  const axes = (commonSense, response, empathy) => ({ commonSense, response, empathy });
  const makeOptions = (rows) => rows.map(([id, commonSense, response, empathy]) => ({
    id,
    axes: axes(commonSense, response, empathy)
  }));
  const single = (id, correctIds, options) => ({
    id,
    type: "single",
    correctIds,
    options: makeOptions(options)
  });
  const multiple = (id, correctIds, selectionLimit, options) => ({
    id,
    type: "multiple",
    correctIds,
    selectionLimit,
    options: makeOptions(options)
  });
  const sequence = (id, idealOrder, partialAxes, noneAxes) => ({
    id,
    type: "sequence",
    idealOrder,
    correctIds: idealOrder,
    partialAxes: axes(...partialAxes),
    noneAxes: axes(...noneAxes),
    options: makeOptions(idealOrder.map((optionId) => [optionId, 4, 4, 4]))
  });

  // 採点値は docs/MORAL_SCORING_SPEC.md を正本として、各選択肢の値を保持する。
  const DEFINITIONS = {
    house: {
      questions: [
        single("house-q1", ["correct"], [["correct", 4, 4, 4], ["wrong-1", 0, 0, 1], ["wrong-2", 1, 1, 1]]),
        single("house-q2", ["correct"], [["correct", 4, 2, 4], ["wrong-1", 0, 0, 1], ["wrong-2", 1, 1, 1]]),
        single("house-q3", ["correct"], [["correct", 3, 3, 4], ["wrong-1", 1, 1, 0], ["wrong-2", 0, 0, 0]]),
        single("house-q4", ["correct"], [["correct", 3, 4, 4], ["wrong-1", 0, 1, 0], ["wrong-2", 1, 1, 1]]),
        single("house-q5", ["correct"], [["correct", 4, 2, 4], ["wrong-1", 0, 1, 0], ["wrong-2", 0, 1, 1]]),
        single("house-q6", ["correct"], [["correct", 3, 4, 4], ["wrong-1", 1, 1, 1], ["wrong-2", 0, 0, 0]]),
        single("house-q7", ["correct"], [["correct", 3, 2, 4], ["wrong-1", 0, 0, 0], ["wrong-2", 0, 0, 0]]),
        single("house-q8", ["correct"], [["correct", 4, 4, 4], ["wrong-1", 0, 0, 0], ["wrong-2", 0, 0, 0]]),
        single("house-q9", ["correct"], [["correct", 3, 3, 4], ["wrong-1", 0, 1, 0], ["wrong-2", 0, 0, 0]]),
        single("house-q10", ["correct"], [["correct", 4, 3, 3], ["wrong-1", 1, 1, 1], ["wrong-2", 0, 0, 0]])
      ]
    },
    office: {
      questions: [
        multiple("delay-report", ["cause", "impact", "update"], 3, [["wait", 1, 1, 2], ["cause", 4, 3, 2], ["guess", 0, 1, 0], ["impact", 4, 4, 3], ["update", 3, 4, 3], ["relay", 1, 1, 1]]),
        multiple("priority-consultation", ["current", "impact", "priority"], 3, [["accept", 1, 2, 1], ["current", 4, 3, 2], ["overtime", 1, 2, 1], ["impact", 4, 4, 3], ["priority", 4, 4, 3], ["silent", 0, 0, 0]]),
        multiple("visitor-entry", ["procedure", "contact", "wait"], 3, [["exception", 0, 1, 1], ["procedure", 4, 3, 3], ["lend", 0, 0, 0], ["contact", 3, 4, 4], ["wait", 4, 3, 4], ["name", 1, 1, 1]]),
        multiple("unknown-specification", ["hold", "scope", "deadline"], 3, [["promise", 1, 1, 1], ["hold", 4, 3, 3], ["scope", 4, 4, 3], ["other", 1, 1, 1], ["deadline", 4, 4, 3], ["manual", 1, 1, 1]]),
        multiple("meeting-followup", ["decision", "owner", "confirm"], 3, [["later", 2, 2, 1], ["decision", 4, 3, 2], ["owner", 4, 4, 3], ["memory", 1, 1, 1], ["confirm", 3, 4, 4], ["personal", 0, 1, 1]]),
        multiple("dinner-precheck", ["allergy", "nonalcohol", "schedule"], 3, [["at-venue", 1, 2, 1], ["allergy", 4, 3, 4], ["toast", 0, 0, 0], ["nonalcohol", 4, 3, 4], ["schedule", 3, 4, 4], ["preference", 1, 1, 1]]),
        multiple("unwell-participant", ["stop", "stay", "help"], 3, [["alone", 0, 0, 0], ["stop", 4, 4, 4], ["wait", 0, 0, 1], ["stay", 3, 4, 4], ["help", 4, 4, 4], ["continue", 0, 0, 0]]),
        multiple("safe-ride-home", ["no-drive", "alternative", "later"], 3, [["coffee", 0, 0, 0], ["no-drive", 4, 3, 3], ["short", 0, 0, 0], ["alternative", 3, 4, 4], ["later", 4, 4, 4], ["one-hour", 0, 0, 0]])
      ]
    },
    online: {
      questions: [
        multiple("screen-share", ["confidential-tab", "private-chat", "meeting-link"], 3, [["confidential-tab", 4, 2, 2], ["private-chat", 4, 3, 3], ["meeting-link", 4, 3, 3], ["weather", 1, 1, 1], ["clock", 1, 1, 1], ["mug", 0, 0, 0]]),
        single("leave-desk", ["lock-and-cover"], [["lock-and-cover", 4, 4, 4], ["close-only", 2, 2, 2], ["mute-only", 0, 0, 0], ["ask-housemate", 1, 1, 1]]),
        multiple("phishing-chat", ["rush", "domain", "auth-code"], 3, [["rush", 3, 3, 2], ["domain", 4, 3, 2], ["auth-code", 4, 4, 3], ["greeting", 0, 0, 1], ["work-hours", 0, 1, 0]]),
        single("file-share", ["ask-official"], [["ask-official", 4, 4, 3], ["personal-cloud", 0, 1, 1], ["personal-mail", 0, 1, 0], ["rename-file", 1, 1, 1]]),
        sequence("incident-order", ["stop", "report", "record", "follow"], [2, 3, 3], [1, 1, 1])
      ]
    },
    outside: {
      questions: [
        single("outside-q1", ["option-1"], [["option-1", 4, 4, 4], ["option-2", 3, 3, 3], ["option-3", 1, 2, 2], ["option-4", 3, 2, 3]]),
        single("outside-q2", ["option-1"], [["option-1", 4, 4, 4], ["option-2", 3, 3, 3], ["option-3", 3, 3, 3], ["option-4", 2, 3, 3]]),
        single("outside-q3", ["option-3"], [["option-1", 3, 3, 3], ["option-2", 2, 3, 2], ["option-3", 4, 4, 4], ["option-4", 2, 2, 2]]),
        single("outside-q4", ["option-2"], [["option-1", 3, 3, 3], ["option-2", 4, 4, 4], ["option-3", 1, 2, 2], ["option-4", 2, 2, 1]]),
        single("outside-q5", ["option-1"], [["option-1", 4, 4, 4], ["option-2", 2, 2, 3], ["option-3", 3, 3, 3], ["option-4", 2, 3, 3]]),
        single("outside-q6", ["option-1"], [["option-1", 4, 4, 4], ["option-2", 3, 3, 2], ["option-3", 3, 3, 3], ["option-4", 2, 3, 2]]),
        single("outside-q7", ["option-1"], [["option-1", 4, 4, 4], ["option-2", 3, 2, 2], ["option-3", 2, 3, 3], ["option-4", 3, 2, 3]]),
        single("outside-q8", ["option-1"], [["option-1", 4, 4, 4], ["option-2", 3, 3, 3], ["option-3", 3, 3, 3], ["option-4", 2, 2, 3]]),
        single("outside-q9", ["option-1"], [["option-1", 4, 4, 4], ["option-2", 2, 3, 2], ["option-3", 3, 3, 3], ["option-4", 3, 3, 3]]),
        single("outside-q10", ["option-1"], [["option-1", 4, 4, 4], ["option-2", 3, 3, 3], ["option-3", 1, 1, 1], ["option-4", 3, 3, 3]])
      ]
    },
    public: {
      questions: [
        single("public-q1", ["option-1", "option-2"], [["option-1", 4, 3, 4], ["option-2", 4, 4, 3], ["option-3", 2, 1, 2], ["option-4", 0, 1, 0]]),
        single("public-q2", ["option-1", "option-2"], [["option-1", 4, 4, 4], ["option-2", 3, 4, 4], ["option-3", 2, 3, 2], ["option-4", 1, 1, 0]]),
        single("public-q3", ["option-1", "option-2"], [["option-1", 4, 4, 4], ["option-2", 4, 3, 4], ["option-3", 1, 2, 2], ["option-4", 0, 0, 0]]),
        single("public-q4", ["option-1", "option-2"], [["option-1", 4, 3, 4], ["option-2", 4, 4, 4], ["option-3", 1, 2, 1], ["option-4", 3, 1, 4]]),
        single("public-q5", ["option-1", "option-2"], [["option-1", 4, 4, 4], ["option-2", 4, 4, 3], ["option-3", 2, 2, 2], ["option-4", 1, 0, 0]])
      ]
    }
  };

  const TYPE_DEFINITIONS = {
    "111": {
      icon: "🌟",
      name: "3軸バランスマスター",
      description: "ルール、対応、相手への配慮をバランスよく考えた結果です。",
      strength: "状況に合わせて、基本を守りながら周囲にも目を向けられています。",
      nextAction: "迷った場面でも、確認・共有・相手の立場を意識する習慣を続けてみましょう。"
    },
    "110": {
      icon: "🛡️",
      name: "信頼実行タイプ",
      description: "基本を守り、必要な行動へ移す判断が強く表れた結果です。",
      strength: "ルールと初動を結びつけ、信頼を守る対応を選べています。",
      nextAction: "相手がどう受け取るかを一呼吸置いて考えると、さらに伝わりやすくなります。"
    },
    "101": {
      icon: "🤝",
      name: "誠実気配りタイプ",
      description: "ルールと人への配慮を大切にする判断が強く表れた結果です。",
      strength: "相手の意思や安心に配慮しながら、誠実な選択を考えられています。",
      nextAction: "困ったときに誰へ、いつ共有するかまで決めると、対応がより安定します。"
    },
    "011": {
      icon: "🫶",
      name: "寄り添い対応タイプ",
      description: "相手への配慮と現実的な対応を結びつける判断が強く表れた結果です。",
      strength: "困っている人や周囲の様子を見ながら、行動に移す視点があります。",
      nextAction: "基本ルールや正式な連絡経路も確認すると、安心して判断の幅を広げられます。"
    },
    "100": {
      icon: "📘",
      name: "ルールナビゲーター",
      description: "基本ルールや社会的な線引きを意識する判断が強く表れた結果です。",
      strength: "守るべきことを見落とさず、慎重に考えられています。",
      nextAction: "相手の事情と、次に取れる具体的な行動も一緒に考えてみましょう。"
    },
    "010": {
      icon: "⚡",
      name: "スマートレスポンダー",
      description: "状況を整理し、次の行動を考える判断が強く表れた結果です。",
      strength: "立ち止まらず、現実的な対応を探す視点があります。",
      nextAction: "急ぐ場面ほど、ルールと相手の同意を確認してから動くことを意識してみましょう。"
    },
    "001": {
      icon: "💛",
      name: "思いやりサポーター",
      description: "相手の安全、時間、気持ちを考える判断が強く表れた結果です。",
      strength: "自分だけで決めず、相手が安心できる選択を考えられています。",
      nextAction: "迷ったら、会社や場のルールと相談先も確認してみましょう。"
    },
    "000": {
      icon: "🌱",
      name: "伸びしろ発見タイプ",
      description: "今回の振り返りから、次に意識したいポイントを見つけるための結果です。",
      strength: "正解や解説を見比べて、判断を更新できることが学びの第一歩です。",
      nextAction: "まずは『止める・確認する・相談する』を、迷ったときの行動候補にしてみましょう。"
    }
  };

  let lastStoreError = null;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function isAxisValue(value) {
    return Number.isInteger(value) && value >= 0 && value <= 4;
  }

  function getQuestion(partId, questionId) {
    const partDefinition = DEFINITIONS[partId];
    if (!partDefinition) {
      return null;
    }
    return partDefinition.questions.find((question) => question.id === questionId) || null;
  }

  function normaliseSelectedIds(question, selectedIds) {
    if (!Array.isArray(selectedIds)) {
      return [];
    }

    const allowedIds = new Set(question.options.map((option) => option.id));
    const validIds = selectedIds.filter((id) => typeof id === "string" && allowedIds.has(id));

    if (question.type === "sequence") {
      return validIds.filter((id, index) => validIds.indexOf(id) === index);
    }

    const uniqueIds = validIds.filter((id, index) => validIds.indexOf(id) === index);
    if (question.type === "single") {
      return uniqueIds.slice(0, 1);
    }
    return uniqueIds.slice(0, question.selectionLimit);
  }

  function sameSet(first, second) {
    return first.length === second.length && first.every((value) => second.includes(value));
  }

  function sameOrder(first, second) {
    return first.length === second.length && first.every((value, index) => value === second[index]);
  }

  function makeEmptyAxes() {
    return axes(0, 0, 0);
  }

  function maxAxesForMultiple(question) {
    const result = makeEmptyAxes();
    AXIS_KEYS.forEach((axis) => {
      const values = question.options.map((option) => option.axes[axis]).sort((a, b) => b - a);
      result[axis] = values.slice(0, question.selectionLimit).reduce((sum, value) => sum + value, 0);
    });
    return result;
  }

  function evaluateQuestion(partId, questionId, selectedIds) {
    const question = getQuestion(partId, questionId);
    if (!question) {
      return null;
    }

    const normalisedIds = normaliseSelectedIds(question, selectedIds);

    if (question.type === "sequence") {
      const isCorrect = sameOrder(normalisedIds, question.idealOrder);
      const isPartial = !isCorrect
        && normalisedIds.length === question.idealOrder.length
        && normalisedIds[0] === "stop"
        && normalisedIds.indexOf("report") < normalisedIds.indexOf("follow");
      return {
        partId,
        questionId,
        selectedIds: normalisedIds,
        isCorrect,
        axes: isCorrect ? axes(4, 4, 4) : isPartial ? clone(question.partialAxes) : clone(question.noneAxes)
      };
    }

    if (question.type === "single") {
      const selected = question.options.find((option) => option.id === normalisedIds[0]);
      return {
        partId,
        questionId,
        selectedIds: normalisedIds,
        isCorrect: Boolean(selected && question.correctIds.includes(selected.id)),
        axes: selected ? clone(selected.axes) : makeEmptyAxes()
      };
    }

    const selectedOptions = normalisedIds
      .map((id) => question.options.find((option) => option.id === id))
      .filter(Boolean);
    const maximum = maxAxesForMultiple(question);
    const resultAxes = makeEmptyAxes();

    AXIS_KEYS.forEach((axis) => {
      const total = selectedOptions.reduce((sum, option) => sum + option.axes[axis], 0);
      resultAxes[axis] = maximum[axis] === 0 ? 0 : Math.round(Math.min(1, total / maximum[axis]) * 4);
    });

    return {
      partId,
      questionId,
      selectedIds: normalisedIds,
      isCorrect: sameSet(normalisedIds, question.correctIds),
      axes: resultAxes
    };
  }

  function getType(axisScores) {
    const key = ["commonSense", "response", "empathy"]
      .map((axis) => axisScores[axis] >= 70 ? "1" : "0")
      .join("");
    return clone(TYPE_DEFINITIONS[key]);
  }

  function sanitiseResponses(partId, responses) {
    const definition = DEFINITIONS[partId];
    if (!definition || !Array.isArray(responses)) {
      return [];
    }

    return definition.questions.map((question) => {
      const response = responses.find((item) => item && item.questionId === question.id);
      const evaluation = evaluateQuestion(partId, question.id, response ? response.selectedIds : []);
      return { questionId: question.id, selectedIds: evaluation.selectedIds };
    });
  }

  function hasCompleteResponses(partId, responses) {
    const definition = DEFINITIONS[partId];
    if (!definition || !Array.isArray(responses) || responses.length !== definition.questions.length) {
      return false;
    }

    const seenQuestionIds = new Set();
    return responses.every((response) => {
      if (!response || typeof response.questionId !== "string" || seenQuestionIds.has(response.questionId)) {
        return false;
      }

      const question = getQuestion(partId, response.questionId);
      if (!question || !Array.isArray(response.selectedIds)) {
        return false;
      }

      seenQuestionIds.add(response.questionId);
      const normalisedIds = normaliseSelectedIds(question, response.selectedIds);
      if (normalisedIds.length !== response.selectedIds.length) {
        return false;
      }

      if (question.type === "single") {
        return normalisedIds.length === 1;
      }
      if (question.type === "sequence") {
        return normalisedIds.length === question.idealOrder.length;
      }
      return normalisedIds.length >= 1 && normalisedIds.length <= question.selectionLimit;
    });
  }

  function evaluatePart(partId, responses) {
    const definition = DEFINITIONS[partId];
    if (!definition) {
      return null;
    }

    const safeResponses = sanitiseResponses(partId, responses);
    const evaluations = safeResponses.map((response) => evaluateQuestion(partId, response.questionId, response.selectedIds));
    const totalAxes = makeEmptyAxes();

    evaluations.forEach((evaluation) => {
      AXIS_KEYS.forEach((axis) => {
        totalAxes[axis] += evaluation.axes[axis];
      });
    });

    const questionCount = definition.questions.length;
    const correctCount = evaluations.filter((evaluation) => evaluation.isCorrect).length;
    const resultAxes = makeEmptyAxes();
    AXIS_KEYS.forEach((axis) => {
      resultAxes[axis] = questionCount === 0 ? 0 : Math.round((totalAxes[axis] / questionCount / 4) * 100);
    });

    return {
      partId,
      score: questionCount === 0 ? 0 : Math.round((correctCount / questionCount) * 100),
      maxScore: 100,
      correctCount,
      questionCount,
      axes: resultAxes,
      responses: safeResponses,
      completedAt: new Date().toISOString()
    };
  }

  function evaluateOverall(partResults) {
    const resultMap = Array.isArray(partResults)
      ? partResults.reduce((map, result) => {
        if (result && result.partId) {
          map[result.partId] = result;
        }
        return map;
      }, {})
      : (partResults || {});
    const completedParts = PARTS.filter((item) => isPartResult(resultMap[item.id]));
    const missingPartIds = PARTS.filter((item) => !isPartResult(resultMap[item.id])).map((item) => item.id);
    const resultAxes = makeEmptyAxes();

    if (completedParts.length > 0) {
      AXIS_KEYS.forEach((axis) => {
        resultAxes[axis] = Math.round(completedParts.reduce((sum, item) => sum + resultMap[item.id].axes[axis], 0) / completedParts.length);
      });
    }

    return {
      complete: missingPartIds.length === 0,
      axes: resultAxes,
      type: getType(resultAxes),
      missingPartIds,
      parts: completedParts.map((item) => clone(resultMap[item.id]))
    };
  }

  function isPartResult(value) {
    return Boolean(value)
      && typeof value.partId === "string"
      && PARTS.some((item) => item.id === value.partId)
      && Number.isInteger(value.score)
      && value.score >= 0
      && value.score <= 100
      && value.maxScore === 100
      && Number.isInteger(value.correctCount)
      && Number.isInteger(value.questionCount)
      && value.questionCount === DEFINITIONS[value.partId].questions.length
      && value.axes
      && AXIS_KEYS.every((axis) => Number.isInteger(value.axes[axis]) && value.axes[axis] >= 0 && value.axes[axis] <= 100)
      && hasCompleteResponses(value.partId, value.responses);
  }

  function normaliseStoredResult(result) {
    if (!isPartResult(result)) {
      return null;
    }

    const recalculated = evaluatePart(result.partId, result.responses);
    return {
      ...recalculated,
      completedAt: typeof result.completedAt === "string" ? result.completedAt : recalculated.completedAt
    };
  }

  function createEmptyStore() {
    return { schemaVersion: SCHEMA_VERSION, parts: {} };
  }

  function readStore() {
    try {
      if (!root.localStorage) {
        return createEmptyStore();
      }
      const raw = root.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return createEmptyStore();
      }
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.schemaVersion !== SCHEMA_VERSION || typeof parsed.parts !== "object") {
        return createEmptyStore();
      }

      const parts = {};
      PARTS.forEach((item) => {
        const result = normaliseStoredResult(parsed.parts[item.id]);
        if (result) {
          parts[item.id] = result;
        }
      });
      return { schemaVersion: SCHEMA_VERSION, parts };
    } catch (error) {
      return createEmptyStore();
    }
  }

  function savePart(result) {
    const normalised = normaliseStoredResult(result);
    if (!normalised) {
      lastStoreError = "結果の形式を確認できなかったため保存できませんでした。";
      return false;
    }

    try {
      if (!root.localStorage) {
        throw new Error("localStorage is unavailable");
      }
      const state = readStore();
      state.parts[normalised.partId] = normalised;
      root.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      lastStoreError = null;
      return true;
    } catch (error) {
      lastStoreError = "このブラウザでは結果を保存できませんでした。";
      return false;
    }
  }

  function getPart(partId) {
    const result = readStore().parts[partId];
    return result ? clone(result) : null;
  }

  function getAllParts() {
    return clone(readStore().parts);
  }

  function isComplete() {
    return PARTS.every((item) => Boolean(getPart(item.id)));
  }

  function clearAll() {
    try {
      if (!root.localStorage) {
        throw new Error("localStorage is unavailable");
      }
      root.localStorage.removeItem(STORAGE_KEY);
      lastStoreError = null;
      return true;
    } catch (error) {
      lastStoreError = "このブラウザでは結果を削除できませんでした。";
      return false;
    }
  }

  function validateDefinitions() {
    const ids = new Set();
    let questionCount = 0;
    let valid = true;

    PARTS.forEach((partItem) => {
      const definition = DEFINITIONS[partItem.id];
      if (!definition || !Array.isArray(definition.questions)) {
        valid = false;
        return;
      }
      definition.questions.forEach((question) => {
        questionCount += 1;
        if (ids.has(question.id) || !question.options.length || !question.correctIds.length) {
          valid = false;
        }
        ids.add(question.id);

        const optionIds = question.options.map((option) => option.id);
        if (new Set(optionIds).size !== optionIds.length
          || !question.correctIds.every((correctId) => optionIds.includes(correctId))) {
          valid = false;
        }

        if (question.type === "multiple"
          && (!Number.isInteger(question.selectionLimit)
            || question.selectionLimit < 1
            || question.correctIds.length !== question.selectionLimit)) {
          valid = false;
        }

        if (question.type === "sequence"
          && (!sameOrder(question.correctIds, question.idealOrder)
            || question.idealOrder.length !== optionIds.length
            || !AXIS_KEYS.every((axis) => isAxisValue(question.partialAxes[axis]) && isAxisValue(question.noneAxes[axis])))) {
          valid = false;
        }

        question.options.forEach((option) => {
          if (!AXIS_KEYS.every((axis) => isAxisValue(option.axes[axis]))) {
            valid = false;
          }
        });
      });
    });

    return { valid, questionCount, uniqueQuestionCount: ids.size };
  }

  return {
    STORAGE_KEY,
    SCHEMA_VERSION,
    parts: clone(PARTS),
    definitions: DEFINITIONS,
    scoring: {
      evaluateQuestion,
      evaluatePart,
      evaluateOverall,
      getType,
      getQuestion,
      validateDefinitions
    },
    store: {
      getPart,
      getAllParts,
      savePart,
      isComplete,
      clearAll,
      getLastError: () => lastStoreError
    }
  };
});
