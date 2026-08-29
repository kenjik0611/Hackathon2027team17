// =======================================
// 工藤理解度診断
// =======================================


// =======================================
// 問題データ
// =======================================

const questions = [

  // -----------------------------------
  // QUESTION 1
  // -----------------------------------

  {
    question:
      "工藤が明らかにちょっと機嫌悪そう。でも「別に怒ってないよ」と言っています。本音に一番近いのは？",

    choices: [

      {
        text:
          "本当に大したことじゃない。変に深掘りしないでほしい",
        score: 100
      },

      {
        text:
          "本当はめちゃくちゃ怒っている。何度でも理由を聞いてほしい",
        score: 25
      },

      {
        text:
          "自分から言いたくないだけ。全部察して謝ってほしい",
        score: 50
      },

      {
        text:
          "とにかく一人にしてほしい。今日はもう話したくない",
        score: 0
      }

    ]
  },


  // -----------------------------------
  // QUESTION 2
  // -----------------------------------

  {
    question:
      "工藤とちょっとした喧嘩になりました。話しているうちに、もう解決した感じです。このあと工藤が一番望んでいるのは？",

    choices: [

      {
        text:
          "解決したなら終わり。普通にいつも通りに戻りたい",
        score: 100
      },

      {
        text:
          "その日のうちに、もう一度最初から全部話し合いたい",
        score: 25
      },

      {
        text:
          "しばらく気まずい空気を残して反省してほしい",
        score: 0
      },

      {
        text:
          "長文で改めて謝ってほしい",
        score: 50
      }

    ]
  },


  // -----------------------------------
  // QUESTION 3
  // -----------------------------------

  {
    question:
      "工藤が研究や仕事で頑張ったことを話してきました。一番嬉しい反応はどれ？",

    choices: [

      {
        text:
          "「すごいじゃん」と結果だけじゃなく、頑張った部分もちゃんと認める",
        score: 100
      },

      {
        text:
          "とにかく大げさに褒めまくる",
        score: 50
      },

      {
        text:
          "「でももっと上いるでしょ」と次の目標を提示する",
        score: 0
      },

      {
        text:
          "あまり触れず、いつも通り接する",
        score: 25
      }

    ]
  },


  // -----------------------------------
  // QUESTION 4
  // -----------------------------------

  {
    question:
      "工藤が一人で何かに集中しているとき、彼女にはどうしていてほしい？",

    choices: [

      {
        text:
          "必要なときは自分から言うから、基本は自由にしていてほしい",
        score: 100
      },

      {
        text:
          "寂しくならないように、ずっと近くで話しかけてほしい",
        score: 0
      },

      {
        text:
          "何をしているのか定期的に確認してほしい",
        score: 25
      },

      {
        text:
          "完全に無視して、その日は一切関わらないでほしい",
        score: 50
      }

    ]
  },


  // -----------------------------------
  // QUESTION 5
  // -----------------------------------

  {
    question:
      "工藤との関係で一番大切なのは、結局どれだと思う？",

    choices: [

      {
        text:
          "何でも察して、言われる前に行動すること",
        score: 25
      },

      {
        text:
          "ずっと一緒にいて、できるだけ離れないこと",
        score: 50
      },

      {
        text:
          "お互い言いたいことは言って、引きずらず普通に戻れること",
        score: 100
      },

      {
        text:
          "喧嘩にならないように、嫌なこともなるべく我慢すること",
        score: 0
      }

    ]
  }

];


// =======================================
// HTML要素取得
// =======================================

const startScreen =
  document.getElementById("start-screen");

const questionScreen =
  document.getElementById("question-screen");

const resultScreen =
  document.getElementById("result-screen");


const startBtn =
  document.getElementById("start-btn");

const retryBtn =
  document.getElementById("retry-btn");


const questionNumber =
  document.getElementById("question-number");

const questionCount =
  document.getElementById("question-count");

const questionText =
  document.getElementById("question-text");

const choicesContainer =
  document.getElementById("choices");

const progress =
  document.getElementById("progress");


const scoreElement =
  document.getElementById("score");

const resultRank =
  document.getElementById("result-rank");

const resultMessage =
  document.getElementById("result-message");

const kudoCommentText =
  document.getElementById("kudo-comment-text");


// =======================================
// 現在の状態
// =======================================

let currentQuestion = 0;

let totalScore = 0;


// =======================================
// 診断スタート
// =======================================

startBtn.addEventListener(
  "click",
  startQuiz
);


function startQuiz() {

  currentQuestion = 0;

  totalScore = 0;


  startScreen.classList.remove(
    "active"
  );

  resultScreen.classList.remove(
    "active"
  );

  questionScreen.classList.add(
    "active"
  );


  showQuestion();

}


// =======================================
// 問題表示
// =======================================

