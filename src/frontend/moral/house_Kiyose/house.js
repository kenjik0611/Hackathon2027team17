const pointPerQuestion = 10;

const questions = [
  {
    title: "家事の分担",
    situation: "自分の担当の家事を忘れていて、既に他の家族がやってくれていた。",
    correct: "気づいた時点で謝り、次から代わりに別の家事を引き受ける",
    wrong: ["気づかれなかったので何も言わない", "忙しかったから仕方ないで終わらせる"],
    explanation: "家事は見えない負担が偏りやすいので、気づいた時点でのフォローが信頼につながります。"
  },
  {
    title: "冷蔵庫の食べ物",
    situation: "家族の誰かの名前が書かれた食べ物を、自分が食べたくなった。",
    correct: "本人に一言確認してから食べる",
    wrong: ["少しだけならバレないので食べる", "後で謝ればいい前提で先に食べる"],
    explanation: "共有スペースでも「個人のもの」への配慮は必要です。"
  },
  {
    title: "お風呂・洗面所の使い方",
    situation: "自分が長風呂で、次に入りたい家族を待たせている。",
    correct: "時間を意識し、必要なら一声かけて交代する",
    wrong: ["自分の家なので気にせず長く使う", "待たれていることに気づかないふりをする"],
    explanation: "共用設備は自分の権利だけでなく相手の時間への配慮も必要です。"
  },
  {
    title: "リビングの共有スペース",
    situation: "自分が観たいテレビ番組と、家族が観たい番組が重なった。",
    correct: "話し合って譲り合うか、別の方法(録画・後で視聴)を提案する",
    wrong: ["先にリモコンを取った者勝ちだと考える", "自分の部屋がないことを理由に強く主張する"],
    explanation: "共有空間では一方的な独占より、調整する姿勢が関係を保ちます。"
  },
  {
    title: "兄弟・姉妹の持ち物",
    situation: "兄弟の私物(服やゲームなど)を、本人に聞かず使いたい。",
    correct: "使う前に一言確認する",
    wrong: ["家族だから確認は不要だと考える", "黙って使い、聞かれたら答える"],
    explanation: "家族間でも所有物への許可は必要です。"
  },
  {
    title: "親への報告・連絡",
    situation: "帰りが大きく遅くなりそうだが、連絡するのが面倒に感じる。",
    correct: "分かった時点で早めに連絡する",
    wrong: ["着いてから理由を説明すればよいと考える", "心配されても仕方ないと放置する"],
    explanation: "家族間の信頼は、些細な連絡の積み重ねで保たれます。"
  },
  {
    title: "来客時の対応",
    situation: "家族の友人が家に来ていて、自分は今関わりたくない気分。",
    correct: "短くても挨拶だけはして、自分の空間に戻る",
    wrong: ["完全に無視して部屋に閉じこもる", "不機嫌な態度を見せつける"],
    explanation: "気分が乗らなくても、最低限の礼儀は家族の顔を立てることにもなります。"
  },
  {
    title: "ペットの世話",
    situation: "自分の当番の日にペットの世話を忘れかけている。",
    correct: "気づいた時点ですぐに対応し、忘れがちなことを家族に共有する",
    wrong: ["誰かがやってくれるだろうと放置する", "気づかなかったことにする"],
    explanation: "ペットの世話は待ってくれないため、気づいた瞬間の行動が重要です。"
  },
  {
    title: "家族のスマホ・PCの共有",
    situation: "家族共有のパソコンで、自分の使いたいアプリを長時間使いたい。",
    correct: "他の人が使う予定がないか確認してから使う",
    wrong: ["先に使った者勝ちだと考える", "使用時間を独り占めする"],
    explanation: "共有機器も「暗黙の順番」への配慮が必要です。"
  },
  {
    title: "掃除・ゴミ出し",
    situation: "面倒でゴミ出しの日をうっかり延ばしそうになっている。",
    correct: "多少面倒でも決められた日に出す",
    wrong: ["次の回でまとめて出せばいいと考える", "気づかれなければ良いと放置する"],
    explanation: "家庭内のルールも、見えにくいところで守ることが信頼につながります。"
  }
];

