const QUIZ_ID = "otokogokoro-suzuki";
const QUIZ_VERSION = 1;

const questions = [
  {
    id: "ramen-order",
    kind: "compound",
    scene: "ramen",
    sceneImage: "assets/ramen-order-scene.png",
    label: "家系ラーメン店",
    title: "注文のこだわりを当てよう",
    description: "店員さんから「麺の硬さ、味の濃さ、油の量はどうしますか？」と聞かれました。鈴木さんの注文を予想してください。",
    instruction: "3つとも1つずつ選んでください",
    fields: [
      {
        id: "noodle",
        label: "麺の硬さ",
        options: [
          { id: "firm", label: "硬め" },
          { id: "regular", label: "普通" },
          { id: "soft", label: "柔らかめ" }
        ],
        correctId: "firm"
      },
      {
        id: "flavor",
        label: "味の濃さ",
        options: [
          { id: "rich", label: "濃いめ" },
          { id: "regular", label: "普通" },
          { id: "light", label: "薄め" }
        ],
        correctId: "rich"
      },
      {
        id: "oil",
        label: "油の量",
        options: [
          { id: "extra", label: "多め" },
          { id: "regular", label: "普通" },
          { id: "less", label: "少なめ" }
        ],
        correctId: "extra"
      }
    ],
    feedback: "鈴木さんは、硬め・濃いめ・多め派。家系ラーメンでは”早死に三段活用”を貫きます。"
  },
  {
    id: "yakiniku-first-order",
    kind: "image-choice",
    scene: "yakiniku",
    sceneImage: "assets/yakiniku-scene.png",
    label: "焼肉屋",
    title: "最初の一皿を当てよう",
    description: "みんなで焼肉屋へ。最初に何を頼むか聞かれた鈴木さんは、どれを選ぶでしょう？",
    instruction: "画像をクリックして、1つ選んでください",
    options: [
      { id: "tongue", label: "タン塩から始める", image: "assets/yakiniku-tongue.png" },
      { id: "calbi", label: "いきなりカルビ", image: "assets/yakiniku-calbi.png" },
      { id: "rice", label: "白米を先に確保", image: "assets/yakiniku-rice.png" }
    ],
    correctId: "tongue",
    feedback: "鈴木さんはタン塩から始める派。最初の一皿にも、ぶれない好みが出ます。"
  },
  {
    id: "group-discussion-role",
    kind: "single-choice",
    scene: "discussion",
    sceneImage: "assets/group-discussion-scene.png",
    label: "就活のグループディスカッション",
    title: "引き受ける役割を当てよう",
    description: "就活のグループディスカッションが始まりました。役割分担のとき、鈴木さんはどれを選ぶでしょう？",
    instruction: "鈴木さん本人ならどう動くかを選んでください",
    options: [
      { id: "facilitator", label: "ファシリテーター", note: "議論を進めて全体をまとめる" },
      { id: "scribe", label: "書記", note: "意見を整理して記録に残す" },
      { id: "timekeeper", label: "タイムキーパー", note: "残り時間を見ながら進行を支える" },
      { id: "none", label: "何にもやらない", note: "まずは様子を見る" }
    ],
    correctId: "scribe",
    feedback: "鈴木さんが選ぶのは書記。議論を聞きながら要点を整理し、チームの考えを形にする役割です。"
  }
];

const elements = {
  introPanel: document.getElementById("intro-panel"),
  gamePanel: document.getElementById("game-panel"),
  resultPanel: document.getElementById("result-panel"),
  startButton: document.getElementById("start-button"),
  questionCount: document.getElementById("question-count"),
  liveScore: document.getElementById("live-score"),
  progressBar: document.getElementById("progress-bar"),
  sceneLabel: document.getElementById("scene-label"),
  questionTitle: document.getElementById("question-title"),
  questionText: document.getElementById("question-text"),
  answerForm: document.getElementById("answer-form"),
  answerArea: document.getElementById("answer-area"),
  answerButton: document.getElementById("answer-button"),
  feedback: document.getElementById("feedback"),
  nextButton: document.getElementById("next-button"),
  finalScore: document.getElementById("final-score"),
  finalMaxScore: document.getElementById("final-max-score"),
  resultMessage: document.getElementById("result-message"),
  reviewList: document.getElementById("review-list"),
  restartButton: document.getElementById("restart-button"),
  sceneImage: document.getElementById("scene-image")
};