function showQuestion() {

  const question =
    questions[currentQuestion];


  // QUESTION 01
  questionNumber.textContent =
    `QUESTION ${String(
      currentQuestion + 1
    ).padStart(2, "0")}`;


  // 1 / 5
  questionCount.textContent =
    `${currentQuestion + 1} / ${questions.length}`;


  // プログレスバー
  const percentage =
    (
      (currentQuestion + 1)
      / questions.length
    ) * 100;


  progress.style.width =
    `${percentage}%`;


  // 問題文
  questionText.textContent =
    question.question;


  // 前の選択肢削除
  choicesContainer.innerHTML =
    "";


  // ===================================
  // 選択肢をランダムにする
  // ===================================

  const shuffledChoices =
    [...question.choices]
      .sort(
        () =>
          Math.random() - 0.5
      );


  const letters =
    ["A", "B", "C", "D"];


  shuffledChoices.forEach(
    (choice, index) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "choice-btn";


      button.innerHTML = `

        <span class="choice-letter">
          ${letters[index]}
        </span>

        <span>
          ${choice.text}
        </span>

      `;


      button.addEventListener(
        "click",
        () =>
          selectChoice(
            choice.score
          )
      );


      choicesContainer.appendChild(
        button
      );

    }
  );

}


// =======================================
// 回答したとき
// =======================================

function selectChoice(score) {

  totalScore += score;

  currentQuestion++;


  if (
    currentQuestion
    < questions.length
  ) {

    showQuestion();

  }

  else {

    showResult();

  }

}


// =======================================
// 結果表示
// =======================================

function showResult() {

  questionScreen.classList.remove(
    "active"
  );

  resultScreen.classList.add(
    "active"
  );


  // 500点満点を100%に変換
  const finalScore =
    Math.round(
      totalScore
      / questions.length
    );


  scoreElement.textContent =
    finalScore;


  // ===================================
  // 90%以上
  // ===================================

  if (finalScore >= 90) {

    resultRank.textContent =
      "工藤マスター";

    resultMessage.textContent =
      "かなり分かってます。言葉を必要以上に深読みせず、放っておくところとちゃんと向き合うところのバランスまでほぼ完璧。工藤のサバサバした部分だけじゃなく、その奥にある考え方まで理解できているレベルです。";

    kudoCommentText.textContent =
      "いや、普通にすごい。俺より俺のこと分かってる可能性ある。";


  }


  // ===================================
  // 70%以上
  // ===================================

  else if (finalScore >= 70) {

    resultRank.textContent =
      "だいぶ分かってる";

    resultMessage.textContent =
      "かなり工藤のことを理解しています。基本的な考え方や距離感はバッチリ。ただ、たまに『そこはそんな深く考えてないよ』ってところまで考えすぎちゃうかも。";

    kudoCommentText.textContent =
      "うん、だいぶ分かってる。あとちょっとで俺マスター。";


  }


  // ===================================
  // 50%以上
  // ===================================

  else if (finalScore >= 50) {

    resultRank.textContent =
      "まあまあ分かってる";

    resultMessage.textContent =
      "工藤のことはそれなりに理解しているけど、ときどき考えすぎてすれ違ってしまうタイプかも。工藤は意外と『言ったことがそのまま本音』なことも多め。深読みしすぎないことが攻略のポイントです。";

    kudoCommentText.textContent =
      "惜しい。俺そんな複雑じゃないぞ。もうちょいシンプルに考えてくれ。";


  }


  // ===================================
  // 30%以上
  // ===================================

  else if (finalScore >= 30) {

    resultRank.textContent =
      "まだ工藤を読めてない";

    resultMessage.textContent =
      "ちょっとすれ違ってるかも。良かれと思ってしたことが、工藤からすると『いや、そこまでしなくていいよ』になりがち。サバサバしているので、必要以上に察しようとするより普通に聞いた方が早いです。";

    kudoCommentText.textContent =
      "考えすぎ考えすぎ。分かんなかったら普通に聞いてくれればいい。";


  }


  // ===================================
  // 30%未満
  // ===================================

  else {

    resultRank.textContent =
      "お前、俺のこと誰だと思ってる？";

    resultMessage.textContent =
      "残念ながら工藤の思考とはかなりズレている模様。もしかすると『男心ってこうでしょ？』というイメージで考えすぎているかもしれません。工藤攻略のコツはもっとシンプル。言う、聞く、解決したら引きずらない。";

    kudoCommentText.textContent =
      "いや誰の診断してたんだよ笑";


  }


  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


// =======================================
// もう一度
// =======================================

retryBtn.addEventListener(
  "click",
  () => {

    currentQuestion = 0;

    totalScore = 0;


    resultScreen.classList.remove(
      "active"
    );

    startScreen.classList.add(
      "active"
    );


    window.scrollTo({

      top: 0,

      behavior: "smooth"

    });

  }
);