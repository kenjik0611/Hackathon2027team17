(function () {
  function score(matchScore, mbtiScores, loveTypeScores) {
    return {
      matchScore,
      mbtiScores: mbtiScores || {},
      loveTypeScores: loveTypeScores || {}
    };
  }

  const SCORING = {
    arita: [
      [
        score(2, { I: 3, S: 2, P: 4 }, { F: 2, A: 2, O: 3 }),
        score(10, { E: 2, S: 4, T: 3, F: 2, J: 5 }, { F: 3, A: 4, R: 4, E: 3 }),
        score(4, { E: 4, S: 3, T: 3, J: 3 }, { L: 4, P: 3, O: 3 }),
        score(5, { E: 2, N: 3, P: 5 }, { L: 2, P: 4, O: 4 })
      ],
      [
        score(2, { S: 3, T: 3, J: 4 }, { R: 4, O: 2 }),
        score(1, { E: 2, P: 4 }, { O: 4 }),
        score(10, { E: 2, S: 5, T: 4, F: 3, J: 5 }, { F: 4, A: 4, R: 4, E: 4 }),
        score(4, { E: 3, T: 4, J: 5 }, { L: 5, A: 2, R: 4 })
      ],
      [
        score(10, { E: 3, S: 4, T: 4, F: 4, J: 4 }, { F: 4, A: 4, R: 4, E: 4 }),
        score(3, { E: 4, T: 5, J: 3 }, { L: 4, R: 3 }),
        score(1, { I: 4, P: 4 }, { O: 4 }),
        score(5, { I: 2, F: 4, P: 2 }, { F: 4, A: 3, R: 2, E: 2 })
      ],
      [
        score(1, { I: 4, T: 2, P: 3 }, { O: 4, R: 2 }),
        score(5, { F: 5, P: 3 }, { F: 5, C: 3, P: 3, E: 4 }),
        score(3, { I: 3, P: 4 }, { F: 2, A: 2, O: 3 }),
        score(10, { S: 5, T: 3, F: 3, J: 5 }, { F: 4, A: 4, R: 5, E: 4 })
      ],
      [
        score(2, { I: 3, P: 4 }, { O: 4 }),
        score(10, { E: 2, N: 4, T: 4, F: 3, J: 5 }, { F: 4, A: 4, R: 5, E: 5 }),
        score(3, { T: 4, J: 5 }, { L: 5, R: 4, E: 3 }),
        score(5, { E: 3, N: 3, P: 5 }, { P: 4, O: 4 })
      ]
    ],
    kiyose: [
      [
        score(10, { E: 3, S: 4, F: 3, P: 4 }, { L: 3, A: 4, P: 3, O: 4 }),
        score(3, { S: 3, T: 3, J: 3 }, { L: 2, R: 3 }),
        score(0, { N: 4, F: 3, J: 4 }, { C: 3, E: 4, R: 3 })
      ],
      [
        score(10, { E: 3, S: 3, F: 4, P: 4 }, { F: 3, A: 4, R: 3, O: 5 }),
        score(3, { S: 4, T: 3, J: 3 }, { A: 2, R: 4, E: 2 }),
        score(0, { F: 5, J: 4 }, { C: 4, E: 4, R: 3 })
      ],
      [
        score(10, { E: 4, N: 4, P: 5 }, { L: 3, A: 3, P: 5, O: 5 }),
        score(7, { S: 4, F: 3, J: 3 }, { F: 2, A: 3, R: 3, E: 2 }),
        score(2, { S: 5, J: 5 }, { R: 5, E: 4 })
      ],
      [
        score(10, { I: 3, S: 3, F: 5, P: 3 }, { F: 4, A: 4, P: 3, O: 2 }),
        score(3, { E: 3, S: 4, F: 4, J: 4 }, { C: 3, R: 3, E: 3 }),
        score(0, { I: 4, T: 3, J: 3 }, { R: 4, O: 4 })
      ],
      [
        score(10, { E: 3, S: 3, F: 3, P: 4 }, { F: 2, A: 4, R: 3, O: 5 }),
        score(5, { I: 4, F: 2, P: 3 }, { O: 3 }),
        score(0, { E: 3, F: 3, J: 4 }, { C: 4, E: 5, R: 3 })
      ],
      [
        score(10, { E: 3, S: 4, F: 4, P: 2 }, { A: 4, R: 3, P: 3 }),
        score(5, { I: 4, S: 2, P: 3 }, { O: 3 }),
        score(2, { E: 3, T: 3, P: 3 }, { L: 2, O: 3 })
      ],
      [
        score(10, { E: 4, N: 4, P: 5 }, { L: 3, A: 3, P: 5, O: 5 }),
        score(3, { S: 5, J: 5 }, { R: 5, E: 4 }),
        score(0, { T: 2, J: 5 }, { L: 4, R: 5, E: 4 })
      ],
      [
        score(10, { I: 3, S: 3, F: 3, P: 5 }, { F: 3, A: 4, R: 4, O: 5 }),
        score(2, { E: 3, S: 3, F: 3, J: 4 }, { C: 3, R: 3, E: 3 }),
        score(0, { E: 4, F: 4, J: 3 }, { C: 4, E: 5 })
      ],
      [
        score(10, { I: 3, S: 3, T: 2, F: 3, P: 4 }, { A: 3, R: 4, O: 4 }),
        score(5, { E: 3, S: 3, F: 4, J: 4 }, { A: 4, R: 4, E: 3 }),
        score(2, { E: 3, T: 3, J: 5 }, { L: 4, R: 4, E: 3 })
      ],
      [
        score(10, { I: 2, N: 3, F: 4, P: 5 }, { A: 4, P: 4, O: 5 }),
        score(7, { E: 3, S: 3, F: 4, J: 3 }, { F: 3, A: 3, R: 3, E: 4 }),
        score(0, { F: 3, J: 5 }, { C: 4, R: 4, E: 5 })
      ]
    ],
    kudo: [
      [
        score(10, { I: 2, S: 4, T: 3, P: 4 }, { F: 3, A: 3, R: 4, O: 4 }),
        score(3, { E: 3, F: 4, J: 3 }, { C: 3, E: 3 }),
        score(5, { I: 3, N: 3, F: 4, J: 3 }, { C: 4, E: 3 }),
        score(0, { I: 5, T: 2, P: 3 }, { O: 5, R: 3 })
      ],
      [
        score(10, { E: 3, S: 4, T: 3, F: 3, P: 4 }, { F: 3, A: 3, R: 5, O: 3 }),
        score(3, { E: 3, F: 4, J: 4 }, { A: 3, R: 4, E: 3 }),
        score(0, { I: 3, F: 2, J: 3 }, { R: 2, E: 2 }),
        score(5, { I: 2, F: 4, J: 3 }, { C: 3, R: 3, E: 3 })
      ],
      [
        score(10, { E: 3, S: 4, F: 4, J: 2 }, { F: 4, A: 4, R: 3, E: 2 }),
        score(5, { E: 4, F: 5, P: 3 }, { F: 4, C: 3, P: 3 }),
        score(0, { T: 5, J: 4 }, { L: 3, R: 4 }),
        score(3, { I: 3, S: 2, T: 2, P: 2 }, { O: 3 })
      ],
      [
        score(10, { I: 3, S: 3, T: 3, P: 5 }, { F: 3, A: 3, R: 4, O: 5 }),
        score(0, { E: 4, F: 4, J: 3 }, { C: 4, E: 4 }),
        score(3, { S: 4, J: 4 }, { C: 3, R: 4, E: 2 }),
        score(5, { I: 5, P: 3 }, { O: 5, R: 2 })
      ],
      [
        score(3, { N: 3, F: 4, J: 3 }, { C: 4, E: 3 }),
        score(5, { E: 2, F: 4, J: 2 }, { C: 4, E: 5 }),
        score(10, { E: 3, S: 4, T: 3, F: 3, P: 4 }, { F: 3, A: 3, R: 5, O: 4 }),
        score(0, { I: 3, F: 3, J: 3 }, { R: 2, E: 2 })
      ]
    ]
  };

  const SUZUKI_SCORING = {
    "ramen-order": {
      fields: {
        noodle: {
          firm: score(10, { E: 1, S: 2, T: 1, P: 2 }, { P: 2, O: 2 }),
          regular: score(6, { S: 2, J: 1 }, { A: 1, R: 2 }),
          soft: score(3, { F: 2, P: 1 }, { F: 1, R: 2 })
        },
        flavor: {
          rich: score(10, { E: 1, S: 2, N: 1, P: 2 }, { P: 3, O: 2 }),
          regular: score(6, { S: 2, J: 1 }, { A: 1, R: 2 }),
          light: score(3, { S: 2, J: 2 }, { R: 3 })
        },
        oil: {
          extra: score(10, { E: 1, S: 1, P: 3 }, { P: 3, O: 2 }),
          regular: score(6, { S: 2, J: 1 }, { R: 2 }),
          less: score(3, { S: 2, J: 2 }, { A: 1, R: 3 })
        }
      }
    },
    "yakiniku-first-order": {
      options: {
        tongue: score(10, { E: 2, S: 3, T: 2, P: 2 }, { F: 2, A: 3, P: 2, O: 2 }),
        calbi: score(6, { E: 3, S: 2, P: 4 }, { L: 2, P: 4, O: 3 }),
        rice: score(4, { I: 2, S: 3, J: 3 }, { A: 2, R: 4, E: 2 })
      }
    },
    "group-discussion-role": {
      options: {
        facilitator: score(7, { E: 5, T: 3, J: 3 }, { L: 3, R: 3 }),
        scribe: score(10, { I: 2, S: 5, T: 4, J: 3 }, { F: 2, A: 4, R: 3, O: 2 }),
        timekeeper: score(5, { S: 4, T: 3, J: 5 }, { A: 3, R: 4 }),
        none: score(0, { I: 2, P: 4 }, { O: 4 })
      }
    }
  };

  function getStore() {
    return window.OtokogokoroResultStore || null;
  }

  function toNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : 0;
  }

  function addScores(target, source, scale) {
    Object.keys(source || {}).forEach((key) => {
      target[key] = toNumber(target[key]) + toNumber(source[key]) * scale;
    });
  }

  function combineScorings(scoringItems, questionCount) {
    const result = {
      questionCount,
      answeredCount: scoringItems.length,
      matchScore: 0,
      maxMatchScore: questionCount * 10,
      mbtiScores: {},
      loveTypeScores: {},
      isComplete: scoringItems.length >= questionCount
    };

    scoringItems.forEach((item) => {
      if (!item) {
        return;
      }

      result.matchScore += toNumber(item.matchScore);
      addScores(result.mbtiScores, item.mbtiScores, 1);
      addScores(result.loveTypeScores, item.loveTypeScores, 1);
    });

    result.matchScore = Math.max(0, Math.min(result.maxMatchScore, Math.round(result.matchScore)));
    result.matchPercent = result.maxMatchScore > 0
      ? Math.round((result.matchScore / result.maxMatchScore) * 100)
      : null;

    return result;
  }

  function saveScoredResult(memberId, scoringItems, questionCount) {
    const store = getStore();
    if (!store || typeof store.saveMemberResult !== "function") {
      return null;
    }

    return store.saveMemberResult(memberId, combineScorings(scoringItems, questionCount));
  }

  function getMatrixScore(memberId, questionIndex, optionIndex) {
    const memberScoring = SCORING[memberId] || [];
    const questionScoring = memberScoring[questionIndex] || [];
    return questionScoring[optionIndex] || null;
  }

  function saveByOptionIndex(memberId, answerLog, questionCount) {
    const scoringItems = (answerLog || [])
      .map((answer, questionIndex) => getMatrixScore(memberId, questionIndex, answer && answer.optionIndex))
      .filter(Boolean);

    return saveScoredResult(memberId, scoringItems, questionCount);
  }

  function buildSuzukiCompoundScore(answer) {
    const questionScoring = SUZUKI_SCORING[answer.questionId];
    const selectedValues = answer.selectedValues || {};
    const fieldIds = Object.keys(questionScoring.fields || {});
    const selectedFieldScores = fieldIds
      .map((fieldId) => {
        const selectedId = selectedValues[fieldId];
        return questionScoring.fields[fieldId] && questionScoring.fields[fieldId][selectedId];
      })
      .filter(Boolean);

    const divisor = fieldIds.length || 1;
    const combined = score(0, {}, {});

    selectedFieldScores.forEach((item) => {
      combined.matchScore += toNumber(item.matchScore) / divisor;
      addScores(combined.mbtiScores, item.mbtiScores, 1 / divisor);
      addScores(combined.loveTypeScores, item.loveTypeScores, 1 / divisor);
    });

    return combined;
  }

  function getSuzukiScore(answer) {
    const questionScoring = SUZUKI_SCORING[answer.questionId];
    if (!questionScoring) {
      return null;
    }

    if (questionScoring.fields) {
      return buildSuzukiCompoundScore(answer);
    }

    const selectedId = answer.selectedValues && answer.selectedValues.choice;
    return questionScoring.options && questionScoring.options[selectedId] ? questionScoring.options[selectedId] : null;
  }

  function saveSuzukiResult(answerLog, questionCount) {
    const scoringItems = (answerLog || []).map(getSuzukiScore).filter(Boolean);
    return saveScoredResult("suzuki", scoringItems, questionCount);
  }

  window.OtokogokoroMemberScoring = {
    saveAritaResult: (answerLog, questionCount) => saveByOptionIndex("arita", answerLog, questionCount),
    saveKiyoseResult: (answerLog, questionCount) => saveByOptionIndex("kiyose", answerLog, questionCount),
    saveKudoResult: (answerLog, questionCount) => saveByOptionIndex("kudo", answerLog, questionCount),
    saveSuzukiResult
  };
})();
