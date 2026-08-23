const questions = [
  {
    category: "一発芸",
    situation: "会社の懇親会で、先輩から「若手なんだから一発芸やってよ」と言われた。",
    question: "場を壊さず、かつ自分も無理しすぎない対応として最も適切なのは？",
    choices: [
      "「一発芸は苦手なので、代わりに乾杯の一言だけでもいいですか？」と軽く笑って別の役割を提案する",
      "「今日は見る側で勉強させてください」とやんわり断り、すぐに別の話題へ切り替える",
      "「じゃあ若手全員で何かやりますか」と、個人ではなく複数人で対応する流れに変える",
      "「すみません、そういう場で急に振られるのは苦手です」と率直に伝えて断る"
    ],
    answerIndex: 0,
    explanation: [
      "Aは最も適切です。懇親会でも、本人が望まない一発芸や目立つ行動を無理に求めるのは望ましくありません。",
      "Aは一発芸自体は断りつつ、乾杯の一言という別の役割を提案しているため、自分の境界線を守りながら場への協力姿勢も示せています。",
      "Bはやんわり断る点では悪くありませんが、代替案がないため相手によっては逃げたように受け取られる可能性があります。",
      "Cは負担を分散しているように見えますが、他の若手に同じ圧を広げる可能性があります。",
      "Dは正当な断り方ですが、場の空気調整という観点ではやや直接的です。"
    ].join("\n")
  },
  {
    category: "失敗談",
    situation: "飲み会で、参加していない同僚の失敗談を上司が面白おかしく話し始めた。周囲も少し笑っているが、その同僚本人はその場にいない。",
    question: "その場にいる後輩として、どう振る舞うのが最も適切か？",
    choices: [
      "「本人がいないところなので、この話はほどほどにしておきませんか。そういえば、あの時かなり頑張っていましたよね」と軽く区切り、本人の努力に話を寄せる",
      "上司を否定せず、「たしかに大変そうでしたね。でもその後ちゃんと対応していましたよね」とフォローを入れながら、悪口になりすぎないようにする",
      "その場では空気を壊さないように深入りせず、飲み会後に上司へ個別に「本人がいない場での失敗談は少し気になりました」と伝える",
      "笑いには乗らず聞き役に回り、話が長引きそうになったタイミングで自然に別の話題を振る"
    ],
    answerIndex: 0,
    explanation: [
      "Aは最も適切です。本人がいない場で失敗談が笑い話として広がると、悪気がなくても本人の評価を下げたり、陰口のように受け取られたりする可能性があります。",
      "Aは上司を強く否定せずに話題を区切り、さらに本人の努力に話を寄せているため、場の空気と本人への配慮を両立できます。",
      "Bはフォローを入れている点では良いですが、失敗談そのものは続く可能性があります。",
      "Cは個別に伝える姿勢は丁寧ですが、その場で話が広がるのを止められません。",
      "Dは加担しない点では良いものの、理由を添えて流れを変えるAの方が明確に配慮を示せます。"
    ].join("\n")
  },
  {
    category: "未公開情報",
    situation: "懇親会で取引先の担当者から、「例の新しいプロジェクトって、もう社内では動き出しているんですか？」と軽い口調で聞かれた。その話題は、まだ正式には社外に出していない情報である。",
    question: "場の空気を悪くせず、情報管理の観点でも最も適切な対応はどれか？",
    choices: [
      "「その件はまだ正式にお話しできる段階ではなくて。共有できるようになったら、きちんとした形でご案内しますね」と伝える",
      "「すみません、詳しいことは私からは言えないんですが、正式発表があるまでは社内でも慎重に扱っているみたいです」と伝える",
      "「ここでは具体的な話は避けますね。必要であれば、後日担当者を通して確認してもらえますか」と伝える",
      "「まだ私も確かなことは言えないので、今日は一般的な話にしておきましょう」と伝え、業界全体の話題に切り替える"
    ],
    answerIndex: 2,
    explanation: [
      "Cは最も適切です。懇親会のような非公式な場では、相手が取引先であっても未公開情報をその場で判断して話すべきではありません。",
      "Cは具体的な情報を出さず、必要であれば担当者や正式ルートで確認する道筋を示しています。相手を突き放さず、情報管理も守れる対応です。",
      "Aはかなり適切ですが、「共有できるようになったら」と言うことで、何か進んでいると推測される余地が少し残ります。",
      "Bは「社内でも慎重に扱っている」と述べることで、情報の存在や重要性をにおわせる可能性があります。",
      "Dは話題転換としては自然ですが、「私も確かなことは言えない」という表現が一部情報を知っている印象を与えます。"
    ].join("\n")
  },
  {
    category: "写真撮影",
    situation: "懇親会の終わりに、集合写真を撮ろうという流れになった。周囲は盛り上がっているが、明らかに写りたくなさそうな人が一人いる。あなたは撮影を頼まれている。",
    question: "最も配慮ある対応はどれか？",
    choices: [
      "「写真に入れる人だけで撮りましょう」と全体に声をかけ、写りたくない人が自然に外れられる雰囲気を作る",
      "写りたくなさそうな人に小声で「無理に入らなくても大丈夫です」と確認し、そのうえで全体には「写れる人だけで撮りましょう」と声をかける",
      "いったん全員で撮影し、共有前に「載せてよいか」を確認して、NGがあれば削除やトリミングで対応する",
      "その人を端の方に案内し、SNSなどには投稿しない前提で、社内記録用としてだけ撮影する"
    ],
    answerIndex: 1,
    explanation: [
      "Bは最も適切です。写真に写りたくない理由は、体調、家庭事情、SNSへの不安、宗教・信条、過去の経験などさまざまで、周囲には分かりません。",
      "Bはまず本人に小さく逃げ道を作り、その後で全体にも「写れる人だけ」と伝えているため、本人だけを目立たせずに意思を尊重できます。",
      "Aは良い対応ですが、全体への声かけだけだと、本人が実際に外れるには勇気が必要な場合があります。",
      "Cは共有前確認をしている点では配慮がありますが、そもそも撮影されること自体が負担になる人もいます。",
      "Dは用途を限定していても、本人が了承していないまま写す点が不十分です。"
    ].join("\n")
  },
  {
    category: "恋愛いじり",
    situation: "懇親会で、上司が特定の社員の恋愛事情を何度もいじっている。周囲は笑っているが、本人は笑顔ではあるものの少し困っているように見える。",
    question: "その場にいる同僚として、どう振る舞うのが最も適切か？",
    choices: [
      "「その話、本人も少し答えづらそうなので、そろそろ別の話にしませんか」と軽く伝え、自然に話題を変える",
      "本人が笑って受け答えしているため、その場では割って入らず、表情や反応を見ながら必要なら後で声をかける",
      "「恋愛の話は人によって受け取り方が違いますよね」と一般論として触れ、場の空気を見ながら話題を変える",
      "その場では笑いに乗らず、あとで本人に「さっきの話、嫌じゃなかった？」と個別に確認する"
    ],
    answerIndex: 0,
    explanation: [
      "Aは最も適切です。恋愛事情はプライベート性が高く、本人が笑っていても本当に平気とは限りません。上下関係がある場では、本人が場の空気を壊さないために笑っているだけの場合もあります。",
      "Aは「答えづらそう」と本人の様子に軽く触れながら話題変更を提案しているため、本人に「嫌です」と言わせる負担をかけにくいです。",
      "Bは本人の反応を見ている点では配慮がありますが、笑顔を大丈夫というサインとして扱いすぎるリスクがあります。",
      "Cは自然な方向修正ですが、一般論にとどまるため実際に止まるかは相手次第です。",
      "Dは事後フォローとしては良いものの、その場で続いている負担を止められません。"
    ].join("\n")
  },
  {
    category: "無礼講",
    situation: "飲み会で上司から「今日は無礼講だから、若手目線で本音を言ってよ」と言われた。周囲も「せっかくだから言いなよ」という雰囲気になっている。あなたは普段からチームの進め方に少し課題を感じている。",
    question: "最も適切な対応はどれか？",
    choices: [
      "「本音で言うと、会議の目的が少し曖昧なまま始まることがあるので、事前にゴールだけ共有されると動きやすいです」と、具体的な改善提案として伝える",
      "「正直、現場では少しやりづらさを感じることもあります」と本音の温度感だけ伝え、詳しい話は業務時間内に改めて相談する",
      "「飲み会の場なので深い話は避けますが、若手側で感じていることは一度整理してお伝えしたいです」と伝える",
      "「せっかくなので言うと、今のやり方だと若手が動きづらい場面があります」と率直に伝え、具体例は相手の反応を見て出す"
    ],
    answerIndex: 0,
    explanation: [
      "Aは最も適切です。「無礼講」と言われても、飲み会での発言が人間関係や評価から完全に切り離されるわけではありません。",
      "Aは不満を感情的にぶつけるのではなく、会議の目的共有という具体的な改善提案に変換しています。誰かを責めにくく、上司も受け止めやすい伝え方です。",
      "Bは場を深掘りしすぎない点では良いですが、「やりづらさ」だけでは内容が曖昧で、相手に不安や誤解を与える可能性があります。",
      "Cは慎重ですが、相手が今少し聞きたいと言っている場面ではやや回避的に見えます。",
      "Dは率直ですが、若手全体を代表しているように聞こえ、不満だけが先に残りやすいです。"
    ].join("\n")
  },
  {
    category: "会計",
    situation: "懇親会の会計で、上司や年次の高い社員が多めに払う流れになった。あなたは若手で、周囲から「若手は少なめでいいよ」と言われている。",
    question: "支払いへの態度として最も適切なのはどれか？",
    choices: [
      "少なめにしてもらう場合でも、「ありがとうございます。次回の準備やお店探しは自分がやります」と感謝と別の形での貢献を伝える",
      "「自分も社会人なので同じ額を払います」と伝え、年次に関係なく公平に負担しようとする",
      "周囲の流れに合わせて少なめに支払い、会計後に上司へ個別にお礼を伝える",
      "「では今回はお言葉に甘えます」と受け入れ、次の飲み会で後輩ができたときに同じように還元する意識を持つ"
    ],
    answerIndex: 0,
    explanation: [
      "Aは最も適切です。年次の高い人が多めに払ってくれる流れ自体は珍しくありませんが、それを当然と思う態度は避けるべきです。",
      "Aは厚意を受け取りながら、次回の準備やお店探しという別の形で貢献する姿勢を示しています。お金だけでなく、準備や感謝も含めて場を支える意識が伝わります。",
      "Bは自立した姿勢として良いですが、強く同額を主張すると相手の厚意を受け取りにくくしたり、会計の場を固くしたりする可能性があります。",
      "Cは自然ですが受け身にとどまりやすいです。",
      "Dは還元の意識は良いものの、将来の話だけでなく今できる感謝と貢献を示せるAの方が実践的です。"
    ].join("\n")
  },
  {
    category: "飲酒配慮",
    situation: "飲み会で、体質的にお酒が飲めない人に対して、周囲が「少しだけなら大丈夫でしょ」「乾杯だけでも」と勧めている。本人は笑って断っているが、少し困っているようにも見える。",
    question: "近くにいた場合、どう振る舞うのが最も適切か？",
    choices: [
      "「じゃあノンアルも一緒に頼みましょう。自分も今日はノンアルにします」と自然に流れを作り、本人が断り続けなくてよい雰囲気にする",
      "本人に小声で「大丈夫？」と確認し、嫌そうであれば周囲に「無理に勧めない方がよさそうですね」と伝える",
      "「最近は飲まない人も多いですよね」と一般論として触れ、ノンアルメニューの話題に切り替える",
      "その場で強く止めると本人が目立ってしまうため、いったん見守り、あとで本人に「大丈夫だった？」と声をかける"
    ],
    answerIndex: 0,
    explanation: [
      "Aは最も適切です。お酒を飲めない理由は体質、健康、薬、宗教、過去の経験などさまざまで、本人が詳しく説明したくない場合もあります。",
      "Aは本人に「飲めません」と言い続けさせず、自分もノンアルにすることで自然に逃げ道を作っています。本人だけを特別扱いしすぎず、場の空気も大きく壊しません。",
      "Bは本人確認の姿勢は丁寧ですが、その場で聞かれると本人が周囲を気にして「大丈夫」と答えてしまう可能性があります。",
      "Cは自然な話題転換ですが、勧める流れを止めきれない場合があります。",
      "Dは本人を目立たせない配慮はありますが、今まさに困っている負担を止められません。"
    ].join("\n")
  },
  {
    category: "社内不満",
    situation: "取引先も参加している懇親会で、同僚が「うちの部署、最近ほんとに段取り悪いんですよ」と冗談混じりに会社や上司への不満を話し始めた。取引先の人も笑って聞いている。",
    question: "同じ会社の社員として、どう対応するのが最も適切か？",
    choices: [
      "「まあ社内あるあるは尽きないですけど、この話は社内で改善したいですね」と軽く受け止め、取引先には別の話題を振る",
      "「たしかに課題はありますが、最近は改善しようとしているところです」と補足し、会社への印象が悪くなりすぎないようにする",
      "「そのあたりはまだ試行錯誤中ですね」と受け止めつつ、「でも今日はいろいろ情報交換できてありがたいです」と前向きな話題へ移す",
      "「部署によって進め方はいろいろありますよね」と一般化し、取引先の会社ではどうしているかを聞いて話題を広げる"
    ],
    answerIndex: 0,
    explanation: [
      "Aは最も適切です。取引先がいる場で会社や上司への不満を冗談として話すと、自社への信頼やチームの印象に影響する可能性があります。",
      "Aは同僚の発言を正面から否定せず、「社内で改善したい」と線引きして、社外に不満を広げない流れを作っています。",
      "Bは会社の印象を守ろうとしていますが、「課題はあります」と認めることで取引先に内部事情を意識させる可能性があります。",
      "Cは前向きに変えようとしていて良いものの、不満内容をある程度受け止めたように聞こえます。",
      "Dは自然に見えますが、社内運営の話題が続いてしまう可能性があります。"
    ].join("\n")
  },
  {
    category: "二次会",
    situation: "飲み会後、酔った先輩が後輩に「二次会も来るよね？」「若手なんだから付き合いも大事だよ」としつこく参加を迫っている。後輩は笑っているが、少し困っているように見える。自分はその後輩の直接の上司ではない。",
    question: "どう対応するのが最も適切か？",
    choices: [
      "「自分もちょうど帰るので、一緒に駅まで行きますね」と後輩が抜けやすい流れを作り、先輩には「今日はここで締めましょう」と軽く区切る",
      "「二次会に行く人と帰る人で一度分かれましょうか」と声をかけ、後輩が自分で帰る側を選べる流れを作る",
      "先輩に「後輩も迷っているみたいなので、少しだけ参加して途中で帰る形にしませんか」と折衷案を出す",
      "「明日もありますし、今日は無理せず帰る人がいてもいいですよね」と全体に声をかけ、帰りやすい雰囲気を作る"
    ],
    answerIndex: 0,
    explanation: [
      "Aは最も適切です。酔った先輩からしつこく誘われている場面では、後輩が笑っていても本当に行きたいとは限りません。上下関係や場の空気があるため、本人がはっきり断るのは難しい場合があります。",
      "Aは「自分も帰る」という形にすることで、後輩だけを目立たせずに帰る理由を作っています。先輩にも強く非難せず、「今日はここで締めましょう」と軽く区切っています。",
      "Bは帰る人と行く人を分ける点では良いですが、後輩自身が帰る側を選ぶ必要が残ります。",
      "Cは折衷案に見えますが、行きたくない後輩に二次会参加の圧を残します。",
      "Dは全体に帰りやすい空気を作りますが、特定の後輩に向いている圧を十分に弱められない場合があります。"
    ].join("\n")
  }
];

