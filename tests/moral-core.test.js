const test = require("node:test");
const assert = require("node:assert/strict");

class MemoryStorage {
  constructor() {
    this.values = new Map();
  }

  getItem(key) {
    return this.values.has(key) ? this.values.get(key) : null;
  }

  setItem(key, value) {
    this.values.set(key, String(value));
  }

  removeItem(key) {
    this.values.delete(key);
  }
}

class FailingStorage extends MemoryStorage {
  setItem() {
    throw new Error("write failed");
  }
}

global.localStorage = new MemoryStorage();
const moral = require("../src/frontend/moral/shared/moral-core.js");

function responsesFor(partId, answerKind) {
  return moral.definitions[partId].questions.map((question) => {
    if (answerKind === "correct") {
      return {
        questionId: question.id,
        selectedIds: question.type === "sequence"
          ? [...question.idealOrder]
          : question.type === "single"
            ? [question.correctIds[0]]
            : [...question.correctIds]
      };
    }

    const wrongIds = question.options
      .map((option) => option.id)
      .filter((optionId) => !question.correctIds.includes(optionId));
    return {
      questionId: question.id,
      selectedIds: question.type === "sequence"
        ? [...question.idealOrder].reverse()
        : wrongIds.slice(0, question.type === "multiple" ? question.selectionLimit : 1)
    };
  });
}

test("38問のIDと全選択肢の3軸値が有効", () => {
  const validation = moral.scoring.validateDefinitions();
  assert.equal(validation.valid, true);
  assert.equal(validation.questionCount, 38);
  assert.equal(validation.uniqueQuestionCount, 38);

  Object.values(moral.definitions).forEach((part) => {
    part.questions.forEach((question) => {
      question.options.forEach((option) => {
        Object.values(option.axes).forEach((value) => {
          assert.equal(Number.isInteger(value), true);
          assert.ok(value >= 0 && value <= 4);
        });
      });
      if (question.type === "sequence") {
        Object.values(question.partialAxes).forEach((value) => {
          assert.equal(Number.isInteger(value), true);
          assert.ok(value >= 0 && value <= 4);
        });
        Object.values(question.noneAxes).forEach((value) => {
          assert.equal(Number.isInteger(value), true);
          assert.ok(value >= 0 && value <= 4);
        });
      }
    });
  });
});

test("各パートは全問正解で100点、全問不正解で0点", () => {
  moral.parts.forEach(({ id }) => {
    const perfect = moral.scoring.evaluatePart(id, responsesFor(id, "correct"));
    const incorrect = moral.scoring.evaluatePart(id, responsesFor(id, "incorrect"));
    assert.equal(perfect.score, 100, `${id}の全問正解`);
    assert.equal(incorrect.score, 0, `${id}の全問不正解`);
  });
});

test("職場の1項目違いとオンラインの部分一致・順序違いは正解にしない", () => {
  const officeResponses = responsesFor("office", "correct");
  officeResponses[0].selectedIds = ["cause", "impact", "wait"];
  assert.equal(moral.scoring.evaluatePart("office", officeResponses).correctCount, 7);

  const partialOnline = moral.scoring.evaluateQuestion("online", "phishing-chat", ["rush", "domain"]);
  assert.equal(partialOnline.isCorrect, false);

  const wrongOrder = moral.scoring.evaluateQuestion("online", "incident-order", ["stop", "record", "report", "follow"]);
  assert.equal(wrongOrder.isCorrect, false);
});

test("公共編は各問の先頭2択を正解として扱う", () => {
  moral.definitions.public.questions.forEach((question) => {
    assert.equal(moral.scoring.evaluateQuestion("public", question.id, ["option-1"]).isCorrect, true);
    assert.equal(moral.scoring.evaluateQuestion("public", question.id, ["option-2"]).isCorrect, true);
    assert.equal(moral.scoring.evaluateQuestion("public", question.id, ["option-3"]).isCorrect, false);
    assert.equal(moral.scoring.evaluateQuestion("public", question.id, ["option-4"]).isCorrect, false);
  });
});

