// ==========================================================
// MORAL CHECKER
// Hackathon Prototype
// ==========================================================


// ==========================================================
// 1. VALUE FACTORS
// ==========================================================

const factors = [

  {
    name: "共感性",
    english: "EMPATHY",
    icon: "♡"
  },

  {
    name: "誠実性",
    english: "INTEGRITY",
    icon: "◈"
  },

  {
    name: "規範意識",
    english: "NORM",
    icon: "⚖"
  },

  {
    name: "判断力",
    english: "JUDGMENT",
    icon: "◎"
  },

  {
    name: "責任感",
    english: "RESPONSIBILITY",
    icon: "◉"
  },

  {
    name: "思いやり",
    english: "COMPASSION",
    icon: "♡"
  },

  {
    name: "自律性",
    english: "AUTONOMY",
    icon: "↗"
  },

  {
    name: "公正さ",
    english: "FAIRNESS",
    icon: "◇"
  }

];


// ==========================================================
// 2. QUESTIONS
// ==========================================================

const questions = [

  // --------------------------------------------------------
  // QUESTION 1
  // --------------------------------------------------------

  {

    category:
      "日常生活",

    title:
      "落とし物",

    icon:
      "💴",

    text:
      "道を歩いていると、目の前を歩いていた人が1万円札を落としました。その人は気づかず、そのまま歩いていきます。あなたならどうしますか？",

    answers: [

      {

        text:
          "すぐに拾って本人に渡す",

        sub:
          "声をかけ、落としたことを本人に伝える",

        scores:
          [90, 95, 85, 82, 88, 92, 72, 88]

      },

      {

        text:
          "近くの交番に届ける",

        sub:
          "公的な方法を使い、持ち主へ戻るようにする",

        scores:
          [72, 100, 100, 91, 95, 74, 82, 97]

      },

      {

        text:
          "周囲を確認してから判断する",

        sub:
          "状況を整理し、最も適切な行動を考える",

        scores:
          [68, 78, 72, 98, 78, 68, 88, 78]

      },

      {

        text:
          "そのまま通り過ぎる",

        sub:
          "自分には関係のない出来事だと考える",

        scores:
          [28, 38, 32, 48, 28, 30, 86, 38]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 2
  // --------------------------------------------------------

  {

    category:
      "仕事",

    title:
      "同僚のミス",

    icon:
      "💻",

    text:
      "同僚が仕事でミスをしました。まだ上司は気づいておらず、今なら大きな問題になる前に修正できそうです。",

    answers: [

      {

        text:
          "本人に伝えて一緒に修正する",

        sub:
          "本人の成長と問題解決の両方を重視する",

        scores:
          [94, 88, 78, 96, 92, 95, 75, 85]

      },

      {

        text:
          "すぐ上司へ報告する",

        sub:
          "組織として正式に対応することを優先する",

        scores:
          [58, 95, 98, 78, 92, 52, 70, 92]

      },

      {

        text:
          "本人に伝え、修正は本人に任せる",

        sub:
          "必要な情報だけ伝えて本人の責任に委ねる",

        scores:
          [72, 88, 82, 88, 82, 68, 96, 82]

      },

      {

        text:
          "何も言わない",

        sub:
          "自分の担当ではないため関与しない",

        scores:
          [30, 38, 32, 48, 30, 32, 92, 38]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 3
  // --------------------------------------------------------

  {

    category:
      "友人関係",

    title:
      "秘密と約束",

    icon:
      "🤫",

    text:
      "親しい友人から『絶対に誰にも言わないで』と秘密を打ち明けられました。しかし、その内容は別の友人にも大きく関係しています。",

    answers: [

      {

        text:
          "約束を守って誰にも言わない",

        sub:
          "友人との信頼関係を最優先する",

        scores:
          [82, 98, 68, 72, 85, 90, 88, 62]

      },

      {

        text:
          "本人と相談してから必要な人へ伝える",

        sub:
          "秘密と周囲への影響の両方を考える",

        scores:
          [95, 92, 82, 100, 92, 95, 82, 92]

      },

      {

        text:
          "関係する友人には伝える",

        sub:
          "影響を受ける本人の知る権利を優先する",

        scores:
          [72, 68, 78, 82, 78, 68, 88, 98]

      },

      {

        text:
          "信頼できる別の友人へ相談する",

        sub:
          "自分だけで判断せず第三者の意見を聞く",

        scores:
          [78, 48, 58, 72, 60, 75, 55, 65]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 4
  // --------------------------------------------------------

  {

    category:
      "公共空間",

    title:
      "電車の座席",

    icon:
      "🚃",

    text:
      "混雑した電車で座っていると、目の前にかなり疲れている様子の高齢者が立っています。一方で、あなた自身も今日はかなり疲れています。",

    answers: [

      {

        text:
          "すぐに席を譲る",

        sub:
          "自分より相手の負担を優先する",

        scores:
          [100, 86, 86, 75, 82, 100, 66, 86]

      },

      {

        text:
          "相手に必要か確認してから譲る",

        sub:
          "相手の意思を確認した上で行動する",

        scores:
          [96, 90, 82, 100, 86, 96, 82, 92]

      },

      {

        text:
          "自分も疲れているので座り続ける",

        sub:
          "自分自身の状態も大切にする",

        scores:
          [58, 76, 62, 84, 68, 52, 98, 68]

      },

      {

        text:
          "誰か別の人が譲るだろうと思う",

        sub:
          "周囲の判断に任せる",

        scores:
          [42, 48, 48, 52, 32, 48, 58, 52]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 5
  // --------------------------------------------------------

  {

    category:
      "SNS",

    title:
      "友人への誤った批判",

    icon:
      "📱",

    text:
      "SNSで、あなたの友人について事実とは異なる批判が広がっていることに気づきました。友人本人はまだ気づいていないようです。",

    answers: [

      {

        text:
          "すぐSNS上で反論する",

        sub:
          "友人を守るため、自分から積極的に行動する",

        scores:
          [92, 78, 68, 68, 82, 92, 98, 72]

      },

      {

        text:
          "まず友人本人へ確認する",

        sub:
          "事実関係と本人の意向を確認してから行動する",

        scores:
          [92, 96, 82, 100, 92, 92, 88, 96]

      },

      {

        text:
          "SNS運営へ通報する",

        sub:
          "プラットフォームのルールに沿って対応する",

        scores:
          [72, 92, 100, 88, 88, 78, 78, 92]

      },

      {

        text:
          "ネット上の話なので関与しない",

        sub:
          "問題をさらに拡大させないことを優先する",

        scores:
          [48, 68, 62, 78, 48, 48, 88, 58]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 6
  // --------------------------------------------------------

  {

    category:
      "仕事",

    title:
      "仲の良い同僚のルール違反",

    icon:
      "⚠️",

    text:
      "仲の良い同僚が、会社の備品を私的に使用していることを知ってしまいました。本人は『これくらい大丈夫』と言っています。",

    answers: [

      {

        text:
          "すぐ上司へ報告する",

        sub:
          "個人的な関係より組織のルールを優先する",

        scores:
          [48, 96, 100, 78, 92, 48, 82, 98]

      },

      {

        text:
          "まず本人に注意する",

        sub:
          "本人が自分で改善できる機会を作る",

        scores:
          [92, 92, 88, 100, 92, 96, 92, 92]

      },

      {

        text:
          "別の同僚へ相談する",

        sub:
          "第三者の意見を聞いてから判断する",

        scores:
          [78, 78, 72, 88, 72, 78, 62, 82]

      },

      {

        text:
          "少しくらいなら見逃す",

        sub:
          "友人関係を壊さないことを優先する",

        scores:
          [78, 42, 32, 52, 38, 72, 82, 42]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 7
  // --------------------------------------------------------

  {

    category:
      "約束",

    title:
      "30分の遅刻",

    icon:
      "⏰",

    text:
      "友人との待ち合わせに30分ほど遅れそうです。友人はすでに現地へ到着していることが分かっています。",

    answers: [

      {

        text:
          "すぐ謝って到着予定時刻を伝える",

        sub:
          "状況を正直に共有して相手へ配慮する",

        scores:
          [92, 100, 88, 92, 100, 92, 88, 92]

      },

      {

        text:
          "とにかく急いで向かい、着いてから謝る",

        sub:
          "まず到着することを最優先する",

        scores:
          [72, 72, 68, 78, 88, 68, 92, 72]

      },

      {

        text:
          "理由を少し盛って説明する",

        sub:
          "相手を怒らせないことを優先する",

        scores:
          [78, 42, 58, 58, 52, 72, 78, 58]

      },

      {

        text:
          "30分程度なので特に連絡しない",

        sub:
          "そこまで大きな問題ではないと考える",

        scores:
          [38, 38, 42, 48, 32, 38, 82, 42]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 8
  // --------------------------------------------------------

  {

    category:
      "公共空間",

    title:
      "放置されたゴミ",

    icon:
      "🗑️",

    text:
      "公園で、知らない人がゴミをベンチに置いたまま立ち去るところを見ました。周囲には他にも利用者がいます。",

    answers: [

      {

        text:
          "本人を追いかけて声をかける",

        sub:
          "本人自身に責任を持ってもらう",

        scores:
          [72, 88, 98, 82, 88, 68, 100, 98]

      },

      {

        text:
          "自分でゴミ箱へ捨てる",

        sub:
          "トラブルを避けながら問題そのものを解決する",

        scores:
          [96, 88, 92, 92, 92, 100, 78, 88]

      },

      {

        text:
          "公園の管理者へ伝える",

        sub:
          "管理する立場の人へ対応を任せる",

        scores:
          [72, 92, 100, 92, 88, 72, 72, 96]

      },

      {

        text:
          "知らない人なので何もしない",

        sub:
          "自分が関与する必要はないと考える",

        scores:
          [38, 52, 42, 58, 38, 38, 88, 48]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 9
  // --------------------------------------------------------

  {

    category:
      "チーム",

    title:
      "自分だけが高評価",

    icon:
      "🏆",

    text:
      "チームで成功したプロジェクトについて、上司からあなただけが高く評価されました。しかし実際には、他のメンバーの貢献も非常に大きいです。",

    answers: [

      {

        text:
          "他のメンバーの貢献も上司へ伝える",

        sub:
          "成果を正しくチーム全体へ還元する",

        scores:
          [96, 100, 92, 92, 96, 96, 82, 100]

      },

      {

        text:
          "評価は上司の判断なのでそのまま受け取る",

        sub:
          "評価する側の判断を尊重する",

        scores:
          [52, 78, 68, 72, 68, 52, 92, 58]

      },

      {

        text:
          "メンバーには個人的に感謝を伝える",

        sub:
          "公式評価とは別に仲間への感謝を示す",

        scores:
          [88, 82, 72, 82, 78, 92, 88, 72]

      },

      {

        text:
          "次回は仲間が評価されるように調整する",

        sub:
          "長期的なチームバランスを考える",

        scores:
          [92, 88, 82, 96, 92, 92, 92, 96]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 10
  // --------------------------------------------------------

  {

    category:
      "買い物",

    title:
      "レジの会計ミス",

    icon:
      "🛒",

    text:
      "買い物を終えて店を出た後、本来より1000円安く会計されていたことに気づきました。店員側のミスです。",

    answers: [

      {

        text:
          "すぐ店へ戻って伝える",

        sub:
          "正しい金額を支払う",

        scores:
          [82, 100, 100, 88, 96, 82, 88, 100]

      },

      {

        text:
          "次回店へ行ったときに伝える",

        sub:
          "急ぎではないが、間違い自体は訂正する",

        scores:
          [78, 92, 92, 88, 88, 78, 88, 92]

      },

      {

        text:
          "店側のミスなのでそのままにする",

        sub:
          "自分には責任がないと考える",

        scores:
          [48, 48, 42, 68, 42, 48, 92, 52]

      },

      {

        text:
          "金額がもっと大きければ伝える",

        sub:
          "問題の大きさによって行動を変える",

        scores:
          [62, 68, 62, 92, 68, 62, 88, 68]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 11
  // --------------------------------------------------------

  {

    category:
      "友人関係",

    title:
      "友人の大きな失敗",

    icon:
      "🫂",

    text:
      "友人が大きな失敗をして落ち込んでいます。ただ、その失敗には友人本人にもかなり責任があるとあなたは感じています。",

    answers: [

      {

        text:
          "まず気持ちに寄り添う",

        sub:
          "反省よりも先に精神的な支えになる",

        scores:
          [100, 78, 62, 72, 68, 100, 72, 68]

      },

      {

        text:
          "改善すべき点を率直に伝える",

        sub:
          "今後同じ失敗をしないことを優先する",

        scores:
          [68, 96, 88, 96, 96, 68, 96, 88]

      },

      {

        text:
          "寄り添った後、一緒に改善策を考える",

        sub:
          "感情への配慮と問題解決の両方を行う",

        scores:
          [100, 96, 88, 100, 96, 100, 88, 92]

      },

      {

        text:
          "本人の問題なので深く関わらない",

        sub:
          "自分自身で乗り越えるべきだと考える",

        scores:
          [42, 68, 62, 72, 58, 38, 100, 62]

      }

    ]

  },


  // --------------------------------------------------------
  // QUESTION 12
  // --------------------------------------------------------

  {

    category:
      "社会",

    title:
      "困っている旅行者",

    icon:
      "🤝",

    text:
      "駅で道に迷って困っている旅行者を見かけました。あなたも急いでおり、乗りたい電車の発車時間が迫っています。",

    answers: [

      {

        text:
          "電車を一本遅らせてでも助ける",

        sub:
          "困っている人を最優先する",

        scores:
          [100, 88, 78, 72, 82, 100, 68, 88]

      },

      {

        text:
          "短時間で分かる範囲だけ教える",

        sub:
          "自分の予定と相手への配慮を両立する",

        scores:
          [92, 92, 82, 100, 92, 92, 92, 92]

      },

      {

        text:
          "駅員の場所を教える",

        sub:
          "自分で全て対応せず適切な人へつなぐ",

        scores:
          [82, 92, 92, 96, 88, 82, 88, 92]

      },

      {

        text:
          "急いでいるので通り過ぎる",

        sub:
          "自分の予定を優先する",

        scores:
          [42, 68, 58, 72, 58, 42, 100, 58]

      }

    ]

  }

];


// ==========================================================
// 3. APP STATE
// ==========================================================

let currentQuestion = 0;

let answeredQuestions = 0;

let totalFactorScores =
  new Array(factors.length).fill(0);


// ==========================================================
// 4. SCREEN ELEMENTS
// ==========================================================

const startScreen =
  document.getElementById("start-screen");

const quizScreen =
  document.getElementById("quiz-screen");

const loadingScreen =
  document.getElementById("loading-screen");

const resultScreen =
  document.getElementById("result-screen");


// ==========================================================
// 5. START BUTTONS
// ==========================================================

const startButtons = [

  document.getElementById(
    "nav-start-button"
  ),

  document.getElementById(
    "hero-start-button"
  ),

  document.getElementById(
    "bottom-start-button"
  )

];


startButtons.forEach(button => {

  button.addEventListener(
    "click",
    startQuiz
  );

});


// ==========================================================
// 6. START QUIZ
// ==========================================================

function startQuiz() {

  currentQuestion = 0;

  answeredQuestions = 0;

  totalFactorScores =
    new Array(
      factors.length
    ).fill(0);


  switchScreen(
    startScreen,
    quizScreen
  );


  createQuestionDots();

  showQuestion();


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// ==========================================================
// 7. SWITCH SCREEN
// ==========================================================

function switchScreen(
  oldScreen,
  newScreen
) {

  oldScreen.classList.remove(
    "active"
  );

  newScreen.classList.add(
    "active"
  );

}


// ==========================================================
// 8. QUESTION DOTS
// ==========================================================

function createQuestionDots() {

  const container =
    document.getElementById(
      "question-dots"
    );


  container.innerHTML = "";


  questions.forEach(
    (question, index) => {

      const dot =
        document.createElement(
          "div"
        );


      dot.className =
        "question-dot";


      dot.innerHTML = `

        <div class="question-dot-number">

          ${
            String(
              index + 1
            ).padStart(
              2,
              "0"
            )
          }

        </div>

      `;


      container.appendChild(
        dot
      );

    }
  );

}


// ==========================================================
// 9. UPDATE QUESTION DOTS
// ==========================================================

function updateQuestionDots() {

  const dots =
    document.querySelectorAll(
      ".question-dot"
    );


  dots.forEach(
    (dot, index) => {

      dot.classList.remove(
        "active",
        "completed"
      );


      if (
        index < currentQuestion
      ) {

        dot.classList.add(
          "completed"
        );

      }


      if (
        index === currentQuestion
      ) {

        dot.classList.add(
          "active"
        );

      }

    }
  );

}


// ==========================================================
// 10. SHUFFLE
// ==========================================================

function shuffle(array) {

  const copiedArray =
    [...array];


  for (
    let i =
      copiedArray.length - 1;

    i > 0;

    i--
  ) {

    const randomIndex =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    const temporary =
      copiedArray[i];


    copiedArray[i] =
      copiedArray[randomIndex];


    copiedArray[randomIndex] =
      temporary;

  }


  return copiedArray;

}


// ==========================================================
// 11. SHOW QUESTION
// ==========================================================

function showQuestion() {

  const question =
    questions[
      currentQuestion
    ];


  // -----------------------------------------
  // question number
  // -----------------------------------------

  document.getElementById(
    "current-question-number"
  ).textContent =
    String(
      currentQuestion + 1
    ).padStart(
      2,
      "0"
    );


  // -----------------------------------------
  // progress
  // -----------------------------------------

  const progress =
    (
      (
        currentQuestion + 1
      )
      /
      questions.length
    )
    *
    100;


  document.getElementById(
    "quiz-progress-fill"
  ).style.width =
    progress + "%";


  // -----------------------------------------
  // question
  // -----------------------------------------

  document.getElementById(
    "question-category"
  ).textContent =
    question.category;


  document.getElementById(
    "question-title"
  ).textContent =
    question.title;


  document.getElementById(
    "question-text"
  ).textContent =
    question.text;


  document.getElementById(
    "scenario-icon"
  ).textContent =
    question.icon;


  updateQuestionDots();


  // -----------------------------------------
  // answers
  // -----------------------------------------

  const answerGrid =
    document.getElementById(
      "answer-grid"
    );


  answerGrid.innerHTML =
    "";


  // ★毎問ランダム化

  const shuffledAnswers =
    shuffle(
      question.answers
    );


  shuffledAnswers.forEach(
    (
      answer,
      displayIndex
    ) => {

      const button =
        document.createElement(
          "button"
        );


      button.className =
        "answer-button";


      const letter =
        [
          "A",
          "B",
          "C",
          "D"
        ][
          displayIndex
        ];


      button.innerHTML = `

        <div class="answer-letter">

          ${letter}

        </div>


        <strong>

          ${answer.text}

        </strong>


        <small>

          ${answer.sub}

        </small>

      `;


      button.addEventListener(
        "click",
        () => {

          selectAnswer(
            answer,
            button
          );

        }
      );


      answerGrid.appendChild(
        button
      );

    }
  );


  animateQuestion();

}


// ==========================================================
// 12. QUESTION ANIMATION
// ==========================================================

function animateQuestion() {

  const scenario =
    document.getElementById(
      "scenario-panel"
    );


  const answers =
    document.getElementById(
      "answer-grid"
    );


  scenario.animate(

    [

      {
        opacity: 0,
        transform:
          "translateX(-20px)"
      },

      {
        opacity: 1,
        transform:
          "translateX(0)"
      }

    ],

    {

      duration: 500,

      easing:
        "ease-out"

    }

  );


  answers.animate(

    [

      {
        opacity: 0,
        transform:
          "translateX(20px)"
      },

      {
        opacity: 1,
        transform:
          "translateX(0)"
      }

    ],

    {

      duration: 500,

      easing:
        "ease-out"

    }

  );

}


// ==========================================================
// 13. SELECT ANSWER
// ==========================================================

function selectAnswer(
  answer,
  selectedButton
) {

  const allButtons =
    document.querySelectorAll(
      ".answer-button"
    );


  allButtons.forEach(
    button => {

      button.disabled =
        true;

    }
  );


  selectedButton.classList.add(
    "selected"
  );


  // -----------------------------------------
  // add scores
  // -----------------------------------------

  answer.scores.forEach(
    (
      score,
      factorIndex
    ) => {

      totalFactorScores[
        factorIndex
      ] += score;

    }
  );


  answeredQuestions++;


  // -----------------------------------------
  // selected effect
  // -----------------------------------------

  selectedButton.animate(

    [

      {
        boxShadow:
          "0 0 0 rgba(190,90,255,0)"
      },

      {
        boxShadow:
          "0 0 45px rgba(190,90,255,.45)"
      },

      {
        boxShadow:
          "0 0 20px rgba(190,90,255,.2)"
      }

    ],

    {

      duration:
        500

    }

  );


  // -----------------------------------------
  // next
  // -----------------------------------------

  setTimeout(
    () => {

      currentQuestion++;


      if (
        currentQuestion <
        questions.length
      ) {

        showQuestion();


        window.scrollTo({

          top: 0,

          behavior:
            "smooth"

        });

      }

      else {

        startAnalysis();

      }

    },

    550
  );

}


// ==========================================================
// 14. QUIT
// ==========================================================

document.getElementById(
  "quit-button"
).addEventListener(
  "click",
  () => {

    const confirmQuit =
      confirm(
        "診断を中断して表紙に戻りますか？"
      );


    if (
      confirmQuit
    ) {

      switchScreen(
        quizScreen,
        startScreen
      );


      window.scrollTo({
        top: 0
      });

    }

  }
);


// ==========================================================
// 15. ANALYSIS
// ==========================================================

function startAnalysis() {

  switchScreen(
    quizScreen,
    loadingScreen
  );


  window.scrollTo({
    top: 0
  });


  let progress =
    0;


  const percentElement =
    document.getElementById(
      "analysis-percent"
    );


  const progressFill =
    document.getElementById(
      "analysis-progress-fill"
    );


  const message =
    document.getElementById(
      "analysis-message"
    );


  const messages = [

    "回答データを読み込んでいます...",

    "共感性・誠実性を解析しています...",

    "規範意識・判断力を解析しています...",

    "責任感・思いやりを解析しています...",

    "自律性・公正さを解析しています...",

    "回答パターンを比較しています...",

    "あなたの価値観タイプを生成しています...",

    "分析レポートを作成しています..."

  ];


  const timer =
    setInterval(
      () => {

        progress +=
          Math.floor(
            Math.random() * 7
          )
          +
          2;


        if (
          progress > 100
        ) {

          progress =
            100;

        }


        percentElement.textContent =
          progress;


        progressFill.style.width =
          progress + "%";


        const messageIndex =
          Math.min(

            Math.floor(
              progress / 14
            ),

            messages.length - 1

          );


        message.textContent =
          messages[
            messageIndex
          ];


        updateAnalysisSteps(
          progress
        );


        if (
          progress >= 100
        ) {

          clearInterval(
            timer
          );


          setTimeout(
            showResults,
            900
          );

        }

      },

      130
    );

}


// ==========================================================
// 16. ANALYSIS STEPS
// ==========================================================

function updateAnalysisSteps(
  progress
) {

  const steps = [

    document.getElementById(
      "analysis-step-1"
    ),

    document.getElementById(
      "analysis-step-2"
    ),

    document.getElementById(
      "analysis-step-3"
    ),

    document.getElementById(
      "analysis-step-4"
    ),

    document.getElementById(
      "analysis-step-5"
    )

  ];


  steps.forEach(
    (
      step,
      index
    ) => {

      const threshold =
        index * 20;


      if (
        progress >= threshold
      ) {

        step.classList.add(
          "active"
        );

      }

    }
  );

}


// ==========================================================
// 17. CALCULATE AVERAGES
// ==========================================================

function calculateAverages() {

  return totalFactorScores.map(
    score => {

      return Math.round(
        score /
        answeredQuestions
      );

    }
  );

}


// ==========================================================
// 18. TOTAL SCORE
// ==========================================================

function calculateTotalScore(
  averages
) {

  const sum =
    averages.reduce(
      (
        total,
        value
      ) => {

        return total +
          value;

      },

      0
    );


  return Math.round(
    sum /
    averages.length
  );

}


// ==========================================================
// 19. GRADE
// ==========================================================

function calculateGrade(
  score
) {

  if (
    score >= 90
  ) {

    return "S";

  }


  if (
    score >= 80
  ) {

    return "A";

  }


  if (
    score >= 70
  ) {

    return "B";

  }


  if (
    score >= 60
  ) {

    return "C";

  }


  return "D";

}


// ==========================================================
// 20. TYPE
// ==========================================================

function determineType(
  values
) {

  const empathy =
    values[0];

  const integrity =
    values[1];

  const norm =
    values[2];

  const judgment =
    values[3];

  const responsibility =
    values[4];

  const compassion =
    values[5];

  const autonomy =
    values[6];

  const fairness =
    values[7];


  // --------------------------------------------------------
  // TYPE 1
  // --------------------------------------------------------

  if (
    empathy >= 86 &&
    compassion >= 86 &&
    judgment >= 80
  ) {

    return {

      name:
        "共感型ナビゲーター",

      description:
        "人の感情を大切にしながら、状況を冷静に整理して行動するタイプ。優しさだけではなく、相手にとって本当に必要な行動を考える傾向があります。",

      signature:
        "THINK WITH HEART."

    };

  }


  // --------------------------------------------------------
  // TYPE 2
  // --------------------------------------------------------

  if (
    integrity >= 88 &&
    norm >= 88 &&
    fairness >= 85
  ) {

    return {

      name:
        "信念型ジャスティス",

      description:
        "誠実さと公平性を非常に重視するタイプ。人間関係に流されず、自分の中にある『正しいと思える基準』を守ろうとします。",

      signature:
        "STAND FOR WHAT IS RIGHT."

    };

  }


  // --------------------------------------------------------
  // TYPE 3
  // --------------------------------------------------------

  if (
    judgment >= 88 &&
    fairness >= 82
  ) {

    return {

      name:
        "理知型バランサー",

      description:
        "一つの価値観だけで即断せず、複数の立場や結果を比較して判断するタイプ。複雑な状況ほど冷静さを発揮します。",

      signature:
        "SEE THE WHOLE PICTURE."

    };

  }


  // --------------------------------------------------------
  // TYPE 4
  // --------------------------------------------------------

  if (
    autonomy >= 88 &&
    responsibility >= 82
  ) {

    return {

      name:
        "自律型パイオニア",

      description:
        "周囲の空気だけに流されず、自分で考えて行動するタイプ。一度決めたことに対して責任を持とうとする傾向があります。",

      signature:
        "CHOOSE YOUR OWN PATH."

    };

  }


  // --------------------------------------------------------
  // TYPE 5
  // --------------------------------------------------------

  if (
    responsibility >= 88 &&
    integrity >= 82
  ) {

    return {

      name:
        "責任型ガーディアン",

      description:
        "自分の役割や約束を大切にするタイプ。問題が起きたときにも他人任せにせず、自分にできることを探そうとします。",

      signature:
        "OWN YOUR CHOICE."

    };

  }


  // --------------------------------------------------------
  // TYPE 6
  // --------------------------------------------------------

  if (
    empathy >= 82 &&
    fairness >= 82
  ) {

    return {

      name:
        "調和型メディエーター",

      description:
        "人への配慮と公平性の両方を大切にするタイプ。誰か一人だけが不利益を受けないよう、全体のバランスを意識します。",

      signature:
        "CONNECT EVERY PERSPECTIVE."

    };

  }


  // --------------------------------------------------------
  // TYPE 7
  // --------------------------------------------------------

  if (
    autonomy >= 82 &&
    judgment >= 82
  ) {

    return {

      name:
        "独立型ストラテジスト",

      description:
        "周囲の意見を参考にしつつも、最後は自分自身で判断するタイプ。感情よりも状況や結果を重視する場面があります。",

      signature:
        "DECIDE. ACT. LEARN."

    };

  }


  // --------------------------------------------------------
  // DEFAULT
  // --------------------------------------------------------

  return {

    name:
      "柔軟型モラリスト",

    description:
      "特定の価値観だけに大きく偏らず、その場の状況や相手との関係によって判断を変える柔軟なタイプです。",

    signature:
      "BALANCE MAKES THE CHOICE."

  };

}


// ==========================================================
// 21. SHOW RESULTS
// ==========================================================

function showResults() {

  const averages =
    calculateAverages();


  const totalScore =
    calculateTotalScore(
      averages
    );


  const grade =
    calculateGrade(
      totalScore
    );


  const type =
    determineType(
      averages
    );


  switchScreen(
    loadingScreen,
    resultScreen
  );


  // -----------------------------------------
  // score
  // -----------------------------------------

  document.getElementById(
    "grade"
  ).textContent =
    grade;


  document.getElementById(
    "total-score"
  ).textContent =
    totalScore;


  // -----------------------------------------
  // type
  // -----------------------------------------

  document.getElementById(
    "type-name"
  ).textContent =
    type.name;


  document.getElementById(
    "type-description"
  ).textContent =
    type.description;


  document.getElementById(
    "signature-text"
  ).textContent =
    type.signature;


  // -----------------------------------------
  // create UI
  // -----------------------------------------

  createFactorCards(
    averages
  );


  createRankings(
    averages
  );


  createComment(
    averages,
    totalScore,
    type
  );


  drawRadarChart(
    averages
  );


  window.scrollTo({

    top: 0,

    behavior:
      "smooth"

  });

}


// ==========================================================
// 22. FACTOR CARDS
// ==========================================================

function createFactorCards(
  values
) {

  const grid =
    document.getElementById(
      "factor-score-grid"
    );


  grid.innerHTML =
    "";


  factors.forEach(
    (
      factor,
      index
    ) => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "factor-score-card";


      card.innerHTML = `

        <div class="factor-score-top">


          <div class="factor-score-name">

            <span class="factor-score-icon">

              ${factor.icon}

            </span>


            <div>

              <strong>

                ${factor.name}

              </strong>

            </div>

          </div>


          <span class="factor-score-value">

            ${values[index]}

            <small>

              /100

            </small>

          </span>

        </div>


        <div class="factor-score-bar">

          <div
            class="factor-score-fill"
            style="
              width:
              ${values[index]}%
            "
          ></div>

        </div>

      `;


      grid.appendChild(
        card
      );

    }
  );

}


// ==========================================================
// 23. RANKINGS
// ==========================================================

function createRankings(
  values
) {

  const data =
    factors.map(
      (
        factor,
        index
      ) => {

        return {

          name:
            factor.name,

          icon:
            factor.icon,

          value:
            values[index]

        };

      }
    );


  const strengths =
    [...data]
      .sort(
        (
          a,
          b
        ) =>
          b.value -
          a.value
      )
      .slice(
        0,
        3
      );


  const growth =
    [...data]
      .sort(
        (
          a,
          b
        ) =>
          a.value -
          b.value
      )
      .slice(
        0,
        3
      );


  renderRanking(

    "strength-ranking",

    strengths

  );


  renderRanking(

    "growth-ranking",

    growth

  );

}


// ==========================================================
// 24. RENDER RANKING
// ==========================================================

function renderRanking(
  elementId,
  ranking
) {

  const container =
    document.getElementById(
      elementId
    );


  container.innerHTML =
    "";


  ranking.forEach(
    (
      item,
      index
    ) => {

      const row =
        document.createElement(
          "div"
        );


      row.className =
        "rank-row";


      row.innerHTML = `

        <span class="rank-number">

          ${index + 1}

        </span>


        <strong>

          ${item.icon}
          ${item.name}

        </strong>


        <span>

          ${item.value}

        </span>

      `;


      container.appendChild(
        row
      );

    }
  );

}


// ==========================================================
// 25. COMMENT
// ==========================================================

function createComment(
  values,
  totalScore,
  type
) {

  const data =
    factors.map(
      (
        factor,
        index
      ) => {

        return {

          name:
            factor.name,

          value:
            values[index]

        };

      }
    );


  const sorted =
    [...data].sort(
      (
        a,
        b
      ) =>
        b.value -
        a.value
    );


  const strongest =
    sorted[0];


  const second =
    sorted[1];


  const lowest =
    sorted[
      sorted.length - 1
    ];


  let opening;


  if (
    totalScore >= 88
  ) {

    opening =
      "あなたの回答からは、複数の価値観を高い水準で両立しようとする傾向が見られました。";

  }

  else if (
    totalScore >= 78
  ) {

    opening =
      "あなたは一つの考え方だけに偏らず、状況に応じて複数の価値観を組み合わせて判断する傾向があります。";

  }

  else if (
    totalScore >= 68
  ) {

    opening =
      "あなたは一般的なルールを意識しながらも、自分自身の判断や状況とのバランスを取ろうとする傾向があります。";

  }

  else {

    opening =
      "あなたの回答には、一般的な基準よりも自分自身の考え方や状況を重視する傾向が表れています。";

  }


  const text =

    `${opening}

特に「${strongest.name}」と「${second.name}」が高く、これらがあなたの意思決定を支える主要な価値観になっていると考えられます。

あなたは「${type.name}」タイプとして、場面ごとに自分なりの基準を使いながら選択する傾向があります。

一方で「${lowest.name}」は他の項目より控えめでした。ただし、これは良い・悪いという評価ではありません。あなたが判断するときに、相対的に何を優先しているかを示しています。

普段とは異なる立場や価値観を意識してみることで、さらに多角的な意思決定ができるかもしれません。`;


  document.getElementById(
    "result-comment"
  ).textContent =
    text;

}


// ==========================================================
// 26. RADAR CHART
// External library NOT required
// ==========================================================

function drawRadarChart(
  values
) {

  const canvas =
    document.getElementById(
      "radar-chart"
    );


  const ctx =
    canvas.getContext(
      "2d"
    );


  const width =
    canvas.width;


  const height =
    canvas.height;


  ctx.clearRect(
    0,
    0,
    width,
    height
  );


  const centerX =
    width / 2;


  const centerY =
    height / 2 +
    10;


  const radius =
    Math.min(
      width,
      height
    )
    *
    .34;


  const count =
    factors.length;


  // --------------------------------------------------------
  // GRID
  // --------------------------------------------------------

  for (
    let level = 1;
    level <= 5;
    level++
  ) {

    const levelRadius =
      radius *
      level /
      5;


    ctx.beginPath();


    for (
      let index = 0;
      index < count;
      index++
    ) {

      const angle =
        -Math.PI / 2
        +
        (
          Math.PI *
          2 /
          count
        )
        *
        index;


      const x =
        centerX
        +
        Math.cos(
          angle
        )
        *
        levelRadius;


      const y =
        centerY
        +
        Math.sin(
          angle
        )
        *
        levelRadius;


      if (
        index === 0
      ) {

        ctx.moveTo(
          x,
          y
        );

      }

      else {

        ctx.lineTo(
          x,
          y
        );

      }

    }


    ctx.closePath();


    ctx.strokeStyle =
      "rgba(133,117,190,.18)";


    ctx.lineWidth =
      1;


    ctx.stroke();

  }


  // --------------------------------------------------------
  // AXES
  // --------------------------------------------------------

  factors.forEach(
    (
      factor,
      index
    ) => {

      const angle =
        -Math.PI / 2
        +
        (
          Math.PI *
          2 /
          count
        )
        *
        index;


      const x =
        centerX
        +
        Math.cos(
          angle
        )
        *
        radius;


      const y =
        centerY
        +
        Math.sin(
          angle
        )
        *
        radius;


      ctx.beginPath();


      ctx.moveTo(
        centerX,
        centerY
      );


      ctx.lineTo(
        x,
        y
      );


      ctx.strokeStyle =
        "rgba(130,110,180,.15)";


      ctx.stroke();


      // label

      const labelRadius =
        radius +
        40;


      const labelX =
        centerX
        +
        Math.cos(
          angle
        )
        *
        labelRadius;


      const labelY =
        centerY
        +
        Math.sin(
          angle
        )
        *
        labelRadius;


      ctx.fillStyle =
        "#aeb7ce";


      ctx.font =
        "13px sans-serif";


      ctx.textAlign =
        "center";


      ctx.textBaseline =
        "middle";


      ctx.fillText(

        factor.name,

        labelX,

        labelY

      );

    }
  );


  // --------------------------------------------------------
  // DATA AREA
  // --------------------------------------------------------

  ctx.beginPath();


  values.forEach(
    (
      value,
      index
    ) => {

      const angle =
        -Math.PI / 2
        +
        (
          Math.PI *
          2 /
          count
        )
        *
        index;


      const valueRadius =
        radius *
        value /
        100;


      const x =
        centerX
        +
        Math.cos(
          angle
        )
        *
        valueRadius;


      const y =
        centerY
        +
        Math.sin(
          angle
        )
        *
        valueRadius;


      if (
        index === 0
      ) {

        ctx.moveTo(
          x,
          y
        );

      }

      else {

        ctx.lineTo(
          x,
          y
        );

      }

    }
  );


  ctx.closePath();


  const gradient =
    ctx.createLinearGradient(
      0,
      0,
      width,
      height
    );


  gradient.addColorStop(
    0,
    "rgba(211,72,255,.45)"
  );


  gradient.addColorStop(
    .5,
    "rgba(101,87,255,.30)"
  );


  gradient.addColorStop(
    1,
    "rgba(50,210,255,.28)"
  );


  ctx.fillStyle =
    gradient;


  ctx.fill();


  ctx.strokeStyle =
    "#cf65ff";


  ctx.lineWidth =
    3;


  ctx.shadowColor =
    "#a653ff";


  ctx.shadowBlur =
    15;


  ctx.stroke();


  ctx.shadowBlur =
    0;


  // --------------------------------------------------------
  // POINTS
  // --------------------------------------------------------

  values.forEach(
    (
      value,
      index
    ) => {

      const angle =
        -Math.PI / 2
        +
        (
          Math.PI *
          2 /
          count
        )
        *
        index;


      const valueRadius =
        radius *
        value /
        100;


      const x =
        centerX
        +
        Math.cos(
          angle
        )
        *
        valueRadius;


      const y =
        centerY
        +
        Math.sin(
          angle
        )
        *
        valueRadius;


      ctx.beginPath();


      ctx.arc(
        x,
        y,
        5,
        0,
        Math.PI * 2
      );


      ctx.fillStyle =
        "#f0b4ff";


      ctx.shadowColor =
        "#d95cff";


      ctx.shadowBlur =
        12;


      ctx.fill();


      ctx.shadowBlur =
        0;

    }
  );

}


// ==========================================================
// 27. RESTART
// ==========================================================

function restartQuiz() {

  currentQuestion =
    0;


  answeredQuestions =
    0;


  totalFactorScores =
    new Array(
      factors.length
    ).fill(0);


  document.getElementById(
    "analysis-percent"
  ).textContent =
    "0";


  document.getElementById(
    "analysis-progress-fill"
  ).style.width =
    "0%";


  const analysisSteps =
    document.querySelectorAll(
      ".analysis-step"
    );


  analysisSteps.forEach(
    (
      step,
      index
    ) => {

      step.classList.remove(
        "active"
      );


      if (
        index === 0
      ) {

        step.classList.add(
          "active"
        );

      }

    }
  );


  switchScreen(
    resultScreen,
    quizScreen
  );


  createQuestionDots();

  showQuestion();


  window.scrollTo({
    top: 0
  });

}


// ==========================================================
// 28. RESTART BUTTONS
// ==========================================================

document.getElementById(
  "restart-button"
).addEventListener(
  "click",
  restartQuiz
);


document.getElementById(
  "restart-top"
).addEventListener(
  "click",
  restartQuiz
);


// ==========================================================
// 29. BACK HOME
// ==========================================================

document.getElementById(
  "back-home-button"
).addEventListener(
  "click",
  () => {

    switchScreen(
      resultScreen,
      startScreen
    );


    window.scrollTo({

      top: 0,

      behavior:
        "smooth"

    });

  }
);


// ==========================================================
// 30. SMALL PARALLAX EFFECT
// ==========================================================

document.addEventListener(
  "mousemove",
  event => {

    const visual =
      document.querySelector(
        ".hero-visual"
      );


    if (
      !visual
    ) {

      return;

    }


    const x =
      (
        event.clientX /
        window.innerWidth
        -
        .5
      )
      *
      8;


    const y =
      (
        event.clientY /
        window.innerHeight
        -
        .5
      )
      *
      8;


    visual.style.transform =
      `translate(${x}px, ${y}px)`;

  }
);