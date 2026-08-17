const SCORING_CONFIG = {
  // ミーティング #3後は、まずこの設定を変更すれば仮採点を差し替えられます。
  enabled: true,
  label: "仮スコア",
  points: {
    full: 2,
    partial: 1,
    none: 0
  },
  ratingLabels: {
    full: "しっかり判断",
    partial: "あと一歩",
    none: "ここで発見"
  },
  resultBands: [
    {
      minRatio: 0.8,
      title: "危険ポイントをかなり見抜けています",
      body: "気づくだけでなく、最初の行動まで選べています。実際の社内ルールも確認しておくとさらに安心です。"
    },
    {
      minRatio: 0.5,
      title: "基本は押さえています。あと一歩！",
      body: "迷った場面の解説を思い出せば、オンライン業務でのうっかりを減らせます。"
    },
    {
      minRatio: 0,
      title: "今日の気づきが、次の安全につながります",
      body: "知らなかった点を見つけられたことが今回の収穫です。まずは『止める・確認する・相談する』から始めましょう。"
    }
  ]
};

const QUESTIONS = [
  {
    id: "screen-share",
    tag: "Web会議",
    type: "hotspot",
    title: "共有前に隠すべきものはどこ？",
    scenario: "取引先とのWeb会議が始まる直前です。このままデスクトップ全体を画面共有しようとしています。",
    prompt: "相手に見せると危険な場所を、画像から3つまで選んでください。",
    hint: "画像内の気になる場所をクリック。選び直すときは、同じ場所をもう一度クリックします。",
    image: "assets/online-screen-share.png",
    imageAlt: "Web会議前のノートPC画面。複数のウィンドウや通知が表示されている。",
    selectionLimit: 3,
    correctIds: ["confidential-tab", "private-chat", "meeting-link"],
    hotspots: [
      { id: "confidential-tab", x: 20, y: 15, w: 31, h: 11 },
      { id: "private-chat", x: 57, y: 17, w: 25, h: 23 },
      { id: "meeting-link", x: 20, y: 53, w: 30, h: 11 },
      { id: "weather", x: 49, y: 43, w: 16, h: 23 },
      { id: "clock", x: 66, y: 43, w: 16, h: 23 },
      { id: "mug", x: 0, y: 61, w: 15, h: 30 }
    ],
    takeaway: "共有前は『通知・開いている資料・会議URL』を一度まとめて確認。"
  },
  {
    id: "leave-desk",
    tag: "在宅勤務",
    type: "single",
    title: "ほんの2分、席を離れるなら？",
    scenario: "在宅勤務中に宅配便が届きました。PCには顧客とのチャット、机には印刷した顧客一覧があります。同居人も家にいます。",
    prompt: "最も安心できる行動を1つ選んでください。",
    hint: "短時間でも、画面と紙の両方を考えてみましょう。",
    image: "assets/online-home-desk.png",
    imageAlt: "在宅勤務中の社員が宅配便に応対しようとしている。机には開いたノートPCと印刷物がある。",
    options: [
      {
        id: "lock-and-cover",
        label: "PCを画面ロックし、印刷物も伏せてから応対する。",
        rating: "full",
        feedback: "画面ロックは、再開時にパスワードなどが必要な状態です。短時間でも画面と紙の両方を見えない状態にする判断が安心です。"
      },
      {
        id: "close-only",
        label: "PCのふたを閉じ、印刷物は机に置いたまま応対する。",
        rating: "partial",
        feedback: "ノートPCのふたを閉じても、設定によっては画面ロックされません。印刷物も見えるままです。"
      },
      {
        id: "mute-only",
        label: "会議だけミュートし、画面と印刷物はそのまま応対する。",
        rating: "none",
        feedback: "ミュートは音声対策です。画面や紙に表示された情報を守ることはできません。"
      },
      {
        id: "ask-housemate",
        label: "同居人に触らないよう伝え、画面を開いたまま応対する。",
        rating: "none",
        feedback: "相手へのお願いだけに頼らず、自分で情報が見えない状態を作ることが大切です。"
      }
    ],
    takeaway: "席を立つ前の合言葉は『画面ロック、紙も伏せる』。"
  },
  {
    id: "phishing-chat",
    tag: "業務チャット",
    type: "multiple",
    title: "その『社内ITヘルプデスク』は本物？",
    scenario: "在宅勤務中、業務チャットに社内ITヘルプデスクを名乗るアカウントから緊急連絡が届きました。",
    prompt: "この連絡の危険サインを3つ選んでください。",
    hint: "表示名ではなく、相手が求めている行動とURLを確認しましょう。",
    image: "assets/online-suspicious-chat.png",
    imageAlt: "在宅勤務中の社員が、警告マークや認証コードの入力欄がある不審なチャットを確認している。",
    selectionLimit: 3,
    correctIds: ["rush", "domain", "auth-code"],
    message: {
      sender: "社内ITヘルプデスク",
      heading: "【緊急】アカウント確認のお願い",
      body: "15分以内に確認しない場合、アカウントを停止します。リンク先でパスワードを更新し、表示された6桁の認証コードをこのチャットへ返信してください。",
      link: "https://security-check-example.net/verify"
    },
    options: [
      { id: "rush", label: "15分以内と急がせ、考える時間を奪っている。" },
      { id: "domain", label: "普段使う会社のWebサイトと、リンク先のURLが異なる。" },
      { id: "auth-code", label: "6桁の認証コードをチャットで返信させようとしている。" },
      { id: "greeting", label: "文章の冒頭に丁寧なあいさつが入っている。" },
      { id: "work-hours", label: "自分の勤務時間中にメッセージが届いている。" }
    ],
    takeaway: "急かされてもリンクは開かず、会社から案内されている連絡先へ別の方法で確認。認証コードは渡さない。"
  },
  {
    id: "file-share",
    tag: "ファイル共有",
    type: "single",
    title: "締切直前、共有サービスが使えない！",
    scenario: "在宅勤務中、取引先へ大容量の資料を送る必要があります。しかし会社指定の共有サービスでエラーが出て、締切まであと10分です。",
    prompt: "最も適切な対応を1つ選んでください。",
    hint: "『あとで削除する』『パスワードを付ける』だけで、私物サービスが許可されるとは限りません。",
    image: "assets/online-file-share-error.png",
    imageAlt: "在宅勤務中の社員が、締切直前にファイル共有サービスのエラーを見て困っている。",
    options: [
      {
        id: "ask-official",
        label: "会社で認められた共有サービスを確認し、使えなければ上司か社内のITヘルプデスク（情報システム担当）へ相談する。",
        rating: "full",
        feedback: "締切が迫っていても、会社が管理できる経路を使うことが基本です。遅れそうな事実も早めに共有します。"
      },
      {
        id: "personal-cloud",
        label: "個人で契約しているクラウドストレージへ一時保存し、相手の受領後すぐ削除する。",
        rating: "none",
        feedback: "削除予定でも、個人で契約しているサービスへアップロードした時点で、会社が管理できない場所への持ち出しになる可能性があります。"
      },
      {
        id: "personal-mail",
        label: "パスワード付きZIPにして、個人メールから送付する。",
        rating: "none",
        feedback: "暗号化の有無とは別に、個人メールへ業務情報を移すこと自体が問題になる場合があります。"
      },
      {
        id: "rename-file",
        label: "資料名を伏せて、取引先から指定された会社未承認のファイル共有サービスを使う。",
        rating: "none",
        feedback: "ファイル名を変えても内容の管理責任は変わりません。取引先から指定されても、会社で利用が認められているか確認が必要です。"
      }
    ],
    takeaway: "急ぐときほど『会社が管理できる経路か』を確認し、困ったら早めに相談。"
  },
  {
    id: "incident-order",
    tag: "誤共有後の対応",
    type: "sequence",
    title: "見せてしまった！ 最初の対応は？",
    scenario: "社外参加者がいるWeb会議で、顧客一覧を数秒間画面共有してしまいました。録画されていたかは分かりません。",
    prompt: "対応する順番に並べ替えてください。",
    hint: "ドラッグではなく『上へ』『下へ』ボタンで並べ替えられます。",
    image: "assets/online-accidental-share.png",
    imageAlt: "Web会議中の社員が、誤って表計算シートを画面共有してしまい驚いている。",
    idealOrder: ["stop", "report", "record", "follow"],
    initialOrder: ["record", "follow", "stop", "report"],
    actions: [
      { id: "stop", label: "画面共有を止め、対象ウィンドウを閉じる。" },
      { id: "report", label: "会議の主催者・上司・社内の情報セキュリティ担当へすぐ報告する。" },
      { id: "record", label: "見えていた内容・参加者・時間・録画されていたかどうかを整理する。" },
      { id: "follow", label: "上司や情報セキュリティ担当の指示に従い、記録や参加者への対応を進める。" }
    ],
    takeaway: "誤共有に気づいたら『止める、報告する、事実を整理する』。一人で隠さない。"
  }
];

