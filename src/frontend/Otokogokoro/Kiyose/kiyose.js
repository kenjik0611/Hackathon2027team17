const maxScore = 150;

const questions = [
  {
    title: "合コン後、キャラの違いに気づいたとき",
    situation: "合コンで、清瀬くんはグループごとに話し方や態度を自然に変えていた。二人になったタイミングで話しかける。",
    line: "「今日、疲れたけど楽しかったね」",
    options: [
      { text: "「さっきグループごとにキャラ違ってて器用だなって思った」と素直に感心する", points: 15, reason: "順応力＝彼の強みを肯定的に受け止めている。詮索せず観察だけしている点も◎" },
      { text: "「人によって態度変えるタイプなんだね」と少し引っかかる言い方をする", points: -5, reason: "悪気はなくても“本性を隠してる”というニュアンスに聞こえ、彼の得意テクニックを否定的に捉えられたと感じる" },
      { text: "「本当のあなたはどっちなの？知りたい」と核心を突こうとする", points: -15, reason: "彼が最も苦手とする「理解しようとしすぎる」行為。距離を置かれる原因になる" }
    ]
  },
  {
    title: "既読がついているのに返信が来ない日が続いたあと",
    situation: "数日ぶりに清瀬くんから、何事もなかったように明るいLINEが届いた。",
    line: "「おーひさしぶり！元気してた？」",
    options: [
      { text: "「おかえり〜！全然気にしてないよ」と軽く笑って流す", points: 15, reason: "束縛しない・詮索しない態度は「信頼」を体現しており、彼が一番安心する反応" },
      { text: "「既読ついてたのに返信こなかったね」と事実だけ軽く触れる", points: -5, reason: "責める意図はなくても、彼にとっては地味にプレッシャー" },
      { text: "「既読無視されて傷ついた。心配だから何があったかちゃんと言って」", points: -15, reason: "気持ちを伝えること自体は悪くないが、彼には“説明責任を迫られている＝束縛”と映りやすい" }
    ]
  },
  {
    title: "週末のデートプランを決めるとき",
    situation: "「今週末どうする？」と清瀬くんから聞かれた。",
    line: "「今週末、どうする？」",
    options: [
      { text: "「その日の気分で行き先決めよう、当日ノープラン作戦で」", points: 15, reason: "変化・自由・新しい刺激を求める価値観に完全一致" },
      { text: "「水族館とか定番のとこはどう？」と無難な提案をする", points: 5, reason: "悪くはないが刺激には欠ける、可もなく不可もなし" },
      { text: "「先週と同じお店にしよう、慣れてて安心だし」とルーティン化を提案する", points: -10, reason: "「ひとつの形に縛られたくない」という価値観と真逆" }
    ]
  },
  {
    title: "珍しく彼が弱音をこぼしたとき",
    situation: "いつも自由でマイペースな清瀬くんが「今日ちょっと疲れたかも」とぽつり。",
    line: "「今日ちょっと疲れたかも……」",
    options: [
      { text: "何も詮索せず隣に座り「頼っていいよ、そういうの嬉しい」と受け止める", points: 15, reason: "自由に見えて実は「甘えたい」願望を持つ彼の本音にちょうど応える対応" },
      { text: "「何かあったの？大丈夫？」と根掘り葉掘り理由を聞き出そうとする", points: -5, reason: "心配の気持ちは伝わるが、問い詰められるとかえって疲れてしまうタイプ" },
      { text: "「疲れてるなら今日はもう解散しよっか」と距離を取る", points: -15, reason: "本当は甘えたいのに、突き放されたと感じてしまう典型的なすれ違い" }
    ]
  },
  {
    title: "彼が異性の同僚と楽しそうに話しているのを見たとき",
    situation: "清瀬くんが職場の同僚と親しげに談笑している場面に遭遇。",
    line: "（同僚と楽しそうに話している）",
    options: [
      { text: "笑って流し、後で「さっき誰と話してたの〜？」と軽い興味で聞く程度", points: 15, reason: "束縛せず信頼をベースにした自然な会話。彼の自由を尊重できている" },
      { text: "何も言わずにモヤモヤを一人で抱え込む", points: 0, reason: "波風は立たないが信頼関係の構築という意味では前進しない" },
      { text: "その場で不機嫌になり「なんであんなに仲良さそうにしてたの？」と問い詰める", points: -15, reason: "束縛・干渉と受け取られ、自由を重んじる彼には逆効果" }
    ]
  },
  {
    title: "“意外としっかりしてる”一面を見たとき",
    situation: "自由人だと思っていた清瀬くんが、後輩のミスを冷静にフォローしていた。",
    line: "（後輩のミスを冷静にフォローしている）",
    options: [
      { text: "「頼りになるところあるんだね、ちょっと見直した」と素直に驚きと尊敬を伝える", points: 15, reason: "彼の“ギャップ”を魅力として正面から評価している。まさに彼が評価されたいポイント" },
      { text: "特に触れずいつも通り接する", points: 0, reason: "マイナスではないが、彼の魅力に気づいたアピールができていない" },
      { text: "「意外としっかりしてるんだ、てっきり適当な人だと思ってた」と最初の印象の悪さを匂わせる", points: -10, reason: "褒めているようで実は下げていた評価を告白する形になり、地雷を踏みやすい" }
    ]
  },
  {
    title: "交際1周年など、記念日の過ごし方を相談するとき",
    situation: "特別な日をどう過ごすか話し合っている。",
    line: "「記念日、どうしようか」",
    options: [
      { text: "「毎年違うことしよう、今年は〇〇に挑戦してみたい」と新しい体験を提案", points: 15, reason: "変化を楽しみ、型にはまらないことを好む価値観にぴったり" },
      { text: "「去年と同じお店を予約しておいたよ」と伝統を踏襲する", points: -5, reason: "気遣いは伝わるが、彼にはやや“型にはめられる”感覚がある" },
      { text: "「記念日なんだからこうするのが普通でしょ」とルールを押し付ける", points: -15, reason: "「縛られたくない」という核心的な価値観と正面衝突する" }
    ]
  },
  {
    title: "情熱的だった彼が急に素っ気なくなったとき",
    situation: "あんなに全力だったのに、ある日ふっと熱が冷めたような態度になった。",
    line: "（なんとなく素っ気ない）",
    options: [
      { text: "「今日はそういう気分なんだね、落ち着いたらまた話そう」と余白を持って待つ", points: 15, reason: "気分屋な一面も個性として受け止める、まさに理想の距離感" },
      { text: "「なんで急に冷たいの？ちゃんと説明して」と理由を問い詰める", points: -10, reason: "説明を強要される感覚がスイッチオフの引き金になりやすい" },
      { text: "不安になって立て続けに連絡を送る", points: -15, reason: "彼が最も苦手とする“束縛”の典型行動" }
    ]
  },
  {
    title: "些細なことで意見が食い違い、気まずくなったとき",
    situation: "ちょっとしたすれ違いから空気が重くなってしまった。",
    line: "（気まずい空気が流れている）",
    options: [
      { text: "「今すぐ答え出さなくていいよ、お互い頭冷やそう」と余裕を持たせる", points: 15, reason: "白黒つけることを急がせない柔軟さが、彼のペースを尊重する対応になる" },
      { text: "その場でとことん話し合って解決しようとする", points: 0, reason: "誠実だが、彼にとっては少し息苦しく感じることもある" },
      { text: "「ちゃんと謝って。納得いくまで話す」と一方的にルールを決める", points: -10, reason: "彼の自由なペースを尊重しない、支配的なコミュニケーションと受け取られる" }
    ]
  },
  {
    title: "関係をはっきりさせる（告白・進展）場面",
    situation: "付き合うかどうかの話になった。",
    line: "「これから、どうしていきたい？」",
    options: [
      { text: "「肩書きとか形式にこだわらなくていいから、これからも自然体で一緒にいたい」", points: 15, reason: "型にはめない・信頼ベースという彼の価値観そのものを言葉にした殺し文句" },
      { text: "「普通に恋人同士になろう」とストレートに伝える", points: 5, reason: "悪くはないが平凡。彼の心にはあと一歩刺さりきらない" },
      { text: "「ちゃんと彼女って呼べる関係にして、他の異性とは関わらないでほしい」", points: -15, reason: "束縛・独占欲全開の要求。彼が最も距離を置きたくなるアプローチ" }
    ]
  }
];

