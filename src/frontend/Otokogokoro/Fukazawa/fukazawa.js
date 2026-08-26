const introPanel = document.getElementById("intro-panel");
const quizPanel = document.getElementById("quiz-panel");
const startButton = document.getElementById("start-button");
const backProfileButton = document.getElementById("back-profile-button");
const questionText = document.getElementById("question-text");
const answerList = document.getElementById("answer-list");
const resultPanel = document.getElementById("result-panel");
const matchResult = document.getElementById("match-result");
const resultMessage = document.getElementById("result-message");

const question = {
  text: "飲み会で、相手が別の異性とかなり楽しそうに話していた。その後、深澤くんは普通に笑っているが、さっきより少し口数が減っている。相手はどう振る舞うのが良い？",
  options: [
    {
      label: "A",
      text: "飲み会中は変に深読みせず、全体の会話を楽しみながら、深澤くんにも自然に話題を振る",
      matchScore: 2,
      mbtiScores: { E: 3, S: 3, F: 2, P: 2 },
      loveTypeScores: { F: 3, R: 3, O: 2 },
      message: "場の空気を壊さず自然に戻せる良い対応です。ただ、深澤くん側から見ると「自分の変化に気づいてくれた」という特別感は少し弱めです。"
    },
    {
      label: "B",
      text: "少し時間を置いてから、「さっき話してた内容、深澤くんにも聞きたかった」と会話に入れる",
      matchScore: 5,
      mbtiScores: { E: 3, S: 4, F: 4, J: 3 },
      loveTypeScores: { F: 4, C: 3, R: 4, E: 3 },
      message: "深澤くん的にはかなり刺さる対応です。気にしてくれていた感じがありつつ、重く扱わず自然に会話へ戻してくれるので、安心感と特別感のバランスが強いです。"
    },
    {
      label: "C",
      text: "深澤くんの近くにさりげなく移動して、会話の流れの中でいつもより少しだけ深澤くん寄りに接する",
      matchScore: 4,
      mbtiScores: { E: 2, S: 3, F: 4, P: 3 },
      loveTypeScores: { F: 4, C: 4, P: 3, E: 3 },
      message: "かなり嬉しい対応です。言葉にしすぎず距離感で安心させるのは刺さりやすいですが、深澤くん側が意図を読み切れない可能性も少しあります。"
    },
    {
      label: "D",
      text: "その場ではいつも通りにして、帰り際に「今日あんまり話せなかったから、また話したい」と軽く伝える",
      matchScore: 3,
      mbtiScores: { I: 2, F: 4, J: 2, P: 2 },
      loveTypeScores: { F: 3, C: 4, P: 3, E: 4 },
      message: "個別にフォローしてくれる点はかなり嬉しいです。ただ、その場で少し静かになっている時の不安をすぐほどく対応としては、少しだけ遅めです。"
    }
  ]
};

function renderQuestion() {
  questionText.textContent = question.text;
  answerList.innerHTML = "";

  question.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.innerHTML = `
      <span class="answer-mark">${option.label}</span>
      <span class="answer-text">${option.text}</span>
    `;
    button.addEventListener("click", () => selectOption(option, button));
    answerList.appendChild(button);
  });
}

function saveResult(option) {
  const store = window.OtokogokoroResultStore;

  if (!store) {
    return false;
  }

  store.saveMemberResult("fukazawa", {
    questionCount: 1,
    answeredCount: 1,
    matchScore: option.matchScore,
    maxMatchScore: 5,
    mbtiScores: option.mbtiScores,
    loveTypeScores: option.loveTypeScores,
    isComplete: true,
    completedAt: new Date().toISOString()
  });

  return true;
}

function selectOption(option, selectedButton) {
  const buttons = answerList.querySelectorAll(".answer-button");
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.toggle("is-selected", button === selectedButton);
  });

  const saved = saveResult(option);
  matchResult.textContent = `${option.matchScore} / 5`;
  resultMessage.textContent = saved
    ? `${option.message} この結果は集計画面に保存されました。`
    : `${option.message} ただし、集計用の保存機能を読み込めなかったため、この結果は保存されていません。`;
  resultPanel.hidden = false;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function showQuiz() {
  introPanel.hidden = true;
  quizPanel.hidden = false;
  quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showProfile() {
  quizPanel.hidden = true;
  introPanel.hidden = false;
  introPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

renderQuestion();
startButton.addEventListener("click", showQuiz);
backProfileButton.addEventListener("click", showProfile);