const elements = {
  introScreen: document.getElementById("intro-screen"),
  quizScreen: document.getElementById("quiz-screen"),
  resultScreen: document.getElementById("result-screen"),
  startGame: document.getElementById("start-game"),
  retryGame: document.getElementById("retry-game"),
  progressLabel: document.getElementById("progress-label"),
  progressBar: document.getElementById("progress-bar"),
  scoreChip: document.getElementById("score-chip"),
  questionNumber: document.getElementById("question-number"),
  questionTag: document.getElementById("question-tag"),
  questionTitle: document.getElementById("question-title"),
  scenarioCopy: document.getElementById("scenario-copy"),
  questionVisual: document.getElementById("question-visual"),
  questionPrompt: document.getElementById("question-prompt"),
  answerArea: document.getElementById("answer-area"),
  answerHint: document.getElementById("answer-hint"),
  answerActions: document.getElementById("answer-actions"),
  submitAnswer: document.getElementById("submit-answer"),
  feedbackPanel: document.getElementById("feedback-panel"),
  feedbackBadge: document.getElementById("feedback-badge"),
  feedbackScore: document.getElementById("feedback-score"),
  feedbackTitle: document.getElementById("feedback-title"),
  feedbackBody: document.getElementById("feedback-body"),
  feedbackTakeaway: document.getElementById("feedback-takeaway"),
  nextQuestion: document.getElementById("next-question"),
  resultScoreWrap: document.getElementById("result-score-wrap"),
  resultScore: document.getElementById("result-score"),
  resultTitle: document.getElementById("result-title"),
  resultBody: document.getElementById("result-body"),
  resultReview: document.getElementById("result-review")
};