const state = {
  order: [],
  current: 0,
  score: 0,
  correct: 0,
  answered: false,
  currentChoices: [],
  answers: []
};

const elements = {
  quizPanel: document.getElementById("quiz-panel"),
  resultPanel: document.getElementById("result-panel"),
  questionCount: document.getElementById("question-count"),
  totalCount: document.getElementById("total-count"),
  scoreCount: document.getElementById("score-count"),
  correctCount: document.getElementById("correct-count"),
  progressBar: document.getElementById("progress-bar"),
  categoryLabel: document.getElementById("category-label"),
  situationText: document.getElementById("situation-text"),
  questionTitle: document.getElementById("question-title"),
  choiceList: document.getElementById("choice-list"),
  feedback: document.getElementById("feedback"),
  nextButton: document.getElementById("next-button"),
  resultScore: document.getElementById("result-score"),
  resultMessage: document.getElementById("result-message"),
  reviewList: document.getElementById("review-list"),
  restartButton: document.getElementById("restart-button")
};

const pointPerQuestion = 10;
const choiceLabels = ["A", "B", "C", "D"];

function shuffleQuestions() {
  return questions
    .map((question, index) => ({ question, index, random: Math.random() }))
    .sort((a, b) => a.random - b.random)
    .map((item) => item.index);
}

