const missions = [
  {
    id: "delay-report",
    time: "08:45",
    location: "通勤中 → 上司へ連絡",
    icon: "🚃",
    title: "始業に間に合わないかも",
    situation: "電車が運転を見合わせています。始業まで15分ですが、少なくとも20分は遅れそうです。復旧時刻はまだ確定していません。",
    prompt: "上司への最初の連絡に入れる言葉を3つ選んでください。",
    phrases: [
      { id: "wait", text: "到着時刻が確定してから連絡します。" },
      { id: "cause", text: "運転見合わせで、20分ほど遅れる見込みです。" },
      { id: "guess", text: "たぶん、すぐに動くと思います。" },
      { id: "impact", text: "始業に間に合わない可能性があります。" },
      { id: "update", text: "状況が分かり次第、改めて連絡します。" },
      { id: "relay", text: "同僚から伝えてもらうので大丈夫です。" }
    ],
    idealIds: ["cause", "impact", "update"],
    feedback: "見込み段階でも、分かっている事実・業務への影響・次の連絡を先に共有すると、職場側が予定を調整できます。",
    modelResponse: "運転見合わせで20分ほど遅れる見込みです。始業に間に合わない可能性があります。状況が分かり次第、改めて連絡します。",
    takeaway: "確定を待つより、事実・影響・次の報告を早めに伝える。"
  },
  {
    id: "priority-consultation",
    time: "10:30",
    location: "オフィス → 別の上司へ相談",
    icon: "📋",
    title: "『これを最優先で』と言われた",
    situation: "今日15時締切の報告書を作成中、別の上司から正午までの急ぎの仕事を依頼されました。両方を時間どおり終えるのは難しそうです。",
    prompt: "優先順位を相談するために、伝える言葉を3つ選んでください。",
    phrases: [
      { id: "accept", text: "分かりました。どちらも予定どおり進めます。" },
      { id: "current", text: "現在、15時締切の報告書を作成しています。" },
      { id: "overtime", text: "残業すれば何とかなると思います。" },
      { id: "impact", text: "新しい依頼を優先すると、報告書が遅れる見込みです。" },
      { id: "priority", text: "どちらを優先するか確認させてください。" },
      { id: "silent", text: "元の担当者には、遅れてから説明します。" }
    ],
    idealIds: ["current", "impact", "priority"],
    feedback: "仕事が重なったときは、黙って抱え込まず、現在の仕事・変更による影響・判断してほしい点をセットで共有します。",
    modelResponse: "現在、15時締切の報告書を作成しています。新しい依頼を優先すると報告書が遅れる見込みです。どちらを優先するか確認させてください。",
    takeaway: "優先順位は一人で決めず、期限と影響を見せて関係者とそろえる。"
  },
  {
    id: "visitor-entry",
    time: "13:00",
    location: "オフィス入口 → 来訪者へ案内",
    icon: "🪪",
    title: "入館証を忘れた来訪者",
    situation: "顔を知っている取引先の田中さんが、入館証を忘れたので一緒に入れてほしいと言っています。社内ルールでは受付手続きが必要です。",
    prompt: "相手を突き放さず、ルールも守る案内を3つ選んでください。",
    phrases: [
      { id: "exception", text: "今回は顔を知っているので、一緒に入りましょう。" },
      { id: "procedure", text: "恐れ入りますが、受付で入館手続きをお願いします。" },
      { id: "lend", text: "私の入館証を一時的にお貸しします。" },
      { id: "contact", text: "こちらから社内の担当者にも連絡します。" },
      { id: "wait", text: "確認が取れるまで、受付でお待ちいただけますか。" },
      { id: "name", text: "お名前だけ確認できれば、そのままお通しします。" }
    ],
    idealIds: ["procedure", "contact", "wait"],
    feedback: "顔見知りでも入館ルールは省略しません。必要な手続きを案内しつつ、自分も担当者への連絡を引き受けると丁寧です。",
    modelResponse: "恐れ入りますが、受付で入館手続きをお願いします。こちらから社内の担当者にも連絡しますので、確認が取れるまで受付でお待ちいただけますか。",
    takeaway: "相手との関係ではなく、全員に同じ入館手続きを案内する。"
  },
  {
    id: "unknown-specification",
    time: "15:00",
    location: "客先会議室 → 担当者へ回答",
    icon: "🤝",
    title: "その仕様、たぶんできるけれど…",
    situation: "客先から担当外の仕様について質問されました。おそらく対応可能ですが、社内で確認しないと断定できません。",
    prompt: "信頼を損ねず持ち帰るために、返答へ入れる言葉を3つ選んでください。",
    phrases: [
      { id: "promise", text: "おそらく対応できます。進めておきます。" },
      { id: "hold", text: "この場では断定せず、社内で確認させてください。" },
      { id: "scope", text: "ご質問は、この条件での対応可否という理解で合っていますか。" },
      { id: "other", text: "私の担当ではないので、分かりません。" },
      { id: "deadline", text: "本日17時までに、担当者から回答します。" },
      { id: "manual", text: "以前の資料では可能だったので、今回も大丈夫です。" }
    ],
    idealIds: ["hold", "scope", "deadline"],
    feedback: "不確かな場面では、推測を確約にしないことが大切です。確認する内容と回答期限まで合意すると、持ち帰りでも不安を残しません。",
    modelResponse: "この場では断定せず、社内で確認させてください。ご質問はこの条件での対応可否という理解で合っていますか。本日17時までに担当者から回答します。",
    takeaway: "分からないことは、確認事項と回答期限を決めて持ち帰る。"
  },
  {
    id: "meeting-followup",
    time: "16:30",
    location: "帰社前 → 客先へ確認",
    icon: "✅",
    title: "打ち合わせを締めくくろう",
    situation: "打ち合わせでA案の採用が決まり、あなたが金曜日までに見積書を送ることになりました。終了時刻が迫っています。",
    prompt: "認識違いを防ぐ締めくくりとして、伝える言葉を3つ選んでください。",
    phrases: [
      { id: "later", text: "詳細は議事録が完成してから確認します。" },
      { id: "decision", text: "本日の決定は、A案を採用することです。" },
      { id: "owner", text: "見積書は私が担当し、金曜日までに送付します。" },
      { id: "memory", text: "内容は覚えているので、そのまま進めます。" },
      { id: "confirm", text: "認識に違いがあれば、本日中にお知らせください。" },
      { id: "personal", text: "忘れないよう、個人メールにもメモを送ります。" }
    ],
    idealIds: ["decision", "owner", "confirm"],
    feedback: "決定事項・担当・期限をその場で短く確認すると、詳細な議事録を待たずに認識をそろえられます。記録は会社で認められた方法に残します。",
    modelResponse: "本日の決定はA案の採用です。見積書は私が担当し、金曜日までに送付します。認識に違いがあれば、本日中にお知らせください。",
    takeaway: "打ち合わせの最後に『何を・誰が・いつまでに』を確認する。"
  },
  {
    id: "dinner-precheck",
    time: "18:00",
    location: "会食前 → 幹事と参加者へ確認",
    icon: "🍽️",
    title: "会食の前に確認しておこう",
    situation: "客先を交えた会食の幹事を手伝うことになりました。料理はコースで、お酒を飲む人と飲まない人が参加します。",
    prompt: "全員が安心して参加できるよう、事前に確認する言葉を3つ選んでください。",
    phrases: [
      { id: "at-venue", text: "細かい希望は、当日に店で聞けば大丈夫です。" },
      { id: "allergy", text: "アレルギーや食事制限がある方はいませんか。" },
      { id: "toast", text: "乾杯だけは全員お酒にしましょう。" },
      { id: "nonalcohol", text: "ノンアルコールの選択肢も用意しておきます。" },
      { id: "schedule", text: "開始・終了予定と店の連絡先を共有します。" },
      { id: "preference", text: "好き嫌いまでは確認しなくてよいと思います。" }
    ],
    idealIds: ["allergy", "nonalcohol", "schedule"],
    feedback: "食事や飲酒には、体質・健康・信条・当日の事情などさまざまな背景があります。理由を尋ねすぎず、選べる状態を事前に整えることが大切です。",
    modelResponse: "アレルギーや食事制限がある方はいませんか。ノンアルコールの選択肢も用意しておきます。開始・終了予定と店の連絡先も共有します。",
    takeaway: "会食は飲酒を前提にせず、食事制限と当日の予定を事前に確認する。"
  },
  {
    id: "unwell-participant",
    time: "20:00",
    location: "会食中 → 体調を崩した同僚へ対応",
    icon: "🫗",
    title: "同僚の様子がおかしい",
    situation: "同僚の足元がふらつき、呼びかけへの返事も曖昧です。本人は『少し外で休めば大丈夫』と言っています。",
    prompt: "本人の安全を優先するため、取る対応を3つ選んでください。",
    phrases: [
      { id: "alone", text: "外の空気に当たれる場所へ、一人で行ってもらいます。" },
      { id: "stop", text: "それ以上の飲酒を止め、安全な場所で休んでもらいます。" },
      { id: "wait", text: "本人が大丈夫と言っているので、しばらく様子を見ません。" },
      { id: "stay", text: "一人にせず、周囲の人と一緒に付き添います。" },
      { id: "help", text: "体調を確認し、必要なら店員や救急へ協力を求めます。" },
      { id: "continue", text: "場の雰囲気を変えないよう、会食をそのまま続けます。" }
    ],
    idealIds: ["stop", "stay", "help"],
    feedback: "酔った人を一人にすると、転倒や体調悪化に気づけない危険があります。周囲で付き添い、意識や呼吸などに異変がある場合は迷わず救急へ相談します。",
    modelResponse: "それ以上の飲酒を止め、安全な場所で休んでもらいます。一人にせず周囲の人と付き添い、体調を確認して必要なら店員や救急へ協力を求めます。",
    takeaway: "酔った人を一人にせず、本人の言葉だけで大丈夫と判断しない。"
  },
  {
    id: "safe-ride-home",
    time: "21:00",
    location: "会食後 → 帰宅手段を相談",
    icon: "🚕",
    title: "車で来た人が飲酒していた",
    situation: "同僚が『少し休んでから自分の車で帰る』と言っています。本人はお酒に強く、飲んだ量も少ないと話しています。",
    prompt: "飲酒運転を防ぐため、提案する言葉を3つ選んでください。",
    phrases: [
      { id: "coffee", text: "コーヒーを飲んで酔いを覚ましてから運転しましょう。" },
      { id: "no-drive", text: "飲酒した今日は、車を運転しないでください。" },
      { id: "short", text: "近い距離なら、慎重に運転すれば大丈夫です。" },
      { id: "alternative", text: "公共交通、タクシー、飲酒していない人の運転を手配しましょう。" },
      { id: "later", text: "車は置いて、後日取りに来る方法を考えましょう。" },
      { id: "one-hour", text: "一時間休めば、運転しても問題ないと思います。" }
    ],
    idealIds: ["no-drive", "alternative", "later"],
    feedback: "お酒の強さや飲酒量、休憩時間を理由に運転可否を自己判断しません。飲酒した日は運転しない前提で、別の帰宅手段を確保します。",
    modelResponse: "飲酒した今日は車を運転しないでください。公共交通やタクシーなどを手配し、車は置いて後日取りに来る方法を考えましょう。",
    takeaway: "飲酒したら運転しない・させない。先に代わりの移動手段を決める。"
  }
];