const state = {
  currentIndex: 0,
  score: 0,
  response: null,
  locked: false,
  reviews: []
};

function startGame() {
  state.currentIndex = 0;
  state.score = 0;
  state.response = null;
  state.locked = false;
  state.reviews = [];
  elements.introScreen.hidden = true;
  elements.resultScreen.hidden = true;
  elements.quizScreen.hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const question = QUESTIONS[state.currentIndex];
  state.locked = false;
  state.response = getInitialResponse(question);

  elements.progressLabel.textContent = `MISSION ${state.currentIndex + 1} / ${QUESTIONS.length}`;
  elements.progressBar.style.width = `${((state.currentIndex + 1) / QUESTIONS.length) * 100}%`;
  elements.scoreChip.hidden = !SCORING_CONFIG.enabled;
  elements.scoreChip.textContent = `${SCORING_CONFIG.label} ${state.score}`;
  elements.questionNumber.textContent = String(state.currentIndex + 1).padStart(2, "0");
  elements.questionTag.textContent = question.tag;
  elements.questionTitle.textContent = question.title;
  elements.scenarioCopy.textContent = question.scenario;
  elements.questionPrompt.textContent = question.prompt;
  elements.answerHint.textContent = question.hint;
  elements.feedbackPanel.hidden = true;
  elements.feedbackPanel.className = "feedback-panel";
  elements.answerActions.hidden = false;
  elements.submitAnswer.disabled = true;
  elements.nextQuestion.textContent = state.currentIndex === QUESTIONS.length - 1
    ? "結果を見る"
    : "次のミッションへ";

  renderVisual(question);
  renderAnswer(question);
  updateSubmitState(question);
  focusCurrentContent();
}

function getInitialResponse(question) {
  if (question.type === "hotspot" || question.type === "multiple") {
    return new Set();
  }
  if (question.type === "sequence") {
    return [...question.initialOrder];
  }
  return null;
}

