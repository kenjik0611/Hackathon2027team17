/* =========================================================
   PUBLIC SPACE MORAL CHECKER
   publicSpace.js

   公共モラル編
   ・全5問 / 4択
   ・回答後のコメント画面なし
   ・選択したら即次の問題
   ・Q5回答後に結果発表
========================================================= */


/* =========================================================
   1. 問題データ
========================================================= */

const questions = [

  /* =========================
     QUESTION 1
  ========================= */
  {
    category: "🚉 駅・落とし物",
    focus: "MORAL CHECK",
    icon: "👛",

    title: "目の前で財布が落ちた。でも電車はあと1分。",

    situation:
      "駅のホームを歩いていると、前を歩いていた人が財布を落としました。本人は気づかないまま先へ進んでいます。一方、あなたが乗りたい電車はあと1分で発車します。逃すと次の電車は約10分後です。",

    prompt:
      "あなたなら、どう行動する？",

    image: "images/q1.webp",

    answers: [
      {
        text:
          "財布を拾って本人を追いかけ、直接渡す。電車に間に合わなくても仕方ない。",

        score: {
          moral: 4,
          care: 4,
          judgment: 3
        }
      },

      {
        text:
          "すぐ近くの駅員に財布を渡して、自分は予定していた電車に乗る。",

        score: {
          moral: 4,
          care: 3,
          judgment: 4
        }
      },

      {
        text:
          "財布を拾って自分が持っておき、電車に乗ったあとで交番へ届ける。",

        score: {
          moral: 2,
          care: 2,
          judgment: 1
        }
      },

      {
        text:
          "自分が落としたわけではないので、そのまま電車に乗る。",

        score: {
          moral: 0,
          care: 0,
          judgment: 1
        }
      }
    ]
  },


  /* =========================
     QUESTION 2
  ========================= */
  {
    category: "🚃 電車",
    focus: "CONSIDERATION CHECK",
    icon: "💺",

    title: "目の前に、席を必要としていそうな人が。",

    situation:
      "帰宅時間帯の電車であなたは座っています。途中の駅から、杖を持った高齢の方が乗ってきて目の前に立ちました。車内は混んでいて、近くに空席はありません。ただ、あなた自身も一日中歩き回ってかなり疲れています。",

    prompt:
      "こんなとき、あなたならどうする？",

    image: "images/q2.webp",

    answers: [
      {
        text:
          "すぐに立ち上がって『どうぞ』と声をかけ、席を譲る。",

        score: {
          moral: 4,
          care: 4,
          judgment: 4
        }
      },

      {
        text:
          "少し様子を見て、つらそうなら『座りますか？』と声をかける。",

        score: {
          moral: 3,
          care: 4,
          judgment: 4
        }
      },

      {
        text:
          "自分もかなり疲れているので座り続ける。ただし周囲の様子は気にしておく。",

        score: {
          moral: 2,
          care: 2,
          judgment: 3
        }
      },

      {
        text:
          "優先席ではないので、自分には関係ないと思ってスマホを見続ける。",

        score: {
          moral: 1,
          care: 0,
          judgment: 1
        }
      }
    ]
  },


  /* =========================
     QUESTION 3
  ========================= */
  {
    category: "🏙️ 街中",
    focus: "MORAL CHECK",
    icon: "🗑️",

    title: "友達がゴミを植え込みに。あなたはどうする？",

    situation:
      "友達と街を歩いています。飲み終わったカップを捨てようとしましたが、近くにゴミ箱がありません。すると友達が『どうせ誰か片付けるでしょ』と言って、カップを植え込みの陰に置きました。",

    prompt:
      "あなたなら、その場でどうする？",

    image: "images/q3.webp",

    answers: [
      {
        text:
          "『それはやめよう』と伝えて、友達にカップを持って帰ってもらう。",

        score: {
          moral: 4,
          care: 4,
          judgment: 4
        }
      },

      {
        text:
          "自分がカップを拾い、『俺が持っておくよ』と言って持ち帰る。",

        score: {
          moral: 4,
          care: 4,
          judgment: 3
        }
      },

      {
        text:
          "少し気になるが、空気を悪くしたくないので何も言わない。",

        score: {
          moral: 1,
          care: 2,
          judgment: 2
        }
      },

      {
        text:
          "目立たない場所なら特に問題ないと思い、そのままにする。",

        score: {
          moral: 0,
          care: 0,
          judgment: 0
        }
      }
    ]
  },


  /* =========================
     QUESTION 4
  ========================= */
  {
    category: "🗺️ 駅・公共空間",
    focus: "JUDGMENT CHECK",
    icon: "🌍",

    title: "困っている人。でも自分も待ち合わせギリギリ。",

    situation:
      "大きな駅を歩いていると、券売機の前で外国人旅行者が困った様子で路線図とスマートフォンを何度も見比べています。周囲に駅員は見当たりません。一方、あなたは友達との待ち合わせ時刻まであと3分です。",

    prompt:
      "あなたならどう行動する？",

    image: "images/q4.webp",

    answers: [
      {
        text:
          "『Can I help you?』と声をかけ、分かる範囲で一緒に確認する。",

        score: {
          moral: 4,
          care: 4,
          judgment: 3
        }
      },

      {
        text:
          "近くの案内所や駅員の場所を探して教え、必要ならそこまで案内する。",

        score: {
          moral: 4,
          care: 4,
          judgment: 4
        }
      },

      {
        text:
          "自分も急いでいるので通り過ぎる。駅なら誰かが助けるだろうと思う。",

        score: {
          moral: 1,
          care: 1,
          judgment: 2
        }
      },

      {
        text:
          "急いでいるが放っておけないので、待ち合わせに遅れてでも目的地まで一緒についていく。",

        score: {
          moral: 3,
          care: 4,
          judgment: 1
        }
      }
    ]
  },


  /* =========================
     QUESTION 5
  ========================= */
  {
    category: "🎬 映画館",
    focus: "TOTAL MORAL CHECK",
    icon: "🍿",

    title: "上映中、隣の人のおしゃべりが止まらない。",

    situation:
      "楽しみにしていた映画を観ています。しかし隣の2人が上映中も小声で会話を続けています。あなた以外の観客も何度か気にしている様子です。映画はまだ1時間以上残っています。",

    prompt:
      "あなたならどう対応する？",

    image: "images/q5.webp",

    answers: [
      {
        text:
          "感情的にならないよう、小声で『すみません、少し静かにしてもらえますか』と伝える。",

        score: {
          moral: 4,
          care: 4,
          judgment: 4
        }
      },

      {
        text:
          "自分から注意せず、状況が続くようならスタッフに相談する。",

        score: {
          moral: 4,
          care: 3,
          judgment: 4
        }
      },

      {
        text:
          "気になるけれど、トラブルになるのが嫌なので最後まで我慢する。",

        score: {
          moral: 2,
          care: 2,
          judgment: 2
        }
      },

      {
        text:
          "腹が立ったので、大きめの声で『うるさいんだけど！』と言う。",

        score: {
          moral: 1,
          care: 0,
          judgment: 0
        }
      }
    ]
  }

];