function shuffleChoices(question) {
  return question.choices
    .map((text, originalIndex) => ({ text, originalIndex, random: Math.random() }))
    .sort((a, b) => a.random - b.random)
    .map(({ text, originalIndex }) => ({ text, originalIndex }));
}

function getExplanationParts(question) {
  return question.explanation.split("\n").reduce((parts, line) => {
    const match = line.match(/^([A-D])は(.+)$/);

    if (!match) {
      return parts;
    }

    const label = match[1];
    const text = match[2];
    parts[label].push(text);
    return parts;
  }, { A: [], B: [], C: [], D: [] });
}

function getCorrectDisplayLabel(question) {
  const correctIndex = state.currentChoices.findIndex((choice) => choice.originalIndex === question.answerIndex);
  return choiceLabels[correctIndex];
}

function formatFeedback(question, isCorrect) {
  const explanations = getExplanationParts(question);
  const explanationLines = state.currentChoices.map((choice, index) => {
    const displayLabel = choiceLabels[index];
    const originalLabel = choiceLabels[choice.originalIndex];
    return `${displayLabel}は${explanations[originalLabel].join(" ")}`;
  });

  return [
    isCorrect ? "正解です。" : "不正解です。",
    `回答${getCorrectDisplayLabel(question)}。`,
    ...explanationLines
  ].join("\n");
}