const elements = {
  introPanel: document.getElementById("intro-panel"),
  missionPanel: document.getElementById("mission-panel"),
  resultPanel: document.getElementById("result-panel"),
  startButton: document.getElementById("start-button"),
  restartButton: document.getElementById("restart-button"),
  missionTime: document.getElementById("mission-time"),
  missionNumber: document.getElementById("mission-number"),
  totalMissions: document.getElementById("total-missions"),
  progressTrack: document.querySelector(".progress-track"),
  progressBar: document.getElementById("progress-bar"),
  sceneAvatar: document.getElementById("scene-avatar"),
  sceneLocation: document.getElementById("scene-location"),
  missionTitle: document.getElementById("mission-title"),
  situationText: document.getElementById("situation-text"),
  missionPrompt: document.getElementById("mission-prompt"),
  selectionCount: document.getElementById("selection-count"),
  responseSlots: document.getElementById("response-slots"),
  phraseBank: document.getElementById("phrase-bank"),
  clearButton: document.getElementById("clear-button"),
  submitButton: document.getElementById("submit-button"),
  nextButton: document.getElementById("next-button"),
  feedbackPanel: document.getElementById("feedback-panel"),
  feedbackTitle: document.getElementById("feedback-title"),
  feedbackText: document.getElementById("feedback-text"),
  modelResponseText: document.getElementById("model-response-text"),
  takeawayText: document.getElementById("takeaway-text"),
  resultTitle: document.getElementById("result-title"),
  resultMessage: document.getElementById("result-message"),
  reviewList: document.getElementById("review-list")
};