const elements = {
  startPanel: document.getElementById("start-panel"),
  gamePanel: document.getElementById("game-panel"),
  resultPanel: document.getElementById("result-panel"),
  startButton: document.getElementById("start-button"),
  quitButton: document.getElementById("quit-button"),
  questionCount: document.getElementById("question-count"),
  scoreTag: document.getElementById("score-tag"),
  progressBar: document.getElementById("progress-bar"),
  questionTitle: document.getElementById("question-title"),
  questionText: document.getElementById("question-text"),
  questionLine: document.getElementById("question-line"),
  answerOptions: document.getElementById("answer-options"),
  feedback: document.getElementById("feedback"),
  nextButton: document.getElementById("next-button"),
  finalScore: document.getElementById("final-score"),
  finalMaxScore: document.getElementById("final-max-score"),
  resultEnding: document.getElementById("result-ending"),
  resultMessage: document.getElementById("result-message"),
  reviewList: document.getElementById("review-list"),
  restartButton: document.getElementById("restart-button")
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

function prepareQuestion(question) {
  return {
    ...question,
    options: shuffleArray(question.options.map((option, optionIndex) => ({
      ...option,
      optionIndex
    })))
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
  elements.scoreTag.textContent = `好感度 ${state.totalScore}`;
  elements.progressBar.style.width = `${progressPercent}%`;
  elements.questionTitle.textContent = question.title;
  elements.questionText.textContent = question.situation;
  elements.questionLine.textContent = question.line;

  elements.answerOptions.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.addEventListener("click", () => selectAnswer(index));

    const label = document.createElement("span");
    label.className = "answer-label";
    label.textContent = String.fromCharCode(65 + index);

    const answerText = document.createElement("span");
    answerText.textContent = option.text;

    button.append(label, answerText);
    elements.answerOptions.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (state.selectedIndex !== null) {
    return;
  }

  const question = state.preparedQuestions[state.currentIndex];
  const selectedOption = question.options[selectedIndex];

  state.selectedIndex = selectedIndex;
  state.totalScore += selectedOption.points;

  state.answerLog.push({
    questionTitle: question.title,
    selectedText: selectedOption.text,
    optionIndex: selectedOption.optionIndex,
    points: selectedOption.points,
    reason: selectedOption.reason
  });

  markAnswers(question.options, selectedIndex);
  showFeedback(selectedOption);
  elements.scoreTag.textContent = `好感度 ${state.totalScore}`;
  elements.nextButton.disabled = false;
}

function markAnswers(options, selectedIndex) {
  const buttons = elements.answerOptions.querySelectorAll(".answer-button");
  buttons.forEach((button, index) => {
    button.disabled = true;
    const points = options[index].points;
    if (points > 0) {
      button.classList.add("good");
    } else if (points < 0) {
      button.classList.add("bad");
    } else {
      button.classList.add("neutral");
    }
    if (index === selectedIndex) {
      button.classList.add("selected");
    }
  });
}

function showFeedback(option) {
  elements.feedback.hidden = false;
  elements.feedback.classList.toggle("miss", option.points < 0);
  elements.feedback.classList.toggle("neutral", option.points === 0);

  const title = document.createElement("strong");
  const sign = option.points > 0 ? "+" : "";
  title.textContent = `好感度 ${sign}${option.points}`;

  const explanation = document.createElement("span");
  explanation.textContent = option.reason;

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
  elements.gamePanel.hidden = true;
  elements.resultPanel.hidden = false;

  if (window.OtokogokoroMemberScoring && typeof window.OtokogokoroMemberScoring.saveKiyoseResult === "function") {
    window.OtokogokoroMemberScoring.saveKiyoseResult(state.answerLog, state.preparedQuestions.length);
  }

  elements.finalScore.textContent = state.totalScore;
  elements.finalMaxScore.textContent = maxScore;
  const ending = getEnding(state.totalScore);
  elements.resultEnding.textContent = ending.title;
  elements.resultMessage.textContent = ending.message;
  renderReviewList();
}

function getEnding(score) {
  if (score >= 120) {
    return {
      title: "ベストエンド",
      message: "信頼で結ばれる、束縛しない関係を選んだ二人。彼のペースを尊重する対応が、一番の安心につながりました。"
    };
  }
  if (score >= 60) {
    return {
      title: "グッドエンド",
      message: "付き合えるけれど、まだお互い手探りの関係。詮索や問い詰めを減らすと、もっと距離が縮まりそうです。"
    };
  }
  return {
    title: "バッドエンド／友達止まりエンド",
    message: "詮索・束縛が多く、彼は自由を求めて距離を置いてしまいました。「理解しようとしすぎない」を意識してみましょう。"
  };
}

function renderReviewList() {
  elements.reviewList.innerHTML = "";
  state.answerLog.forEach((log, index) => {
    const item = document.createElement("div");
    const tone = log.points > 0 ? "good-review" : log.points < 0 ? "bad-review" : "neutral-review";
    item.className = `review-item ${tone}`;

    const title = document.createElement("strong");
    const sign = log.points > 0 ? "+" : "";
    title.textContent = `${index + 1}. ${log.questionTitle}（${sign}${log.points}）`;

    const selected = document.createElement("span");
    selected.textContent = `あなたの選択: ${log.selectedText}`;

    const reason = document.createElement("span");
    reason.textContent = log.reason;

    item.append(title, selected, reason);
    elements.reviewList.appendChild(item);
  });
}

function backToStart() {
  elements.startPanel.hidden = false;
  elements.gamePanel.hidden = true;
  elements.resultPanel.hidden = true;
}

elements.startButton.addEventListener("click", startGame);
elements.nextButton.addEventListener("click", goNext);
elements.restartButton.addEventListener("click", startGame);
elements.quitButton.addEventListener("click", backToStart);