function startQuiz() {
  state.order = shuffleQuestions();
  state.current = 0;
  state.score = 0;
  state.correct = 0;
  state.answered = false;
  state.currentChoices = [];
  state.answers = [];
  elements.totalCount.textContent = String(questions.length);
  elements.resultPanel.hidden = true;
  elements.quizPanel.hidden = false;
  renderQuestion();
}

function getCurrentQuestion() {
  return questions[state.order[state.current]];
}

function renderQuestion() {
  const question = getCurrentQuestion();
  state.answered = false;
  state.currentChoices = shuffleChoices(question);

  elements.questionCount.textContent = String(state.current + 1);
  elements.scoreCount.textContent = String(state.score);
  elements.correctCount.textContent = String(state.correct);
  elements.progressBar.style.width = `${(state.current / questions.length) * 100}%`;
  elements.categoryLabel.textContent = question.category;
  elements.situationText.textContent = question.situation;
  elements.questionTitle.textContent = question.question;
  elements.feedback.className = "feedback";
  elements.feedback.textContent = "";
  elements.nextButton.disabled = true;
  elements.nextButton.textContent = state.current === questions.length - 1 ? "結果を見る" : "次へ";

  elements.choiceList.innerHTML = "";
  state.currentChoices.forEach((choice, index) => {
    const button = document.createElement("button");
    const marker = document.createElement("span");
    const text = document.createElement("span");

    button.className = "choice-button";
    button.type = "button";
    marker.className = "choice-marker";
    marker.textContent = choiceLabels[index];
    text.textContent = choice.text;
    button.append(marker, text);
    button.addEventListener("click", () => selectAnswer(index));
    elements.choiceList.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (state.answered) {
    return;
  }

  const question = getCurrentQuestion();
  const selectedChoice = state.currentChoices[selectedIndex];
  const correctChoice = state.currentChoices.find((choice) => choice.originalIndex === question.answerIndex);
  const isCorrect = selectedChoice.originalIndex === question.answerIndex;
  state.answered = true;

  if (isCorrect) {
    state.score += pointPerQuestion;
    state.correct += 1;
  }

  state.answers.push({
    question: question.question,
    selected: selectedChoice.text,
    correct: correctChoice.text,
    isCorrect
  });

  [...elements.choiceList.children].forEach((button, index) => {
    button.disabled = true;
    if (state.currentChoices[index].originalIndex === question.answerIndex) {
      button.classList.add(isCorrect ? "is-correct" : "show-correct");
    }
    if (index === selectedIndex && !isCorrect) {
      button.classList.add("is-wrong");
    }
  });

  elements.scoreCount.textContent = String(state.score);
  elements.correctCount.textContent = String(state.correct);
  elements.progressBar.style.width = `${((state.current + 1) / questions.length) * 100}%`;
  elements.feedback.className = `feedback is-visible ${isCorrect ? "is-correct" : "is-wrong"}`;
  elements.feedback.textContent = formatFeedback(question, isCorrect);
  elements.nextButton.disabled = false;
}

function goNext() {
  if (!state.answered) {
    return;
  }

  if (state.current === questions.length - 1) {
    renderResult();
    return;
  }

  state.current += 1;
  renderQuestion();
}

function renderResult() {
  elements.quizPanel.hidden = true;
  elements.resultPanel.hidden = false;
  elements.resultScore.textContent = String(state.score);
  elements.resultMessage.textContent = getResultMessage(state.score);
  elements.reviewList.innerHTML = "";

  state.answers.forEach((answer, index) => {
    const item = document.createElement("div");
    const badge = document.createElement("span");
    const body = document.createElement("p");
    const question = document.createElement("strong");
    const correct = document.createElement("span");

    item.className = "review-item";
    badge.className = `review-badge ${answer.isCorrect ? "is-correct" : ""}`;
    badge.textContent = `Q${index + 1} ${answer.isCorrect ? "正解" : "確認"}`;
    question.textContent = answer.question;
    correct.textContent = `正解: ${answer.correct}`;
    body.append(question, correct);
    item.append(badge, body);
    elements.reviewList.appendChild(item);
  });
}

function getResultMessage(score) {
  if (score >= 90) {
    return "かなり安定しています。社外でも安心して任せられる判断ができています。";
  }
  if (score >= 70) {
    return "基本は押さえられています。迷った場面だけ振り返ればさらに良くなります。";
  }
  if (score >= 50) {
    return "惜しい判断がいくつかあります。情報管理と相手への連絡を重点的に確認しましょう。";
  }
  return "まずは、遅刻連絡・機密情報・写真投稿の3つを意識すると改善しやすいです。";
}

elements.nextButton.addEventListener("click", goNext);
elements.restartButton.addEventListener("click", startQuiz);

startQuiz();