function renderVisual(question) {
  elements.questionVisual.innerHTML = "";

  if (question.type === "hotspot") {
    const stage = document.createElement("div");
    stage.className = "hotspot-stage";

    const image = document.createElement("img");
    image.src = question.image;
    image.alt = question.imageAlt;
    stage.appendChild(image);

    question.hotspots.forEach((hotspot, index) => {
      const button = document.createElement("button");
      button.className = "hotspot-button";
      button.type = "button";
      button.dataset.id = hotspot.id;
      button.dataset.marker = "";
      button.setAttribute("aria-label", `画像内の候補エリア ${index + 1}`);
      button.setAttribute("aria-pressed", "false");
      button.style.setProperty("--x", `${hotspot.x}%`);
      button.style.setProperty("--y", `${hotspot.y}%`);
      button.style.setProperty("--w", `${hotspot.w}%`);
      button.style.setProperty("--h", `${hotspot.h}%`);
      button.addEventListener("click", () => toggleHotspot(question, hotspot.id));
      stage.appendChild(button);
    });

    elements.questionVisual.appendChild(stage);
  } else if (question.image) {
    const figure = document.createElement("figure");
    figure.className = "scenario-illustration";

    const image = document.createElement("img");
    image.src = question.image;
    image.alt = question.imageAlt;
    figure.appendChild(image);

    elements.questionVisual.appendChild(figure);
  }

  if (question.message) {
    const message = document.createElement("div");
    message.className = "message-sample";
    message.innerHTML = `
      <strong>${question.message.sender}</strong>
      <span>${question.message.heading}</span>
      <p>${question.message.body}</p>
      <span class="message-link">${question.message.link}</span>
    `;
    elements.questionVisual.appendChild(message);
  }
}

function renderAnswer(question) {
  elements.answerArea.innerHTML = "";

  if (question.type === "hotspot") {
    return;
  }

  if (question.type === "single") {
    renderOptionList(question, "radio");
    return;
  }

  if (question.type === "multiple") {
    renderOptionList(question, "checkbox");
    return;
  }

  if (question.type === "sequence") {
    renderSequence(question);
  }
}

function renderOptionList(question, inputType) {
  const list = document.createElement("div");
  list.className = "option-list";

  question.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";
    label.dataset.id = option.id;

    const input = document.createElement("input");
    input.type = inputType;
    input.name = `question-${question.id}`;
    input.value = option.id;
    input.addEventListener("change", () => handleOptionChange(question, input));

    const marker = document.createElement("span");
    marker.className = "option-marker";
    marker.setAttribute("aria-hidden", "true");
    marker.textContent = String.fromCharCode(65 + index);

    const text = document.createElement("span");
    text.textContent = option.label;

    label.append(input, marker, text);
    list.appendChild(label);
  });

  elements.answerArea.appendChild(list);
}

function handleOptionChange(question, input) {
  if (question.type === "single") {
    state.response = input.value;
  } else {
    if (input.checked && state.response.size >= question.selectionLimit) {
      input.checked = false;
      elements.answerHint.textContent = `${question.selectionLimit}つまで選べます。選び直す場合は、選択済みの項目を外してください。`;
      return;
    }
    if (input.checked) {
      state.response.add(input.value);
    } else {
      state.response.delete(input.value);
    }
    elements.answerHint.textContent = `${state.response.size} / ${question.selectionLimit} 選択中。${question.hint}`;
  }

  updateOptionSelection();
  updateSubmitState(question);
}

function updateOptionSelection() {
  elements.answerArea.querySelectorAll(".answer-option").forEach((label) => {
    const input = label.querySelector("input");
    label.classList.toggle("is-selected", input.checked);
  });
}

function toggleHotspot(question, hotspotId) {
  if (state.locked) {
    return;
  }

  if (state.response.has(hotspotId)) {
    state.response.delete(hotspotId);
  } else if (state.response.size < question.selectionLimit) {
    state.response.add(hotspotId);
  } else {
    elements.answerHint.textContent = `${question.selectionLimit}つまで選べます。選び直す場所を先に外してください。`;
    return;
  }

  updateHotspotSelection();
  elements.answerHint.textContent = `${state.response.size} / ${question.selectionLimit} 選択中。${question.hint}`;
  updateSubmitState(question);
}

