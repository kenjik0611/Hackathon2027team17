(function () {
  const store = window.OtokogokoroResultStore;

  if (!store) {
    return;
  }

  const aggregate = store.getAggregate();
  const MBTI_IMAGE_URLS = {
    INTJ: "https://www.16personalities.com/static/images/types/headers/architect-mobile.svg",
    INTP: "https://www.16personalities.com/static/images/types/headers/logician-mobile.svg",
    ENTJ: "https://www.16personalities.com/static/images/types/headers/commander-mobile.svg",
    ENTP: "https://www.16personalities.com/static/images/types/headers/debater-mobile.svg",
    INFJ: "https://www.16personalities.com/static/images/types/headers/advocate-mobile.svg",
    INFP: "https://www.16personalities.com/static/images/types/headers/mediator-mobile.svg",
    ENFJ: "https://www.16personalities.com/static/images/types/headers/protagonist-mobile.svg",
    ENFP: "https://www.16personalities.com/static/images/types/headers/campaigner-mobile.svg",
    ISTJ: "https://www.16personalities.com/static/images/types/headers/logistician-mobile.svg",
    ISFJ: "https://www.16personalities.com/static/images/types/headers/defender-mobile.svg",
    ESTJ: "https://www.16personalities.com/static/images/types/headers/executive-mobile.svg",
    ESFJ: "https://www.16personalities.com/static/images/types/headers/consul-mobile.svg",
    ISTP: "https://www.16personalities.com/static/images/types/headers/virtuoso-mobile.svg",
    ISFP: "https://www.16personalities.com/static/images/types/headers/adventurer-mobile.svg",
    ESTP: "https://www.16personalities.com/static/images/types/headers/entrepreneur-mobile.svg",
    ESFP: "https://www.16personalities.com/static/images/types/headers/entertainer-mobile.svg"
  };

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function formatPercent(value) {
    return value === null || value === undefined ? "未測定" : `${value}%`;
  }

  function isMeasuredCode(value) {
    return Boolean(value && value !== "未測定" && !value.includes("-"));
  }

  function renderAxisList(elementId, pairs) {
    const container = document.getElementById(elementId);
    if (!container) {
      return;
    }

    container.innerHTML = "";

    pairs.forEach((pair) => {
      const row = document.createElement("div");
      row.className = "axis-row";
      const scoreText = pair.hasScore ? `${pair.leftPercent}% / ${pair.rightPercent}%` : "未測定";
      row.innerHTML = `
        <strong>${pair.left}/${pair.right}</strong>
        <span>${pair.leftLabel} / ${pair.rightLabel}</span>
        <small>${scoreText}</small>
      `;
      container.appendChild(row);
    });
  }

  function renderMemberList() {
    return;
  }

  function getVisualCodes() {
    const suggestedMbti = isMeasuredCode(aggregate.suggestedMbti) ? aggregate.suggestedMbti : "";
    const suggestedLoveType = isMeasuredCode(aggregate.suggestedLoveType) ? aggregate.suggestedLoveType : "";
    const member = aggregate.bestMatchMember;

    return {
      mbti: suggestedMbti || (member && member.mbti) || "",
      loveType: suggestedLoveType || (member && member.loveType) || "",
      loveTypeName: aggregate.suggestedLoveTypeName || (member && member.loveTypeLabel) || ""
    };
  }

  function getMbtiVisual(mbti) {
    const code = String(mbti || "").toUpperCase();

    if (code[1] === "N" && code[2] === "T") {
      return {
        group: "分析家",
        symbol: "NT",
        primary: "#7c5cff",
        secondary: "#20c997",
        soft: "#eee9ff",
        accent: "#ffcf5a",
        motif: "strategy"
      };
    }

    if (code[1] === "N" && code[2] === "F") {
      return {
        group: "外交官",
        symbol: "NF",
        primary: "#ff6b9a",
        secondary: "#00a896",
        soft: "#ffeaf2",
        accent: "#ffcf5a",
        motif: "heart"
      };
    }

    if (code[1] === "S" && code[3] === "J") {
      return {
        group: "番人",
        symbol: "SJ",
        primary: "#00a896",
        secondary: "#4cc9f0",
        soft: "#e6fbf7",
        accent: "#ff8a3d",
        motif: "shield"
      };
    }

    if (code[1] === "S" && code[3] === "P") {
      return {
        group: "探検家",
        symbol: "SP",
        primary: "#ff8a3d",
        secondary: "#4cc9f0",
        soft: "#fff1df",
        accent: "#ffd1df",
        motif: "spark"
      };
    }

    return {
      group: "未測定",
      symbol: "--",
      primary: "#00a896",
      secondary: "#ff8a3d",
      soft: "#fff8f3",
      accent: "#ffcf5a",
      motif: "unknown"
    };
  }

  function getLoveTypeMood(loveType) {
    const code = String(loveType || "").toUpperCase();
    const group = code.slice(0, 2);

    if (group === "LC") {
      return { label: "甘えん坊リーダー", symbol: "LC", color: "#ffcf5a" };
    }

    if (group === "LA") {
      return { label: "守護型リーダー", symbol: "LA", color: "#dffcf5" };
    }

    if (group === "FC") {
      return { label: "甘えん坊フォロワー", symbol: "FC", color: "#ffd1df" };
    }

    if (group === "FA") {
      return { label: "献身型フォロワー", symbol: "FA", color: "#eefcf8" };
    }

    return { label: "相性傾向", symbol: "??", color: "#ffffff" };
  }

  function createSvgDataUrl(svg) {
    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  }

  function getMbtiImageUrl(mbti) {
    return MBTI_IMAGE_URLS[String(mbti || "").toUpperCase()] || "";
  }

  function getLoveTypeImageUrl(loveType) {
    const code = String(loveType || "").toUpperCase();

    if (!isMeasuredCode(code)) {
      return "";
    }

    return `https://assets.lovetype16.net/public/images/personalities/${code}.webp`;
  }

  function buildMbtiImageSrc(mbti) {
    const code = mbti || "--";
    const visual = getMbtiVisual(code);
    const title = aggregate.completedCount > 0 ? code : "MBTI";

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420">
        <rect width="420" height="420" fill="${visual.soft}"/>
        <path d="M0 96c52-40 112-52 180-30 74 24 114 4 170-36 34-24 54-18 70-6v396H0Z" fill="${visual.secondary}" opacity="0.34"/>
        <path d="M38 332c36-74 94-102 164-74 54 22 88 56 154 28 24-10 46-8 64 8v126H38Z" fill="${visual.primary}" opacity="0.28"/>
        <circle cx="90" cy="92" r="34" fill="${visual.accent}" stroke="#17202a" stroke-width="8"/>
        <rect x="84" y="112" width="252" height="210" rx="28" fill="#ffffff" stroke="#17202a" stroke-width="9"/>
        <circle cx="210" cy="198" r="58" fill="${visual.primary}" stroke="#17202a" stroke-width="9"/>
        <path d="M166 252c20-30 68-30 88 0" fill="none" stroke="#17202a" stroke-width="9" stroke-linecap="round"/>
        <circle cx="188" cy="190" r="7" fill="#17202a"/>
        <circle cx="232" cy="190" r="7" fill="#17202a"/>
        <text x="210" y="74" text-anchor="middle" fill="#17202a" font-family="Arial, sans-serif" font-size="28" font-weight="900">${visual.group}</text>
        <text x="210" y="378" text-anchor="middle" fill="#17202a" font-family="Arial, sans-serif" font-size="52" font-weight="900">${title}</text>
        <text x="210" y="224" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="32" font-weight="900">${visual.symbol}</text>
      </svg>
    `;

    return createSvgDataUrl(svg);
  }

  function buildLoveTypeImageSrc(loveType, loveTypeName) {
    const code = loveType || "----";
    const mood = getLoveTypeMood(code);
    const title = aggregate.completedCount > 0 ? code : "LOVE";
    const name = loveTypeName || mood.label;

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 420">
        <rect width="420" height="420" fill="#fff1df"/>
        <path d="M0 74c68-42 128-44 192-18 72 30 116 12 178-26 26-16 40-12 50-2v392H0Z" fill="${mood.color}" opacity="0.62"/>
        <path d="M40 334c36-82 92-112 164-76 66 34 100 64 164 22 20-14 38-12 52 0v140H40Z" fill="#ffd1df" opacity="0.72"/>
        <circle cx="334" cy="92" r="34" fill="#ffcf5a" stroke="#17202a" stroke-width="8"/>
        <rect x="84" y="112" width="252" height="210" rx="28" fill="#ffffff" stroke="#17202a" stroke-width="9"/>
        <path d="M210 170c-36-32-76-10-72 28 5 56 72 78 72 78s67-22 72-78c4-38-36-60-72-28Z" fill="#ff6b9a" stroke="#17202a" stroke-width="9" stroke-linejoin="round"/>
        <text x="210" y="74" text-anchor="middle" fill="#17202a" font-family="Arial, sans-serif" font-size="26" font-weight="900">${mood.label}</text>
        <text x="210" y="374" text-anchor="middle" fill="#17202a" font-family="Arial, sans-serif" font-size="48" font-weight="900">${title}</text>
        <text x="210" y="222" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="32" font-weight="900">${mood.symbol}</text>
        <text x="210" y="306" text-anchor="middle" fill="#17202a" font-family="Arial, sans-serif" font-size="20" font-weight="900">${name}</text>
      </svg>
    `;

    return createSvgDataUrl(svg);
  }

  function renderBestMatchImages() {
    const mbtiImage = document.getElementById("best-match-mbti-art");
    const loveTypeImage = document.getElementById("best-match-love-art");

    if (!mbtiImage || !loveTypeImage) {
      return;
    }

    const codes = getVisualCodes();
    const fallbackMbtiSrc = buildMbtiImageSrc(codes.mbti);
    const fallbackLoveTypeSrc = buildLoveTypeImageSrc(codes.loveType, codes.loveTypeName);

    mbtiImage.onerror = function () {
      mbtiImage.onerror = null;
      mbtiImage.src = fallbackMbtiSrc;
    };
    loveTypeImage.onerror = function () {
      loveTypeImage.onerror = null;
      loveTypeImage.src = fallbackLoveTypeSrc;
    };

    mbtiImage.src = getMbtiImageUrl(codes.mbti) || fallbackMbtiSrc;
    mbtiImage.alt = `${codes.mbti || "未測定"}のMBTI相性イメージ`;
    loveTypeImage.src = getLoveTypeImageUrl(codes.loveType) || fallbackLoveTypeSrc;
    loveTypeImage.alt = `${codes.loveType || "未測定"}のLove Type相性イメージ`;
  }

  function getBestMatchMemberText() {
    const member = aggregate.bestMatchMember;
    const result = aggregate.bestMatchResult;

    if (!member || !result || result.matchPercent === null || result.matchPercent === undefined) {
      return "未測定";
    }

    return `${member.name} ${formatPercent(result.matchPercent)}`;
  }

  function getSummaryComment() {
    if (aggregate.completedCount === 0) {
      return "まだ男心編の結果がないため、相性傾向は仮表示です。まずは1人分だけでも遊ぶと、MBTIとLove Typeの方向性が見えるようになります。";
    }

    if (aggregate.completedCount < aggregate.totalMembers) {
      return `現在は${aggregate.completedCount}人分の途中集計です。今のところ一番一致度が高いのは${getBestMatchMemberText()}です。MBTIでは${aggregate.suggestedMbti}、Love Typeでは${aggregate.suggestedLoveType}寄りの相手とテンポが合いやすそうです。ただし未プレイのメンバーがいるため、全員分を終えると結果が変わる可能性があります。`;
    }

    return `5人分すべての回答を見ると、一番一致度が高いのは${getBestMatchMemberText()}です。MBTIでは${aggregate.suggestedMbti}、Love Typeでは${aggregate.suggestedLoveType}寄りの相手と価値観のテンポが合いやすそうです。一方で、これは相手を決めつける診断ではなく、会話のきっかけとして見るのがちょうど良いです。`;
  }

  setText("completed-count", `${aggregate.completedCount} / ${aggregate.totalMembers}人`);
  setText("best-match-member", getBestMatchMemberText());
  setText("suggested-mbti", aggregate.suggestedMbti);
  setText("suggested-love-type", aggregate.suggestedLoveTypeName
    ? `${aggregate.suggestedLoveType} ${aggregate.suggestedLoveTypeName}`
    : aggregate.suggestedLoveType);
  setText("summary-comment", getSummaryComment());

  renderBestMatchImages();
  renderAxisList("mbti-axis-list", aggregate.mbtiPairs);
  renderAxisList("love-type-axis-list", aggregate.loveTypePairs);
  renderMemberList();
})();
