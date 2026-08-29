const questions = [
  {
    category: "デート計画",
    question: "次の休日、二人で出かけることになりました。行き先がまだ決まっていないとき、有田が選びそうな行動は？",
    options: [
      "相手が全部決めるまで、特に提案せずに待つ",
      "候補をいくつか調べ、相手の希望を聞いて早めに予定を決める",
      "相談せず、自分が一番行きたい場所へ連れていく",
      "当日の気分で決めればいいので、予定を立てない"
    ],
    correctIndex: 1,
    explanation: "目的と選択肢を整理して前へ進めつつ、長く大切にしたい相手の希望も確認する行動です。有田の「決断力」と「相手への誠実さ」の両方が表れます。",
    traits: ["ENTJ：計画と決断", "FAPE：相手への配慮"],
    takeaway: "選択肢を整理し、二人で決める"
  },
  {
    category: "相手の挑戦",
    question: "恋人が「新しい仕事に挑戦したいけれど、自信がない」と相談してきました。有田ならどう返しそう？",
    options: [
      "失敗するかもしれないので、今のままがいいと止める",
      "気にしすぎだと言って、話題をすぐ変える",
      "やりたい理由を聞き、実現までの手順を一緒に整理して応援する",
      "自分が代わりに全部決め、相手にはその通り動いてもらう"
    ],
    correctIndex: 2,
    explanation: "相手の目標を尊重しながら、課題を具体的な行動へ変える選択です。解決へ導く力と、大切な人を長く支えようとする姿勢を組み合わせています。",
    traits: ["ENTJ：問題解決", "FAPE：一途な支援"],
    takeaway: "相手の目標を、具体的に支える"
  },
  {
    category: "意見のすれ違い",
    question: "大切な相手と意見がぶつかり、少し気まずい空気になりました。有田が最も選びそうなのは？",
    options: [
      "事実と気持ちを整理して相手の話も聞き、次からどうするかを話し合う",
      "自分が正しいと分かるまで、相手の意見を論破し続ける",
      "何もなかったことにして、相手から話すまで放置する",
      "関係が悪くなるのを避けるため、自分の意見をすべて取り下げる"
    ],
    correctIndex: 0,
    explanation: "衝突を勝ち負けにせず、原因を整理して関係を前へ進める選択です。率直な対話と、関係を長く守るための歩み寄りを両立しています。",
    traits: ["ENTJ：率直な対話", "FAPE：関係を守る"],
    takeaway: "衝突を放置せず、次の約束を作る"
  },
  {
    category: "忙しい時期",
    question: "仕事がとても忙しく、恋人と過ごす時間が減りそうです。有田ならどんな行動を取りそう？",
    options: [
      "忙しい間は説明せず、連絡を完全に止める",
      "仕事を全部投げ出し、いつでも相手を最優先にする",
      "分かってくれるはずなので、予定を決めずに待ってもらう",
      "忙しい理由を伝え、短い連絡と次に会える予定を先に決めておく"
    ],
    correctIndex: 3,
    explanation: "責任ある仕事は進めながら、相手を不安なまま待たせない選択です。見通しを共有し、言葉だけでなく予定という行動で誠実さを示します。",
    traits: ["ENTJ：優先順位", "FAPE：安心を行動で示す"],
    takeaway: "忙しさと誠実さを両立する"
  },
  {
    category: "二人の未来",
    question: "交際が長くなり、これからの関係について考える時期になりました。有田が大切にしそうなことは？",
    options: [
      "将来の話は重いので、できるだけ避け続ける",
      "お互いの価値観や目標を話し、二人で実現できる未来を具体的に考える",
      "相手が自分の人生設計に合わせることを当然と考える",
      "その場の楽しさだけを優先し、先のことは一切決めない"
    ],
    correctIndex: 1,
    explanation: "将来を曖昧にせず、相手を対等なパートナーとして長期的な計画を作る選択です。ビジョンを描く力と、一人の相手に誠実に向き合う姿勢が重なります。",
    traits: ["ENTJ：未来の設計", "FAPE：長く一途に向き合う"],
    takeaway: "二人の未来を、対話して設計する"
  }
];