const elements = {
  startPanel: document.getElementById("start-panel"),
  gamePanel: document.getElementById("game-panel"),
  resultPanel: document.getElementById("result-panel"),
  startButton: document.getElementById("start-button"),
  quitButton: document.getElementById("quit-button"),
  questionCount: document.getElementById("question-count"),
  progressBar: document.getElementById("progress-bar"),
  questionTitle: document.getElementById("question-title"),
  questionText: document.getElementById("question-text"),
  answerOptions: document.getElementById("answer-options"),
  feedback: document.getElementById("feedback"),
  nextButton: document.getElementById("next-button"),
  finalScore: document.getElementById("final-score"),
  finalMaxScore: document.getElementById("final-max-score"),
  resultMessage: document.getElementById("result-message"),
  reviewList: document.getElementById("review-list"),
  restartButton: document.getElementById("restart-button"),
  saveStatus: document.getElementById("save-status")
};

const state = {
  currentIndex: 0,
  selectedIndex: null,
  totalScore: 0,
  answerLog: [],
  preparedQuestions: []
};

function shuffleArray(items) {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function prepareQuestion(question, questionIndex) {
  const answers = [
    { id: "correct", text: question.correct, isCorrect: true },
    ...question.wrong.map((answer, answerIndex) => ({ id: `wrong-${answerIndex + 1}`, text: answer, isCorrect: false }))
  ];
  const preparedAnswers = shuffleArray(answers);
  return {
    ...question,
    questionId: `house-q${questionIndex + 1}`,
    answers: preparedAnswers,
    correctIndex: preparedAnswers.findIndex((answer) => answer.isCorrect)
  };
}

function startGame() {
  state.currentIndex = 0;
  state.selectedIndex = null;
  state.totalScore = 0;
  state.answerLog = [];
  state.preparedQuestions = questions.map(prepareQuestion);

  elements.startPanel.hidden = true;
  elements.resultPanel.hidden = true;
  elements.gamePanel.hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const question = state.preparedQuestions[state.currentIndex];
  const progressPercent = (state.currentIndex / state.preparedQuestions.length) * 100;

  state.selectedIndex = null;
  elements.feedback.hidden = true;
  elements.feedback.className = "feedback";
  elements.feedback.textContent = "";
  elements.nextButton.disabled = true;
  elements.nextButton.textContent = state.currentIndex === state.preparedQuestions.length - 1 ? "結果を見る" : "次の問題へ";

  elements.questionCount.textContent = `${state.currentIndex + 1} / ${state.preparedQuestions.length}`;
  elements.progressBar.style.width = `${progressPercent}%`;
  elements.questionTitle.textContent = question.title;
  elements.questionText.textContent = question.situation;

  elements.answerOptions.innerHTML = "";
  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.addEventListener("click", () => selectAnswer(index));

    const label = document.createElement("span");
    label.className = "answer-label";
    label.textContent = String.fromCharCode(65 + index);

    const answerText = document.createElement("span");
    answerText.textContent = answer.text;

    button.append(label, answerText);
    elements.answerOptions.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (state.selectedIndex !== null) {
    return;
  }

  const question = state.preparedQuestions[state.currentIndex];
  const selectedAnswer = question.answers[selectedIndex];
  const isCorrect = selectedAnswer.isCorrect;

  state.selectedIndex = selectedIndex;
  if (isCorrect) {
    state.totalScore += pointPerQuestion;
  }

  state.answerLog.push({
    questionId: question.questionId,
    selectedIds: [selectedAnswer.id],
    questionTitle: question.title,
    selectedAnswer: selectedAnswer.text,
    correctAnswer: question.correct,
    isCorrect
  });

  markAnswers(selectedIndex, question.correctIndex);
  showFeedback(isCorrect, question);
  elements.nextButton.disabled = false;
}

function markAnswers(selectedIndex, correctIndex) {
  const buttons = elements.answerOptions.querySelectorAll(".answer-button");
  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) {
      button.classList.add("correct");
    }
    if (index === selectedIndex && selectedIndex !== correctIndex) {
      button.classList.add("wrong");
    }
  });
}

