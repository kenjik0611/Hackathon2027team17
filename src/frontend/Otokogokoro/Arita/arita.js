const cases = [
  {
    label: "グループチャット",
    title: "予定調整で返事がない",
    context: "友人グループで休日の予定を相談中。ほかのメンバーは返事をしているが、彼からはまだ反応がありません。",
    speaker: "グループ内の彼",
    line: "（メッセージを読んだまま、まだ返信がない）",
    interpretations: [
      "仕事や用事の予定がまだ読めない",
      "候補が多くて返事を後回しにしている",
      "どの日でもよく、ほかの人に合わせたい",
      "今は文章を考える余裕がない"
    ],
    perspective: "沈黙だけでは、参加したくないのか、単に答えられないのかは判断できません。返事の負担を小さくすると、確認しやすくなります。",
    responses: [
      { text: "「A日とB日ならどっちが都合いい？ 明日までで大丈夫だよ」", helpful: true, feedback: "候補と期限が明確で、すぐ答えられなくてもよい余白があります。相手の事情を決めつけずに確認できる声かけです。" },
      { text: "「みんな返事してるよ。早く決めて」", helpful: false, feedback: "急ぎたい気持ちは伝わりますが、周囲との比較は相手を追い込みやすい言い方です。期限と選択肢だけを共有すると答えやすくなります。" },
      { text: "「返事がないなら参加しないってことだね」", helpful: false, feedback: "沈黙の理由を一つに決めています。参加意思と日程の都合を分けて、短く確認する方がすれ違いを減らせます。" }
    ],
    takeaway: "沈黙の理由を決めつけない"
  },
  {
    label: "ちょっとした贈り物",
    title: "「気を遣わなくてよかったのに」",
    context: "以前助けてもらったお礼に、小さなお菓子を渡しました。受け取った彼は少し驚いた表情です。",
    speaker: "彼",
    line: "「ありがとう。でも、気を遣わなくてよかったのに」",
    interpretations: [
      "うれしいが照れていて反応に迷っている",
      "お返しを考える負担を感じている",
      "本当にお礼は必要ないと思っている",
      "予想外だったので、まず遠慮の言葉が出た"
    ],
    perspective: "感謝と遠慮は同時に存在できます。喜んでいないと断定せず、次回への希望があれば相手が言える形にしておきましょう。",
    responses: [
      { text: "「受け取ってくれてありがとう。ほんの気持ちだから、お返しは気にしないでね」", helpful: true, feedback: "お礼を伝えつつ、相手がお返しを考える負担を軽くしています。好みや境界については、次の機会に自然に確認できます。" },
      { text: "「迷惑だった？ せっかく選んだのに」", helpful: false, feedback: "相手に否定やフォローを求める形になり、率直な反応を言いにくくします。まずは受け取ってくれたことへの感謝だけで十分です。" },
      { text: "「絶対うれしいでしょ。遠慮しなくていいよ」", helpful: false, feedback: "相手の気持ちをこちらで確定しています。喜びと戸惑いの両方があり得るため、反応を決めつけない方が安心です。" }
    ],
    takeaway: "感謝と遠慮は両立する"
  },
  {
    label: "趣味の話",
    title: "知らない分野を熱く語る",
    context: "休憩中、彼が好きなカメラについて楽しそうに話し始めました。専門用語も多く、全部は理解できません。",
    speaker: "彼",
    line: "「このレンズ、光の入り方が本当に面白くてさ」",
    interpretations: [
      "好きなものを誰かに共有したい",
      "詳しさを評価してほしい",
      "あなたも興味があると思っている",
      "話せるきっかけがうれしくて夢中になっている"
    ],
    perspective: "熱心な説明は親しさの表現かもしれませんが、恋愛感情の証拠とは限りません。分からないことは、分からないまま興味を示せます。",
    responses: [
      { text: "「詳しくないけど、どんな写真になるのか見てみたい」", helpful: true, feedback: "知ったふりをせず、相手が好きなことへの関心を伝えています。会話を続けるかどうかも相手に委ねられる言い方です。" },
      { text: "「つまり私に気があるから、そんなに話してるの？」", helpful: false, feedback: "趣味の共有を恋愛感情に直結させると、相手は話しづらくなるかもしれません。まずは目の前の話題を一緒に楽しみましょう。" },
      { text: "「難しくて分からないから、別の話にしよう」", helpful: false, feedback: "率直さは大切ですが、関心そのものまで閉じる表現です。「初心者向けに教えて」と伝える選択肢もあります。" }
    ],
    takeaway: "関心と恋愛感情を直結させない"
  },
  {
    label: "ほめ言葉",
    title: "ほめても反応が薄い",
    context: "彼がまとめた資料が分かりやすかったので、その点を具体的に伝えました。",
    speaker: "彼",
    line: "「いや、別に普通だよ」",
    interpretations: [
      "ほめられることに慣れておらず照れている",
      "自分では特別なことだと思っていない",
      "注目されると少し居心地が悪い",
      "どう返せばいいか分からず短く答えた"
    ],
    perspective: "反応が小さくても、ほめ言葉を嫌がったとは限りません。見返りの反応を求めず、伝えた事実をそのまま置く方法があります。",
    responses: [
      { text: "「そう感じたことだけ伝えたかったんだ。助かった、ありがとう」", helpful: true, feedback: "相手に喜ぶ演技を求めず、自分の感謝として伝え直しています。相手は自分のペースで受け取れます。" },
      { text: "「もっと喜んでくれてもよくない？」", helpful: false, feedback: "ほめ言葉への反応まで指定すると、相手には評価の交換条件のように聞こえることがあります。感謝として完結させると自然です。" },
      { text: "「謙遜するタイプなんだね」", helpful: false, feedback: "一度の反応から性格を決めつけています。照れ、集中、疲れなど別の理由も残したままにしておきましょう。" }
    ],
    takeaway: "反応の大きさを要求しない"
  },
  {
    label: "手伝いの申し出",
    title: "助けを断られたとき",
    context: "作業に手間取っているように見えたため、手伝おうかと声をかけました。彼は画面を見たまま答えます。",
    speaker: "彼",
    line: "「大丈夫。これは自分でやるよ」",
    interpretations: [
      "自分の手順で最後まで試したい",
      "説明するより自分で進める方が早い",
      "困っている姿を見られて少し恥ずかしい",
      "今は集中を切らしたくない"
    ],
    perspective: "断りは、あなたへの拒絶ではなく作業方法の希望かもしれません。まず境界を尊重し、必要になったとき戻れる道だけ残します。",
    responses: [
      { text: "「了解。必要になったら声かけて。今は任せるね」", helpful: true, feedback: "断りをそのまま尊重しながら、後から助けを求められる道を残しています。理由を説明させない点も穏やかです。" },
      { text: "「意地を張らなくていいって。私がやるよ」", helpful: false, feedback: "断った理由を「意地」と決めつけ、意思を上書きしています。まず任せ、必要なら相手から頼める状態にしましょう。" },
      { text: "「せっかく心配してるのに、もう知らない」", helpful: false, feedback: "手伝いを断ることと、あなたを拒むことは同じではありません。申し出を受けるかどうかは相手が選べる形が安心です。" }
    ],
    takeaway: "断りを尊重し、戻れる道を残す"
  }
];

