// =======================================
// 工藤理解ゲーム
// =======================================


// =======================================
// 問題データ
// =======================================

const questions = [
  {
    category: "機嫌が悪いとき",

    question:
      "工藤が明らかにちょっと機嫌悪そう。でも「別に怒ってないよ」と言っています。本音に一番近いのは？",

    choices: [
      {
        text: "本当に大したことじゃない。変に深掘りしないでほしい",
        score: 100
      },
      {
        text: "本当はめちゃくちゃ怒っている。何度でも理由を聞いてほしい",
        score: 25
      },
      {
        text: "自分から言いたくないだけ。全部察して謝ってほしい",
        score: 50
      },
      {
        text: "とにかく一人にしてほしい。今日はもう話したくない",
        score: 0
      }
    ],

    takeaway: "必要以上に深読みしない"
  },

  {
    category: "喧嘩のあと",

    question:
      "工藤とちょっとした喧嘩になりました。話しているうちに、もう解決した感じです。このあと工藤が一番望んでいるのは？",

    choices: [
      {
        text: "解決したなら終わり。普通にいつも通りに戻りたい",
        score: 100
      },
      {
        text: "その日のうちに、もう一度最初から全部話し合いたい",
        score: 25
      },
      {
        text: "しばらく気まずい空気を残して反省してほしい",
        score: 0
      },
      {
        text: "長文で改めて謝ってほしい",
        score: 50
      }
    ],

    takeaway: "解決したことは引きずらない"
  },

  {
    category: "頑張ったとき",

    question:
      "工藤が研究や仕事で頑張ったことを話してきました。一番嬉しい反応はどれ？",

    choices: [
      {
        text: "「すごいじゃん」と結果だけじゃなく、頑張った部分もちゃんと認める",
        score: 100
      },
      {
        text: "とにかく大げさに褒めまくる",
        score: 50
      },
      {
        text: "「でももっと上いるでしょ」と次の目標を提示する",
        score: 0
      },
      {
        text: "あまり触れず、いつも通り接する",
        score: 25
      }
    ],

    takeaway: "結果だけでなく、頑張った過程も見てほしい"
  },

  {
    category: "一人の時間",

    question:
      "工藤が一人で何かに集中しているとき、彼女にはどうしていてほしい？",

    choices: [
      {
        text: "必要なときは自分から言うから、基本は自由にしていてほしい",
        score: 100
      },
      {
        text: "寂しくならないように、ずっと近くで話しかけてほしい",
        score: 0
      },
      {
        text: "何をしているのか定期的に確認してほしい",
        score: 25
      },
      {
        text: "完全に無視して、その日は一切関わらないでほしい",
        score: 50
      }
    ],

    takeaway: "お互いに自由な時間も大切にする"
  },

  {
    category: "二人の関係",

    question:
      "工藤との関係で一番大切なのは、結局どれだと思う？",

    choices: [
      {
        text: "何でも察して、言われる前に行動すること",
        score: 25
      },
      {
        text: "ずっと一緒にいて、できるだけ離れないこと",
        score: 50
      },
      {
        text: "お互い言いたいことは言って、引きずらず普通に戻れること",
        score: 100
      },
      {
        text: "喧嘩にならないように、嫌なこともなるべく我慢すること",
        score: 0
      }
    ],

    takeaway: "言いたいことを言って、引きずらない"
  }
];


// =======================================
// HTML要素
// =======================================

const introPanel = document.getElementById("intro-panel");
const quizPanel = document.getElementById("quiz-panel");
const resultPanel = document.getElementById("result-panel");