function updateHotspotSelection() {
  const selectedIds = [...state.response];
  elements.questionVisual.querySelectorAll(".hotspot-button").forEach((button) => {
    const selectedIndex = selectedIds.indexOf(button.dataset.id);
    const isSelected = selectedIndex >= 0;
    button.classList.toggle("is-selected", isSelected);
    button.dataset.marker = isSelected ? String(selectedIndex + 1) : "";
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function renderSequence(question) {
  const list = document.createElement("div");
  list.className = "sequence-list";

  state.response.forEach((actionId, index) => {
    const action = question.actions.find((item) => item.id === actionId);
    const item = document.createElement("div");
    item.className = "sequence-item";

    const position = document.createElement("span");
    position.className = "sequence-position";
    position.textContent = String(index + 1);

    const copy = document.createElement("strong");
    copy.textContent = action.label;

    const controls = document.createElement("div");
    controls.className = "sequence-controls";

    const upButton = document.createElement("button");
    upButton.type = "button";
    upButton.textContent = "上へ";
    upButton.disabled = index === 0;
    upButton.addEventListener("click", () => moveSequenceItem(question, index, -1));

    const downButton = document.createElement("button");
    downButton.type = "button";
    downButton.textContent = "下へ";
    downButton.disabled = index === state.response.length - 1;
    downButton.addEventListener("click", () => moveSequenceItem(question, index, 1));

    controls.append(upButton, downButton);
    item.append(position, copy, controls);
    list.appendChild(item);
  });

  elements.answerArea.appendChild(list);
}

function moveSequenceItem(question, index, direction) {
  const targetIndex = index + direction;
  [state.response[index], state.response[targetIndex]] = [state.response[targetIndex], state.response[index]];
  renderAnswer(question);
  updateSubmitState(question);
}

function updateSubmitState(question) {
  if (question.type === "single") {
    elements.submitAnswer.disabled = !state.response;
    return;
  }

  if (question.type === "hotspot" || question.type === "multiple") {
    elements.submitAnswer.disabled = state.response.size === 0;
    return;
  }

  elements.submitAnswer.disabled = false;
}

function submitAnswer() {
  if (state.locked) {
    return;
  }

  const question = QUESTIONS[state.currentIndex];
  const result = evaluateAnswer(question);
  const points = SCORING_CONFIG.points[result.rating];

  state.locked = true;
  if (SCORING_CONFIG.enabled) {
    state.score += points;
  }
  state.reviews.push({
    number: state.currentIndex + 1,
    title: question.title,
    rating: result.rating,
    points
  });

  revealAnswer(question, result);
  showFeedback(question, result, points);
}

function evaluateAnswer(question) {
  if (question.type === "single") {
    const selected = question.options.find((option) => option.id === state.response);
    return {
      rating: selected.rating,
      title: getFeedbackTitle(selected.rating),
      body: selected.feedback
    };
  }

  if (question.type === "hotspot" || question.type === "multiple") {
    const selectedIds = [...state.response];
    const correctCount = selectedIds.filter((id) => question.correctIds.includes(id)).length;
    const wrongCount = selectedIds.length - correctCount;
    const isExact = correctCount === question.correctIds.length && wrongCount === 0;
    const isPartial = correctCount >= 2 && wrongCount === 0;
    const rating = isExact ? "full" : isPartial ? "partial" : "none";

    if (question.type === "hotspot") {
      const body = isExact
        ? "社外秘ファイルのタブ、個人チャット通知、会議URLの3点を見つけられました。天気や時計は今回の共有リスクではありません。"
        : `危険箇所は「社外秘ファイルのタブ」「個人チャット通知」「会議URL」の3点です。今回は${correctCount}点を見つけました。`;
      return { rating, title: getFeedbackTitle(rating), body };
    }

    const body = isExact
      ? "急がせる表現、公式と異なるURL、認証コードの要求を見抜けました。表示名だけでは本物とは判断できません。"
      : "危険サインは、急がせる表現、公式と異なるURL、認証コードの要求です。丁寧な文章や勤務時間内というだけでは安全の根拠になりません。";
    return { rating, title: getFeedbackTitle(rating), body };
  }

  const isExact = arraysEqual(state.response, question.idealOrder);
  const reportBeforeFollow = state.response.indexOf("report") < state.response.indexOf("follow");
  const isPartial = state.response[0] === "stop" && reportBeforeFollow;
  const rating = isExact ? "full" : isPartial ? "partial" : "none";
  const body = isExact
    ? "共有停止から報告、事実整理、指示に沿った対応まで、優先順位を押さえられています。"
    : "基本の順番は「共有を止める → すぐ報告する → 事実を整理する → 指示に従う」です。記録を整えてから報告するより、まず被害拡大を止めて早く知らせます。";
  return { rating, title: getFeedbackTitle(rating), body };
}

function getFeedbackTitle(rating) {
  if (rating === "full") {
    return "いい判断です！";
  }
  if (rating === "partial") {
    return "方向は合っています！";
  }
  return "ここが今回の発見ポイント";
}

function arraysEqual(first, second) {
  return first.length === second.length && first.every((value, index) => value === second[index]);
}

function revealAnswer(question, result) {
  if (question.type === "hotspot") {
    elements.questionVisual.querySelectorAll(".hotspot-button").forEach((button) => {
      const isCorrect = question.correctIds.includes(button.dataset.id);
      const wasSelected = state.response.has(button.dataset.id);
      button.disabled = true;
      button.classList.remove("is-selected");
      button.classList.toggle("is-correct", isCorrect);
      button.classList.toggle("is-wrong", wasSelected && !isCorrect);
    });
  }

  if (question.type === "single" || question.type === "multiple") {
    const correctIds = question.type === "multiple"
      ? question.correctIds
      : question.options.filter((option) => option.rating === "full").map((option) => option.id);

    elements.answerArea.querySelectorAll(".answer-option").forEach((label) => {
      const input = label.querySelector("input");
      const isCorrect = correctIds.includes(label.dataset.id);
      const isChosenWrong = input.checked && !isCorrect;
      input.disabled = true;
      label.classList.toggle("is-correct", isCorrect);
      label.classList.toggle("is-wrong", isChosenWrong);
    });
  }

  if (question.type === "sequence") {
    elements.answerArea.querySelectorAll("button").forEach((button) => {
      button.disabled = true;
    });
  }

  elements.submitAnswer.disabled = true;
  elements.answerActions.hidden = true;
  elements.feedbackPanel.dataset.rating = result.rating;
}

function showFeedback(question, result, points) {
  elements.feedbackPanel.className = `feedback-panel is-${result.rating}`;
  elements.feedbackBadge.textContent = SCORING_CONFIG.ratingLabels[result.rating];
  elements.feedbackScore.hidden = !SCORING_CONFIG.enabled;
  elements.feedbackScore.textContent = `${SCORING_CONFIG.label} +${points}`;
  elements.feedbackTitle.textContent = result.title;
  elements.feedbackBody.textContent = result.body;
  elements.feedbackTakeaway.textContent = question.takeaway;
  elements.feedbackPanel.hidden = false;
  elements.scoreChip.textContent = `${SCORING_CONFIG.label} ${state.score}`;
  elements.feedbackPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function goToNextQuestion() {
  if (state.currentIndex < QUESTIONS.length - 1) {
    state.currentIndex += 1;
    renderQuestion();
    return;
  }
  showResult();
}

function showResult() {
  elements.quizScreen.hidden = true;
  elements.resultScreen.hidden = false;

  const maxPerQuestion = Math.max(...Object.values(SCORING_CONFIG.points));
  const maxScore = maxPerQuestion * QUESTIONS.length;
  const ratio = maxScore === 0 ? 0 : state.score / maxScore;
  const band = SCORING_CONFIG.resultBands.find((item) => ratio >= item.minRatio);

  elements.resultScoreWrap.hidden = !SCORING_CONFIG.enabled;
  elements.resultScore.textContent = `${state.score} / ${maxScore}`;
  elements.resultTitle.textContent = SCORING_CONFIG.enabled ? band.title : "5つの場面を振り返りました";
  elements.resultBody.textContent = SCORING_CONFIG.enabled
    ? band.body
    : "採点を表示しない設定です。各ミッションの解説を、次のオンライン業務で活かしてみましょう。";

  elements.resultReview.innerHTML = state.reviews.map((review) => `
    <div class="review-item">
      <span>${String(review.number).padStart(2, "0")}</span>
      <strong>${review.title}</strong>
      <span class="review-rating">${SCORING_CONFIG.ratingLabels[review.rating]}</span>
    </div>
  `).join("");

  focusCurrentContent();
}

function focusCurrentContent() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

elements.startGame.addEventListener("click", startGame);
elements.retryGame.addEventListener("click", startGame);
elements.submitAnswer.addEventListener("click", submitAnswer);
elements.nextQuestion.addEventListener("click", goToNextQuestion);