const startPanel = document.getElementById("start-panel");
const gamePanel = document.getElementById("game-panel");
const resultPanel = document.getElementById("result-panel");
const startButton = document.getElementById("start-button");
const confirmLensesButton = document.getElementById("confirm-lenses-button");
const nextButton = document.getElementById("next-button");
const quitButton = document.getElementById("quit-button");
const restartButton = document.getElementById("restart-button");

let currentCaseIndex = 0;
let selectedLenses = [];
let responseChosen = false;

function showOnly(panel) {
  [startPanel, gamePanel, resultPanel].forEach((item) => {
    item.hidden = item !== panel;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderCase() {
  const current = cases[currentCaseIndex];
  selectedLenses = [];
  responseChosen = false;

  document.getElementById("case-count").textContent = `CASE ${currentCaseIndex + 1} / ${cases.length}`;
  document.getElementById("phase-tag").textContent = "見方を選ぶ";
  document.getElementById("progress-bar").style.width = `${((currentCaseIndex + 1) / cases.length) * 100}%`;
  document.getElementById("scene-label").textContent = current.label;
  document.getElementById("case-title").textContent = current.title;
  document.getElementById("case-context").textContent = current.context;
  document.getElementById("speaker").textContent = current.speaker;
  document.getElementById("case-line").textContent = current.line;
  document.getElementById("lens-step").hidden = false;
  document.getElementById("response-step").hidden = true;
  document.getElementById("feedback").hidden = true;
  confirmLensesButton.disabled = true;
  nextButton.disabled = true;
  nextButton.textContent = currentCaseIndex === cases.length - 1 ? "まとめを見る" : "次のケースへ";
  renderLensBoard();
  renderInterpretations(current);
  renderResponses(current);
}

function renderLensBoard() {
  const current = cases[currentCaseIndex];
  document.getElementById("lens-board").innerHTML = [0, 1].map((slotIndex) => {
    const optionIndex = selectedLenses[slotIndex];
    const isFilled = optionIndex !== undefined;
    const text = isFilled ? current.interpretations[optionIndex] : "まだ選ばれていません";
    return `<div class="lens-slot${isFilled ? " filled" : ""}"><span>レンズ ${slotIndex + 1}</span><strong>${text}</strong></div>`;
  }).join("");
  document.getElementById("selection-count").textContent = `${selectedLenses.length} / 2`;
  confirmLensesButton.disabled = selectedLenses.length !== 2;
}

function renderInterpretations(current) {
  const container = document.getElementById("interpretation-options");
  container.innerHTML = "";
  current.interpretations.forEach((text, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "interpretation-option";
    button.textContent = text;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => toggleLens(index, button));
    container.appendChild(button);
  });
}

function toggleLens(index, button) {
  const selectedIndex = selectedLenses.indexOf(index);
  if (selectedIndex >= 0) {
    selectedLenses.splice(selectedIndex, 1);
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
  } else if (selectedLenses.length < 2) {
    selectedLenses.push(index);
    button.classList.add("selected");
    button.setAttribute("aria-pressed", "true");
  }
  renderLensBoard();
}

function renderResponses(current) {
  const container = document.getElementById("response-options");
  container.innerHTML = "";
  current.responses.forEach((response, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "response-option";
    button.innerHTML = `<span class="response-mark" aria-hidden="true">${index + 1}</span><span>${response.text}</span>`;
    button.addEventListener("click", () => chooseResponse(index));
    container.appendChild(button);
  });
}

function openResponseStep() {
  const current = cases[currentCaseIndex];
  document.getElementById("lens-step").hidden = true;
  document.getElementById("response-step").hidden = false;
  document.getElementById("phase-tag").textContent = "声かけを選ぶ";
  document.getElementById("perspective-note").innerHTML = `<strong>どちらも可能性の一つです</strong><p>${current.perspective}</p>`;
  document.getElementById("response-step").scrollIntoView({ behavior: "smooth", block: "start" });
}

function chooseResponse(index) {
  if (responseChosen) return;
  responseChosen = true;
  const selected = cases[currentCaseIndex].responses[index];
  [...document.querySelectorAll(".response-option")].forEach((button, buttonIndex) => {
    button.disabled = true;
    if (buttonIndex === index) button.classList.add("selected");
  });
  const feedback = document.getElementById("feedback");
  feedback.className = `feedback ${selected.helpful ? "helpful" : "caution"}`;
  feedback.innerHTML = `<strong>${selected.helpful ? "余白のある声かけです" : "少し見方を広げてみましょう"}</strong><p>${selected.feedback}</p>`;
  feedback.hidden = false;
  nextButton.disabled = false;
}

function renderResult() {
  document.getElementById("review-list").innerHTML = cases.map((item, index) => (
    `<div class="review-item"><span>${index + 1}</span><div><strong>${item.title}</strong><small>${item.takeaway}</small></div></div>`
  )).join("");
  showOnly(resultPanel);
}

function startGame() {
  currentCaseIndex = 0;
  renderCase();
  showOnly(gamePanel);
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
confirmLensesButton.addEventListener("click", openResponseStep);
quitButton.addEventListener("click", () => { window.location.href = "../main.html"; });
nextButton.addEventListener("click", () => {
  if (!responseChosen) return;
  if (currentCaseIndex === cases.length - 1) {
    renderResult();
    return;
  }
  currentCaseIndex += 1;
  renderCase();
  window.scrollTo({ top: 0, behavior: "smooth" });
});