const startButton = document.getElementById("start-button");
const backProfileButton = document.getElementById("back-profile-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const answerList = document.getElementById("answer-list");
const feedback = document.getElementById("feedback");


// =======================================
// 状態
// =======================================

let currentQuestionIndex = 0;
let totalScore = 0;
let answered = false;
let results = [];


// =======================================
// 画面切り替え
// =======================================

function showOnly(panel) {
  [introPanel, quizPanel, resultPanel].forEach(function (item) {
    item.hidden = item !== panel;
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// =======================================
// 問題表示
// =======================================

function renderQuestion() {
  const current = questions[currentQuestionIndex];

  answered = false;

  document.getElementById("question-count").textContent =
    "Q" + (currentQuestionIndex + 1) + " / " + questions.length;

  document.getElementById("score-count").textContent =
    "理解度 " + Math.round(totalScore / Math.max(currentQuestionIndex, 1)) + "%";

  document.getElementById("progress-bar").style.width =
    ((currentQuestionIndex + 1) / questions.length) * 100 + "%";

  document.getElementById("question-category").textContent =
    current.category;

  document.getElementById("question-text").textContent =
    current.question;


  // 前の回答を削除
  answerList.replaceChildren();

  feedback.hidden = true;
  feedback.className = "feedback";

  nextButton.disabled = true;

  nextButton.textContent =
    currentQuestionIndex === questions.length - 1
      ? "結果を見る"
      : "次の問題へ";


  // ===================================
  // 選択肢をランダム化
  // ===================================

  const shuffledChoices = [...current.choices].sort(
    () => Math.random() - 0.5
  );

  shuffledChoices.forEach(function (choice, index) {

    const button = document.createElement("button");
    const mark = document.createElement("span");
    const text = document.createElement("span");

    button.type = "button";
    button.className = "answer-option";

    mark.className = "answer-mark";
    mark.textContent = String.fromCharCode(65 + index);

    text.textContent = choice.text;

    button.append(mark, text);

    button.addEventListener("click", function () {
      chooseAnswer(choice, button);
    });

    answerList.appendChild(button);
  });
}


// =======================================
// 回答
// =======================================

function chooseAnswer(choice, selectedButton) {

  if (answered) return;

  answered = true;

  totalScore += choice.score;

  results[currentQuestionIndex] = {
    score: choice.score,
    takeaway: questions[currentQuestionIndex].takeaway
  };


  // 全ボタンを押せなくする
  const buttons =
    Array.from(answerList.querySelectorAll(".answer-option"));

  buttons.forEach(function (button) {
    button.disabled = true;
  });


  // ===================================
  // 選んだ回答によって色を変更
  // ===================================

  if (choice.score === 100) {
    selectedButton.classList.add("selected-best");

    feedback.className = "feedback best";

    document.getElementById("feedback-title").textContent =
      "正解！ かなり工藤を分かってる";

    document.getElementById("feedback-text").textContent =
      "これが工藤の本音に一番近い回答です。";

  } else if (choice.score === 50) {
    selectedButton.classList.add("selected-good");

    feedback.className = "feedback good";

    document.getElementById("feedback-title").textContent =
      "惜しい！ 半分くらい合ってる";

    document.getElementById("feedback-text").textContent =
      "方向性は近いけど、工藤としてはもう少しシンプルに考えてほしいかも。";

  } else if (choice.score === 25) {
    selectedButton.classList.add("selected-mid");

    feedback.className = "feedback mid";

    document.getElementById("feedback-title").textContent =
      "ちょっと深読みしすぎかも";

    document.getElementById("feedback-text").textContent =
      "工藤の考え方とは少しズレています。もう少しそのまま受け取るのがポイント。";

  } else {
    selectedButton.classList.add("selected-low");

    feedback.className = "feedback low";

    document.getElementById("feedback-title").textContent =
      "それはだいぶ違う笑";

    document.getElementById("feedback-text").textContent =
      "工藤の本音とはかなり離れています。";
  }


  // ===================================
  // タグ
  // ===================================

  const traitRow = document.getElementById("trait-row");

  traitRow.replaceChildren();

  const scoreTag = document.createElement("span");
  scoreTag.className = "trait-tag";
  scoreTag.textContent = "この回答：" + choice.score + "点";

  const hintTag = document.createElement("span");
  hintTag.className = "trait-tag";
  hintTag.textContent =
    questions[currentQuestionIndex].takeaway;

  traitRow.append(scoreTag, hintTag);


  feedback.hidden = false;

  nextButton.disabled = false;


  const answeredCount = currentQuestionIndex + 1;

  document.getElementById("score-count").textContent =
    "理解度 " +
    Math.round(totalScore / answeredCount) +
    "%";


  feedback.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });
}


// =======================================
// 結果の文章
// =======================================

function getResultCopy(finalScore) {

  if (finalScore >= 90) {
    return {
      rank: "工藤マスター",

      message:
        "かなり分かってます。言葉を必要以上に深読みせず、放っておくところとちゃんと向き合うところのバランスまでほぼ完璧。工藤のサバサバした部分だけじゃなく、その奥にある考え方まで理解できているレベルです。",

      comment:
        "いや、普通にすごい。俺より俺のこと分かってる可能性ある。"
    };
  }


  if (finalScore >= 70) {
    return {
      rank: "だいぶ分かってる",

      message:
        "かなり工藤のことを理解しています。基本的な考え方や距離感はバッチリ。ただ、たまに「そこはそんな深く考えてないよ」ってところまで考えすぎちゃうかも。",

      comment:
        "うん、だいぶ分かってる。あとちょっとで俺マスター。"
    };
  }


  if (finalScore >= 50) {
    return {
      rank: "まあまあ分かってる",

      message:
        "工藤のことはそれなりに理解しているけど、ときどき考えすぎてすれ違ってしまうタイプかも。工藤は意外と「言ったことがそのまま本音」なことも多め。深読みしすぎないことが攻略のポイントです。",

      comment:
        "惜しい。俺そんな複雑じゃないぞ。もうちょいシンプルに考えてくれ。"
    };
  }


  if (finalScore >= 30) {
    return {
      rank: "まだ工藤を読めてない",

      message:
        "ちょっとすれ違ってるかも。良かれと思ってしたことが、工藤からすると「いや、そこまでしなくていいよ」になりがち。サバサバしているので、必要以上に察しようとするより普通に聞いた方が早いです。",

      comment:
        "考えすぎ考えすぎ。分かんなかったら普通に聞いてくれればいい。"
    };
  }


  return {
    rank: "お前、俺のこと誰だと思ってる？",

    message:
      "残念ながら工藤の思考とはかなりズレている模様。もしかすると「男心ってこうでしょ？」というイメージで考えすぎているかもしれません。工藤攻略のコツはもっとシンプル。言う、聞く、解決したら引きずらない。",

    comment:
      "いや誰の診断してたんだよ笑"
  };
}


// =======================================
// 結果表示
// =======================================

function renderResult() {

  const finalScore =
    Math.round(totalScore / questions.length);

  const copy =
    getResultCopy(finalScore);


  document.getElementById("result-score").textContent =
    finalScore + "%";

  document.getElementById("result-rank").textContent =
    copy.rank;

  document.getElementById("result-message").textContent =
    copy.message;

  document.getElementById("kudo-comment-text").textContent =
    copy.comment;


  // ===================================
  // 5問振り返り
  // ===================================

  const reviewList =
    document.getElementById("review-list");

  reviewList.replaceChildren();


  questions.forEach(function (question, index) {

    const item =
      document.createElement("div");

    const number =
      document.createElement("span");

    const body =
      document.createElement("div");

    const title =
      document.createElement("strong");

    const takeaway =
      document.createElement("small");

    const result =
      document.createElement("span");


    const answerResult =
      results[index];


    item.className =
      "review-item";

    number.className =
      "review-number";

    number.textContent =
      index + 1;


    title.textContent =
      question.category;


    takeaway.textContent =
      question.takeaway;


    body.append(
      title,
      takeaway
    );


    result.className =
      "review-result";

    result.textContent =
      answerResult
        ? answerResult.score + "点"
        : "－";


    item.append(
      number,
      body,
      result
    );


    reviewList.appendChild(
      item
    );
  });


  showOnly(resultPanel);
}


// =======================================
// ゲーム開始
// =======================================

function startGame() {

  currentQuestionIndex = 0;
  totalScore = 0;
  results = [];

  renderQuestion();

  showOnly(quizPanel);
}


// =======================================
// イベント
// =======================================

startButton.addEventListener(
  "click",
  startGame
);


restartButton.addEventListener(
  "click",
  startGame
);


backProfileButton.addEventListener(
  "click",
  function () {
    showOnly(introPanel);
  }
);


nextButton.addEventListener(
  "click",
  function () {

    if (!answered) return;


    if (
      currentQuestionIndex ===
      questions.length - 1
    ) {

      renderResult();

      return;
    }


    currentQuestionIndex += 1;

    renderQuestion();


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
);