test("総合3軸は5パートの均等平均で、8タイプを判定する", () => {
  const parts = moral.parts.map(({ id }, index) => ({
    partId: id,
    score: 100,
    maxScore: 100,
    correctCount: moral.definitions[id].questions.length,
    questionCount: moral.definitions[id].questions.length,
    axes: { commonSense: 60 + index * 10, response: 80, empathy: 70 },
    responses: responsesFor(id, "correct")
  }));
  const result = moral.scoring.evaluateOverall(parts);
  assert.equal(result.complete, true);
  assert.equal(result.axes.commonSense, 80);
  assert.equal(result.axes.response, 80);
  assert.equal(result.axes.empathy, 70);

  const expectedTypes = {
    "111": "3軸バランスマスター",
    "110": "信頼実行タイプ",
    "101": "誠実気配りタイプ",
    "011": "寄り添い対応タイプ",
    "100": "ルールナビゲーター",
    "010": "スマートレスポンダー",
    "001": "思いやりサポーター",
    "000": "伸びしろ発見タイプ"
  };
  Object.entries(expectedTypes).forEach(([bits, name]) => {
    const score = {
      commonSense: bits[0] === "1" ? 70 : 69,
      response: bits[1] === "1" ? 70 : 69,
      empathy: bits[2] === "1" ? 70 : 69
    };
    assert.equal(moral.scoring.getType(score).name, name);
  });
});

test("保存、再読み込み相当の取得、完了時上書き、途中中断時の保持を扱う", () => {
  moral.store.clearAll();
  const first = moral.scoring.evaluatePart("house", responsesFor("house", "correct"));
  const updated = moral.scoring.evaluatePart("house", responsesFor("house", "incorrect"));

  assert.equal(moral.store.savePart(first), true);
  assert.equal(moral.store.getPart("house").score, 100);
  assert.equal(moral.store.getAllParts().house.score, 100);

  // 再挑戦を始めても、完走結果をsavePartするまでは前回結果を保持する。
  responsesFor("house", "incorrect");
  assert.equal(moral.store.getPart("house").score, 100);

  assert.equal(moral.store.savePart(updated), true);
  assert.equal(moral.store.getPart("house").score, 0);
});

test("破損JSON、異なるスキーマ、未知の回答IDを無視する", () => {
  global.localStorage.setItem(moral.STORAGE_KEY, "{");
  assert.deepEqual(moral.store.getAllParts(), {});

  global.localStorage.setItem(moral.STORAGE_KEY, JSON.stringify({ schemaVersion: 99, parts: {} }));
  assert.deepEqual(moral.store.getAllParts(), {});

  const invalid = moral.scoring.evaluatePart("house", responsesFor("house", "correct"));
  invalid.responses[0].selectedIds = ["missing-option"];
  global.localStorage.setItem(moral.STORAGE_KEY, JSON.stringify({
    schemaVersion: moral.SCHEMA_VERSION,
    parts: { house: invalid }
  }));
  assert.equal(moral.store.getPart("house"), null);
});

test("保存失敗を非ブロッキングで通知できる", () => {
  const workingStorage = global.localStorage;
  global.localStorage = new FailingStorage();
  const result = moral.scoring.evaluatePart("house", responsesFor("house", "correct"));
  assert.equal(moral.store.savePart(result), false);
  assert.match(moral.store.getLastError(), /保存できません/);
  global.localStorage = workingStorage;
});

test("全リセットはモラル編の保存キーだけを削除する", () => {
  moral.store.clearAll();
  global.localStorage.setItem("unrelated-key", "keep");
  moral.parts.forEach(({ id }) => {
    assert.equal(moral.store.savePart(moral.scoring.evaluatePart(id, responsesFor(id, "correct"))), true);
  });
  assert.equal(moral.store.isComplete(), true);
  assert.equal(moral.store.clearAll(), true);
  assert.equal(moral.store.isComplete(), false);
  assert.equal(global.localStorage.getItem("unrelated-key"), "keep");
});