/* =========================================================
   2. 状態管理
========================================================= */

let currentQuestionIndex = 0;

let scores = {
  moral: 0,
  care: 0,
  judgment: 0
};


/* =========================================================
   3. HTML要素
========================================================= */

const startScreen =
  document.getElementById("start-screen");

const quizScreen =
  document.getElementById("quiz-screen");

const resultScreen =
  document.getElementById("result-screen");


const startButton =
  document.getElementById("start-button");

const retryButton =
  document.getElementById("retry-button");


const currentQuestionNumber =
  document.getElementById("current-question-number");

const totalQuestionNumber =
  document.getElementById("total-question-number");

const progressPercent =
  document.getElementById("progress-percent");

const progressBar =
  document.getElementById("progress-bar");


const questionCategory =
  document.getElementById("question-category");

const questionFocus =
  document.getElementById("question-focus");

const questionTitle =
  document.getElementById("question-title");

const questionSituation =
  document.getElementById("question-situation");

const questionPrompt =
  document.getElementById("question-prompt");

const answerList =
  document.getElementById("answer-list");


const scenarioImage =
  document.getElementById("scenario-image");

const imagePlaceholder =
  document.getElementById("image-placeholder");

const placeholderIcon =
  document.getElementById("placeholder-icon");

const sceneNumber =
  document.getElementById("scene-number");


/* 結果画面 */