const state = {
  currentIndex: 0,
  selectedIds: [],
  records: [],
  answered: false
};

function startDay() {
  state.currentIndex = 0;
  state.selectedIds = [];
  state.records = [];
  state.answered = false;

  elements.introPanel.hidden = true;
  elements.resultPanel.hidden = true;
  elements.missionPanel.hidden = false;
  elements.totalMissions.textContent = String(missions.length);
  renderMission();
}

function renderMission() {
  const mission = missions[state.currentIndex];
  const position = state.currentIndex + 1;

  state.selectedIds = [];
  state.answered = false;
  elements.missionTime.textContent = mission.time;
  elements.missionNumber.textContent = String(position);
  elements.progressTrack.setAttribute("aria-valuemax", String(missions.length));
  elements.progressTrack.setAttribute("aria-valuenow", String(position));
  elements.progressBar.style.width = `${(position / missions.length) * 100}%`;
  elements.sceneAvatar.textContent = mission.icon;
  elements.sceneLocation.textContent = mission.location;
  elements.missionTitle.textContent = mission.title;
  elements.situationText.textContent = mission.situation;
  elements.missionPrompt.textContent = mission.prompt;
  elements.feedbackPanel.hidden = true;
  elements.submitButton.hidden = false;
  elements.submitButton.disabled = true;
  elements.nextButton.hidden = true;
  elements.nextButton.textContent = position === missions.length ? "一日の結果を見る" : "次の場面へ";

  renderPhraseBank(mission);
  updateBuilder(mission);
  window.scrollTo({ top: 0, behavior: "smooth" });
  elements.missionTitle.focus({ preventScroll: true });
}