const introPanel = document.getElementById("intro-panel");
const quizPanel = document.getElementById("quiz-panel");
const resultPanel = document.getElementById("result-panel");
const startButton = document.getElementById("start-button");
const backProfileButton = document.getElementById("back-profile-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const answerList = document.getElementById("answer-list");
const feedback = document.getElementById("feedback");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;
let results = [];

function showOnly(panel) {
  [introPanel, quizPanel, resultPanel].forEach(function (item) {
    item.hidden = item !== panel;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const current = questions[currentQuestionIndex];
  answered = false;

  document.getElementById("question-count").textContent =
    "Q" + (currentQuestionIndex + 1) + " / " + questions.length;
  document.getElementById("score-count").textContent = "正解 " + score;
  document.getElementById("progress-bar").style.width =
    ((currentQuestionIndex + 1) / questions.length) * 100 + "%";
  document.getElementById("question-category").textContent = current.category;
  document.getElementById("question-text").textContent = current.question;

  feedback.hidden = true;
  feedback.className = "feedback";
  nextButton.disabled = true;
  nextButton.textContent =
    currentQuestionIndex === questions.length - 1 ? "結果を見る" : "次の問題へ";
  answerList.replaceChildren();

  current.options.forEach(function (option, index) {
    const button = document.createElement("button");
    const mark = document.createElement("span");
    const text = document.createElement("span");

    button.type = "button";
    button.className = "answer-option";
    button.setAttribute("aria-pressed", "false");
    mark.className = "answer-mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = String.fromCharCode(65 + index);
    text.textContent = option;

    button.append(mark, text);
    button.addEventListener("click", function () {
      chooseAnswer(index);
    });
    answerList.appendChild(button);
  });
}

function chooseAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const current = questions[currentQuestionIndex];
  const isCorrect = selectedIndex === current.correctIndex;
  const buttons = Array.from(answerList.querySelectorAll(".answer-option"));

  if (isCorrect) score += 1;
  results[currentQuestionIndex] = {
    correct: isCorrect,
    selectedIndex: selectedIndex
  };

  buttons.forEach(function (button, index) {
    button.disabled = true;
    if (index === current.correctIndex) {
      button.classList.add(index === selectedIndex ? "selected-correct" : "correct-answer");
    } else if (index === selectedIndex) {
      button.classList.add("selected-wrong");
    }
    if (index === selectedIndex) button.setAttribute("aria-pressed", "true");
  });

  feedback.className = "feedback " + (isCorrect ? "correct" : "incorrect");
  document.getElementById("feedback-title").textContent =
    isCorrect ? "正解！ 有田らしい選択です" : "惜しい！ 有田が選びそうなのはこちら";
  document.getElementById("feedback-text").textContent = current.explanation;

  const traitRow = document.getElementById("trait-row");
  traitRow.replaceChildren();
  current.traits.forEach(function (trait) {
    const tag = document.createElement("span");
    tag.className = "trait-tag";
    tag.textContent = trait;
    traitRow.appendChild(tag);
  });

  feedback.hidden = false;
  nextButton.disabled = false;
  document.getElementById("score-count").textContent = "正解 " + score;
  feedback.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function getResultCopy() {
  if (score === 5) {
    return {
      rank: "有田マスター",
      message: "全問正解です。有田の決断力と、一途に関係を育てる姿勢をよく理解しています。"
    };
  }
  if (score >= 3) {
    return {
      rank: "有田のよき理解者",
      message: "かなり理解できています。計画だけでなく、相手と長く向き合う誠実さも有田らしさのポイントです。"
    };
  }
  return {
    rank: "これから有田研究員",
    message: "まだ意外な一面がありそうです。5問の解説を見ながら、有田らしい考え方を振り返ってみましょう。"
  };
}

function renderResult() {
  const copy = getResultCopy();
  document.getElementById("result-score").textContent = score + " / " + questions.length;
  document.getElementById("result-rank").textContent = copy.rank;
  document.getElementById("result-message").textContent = copy.message;

  const reviewList = document.getElementById("review-list");
  reviewList.replaceChildren();

  questions.forEach(function (question, index) {
    const item = document.createElement("div");
    const number = document.createElement("span");
    const body = document.createElement("div");
    const title = document.createElement("strong");
    const takeaway = document.createElement("small");
    const result = document.createElement("span");
    const wasCorrect = results[index] && results[index].correct;

    item.className = "review-item";
    number.className = "review-number";
    number.textContent = index + 1;
    title.textContent = question.category;
    takeaway.textContent = question.takeaway;
    body.append(title, takeaway);
    result.className = "review-result " + (wasCorrect ? "correct" : "incorrect");
    result.textContent = wasCorrect ? "○" : "×";
    result.setAttribute("aria-label", wasCorrect ? "正解" : "不正解");
    item.append(number, body, result);
    reviewList.appendChild(item);
  });

  showOnly(resultPanel);
}

function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  results = [];
  renderQuestion();
  showOnly(quizPanel);
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
backProfileButton.addEventListener("click", function () {
  showOnly(introPanel);
});
nextButton.addEventListener("click", function () {
  if (!answered) return;
  if (currentQuestionIndex === questions.length - 1) {
    renderResult();
    return;
  }
  currentQuestionIndex += 1;
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
