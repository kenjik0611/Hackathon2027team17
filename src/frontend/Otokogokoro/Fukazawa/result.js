(function () {
  const store = window.OtokogokoroResultStore;

  const RESULT_TYPES = [
    {
      min: 90,
      name: "深澤マスター",
      image: "assets/result-fukazawa-master.png",
      alt: "深澤マスターの診断イメージ",
      oneLiner: "深澤の欲しい反応をかなり正確に拾えています。",
      good: "相手の小さな変化に気づき、安心感と特別感をちょうどよく返せています。深澤本人から見ると、無理に正解を当てに来るというより、自然に気持ちを受け取ってくれるタイプです。",
      caution: "かなり相性は良いですが、全部を先回りしすぎると少し重く見えることもあります。たまに素直に聞く余白を残すと、さらに自然な距離感になります。"
    },
    {
      min: 80,
      name: "空気読みエース",
      image: "assets/result-fukazawa-ace.png",
      alt: "空気読みエースの診断イメージ",
      oneLiner: "深澤のテンションや空気の変化をかなり読めています。",
      good: "場の空気を壊さずに、深澤が反応してほしいところへ自然に触れられています。強く踏み込みすぎず、でも気づいていることは伝わるバランスが良いです。",
      caution: "あと一歩刺すなら、気遣いだけで終わらせずに『嬉しい』『会いたい』のような自分の気持ちも少し足すと、深澤側はより安心します。"
    },
    {
      min: 70,
      name: "配慮チューナー",
      image: "assets/result-fukazawa-tuner.png",
      alt: "配慮チューナーの診断イメージ",
      oneLiner: "深澤が安心しやすい距離感はだいたい掴めています。",
      good: "雑に扱わず、相手のペースや場面に合わせて返そうとする姿勢があります。深澤本人の主観でも、基本的には話しやすい相手として受け取られやすいです。",
      caution: "ただし、少し無難に寄りすぎる場面があります。深澤は反応を細かく見るので、迷った時ほど『ちゃんと見ている』ことが伝わる一言を足すと良いです。"
    },
    {
      min: 50,
      name: "すれ違い予備軍",
      image: "assets/result-fukazawa-mismatch.png",
      alt: "すれ違い予備軍の診断イメージ",
      oneLiner: "悪くはないけど、深澤の刺さるポイントとは少しズレが出ています。",
      good: "相手に配慮しようとする選択はできています。大きく外しているわけではないので、深澤側も嫌な印象までは持ちにくいです。",
      caution: "一方で、深澤が本当に見てほしい変化や、言葉にしてほしい安心感を拾いきれていない場面があります。『何を言えば喜ぶか』より『何を不安に思っていそうか』を考えると近づきます。"
    },
    {
      min: 0,
      name: "伸びしろワイルドカード",
      image: "assets/result-fukazawa-wildcard.png",
      alt: "伸びしろワイルドカードの診断イメージ",
      oneLiner: "今のところ、深澤の感情のツボとはかなりズレています。",
      good: "まったく可能性がないわけではありませんが、深澤本人の好みから見ると、安心感や特別感の出し方がまだ弱いです。",
      caution: "よかれと思った距離感が、深澤側には少し冷たく見えたり、逆に雑に扱われたように見えたりする可能性があります。まずは相手の小さな変化に気づいたら、軽く言葉にするところから直すのが良いです。"
    }
  ];

  function getResultType(percent) {
    const score = Number(percent);
    return RESULT_TYPES.find((type) => score >= type.min) || RESULT_TYPES[RESULT_TYPES.length - 1];
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function renderEmptyState(result) {
    const answeredCount = result ? result.answeredCount : 0;
    const scoreText = answeredCount > 0 ? `${answeredCount} / 10問 回答中` : "未測定";
    const type = RESULT_TYPES[RESULT_TYPES.length - 1];
    const image = document.getElementById("type-image");

    setText("score-text", scoreText);
    setText("personal-result-title", "まだ診断できません");
    setText("one-liner", "10問すべて回答すると、深澤理解タイプが表示されます。");
    setText("good-point", "途中結果は保存されていますが、個人結果は最後まで回答してから見るのがおすすめです。");
    setText("caution-point", "まだ回答数が足りないため、タイプ名やコメントは確定していません。");

    if (image) {
      image.src = type.image;
      image.alt = "未完了状態の診断イメージ";
    }
  }

  function renderResult(result) {
    const percent = result.matchPercent ?? Math.round((result.matchScore / result.maxMatchScore) * 100);
    const type = getResultType(percent);
    const image = document.getElementById("type-image");

    setText("score-text", `${percent} / 100`);
    setText("personal-result-title", type.name);
    setText("one-liner", type.oneLiner);
    setText("good-point", type.good);
    setText("caution-point", type.caution);

    if (image) {
      image.src = type.image;
      image.alt = type.alt;
    }
  }

  if (!store) {
    renderEmptyState(null);
    return;
  }

  const result = store.getMemberResult("fukazawa");
  const progress = typeof store.getMemberProgress === "function" ? store.getMemberProgress("fukazawa") : null;

  if (!result || !result.isComplete) {
    renderEmptyState(progress);
    return;
  }

  renderResult(result);
})();