function renderPhraseBank(mission) {
  elements.phraseBank.innerHTML = "";

  mission.phrases.forEach((phrase) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "phrase-button";
    button.dataset.id = phrase.id;
    button.textContent = phrase.text;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => togglePhrase(phrase.id));
    elements.phraseBank.appendChild(button);
  });
}

function togglePhrase(phraseId) {
  if (state.answered) {
    return;
  }

  const selectedIndex = state.selectedIds.indexOf(phraseId);
  if (selectedIndex >= 0) {
    state.selectedIds.splice(selectedIndex, 1);
  } else if (state.selectedIds.length < 3) {
    state.selectedIds.push(phraseId);
  }

  updateBuilder(missions[state.currentIndex]);
}

function updateBuilder(mission) {
  elements.responseSlots.innerHTML = "";

  for (let index = 0; index < 3; index += 1) {
    const slot = document.createElement("div");
    const number = document.createElement("span");
    const copy = document.createElement("span");
    const phraseId = state.selectedIds[index];
    const phrase = mission.phrases.find((item) => item.id === phraseId);

    slot.className = `response-slot${phrase ? " is-filled" : ""}`;
    number.className = "slot-number";
    number.textContent = String(index + 1);
    copy.textContent = phrase ? phrase.text : "言葉を選択";
    slot.append(number, copy);
    elements.responseSlots.appendChild(slot);
  }

  elements.selectionCount.textContent = `${state.selectedIds.length} / 3 選択中`;
  elements.clearButton.disabled = state.selectedIds.length === 0 || state.answered;
  elements.submitButton.disabled = state.selectedIds.length !== 3;

  elements.phraseBank.querySelectorAll(".phrase-button").forEach((button) => {
    const isSelected = state.selectedIds.includes(button.dataset.id);
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });
}

function clearSelection() {
  state.selectedIds = [];
  updateBuilder(missions[state.currentIndex]);
}

function submitResponse() {
  if (state.selectedIds.length !== 3 || state.answered) {
    return;
  }

  const mission = missions[state.currentIndex];

  state.answered = true;
  state.records.push({
    time: mission.time,
    title: mission.title
  });

  elements.phraseBank.querySelectorAll(".phrase-button").forEach((button) => {
    const phraseId = button.dataset.id;
    const isUseful = mission.idealIds.includes(phraseId);
    const isSelectedRisky = state.selectedIds.includes(phraseId) && !isUseful;
    button.disabled = true;
    button.classList.remove("is-selected");
    button.classList.toggle("is-useful", isUseful);
    button.classList.toggle("is-risky", isSelectedRisky);
  });

  elements.clearButton.disabled = true;
  elements.feedbackTitle.textContent = "おすすめの要素と見比べよう";
  elements.feedbackText.textContent = mission.feedback;
  elements.modelResponseText.textContent = mission.modelResponse;
  elements.takeawayText.textContent = mission.takeaway;
  elements.feedbackPanel.hidden = false;
  elements.submitButton.hidden = true;
  elements.nextButton.hidden = false;
  elements.nextButton.focus();
}

function goToNextMission() {
  if (state.currentIndex < missions.length - 1) {
    state.currentIndex += 1;
    renderMission();
    return;
  }
  showResult();
}

function showResult() {
  elements.missionPanel.hidden = true;
  elements.resultPanel.hidden = false;
  elements.resultTitle.textContent = "今日の対応を振り返ろう";
  elements.resultMessage.textContent = "8つの場面を最後まで確認しました。伝え方の例を参考に、実際の職場でも事実・相手への影響・次の行動を整理してみましょう。";
  elements.reviewList.innerHTML = "";

  state.records.forEach((record) => {
    const item = document.createElement("div");
    const time = document.createElement("time");
    const title = document.createElement("strong");
    const status = document.createElement("span");

    item.className = "review-item";
    time.className = "review-time";
    time.textContent = record.time;
    title.className = "review-title";
    title.textContent = record.title;
    status.className = "review-status";
    status.textContent = "確認済み";

    item.append(time, title, status);
    elements.reviewList.appendChild(item);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
  elements.resultTitle.focus({ preventScroll: true });
}

elements.startButton.addEventListener("click", startDay);
elements.restartButton.addEventListener("click", startDay);
elements.clearButton.addEventListener("click", clearSelection);
elements.submitButton.addEventListener("click", submitResponse);
elements.nextButton.addEventListener("click", goToNextMission);