const state = {
  currentIndex: 0,
  selection: {},
  isAnswered: false,
  answerLog: []
};

function getMaxScore() {
  return questions.reduce((total, question) => (
    total + (question.kind === "compound" ? question.fields.length : 1)
  ), 0);
}

function getRawScore() {
  return state.answerLog.reduce((total, answer) => total + answer.correctCount, 0);
}

function showOnly(panel) {
  [elements.introPanel, elements.gamePanel, elements.resultPanel].forEach((item) => {
    item.hidden = item !== panel;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function makeButton({ className, label, selected, disabled, onClick, note }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.textContent = label;
  button.setAttribute("aria-pressed", String(selected));
  button.disabled = disabled;
  if (selected) button.classList.add("is-selected");

  if (note) {
    const noteElement = document.createElement("small");
    noteElement.textContent = note;
    button.append(noteElement);
  }

  button.addEventListener("click", onClick);
  return button;
}

function renderQuestion() {
  const question = questions[state.currentIndex];
  state.selection = {};
  state.isAnswered = false;

  elements.questionCount.textContent = `QUESTION ${state.currentIndex + 1} / ${questions.length}`;
  elements.liveScore.textContent = `一致 ${getRawScore()} / ${getMaxScore()}`;
  elements.progressBar.style.width = `${(state.currentIndex / questions.length) * 100}%`;
  elements.sceneLabel.textContent = question.label;
  elements.questionTitle.textContent = question.title;
  elements.questionText.textContent = question.description;
  elements.answerButton.disabled = true;
  elements.answerButton.hidden = false;
  elements.feedback.hidden = true;
  elements.feedback.replaceChildren();
  elements.feedback.className = "feedback";
  elements.nextButton.disabled = true;
  elements.nextButton.textContent = state.currentIndex === questions.length - 1 ? "結果を見る" : "次の問題へ";

  elements.sceneImage.src = question.sceneImage;

  renderAnswerArea(question);
}

function renderAnswerArea(question) {
  elements.answerArea.replaceChildren();

  const heading = document.createElement("div");
  heading.className = "answer-heading";
  const headingTitle = document.createElement("h3");
  headingTitle.textContent = "あなたの予想を選ぶ";
  const instruction = document.createElement("p");
  instruction.textContent = question.instruction;
  heading.append(headingTitle, instruction);
  elements.answerArea.append(heading);

  if (question.kind === "compound") {
    renderCompoundChoices(question);
    return;
  }

  if (question.kind === "image-choice") {
    renderImageChoices(question);
    return;
  }

  renderSingleChoices(question);
}

function renderCompoundChoices(question) {
  const fields = document.createElement("div");
  fields.className = "ramen-fields";

  question.fields.forEach((field) => {
    const fieldset = document.createElement("fieldset");
    fieldset.className = "choice-fieldset";
    const legend = document.createElement("legend");
    legend.textContent = field.label;
    const stack = document.createElement("div");
    stack.className = "choice-stack";

    field.options.forEach((option) => {
      const selected = state.selection[field.id] === option.id;
      const button = makeButton({
        className: "choice-button",
        label: option.label,
        selected,
        disabled: state.isAnswered,
        onClick: () => {
          state.selection[field.id] = option.id;
          renderAnswerArea(question);
          updateAnswerButton(question);
        }
      });
      stack.append(button);
    });

    fieldset.append(legend, stack);
    fields.append(fieldset);
  });

  elements.answerArea.append(fields);
  updateAnswerButton(question);
}

function renderImageChoices(question) {
  const grid = document.createElement("div");
  grid.className = "image-choice-grid";

  question.options.forEach((option) => {
    const selected = state.selection.choice === option.id;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "image-choice";
    button.setAttribute("aria-pressed", String(selected));
    button.disabled = state.isAnswered;
    if (selected) button.classList.add("is-selected");

    const art = document.createElement("span");
    art.className = "image-choice-art";
    art.setAttribute("aria-hidden", "true");
    const image = document.createElement("img");
    image.className = "food-image";
    image.src = option.image;
    image.alt = "";
    image.decoding = "async";
    art.append(image);

    const label = document.createElement("span");
    label.className = "image-choice-label";
    label.textContent = option.label;
    button.append(art, label);
    button.addEventListener("click", () => {
      state.selection.choice = option.id;
      renderAnswerArea(question);
      updateAnswerButton(question);
    });
    grid.append(button);
  });

  elements.answerArea.append(grid);
  updateAnswerButton(question);
}

function renderSingleChoices(question) {
  const grid = document.createElement("div");
  grid.className = "role-choice-grid";

  question.options.forEach((option) => {
    const selected = state.selection.choice === option.id;
    const button = makeButton({
      className: "role-choice",
      label: option.label,
      note: option.note,
      selected,
      disabled: state.isAnswered,
      onClick: () => {
        state.selection.choice = option.id;
        renderAnswerArea(question);
        updateAnswerButton(question);
      }
    });
    grid.append(button);
  });

  elements.answerArea.append(grid);
  updateAnswerButton(question);
}

function updateAnswerButton(question) {
  if (state.isAnswered) {
    elements.answerButton.hidden = true;
    return;
  }

  const ready = question.kind === "compound"
    ? question.fields.every((field) => Boolean(state.selection[field.id]))
    : Boolean(state.selection.choice);
  elements.answerButton.disabled = !ready;
}

function getOptionLabel(options, optionId) {
  return options.find((option) => option.id === optionId)?.label || "未選択";
}

function evaluateQuestion(question) {
  if (question.kind === "compound") {
    const selectedValues = {};
    const correctValues = {};
    const detail = question.fields.map((field) => {
      const selectedId = state.selection[field.id];
      const selectedLabel = getOptionLabel(field.options, selectedId);
      const correctLabel = getOptionLabel(field.options, field.correctId);
      selectedValues[field.id] = selectedId;
      correctValues[field.id] = field.correctId;
      return {
        fieldId: field.id,
        fieldLabel: field.label,
        selectedId,
        selectedLabel,
        correctId: field.correctId,
        correctLabel,
        isCorrect: selectedId === field.correctId
      };
    });

    return {
      questionId: question.id,
      questionTitle: question.title,
      kind: question.kind,
      selectedValues,
      correctValues,
      correctCount: detail.filter((item) => item.isCorrect).length,
      maxCount: detail.length,
      detail,
      feedback: question.feedback
    };
  }

  const selectedId = state.selection.choice;
  const selectedOption = question.options.find((option) => option.id === selectedId);
  const correctOption = question.options.find((option) => option.id === question.correctId);
  return {
    questionId: question.id,
    questionTitle: question.title,
    kind: question.kind,
    selectedValues: { choice: selectedId },
    correctValues: { choice: question.correctId },
    correctCount: selectedId === question.correctId ? 1 : 0,
    maxCount: 1,
    detail: [{
      fieldId: "choice",
      fieldLabel: "回答",
      selectedId,
      selectedLabel: selectedOption?.label || "未選択",
      correctId: question.correctId,
      correctLabel: correctOption?.label || "",
      isCorrect: selectedId === question.correctId
    }],
    feedback: question.feedback
  };
}

function getFeedbackTone(answer) {
  if (answer.correctCount === answer.maxCount) return "is-perfect";
  if (answer.correctCount > 0) return "is-partial";
  return "is-miss";
}

function showFeedback(answer) {
  const tone = getFeedbackTone(answer);
  elements.feedback.className = `feedback ${tone}`;

  const title = document.createElement("strong");
  if (answer.correctCount === answer.maxCount) {
    title.textContent = "ぴったり一致！";
  } else if (answer.correctCount > 0) {
    title.textContent = `${answer.correctCount} / ${answer.maxCount} 一致！`;
  } else {
    title.textContent = "今回はすれ違い！";
  }

  const message = document.createElement("p");
  message.textContent = answer.feedback;
  const correctAnswer = document.createElement("p");
  correctAnswer.className = "correct-answer";
  correctAnswer.textContent = `鈴木さんの回答：${answer.detail.map((item) => item.correctLabel).join("・")}`;

  elements.feedback.replaceChildren(title, message, correctAnswer);
  elements.feedback.hidden = false;
}

function submitAnswer(event) {
  event.preventDefault();
  if (state.isAnswered) return;

  const question = questions[state.currentIndex];
  const answer = evaluateQuestion(question);
  state.answerLog.push(answer);
  state.isAnswered = true;
  renderAnswerArea(question);
  showFeedback(answer);
  elements.liveScore.textContent = `一致 ${getRawScore()} / ${getMaxScore()}`;
  elements.nextButton.disabled = false;
}

/*
 * 後から男心編全体の採点ロジックへ接続するための、生データの境界です。
 * 表示用メッセージと採点値を分け、localStorageなどへの保存は行いません。
 */
function buildQuizResult() {
  return {
    quizId: QUIZ_ID,
    version: QUIZ_VERSION,
    rawScore: getRawScore(),
    rawMaxScore: getMaxScore(),
    answers: state.answerLog.map((answer) => ({
      questionId: answer.questionId,
      kind: answer.kind,
      selectedValues: { ...answer.selectedValues },
      correctValues: { ...answer.correctValues },
      correctCount: answer.correctCount,
      maxCount: answer.maxCount
    }))
  };
}

function getResultMessage(score) {
  if (score === getMaxScore()) {
    return "全問一致。ラーメンの好みからチームでの役割まで、鈴木さんをかなり読み切っています。";
  }
  if (score >= 3) {
    return "なかなかの鈴木理解度です。レビューを見ながら、残りのこだわりも覚えておきましょう。";
  }
  return "ここから鈴木研究が始まります。答えを見て、次はどこまで読めるか挑戦してみてください。";
}

function showResult() {
  const result = buildQuizResult();
  if (window.OtokogokoroMemberScoring && typeof window.OtokogokoroMemberScoring.saveSuzukiResult === "function") {
    window.OtokogokoroMemberScoring.saveSuzukiResult(state.answerLog, questions.length);
  }

  elements.finalScore.textContent = result.rawScore;
  elements.finalMaxScore.textContent = result.rawMaxScore;
  elements.resultMessage.textContent = getResultMessage(result.rawScore);
  renderReviewList();
  showOnly(elements.resultPanel);
}

function renderReviewList() {
  elements.reviewList.replaceChildren();

  state.answerLog.forEach((answer, index) => {
    const item = document.createElement("article");
    item.className = `review-item ${getFeedbackTone(answer)}`;
    const number = document.createElement("span");
    number.className = "review-number";
    number.textContent = String(index + 1);

    const content = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = `${answer.questionTitle}（${answer.correctCount} / ${answer.maxCount} 一致）`;
    const selected = document.createElement("span");
    selected.textContent = `あなた：${answer.detail.map((detail) => detail.selectedLabel).join("・")}`;
    const correct = document.createElement("small");
    correct.textContent = `鈴木さん：${answer.detail.map((detail) => detail.correctLabel).join("・")}`;
    content.append(title, selected, correct);
    item.append(number, content);
    elements.reviewList.append(item);
  });
}

function startGame() {
  state.currentIndex = 0;
  state.selection = {};
  state.isAnswered = false;
  state.answerLog = [];
  renderQuestion();
  showOnly(elements.gamePanel);
}

function goNext() {
  if (!state.isAnswered) return;
  if (state.currentIndex === questions.length - 1) {
    showResult();
    return;
  }
  state.currentIndex += 1;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

elements.startButton.addEventListener("click", startGame);
elements.answerForm.addEventListener("submit", submitAnswer);
elements.nextButton.addEventListener("click", goNext);
elements.restartButton.addEventListener("click", startGame);