const overallScoreElement =
  document.getElementById("overall-score");

const overallRank =
  document.getElementById("overall-rank");

const overallTitle =
  document.getElementById("overall-title");

const overallComment =
  document.getElementById("overall-comment");


const moralScoreElement =
  document.getElementById("moral-score");

const careScoreElement =
  document.getElementById("care-score");

const judgmentScoreElement =
  document.getElementById("judgment-score");


const moralBar =
  document.getElementById("moral-bar");

const careBar =
  document.getElementById("care-bar");

const judgmentBar =
  document.getElementById("judgment-bar");


const typeIcon =
  document.getElementById("type-icon");

const typeName =
  document.getElementById("type-name");

const typeDescription =
  document.getElementById("type-description");

const typeComment =
  document.getElementById("type-comment");


const finalAnalysis =
  document.getElementById("final-analysis");


/* =========================================================
   4. 画面切り替え
========================================================= */

function showScreen(screen) {

  const screens = [
    startScreen,
    quizScreen,
    resultScreen
  ];

  screens.forEach(item => {
    item.classList.remove("active");
  });

  screen.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   5. 診断開始
========================================================= */

function startQuiz() {

  currentQuestionIndex = 0;

  scores = {
    moral: 0,
    care: 0,
    judgment: 0
  };

  moralBar.style.width = "0%";
  careBar.style.width = "0%";
  judgmentBar.style.width = "0%";

  showScreen(quizScreen);

  renderQuestion();
}


/* =========================================================
   6. 問題表示
========================================================= */

function renderQuestion() {

  const question =
    questions[currentQuestionIndex];

  const displayNumber =
    currentQuestionIndex + 1;


  currentQuestionNumber.textContent =
    displayNumber;

  totalQuestionNumber.textContent =
    questions.length;

  sceneNumber.textContent =
    String(displayNumber).padStart(2, "0");


  /* 進捗 */

  const progress =
    Math.round(
      (displayNumber / questions.length) * 100
    );

  progressPercent.textContent =
    `${progress}%`;

  progressBar.style.width =
    `${progress}%`;


  /* 問題内容 */

  questionCategory.textContent =
    question.category;

  questionFocus.textContent =
    question.focus;

  questionTitle.textContent =
    question.title;

  questionSituation.textContent =
    question.situation;

  questionPrompt.textContent =
    question.prompt;

  placeholderIcon.textContent =
    question.icon;


  /* 画像 */

  setScenarioImage(question);


  /* 選択肢 */

  answerList.innerHTML = "";

  const letters =
    ["A", "B", "C", "D"];


  question.answers.forEach(
    (answer, index) => {

      const button =
        document.createElement("button");

      button.type = "button";

      button.className =
        "answer-button";

      button.innerHTML = `
        <span class="answer-letter">
          ${letters[index]}
        </span>

        <span class="answer-text">
          ${answer.text}
        </span>
      `;


      button.addEventListener(
        "click",
        () => selectAnswer(index)
      );


      answerList.appendChild(button);
    }
  );


  /* 問題が切り替わった感じを出す */

  const questionCard =
    document.getElementById("question-card");

  questionCard.animate(
    [
      {
        opacity: 0,
        transform: "translateY(12px)"
      },

      {
        opacity: 1,
        transform: "translateY(0)"
      }
    ],
    {
      duration: 300,
      easing: "ease"
    }
  );
}


/* =========================================================
   7. 画像
========================================================= */

function setScenarioImage(question) {

  scenarioImage.classList.remove("visible");

  imagePlaceholder.style.display =
    "flex";

  scenarioImage.alt =
    `${question.title}のシチュエーション画像`;


  scenarioImage.onload = () => {

    scenarioImage.classList.add("visible");

    imagePlaceholder.style.display =
      "none";
  };


  scenarioImage.onerror = () => {

    scenarioImage.classList.remove("visible");

    imagePlaceholder.style.display =
      "flex";
  };


  scenarioImage.src =
    question.image;
}


/* =========================================================
   8. 回答

   ★ここが今回の重要ポイント
   コメント画面を挟まず即次へ
========================================================= */

function selectAnswer(answerIndex) {

  const question =
    questions[currentQuestionIndex];

  const answer =
    question.answers[answerIndex];


  /* 裏側で採点 */

  scores.moral +=
    answer.score.moral;

  scores.care +=
    answer.score.care;

  scores.judgment +=
    answer.score.judgment;


  /*
    Q1〜Q4
    → 即次の問題

    Q5
    → 即結果発表
  */

  if (
    currentQuestionIndex <
    questions.length - 1
  ) {

    currentQuestionIndex++;

    renderQuestion();

  } else {

    showResult();
  }
}


/* =========================================================
   9. スコア計算

   各軸
   最大20点 → 100点換算

   総合：
   モラル     50%
   思いやり   25%
   状況判断   25%
========================================================= */

function calculateScores() {

  const maxPerAxis =
    questions.length * 4;


  const moral =
    Math.round(
      (scores.moral / maxPerAxis) * 100
    );


  const care =
    Math.round(
      (scores.care / maxPerAxis) * 100
    );


  const judgment =
    Math.round(
      (scores.judgment / maxPerAxis) * 100
    );


  const overall =
    Math.round(
      moral * 0.50 +
      care * 0.25 +
      judgment * 0.25
    );


  return {
    moral,
    care,
    judgment,
    overall
  };
}


/* =========================================================
   10. 総合ランク
========================================================= */

function getOverallResult(score) {

  if (score >= 90) {

    return {
      rank: "EXCELLENT",
      title: "公共モラル、ほぼ完璧！",

      comment:
        "あなたは公共のルールを守るだけでなく、その場にいる人の気持ちや状況まで自然に考えられるタイプです。『自分が正しいか』だけではなく、『みんなが気持ちよく過ごせるか』まで視野に入れられるのが大きな強みです。"
    };
  }


  if (score >= 80) {

    return {
      rank: "GREAT",
      title: "かなりのモラル上級者！",

      comment:
        "基本的な公共モラルはかなり高めです。ルール、周囲への配慮、その場での判断をバランスよく使えている傾向があります。迷う場面でも、自分だけでなく周囲への影響まで考えられるタイプです。"
    };
  }


  if (score >= 65) {

    return {
      rank: "GOOD",
      title: "モラル感覚はいい感じ！",

      comment:
        "基本的なマナーや公共のルールはしっかり意識できています。一方で、状況によっては自分の都合やその場の空気を優先することもありそうです。あと一歩だけ周囲の立場を想像すると、さらにスマートな判断ができそうです。"
    };
  }


  if (score >= 50) {

    return {
      rank: "KEEP GOING",
      title: "モラル力、まだまだ伸びる！",

      comment:
        "あなたは常にルールを最優先するというより、そのときの状況や自分の感覚を大切にする傾向がありそうです。それ自体が悪いわけではありませんが、公共の場では『自分以外の人はどう感じるか』を一度考えるだけで判断が大きく変わります。"
    };
  }


  return {
    rank: "CHALLENGE",
    title: "かなりの自由人かも！？",

    comment:
      "あなたは周囲のルールや一般的なマナーより、自分自身の感覚を優先する場面が多いかもしれません。公共空間では、自分には小さな行動でも誰かにとっては大きな迷惑になることがあります。逆の立場だったらどう感じるかを考えてみると、新しい発見がありそうです。"
  };
}


/* =========================================================
   11. 9タイプ診断
========================================================= */

function getMoralType(result) {

  const {
    moral,
    care,
    judgment,
    overall
  } = result;


  /* 1 */
  if (
    moral >= 85 &&
    care >= 85 &&
    judgment >= 85
  ) {

    return {
      icon: "👑",

      name:
        "モラルマスター",

      description:
        "モラル・思いやり・状況判断のすべてが高水準。ルールをただ守るだけではなく、その場にいる人や状況まで自然に考えられる万能型です。",

      comment:
        "あなたがいるだけで、公共空間がちょっと平和。"
    };
  }


  /* 2 */
  if (
    overall >= 75 &&
    Math.max(moral, care, judgment) -
    Math.min(moral, care, judgment) <= 15
  ) {

    return {
      icon: "⚖️",

      name:
        "バランスモラリスト",

      description:
        "3つの能力をバランスよく持つ安定型。極端な判断が少なく、その場の空気を読みながら無理のない選択ができます。",

      comment:
        "迷ったときも、だいたい“ちょうどいい答え”に着地する。"
    };
  }


  /* 3 */
  if (
    moral >= 75 &&
    care >= 75 &&
    judgment < 75
  ) {

    return {
      icon: "🤝",

      name:
        "気配りモラリスト",

      description:
        "『正しいこと』と『人への優しさ』をどちらも大切にするタイプ。誰かが困っている状況では自然と行動に移しやすい傾向があります。",

      comment:
        "ちゃんとしてる。そして、ちゃんと優しい。"
    };
  }


  /* 4 */
  if (
    moral >= 75 &&
    judgment >= 75 &&
    care < 75
  ) {

    return {
      icon: "🛡️",

      name:
        "堅実モラリスト",

      description:
        "ルールを理解したうえで、その場に合った現実的な判断ができるタイプ。感情だけで動かず、トラブルを避けながら解決策を考える力があります。",

      comment:
        "派手じゃない。でも判断が堅い。"
    };
  }


  /* 5 */
  if (
    moral >= care &&
    moral >= judgment &&
    moral >= 65
  ) {

    return {
      icon: "📚",

      name:
        "ルール優等生",

      description:
        "公共のルールや基本的なマナーへの意識が強いタイプ。『やっていいこと・悪いこと』の線引きをしっかり持っています。",

      comment:
        "ルールはバッチリ。次はその先の気配りへ。"
    };
  }


  /* 6 */
  if (
    care > moral &&
    care >= judgment &&
    care >= 65
  ) {

    return {
      icon: "❤️",

      name:
        "思いやりヒーロー",

      description:
        "ルールそのもの以上に、人の気持ちや困っている人への配慮を大切にするタイプ。誰かのためなら少しくらい自分が損をしても動ける優しさがあります。",

      comment:
        "困っている人を見つけるセンサー、かなり高性能。"
    };
  }


  /* 7 */
  if (
    judgment > moral &&
    judgment > care &&
    judgment >= 65
  ) {

    return {
      icon: "🧠",

      name:
        "スマート判断型",

      description:
        "マニュアル通りに動くより、その場の状況を見ながら最適な行動を考えるタイプ。臨機応変な対応やトラブル回避が得意です。",

      comment:
        "マニュアルより現場を見る。立ち回り上手。"
    };
  }


  /* 8 */
  if (
    care >= 50 &&
    moral < 60
  ) {

    return {
      icon: "🌿",

      name:
        "やさしい自由人",

      description:
        "人への優しさはしっかり持っている一方、公共ルールや一般的なマナーには少し自由なところがあるタイプです。悪気なくやってしまう行動に少し注意すると一気にレベルアップできそうです。",

      comment:
        "人には優しい。ルールにも、あとちょっとだけ優しく。"
    };
  }


  /* 9 */
  return {
    icon: "🔥",

    name:
      "我が道チャレンジャー",

    description:
      "周囲の空気や一般的なルールより、自分の感覚を信じて行動するタイプ。自由度は高めですが、公共の場では少しだけ周囲を見る意識を足すと印象が大きく変わります。",

    comment:
      "我が道を行く。でも公共空間では周りも一緒に歩いてるぞ。"
  };
}


/* =========================================================
   12. 最終総評
========================================================= */

function getFinalAnalysis(result) {

  const values = [
    {
      name: "モラル・常識",
      value: result.moral
    },
    {
      name: "思いやり・配慮",
      value: result.care
    },
    {
      name: "状況判断",
      value: result.judgment
    }
  ];


  const sorted =
    [...values].sort(
      (a, b) => b.value - a.value
    );


  const strongest =
    sorted[0];

  const weakest =
    sorted[2];


  let strongText = "";

  let weakText = "";


  if (strongest.name === "モラル・常識") {

    strongText =
      "特に強く表れたのは「モラル・常識」です。公共のルールや基本的なマナーを基準にして、行動の良し悪しを判断する力が高い傾向があります。";
  }


  if (strongest.name === "思いやり・配慮") {

    strongText =
      "特に強く表れたのは「思いやり・配慮」です。自分の都合だけではなく、相手がどう感じるか、困っている人はいないかを自然に考える傾向があります。";
  }


  if (strongest.name === "状況判断") {

    strongText =
      "特に強く表れたのは「状況判断」です。単純にルールだけで判断するのではなく、その場の状況を見ながら現実的な選択肢を考える力があります。";
  }


  if (weakest.name === "モラル・常識") {

    weakText =
      "一方で、公共のルールや一般的なマナーをもう少し意識すると、判断のバランスがさらに良くなりそうです。";
  }


  if (weakest.name === "思いやり・配慮") {

    weakText =
      "一方で、『自分が正しいか』だけではなく『相手からはどう見えるか』まで考えてみると、さらに思いやりのある判断につながりそうです。";
  }


  if (weakest.name === "状況判断") {

    weakText =
      "一方で、正しい行動でも状況によっては別の方法が適していることがあります。周囲の状況や自分への負担まで含めて考えると、さらにスマートな判断ができそうです。";
  }


  return `
    ${strongText}

    ${weakText}

    もちろん、公共の場での行動にいつも一つだけの正解があるわけではありません。
    大切なのは、自分・相手・周囲の3つの視点を持ちながら、
    その場に合った行動を考えること。
    今回の5問から見えたあなたの判断傾向を、
    ちょっとだけ普段の生活でも意識してみてください。
  `;
}


/* =========================================================
   13. 結果表示
========================================================= */

function showResult() {

  const result =
    calculateScores();


  const overallResult =
    getOverallResult(result.overall);


  const moralType =
    getMoralType(result);


  showScreen(resultScreen);


  /* 総合点 */

  animateNumber(
    overallScoreElement,
    result.overall,
    1000
  );


  overallRank.textContent =
    overallResult.rank;


  overallTitle.textContent =
    overallResult.title;


  overallComment.textContent =
    overallResult.comment;


  /* 円グラフ */

  const ring =
    document.querySelector(".score-ring");


  const degree =
    result.overall * 3.6;


  setTimeout(() => {

    ring.style.background = `
      conic-gradient(
        #ffffff 0deg,
        #ffffff ${degree}deg,
        rgba(255,255,255,0.18) ${degree}deg
      )
    `;

  }, 100);


  /* 3軸 */

  animateNumber(
    moralScoreElement,
    result.moral,
    900
  );


  animateNumber(
    careScoreElement,
    result.care,
    900
  );


  animateNumber(
    judgmentScoreElement,
    result.judgment,
    900
  );


  setTimeout(() => {

    moralBar.style.width =
      `${result.moral}%`;

    careBar.style.width =
      `${result.care}%`;

    judgmentBar.style.width =
      `${result.judgment}%`;

  }, 200);


  /* タイプ */

  typeIcon.textContent =
    moralType.icon;


  typeName.textContent =
    moralType.name;


  typeDescription.textContent =
    moralType.description;


  typeComment.textContent =
    `「${moralType.comment}」`;


  /* 最後の長めコメント */

  finalAnalysis.textContent =
    getFinalAnalysis(result);
}


/* =========================================================
   14. 数字アニメーション
========================================================= */

function animateNumber(
  element,
  target,
  duration
) {

  const startTime =
    performance.now();


  function update(currentTime) {

    const elapsed =
      currentTime - startTime;


    const progress =
      Math.min(
        elapsed / duration,
        1
      );


    const eased =
      1 -
      Math.pow(
        1 - progress,
        3
      );


    const value =
      Math.round(
        target * eased
      );


    element.textContent =
      value;


    if (progress < 1) {

      requestAnimationFrame(update);
    }
  }


  requestAnimationFrame(update);
}


/* =========================================================
   15. もう一度診断
========================================================= */

function retryQuiz() {

  currentQuestionIndex = 0;


  scores = {
    moral: 0,
    care: 0,
    judgment: 0
  };


  moralBar.style.width =
    "0%";


  careBar.style.width =
    "0%";


  judgmentBar.style.width =
    "0%";


  const ring =
    document.querySelector(".score-ring");


  ring.style.background = `
    conic-gradient(
      #ffffff 0deg,
      #ffffff 0deg,
      rgba(255,255,255,0.18) 0deg
    )
  `;


  showScreen(startScreen);
}


/* =========================================================
   16. ボタン
========================================================= */

startButton.addEventListener(
  "click",
  startQuiz
);


retryButton.addEventListener(
  "click",
  retryQuiz
);


/* =========================================================
   17. 初期化
========================================================= */

totalQuestionNumber.textContent =
  questions.length;