function showFeedback(isCorrect, question) {
  elements.feedback.hidden = false;
  elements.feedback.classList.toggle("miss", !isCorrect);

  const title = document.createElement("strong");
  title.textContent = isCorrect ? "正解です。10点加算されました。" : "不正解です。正解はハイライトされた選択肢です。";

  const explanation = document.createElement("span");
  explanation.textContent = question.explanation;

  elements.feedback.replaceChildren(title, explanation);
}

function goNext() {
  if (state.currentIndex < state.preparedQuestions.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
    return;
  }
  showResult();
}

function showResult() {
  const partResult = window.Team17Moral.scoring.evaluatePart("house", state.answerLog);
  const saved = window.Team17Moral.store.savePart(partResult);
  renderResult(partResult, saved, false);
}

function renderResult(partResult, saved, restored) {
  elements.gamePanel.hidden = true;
  elements.startPanel.hidden = true;
  elements.resultPanel.hidden = false;

  elements.finalScore.textContent = partResult.score;
  elements.finalMaxScore.textContent = partResult.maxScore;
  elements.resultMessage.textContent = getResultMessage(partResult.score, partResult.maxScore);
  renderReviewList();

  elements.saveStatus.hidden = false;
  elements.saveStatus.classList.toggle("is-warning", !saved);
  elements.saveStatus.textContent = restored
    ? "保存済みの最新結果を表示しています。"
    : saved ? "この結果をブラウザに保存しました。" : window.Team17Moral.store.getLastError();
}

function getResultMessage(score, maxScore) {
  const rate = maxScore === 0 ? 0 : score / maxScore;
  if (rate >= 0.8) {
    return "かなり安定しています。家族への配慮をバランスよく考えた回答でした。";
  }
  if (rate >= 0.5) {
    return "基本は押さえられています。迷った場面では、確認・共有・早めの連絡を増やすとさらに安定します。";
  }
  return "まだ伸ばせます。家族も一人の相手として、確認や配慮を意識してみましょう。";
}

function renderReviewList() {
  elements.reviewList.innerHTML = "";
  state.answerLog.forEach((log, index) => {
    const item = document.createElement("div");
    item.className = `review-item ${log.isCorrect ? "correct-review" : "wrong-review"}`;

    const title = document.createElement("strong");
    title.textContent = `${index + 1}. ${log.questionTitle}`;

    const selected = document.createElement("span");
    selected.textContent = `あなたの回答: ${log.selectedAnswer}`;

    const correct = document.createElement("span");
    correct.textContent = `正解: ${log.correctAnswer}`;

    item.append(title, selected, correct);
    elements.reviewList.appendChild(item);
  });
}

function backToStart() {
  elements.startPanel.hidden = false;
  elements.gamePanel.hidden = true;
  elements.resultPanel.hidden = true;
}

function restoreSavedResult() {
  const saved = window.Team17Moral.store.getPart("house");
  if (!saved) {
    return;
  }

  state.answerLog = saved.responses.map((response) => {
    const questionIndex = Number(response.questionId.replace("house-q", "")) - 1;
    const question = questions[questionIndex];
    const selectedId = response.selectedIds[0];
    const selectedAnswer = selectedId === "correct"
      ? question.correct
      : question.wrong[Number(selectedId.replace("wrong-", "")) - 1] || "回答なし";
    return {
      questionId: response.questionId,
      selectedIds: response.selectedIds,
      questionTitle: question.title,
      selectedAnswer,
      correctAnswer: question.correct,
      isCorrect: selectedId === "correct"
    };
  });
  renderResult(saved, true, true);
}

elements.startButton.addEventListener("click", startGame);
elements.nextButton.addEventListener("click", goNext);
elements.restartButton.addEventListener("click", startGame);
elements.quitButton.addEventListener("click", backToStart);

restoreSavedResult();
