(function () {
  const store = window.OtokogokoroResultStore;

  if (!store) {
    return;
  }

  const aggregate = store.getAggregate();
  const mbtiNames = store.mbtiNames || {};
  const loveTypeNames = store.loveTypeNames || {};
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
      const leftPercent = pair.hasScore ? pair.leftPercent : 0;
      const rightPercent = pair.hasScore ? pair.rightPercent : 0;
      const scoreText = pair.hasScore ? `${leftPercent}% : ${rightPercent}%` : "未測定";
      const balanceClass = !pair.hasScore
        ? "is-empty"
        : leftPercent === rightPercent
          ? "is-balanced"
          : leftPercent > rightPercent
            ? "is-left-leading"
            : "is-right-leading";
      row.className = `axis-row ${balanceClass}`;
      row.style.setProperty("--left-value", leftPercent);
      row.style.setProperty("--right-value", rightPercent);
      row.innerHTML = `
        <div class="axis-row-head">
          <strong>
            <span class="axis-code axis-code-left">${pair.left}</span>
            <span class="axis-slash">/</span>
            <span class="axis-code axis-code-right">${pair.right}</span>
          </strong>
          <span>${pair.leftLabel} vs ${pair.rightLabel}</span>
          <small>${scoreText}</small>
        </div>
        <div class="axis-balance" aria-label="${pair.leftLabel}と${pair.rightLabel}の相性傾向">
          <span class="axis-end axis-end-left">
            <b class="axis-code-left">${pair.left}</b>
            <small>${pair.leftLabel}</small>
          </span>
          <div class="axis-meter">
            <span class="axis-meter-side axis-meter-left">
              <span class="axis-fill"></span>
            </span>
            <span class="axis-center-line" aria-hidden="true"></span>
            <span class="axis-meter-side axis-meter-right">
              <span class="axis-fill"></span>
            </span>
          </div>
          <span class="axis-end axis-end-right">
            <b class="axis-code-right">${pair.right}</b>
            <small>${pair.rightLabel}</small>
          </span>
        </div>
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
    const mbtiName = aggregate.suggestedMbtiName
      || mbtiNames[suggestedMbti]
      || (member && member.mbtiLabel)
      || "";
    const loveTypeName = aggregate.suggestedLoveTypeName
      || loveTypeNames[suggestedLoveType]
      || (member && member.loveTypeLabel)
      || "";

    return {
      mbti: suggestedMbti || (member && member.mbti) || "",
      loveType: suggestedLoveType || (member && member.loveType) || "",
      mbtiName,
      loveTypeName
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

    const sources = getVisualImageSources();
    applyImageSource(mbtiImage, sources.mbti);
    applyImageSource(loveTypeImage, sources.loveType);
  }

  function getVisualImageSources() {
    const codes = getVisualCodes();

    return {
      mbti: {
        primary: getMbtiImageUrl(codes.mbti),
        fallback: buildMbtiImageSrc(codes.mbti),
        alt: `${codes.mbti || "未測定"}のMBTI相性イメージ`
      },
      loveType: {
        primary: getLoveTypeImageUrl(codes.loveType),
        fallback: buildLoveTypeImageSrc(codes.loveType, codes.loveTypeName),
        alt: `${codes.loveType || "未測定"}のLove Type相性イメージ`
      }
    };
  }

  function applyImageSource(image, source) {
    image.onerror = function () {
      image.onerror = null;
      image.src = source.fallback;
    };
    image.src = source.primary || source.fallback;
    image.alt = source.alt;
  }

  function getBestMatchMemberText() {
    const member = aggregate.bestMatchMember;
    const result = aggregate.bestMatchResult;

    if (!member || !result || result.matchPercent === null || result.matchPercent === undefined) {
      return "未測定";
    }

    return `${member.name} ${formatPercent(result.matchPercent)}`;
  }

  function formatTypeName(code, name) {
    if (!isMeasuredCode(code)) {
      return "未測定";
    }

    return name ? `${code} ${name}` : code;
  }

  function formatTypeForSentence(code, name) {
    if (!isMeasuredCode(code)) {
      return "未測定";
    }

    return name ? `${code}（${name}）` : code;
  }

  function getSummaryComment() {
    const codes = getVisualCodes();
    const mbtiText = formatTypeForSentence(aggregate.suggestedMbti, codes.mbtiName);
    const loveTypeText = formatTypeForSentence(aggregate.suggestedLoveType, codes.loveTypeName);

    if (aggregate.completedCount === 0) {
      return "まだ男心編の結果がないため、相性傾向は仮表示です。まずは1人分だけでも遊ぶと、MBTIとLove Typeの方向性が見えるようになります。";
    }

    if (aggregate.completedCount < aggregate.totalMembers) {
      return `現在は${aggregate.completedCount}人分の途中集計です。今のところ一番一致度が高いのは${getBestMatchMemberText()}です。MBTIでは${mbtiText}、Love Typeでは${loveTypeText}寄りの相手とテンポが合いやすそうです。ただし未プレイのメンバーがいるため、全員分を終えると結果が変わる可能性があります。`;
    }

    return `5人分すべての回答を見ると、一番一致度が高いのは${getBestMatchMemberText()}です。MBTIでは${mbtiText}、Love Typeでは${loveTypeText}寄りの相手と価値観のテンポが合いやすそうです。一方で、これは相手を決めつける診断ではなく、会話のきっかけとして見るのがちょうど良いです。`;
  }

  function getPageUrl() {
    if (location.protocol === "http:" || location.protocol === "https:") {
      return location.href;
    }

    return "";
  }

  function canUseShareMenu() {
    return Boolean(navigator.share && location.protocol !== "file:");
  }

  function getShareTitleText() {
    const codes = getVisualCodes();
    const mbtiText = formatTypeName(codes.mbti, codes.mbtiName);
    const loveTypeText = formatTypeName(codes.loveType, codes.loveTypeName);

    if (mbtiText === "未測定" && loveTypeText === "未測定") {
      return "相性傾向はまだ未測定";
    }

    return `${mbtiText} × ${loveTypeText}`;
  }

  function getShareOneLiner() {
    const codes = getVisualCodes();
    const mbtiText = formatTypeForSentence(codes.mbti, codes.mbtiName);
    const loveTypeText = formatTypeForSentence(codes.loveType, codes.loveTypeName);

    if (aggregate.completedCount === 0) {
      return "まずは1人分遊ぶと、相性の方向性が見えてきます。";
    }

    if (aggregate.bestMatchMember && aggregate.bestMatchResult) {
      return `今のところ一番テンポが合いそうなのは${aggregate.bestMatchMember.name}さん。${mbtiText}と${loveTypeText}寄りの相手と相性がよさそうです。`;
    }

    return `${mbtiText}と${loveTypeText}寄りの相手と相性がよさそうです。`;
  }

  function renderSharePreview() {
    const mbtiImage = document.getElementById("share-mbti-art");
    const loveTypeImage = document.getElementById("share-love-art");
    const sources = getVisualImageSources();

    if (mbtiImage) {
      applyImageSource(mbtiImage, sources.mbti);
    }

    if (loveTypeImage) {
      applyImageSource(loveTypeImage, sources.loveType);
    }

    setText("share-title-text", getShareTitleText());
    setText("share-one-liner", getShareOneLiner());
  }

  function buildShareText() {
    const lines = [
      "【Team17 男心理解ゲーム結果】",
      `相性候補: ${getShareTitleText()}`,
      `ひとこと: ${getShareOneLiner()}`,
      `相性トップ: ${getBestMatchMemberText()}`,
      `完了人数: ${aggregate.completedCount}/${aggregate.totalMembers}人`
    ];
    const pageUrl = getPageUrl();

    if (pageUrl) {
      lines.push(pageUrl);
    }

    return lines.join("\n");
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      const copied = document.execCommand("copy");
      if (!copied) {
        throw new Error("copy failed");
      }
    } finally {
      document.body.removeChild(textarea);
    }
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext && location.protocol !== "file:") {
      await navigator.clipboard.writeText(text);
      return;
    }

    fallbackCopyText(text);
  }

  function drawRoundRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
  }

  function fillRoundRect(context, x, y, width, height, radius, fillStyle) {
    drawRoundRect(context, x, y, width, height, radius);
    context.fillStyle = fillStyle;
    context.fill();
  }

  function strokeRoundRect(context, x, y, width, height, radius, strokeStyle, lineWidth) {
    drawRoundRect(context, x, y, width, height, radius);
    context.strokeStyle = strokeStyle;
    context.lineWidth = lineWidth;
    context.stroke();
  }

  function loadDrawableImage(source) {
    return new Promise((resolve) => {
      const primarySrc = source.primary || source.fallback;
      const fallbackSrc = source.fallback;
      const image = new Image();
      let didFallback = false;
      let isResolved = false;

      function resolveImage() {
        if (isResolved) {
          return;
        }
        isResolved = true;
        resolve(image);
      }

      function useFallback() {
        if (isResolved) {
          return;
        }
        if (didFallback || primarySrc === fallbackSrc) {
          resolveImage();
          return;
        }
        didFallback = true;
        image.removeAttribute("crossorigin");
        image.src = fallbackSrc;
      }

      image.onload = resolveImage;
      image.onerror = useFallback;
      image.crossOrigin = "anonymous";
      image.src = primarySrc;
      window.setTimeout(useFallback, 3500);
    });
  }

  function drawContainedImage(context, image, x, y, size) {
    fillRoundRect(context, x, y, size, size, 28, "#ffffff");
    strokeRoundRect(context, x, y, size, size, 28, "#17202a", 7);

    const naturalWidth = image.naturalWidth || image.width || size;
    const naturalHeight = image.naturalHeight || image.height || size;
    const scale = Math.min((size - 24) / naturalWidth, (size - 24) / naturalHeight);
    const drawWidth = naturalWidth * scale;
    const drawHeight = naturalHeight * scale;
    const drawX = x + (size - drawWidth) / 2;
    const drawY = y + (size - drawHeight) / 2;

    context.drawImage(image, drawX, drawY, drawWidth, drawHeight);
  }

  function wrapText(context, text, maxWidth) {
    const lines = [];
    let currentLine = "";

    Array.from(text).forEach((char) => {
      const testLine = currentLine + char;
      if (context.measureText(testLine).width > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = char;
        return;
      }
      currentLine = testLine;
    });

    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  }

  function drawWrappedText(context, text, x, y, maxWidth, lineHeight, maxLines) {
    const lines = wrapText(context, text, maxWidth).slice(0, maxLines);
    lines.forEach((line, index) => {
      context.fillText(line, x, y + lineHeight * index);
    });
    return y + lineHeight * lines.length;
  }

  function canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("image create failed"));
            return;
          }
          resolve(blob);
        }, "image/png");
      } catch (error) {
        reject(error);
      }
    });
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  async function createShareImageBlob() {
    const imageSources = getVisualImageSources();
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const width = 1080;
    const height = 1080;
    const margin = 72;
    const title = getShareTitleText();
    const oneLiner = getShareOneLiner();
    const mbtiImage = await loadDrawableImage(imageSources.mbti);
    const loveTypeImage = await loadDrawableImage(imageSources.loveType);

    canvas.width = width;
    canvas.height = height;

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#fff1df");
    gradient.addColorStop(0.62, "#ffffff");
    gradient.addColorStop(1, "#dffcf5");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    fillRoundRect(context, margin, margin, width - margin * 2, height - margin * 2, 34, "#fffdfa");
    strokeRoundRect(context, margin, margin, width - margin * 2, height - margin * 2, 34, "#17202a", 8);

    context.textAlign = "center";
    context.fillStyle = "#17202a";
    context.font = "900 34px sans-serif";
    context.fillText("Team17 男心理解ゲーム", width / 2, 144);

    const imageSize = 320;
    const mbtiX = 160;
    const loveX = width - 160 - imageSize;
    const imageY = 204;
    drawContainedImage(context, mbtiImage, mbtiX, imageY, imageSize);
    drawContainedImage(context, loveTypeImage, loveX, imageY, imageSize);

    context.font = "900 74px sans-serif";
    context.fillText("×", width / 2, imageY + 190);

    context.font = "900 48px sans-serif";
    const chipWidth = Math.min(880, context.measureText(title).width + 120);
    const chipX = (width - chipWidth) / 2;
    fillRoundRect(context, chipX, 590, chipWidth, 88, 44, "#dffcf5");
    strokeRoundRect(context, chipX, 590, chipWidth, 88, 44, "#17202a", 6);
    context.fillStyle = "#17202a";
    context.fillText(title, width / 2, 648);

    context.font = "900 34px sans-serif";
    drawWrappedText(context, oneLiner, width / 2, 760, 800, 52, 3);

    context.font = "900 28px sans-serif";
    context.fillStyle = "#52606b";
    context.fillText(`相性トップ: ${getBestMatchMemberText()} / 完了人数: ${aggregate.completedCount}/${aggregate.totalMembers}人`, width / 2, 956);

    return canvasToBlob(canvas);
  }

  async function shareTextOnly(text, pageUrl) {
    if (canUseShareMenu()) {
      await navigator.share({
        title: "Team17 男心理解ゲーム結果",
        text,
        url: pageUrl || undefined
      });
      return "shared";
    }

    await copyText(text);
    return "copied";
  }

  async function shareResult() {
    const button = document.getElementById("share-result");
    const status = document.getElementById("share-status");
    const text = buildShareText();
    const pageUrl = getPageUrl();

    if (!button || !status) {
      return;
    }

    button.disabled = true;
    status.textContent = "共有画像を作成しています。";

    try {
      const blob = await createShareImageBlob();
      const file = new File([blob], "team17-otokogokoro-result.png", { type: "image/png" });

      if (canUseShareMenu() && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Team17 男心理解ゲーム結果",
          text,
          files: [file]
        });
        downloadBlob(blob, "team17-otokogokoro-result.png");
        status.textContent = "画像付き共有を実行し、念のため結果画像も保存しました。共有先に画像が出ない場合は保存されたPNGを添付してください。";
        return;
      }

      downloadBlob(blob, "team17-otokogokoro-result.png");
      const result = await shareTextOnly(text, pageUrl);
      status.textContent = result === "shared"
        ? "画像を保存し、共有メニューを開きました。画像も一緒に添付してください。"
        : "結果画像を保存し、共有用テキストをコピーしました。";
    } catch (error) {
      if (error.name === "AbortError") {
        status.textContent = "共有をキャンセルしました。";
        return;
      }

      try {
        const result = await shareTextOnly(text, pageUrl);
        status.textContent = result === "shared"
          ? "共有メニューを開きました。画像作成はこの環境では使えませんでした。"
          : "共有用テキストをコピーしました。画像作成はこの環境では使えませんでした。";
      } catch (copyError) {
        status.textContent = "共有できませんでした。結果画面をスクショして共有してください。";
      }
    } finally {
      button.disabled = false;
    }
  }

  const visualCodes = getVisualCodes();
  setText("completed-count", `${aggregate.completedCount} / ${aggregate.totalMembers}人`);
  setText("best-match-member", getBestMatchMemberText());
  setText("suggested-mbti", formatTypeName(aggregate.suggestedMbti, visualCodes.mbtiName));
  setText("suggested-love-type", formatTypeName(aggregate.suggestedLoveType, visualCodes.loveTypeName));
  setText("best-match-mbti-name", visualCodes.mbtiName || "未測定");
  setText("best-match-love-name", visualCodes.loveTypeName || "未測定");
  setText("summary-comment", getSummaryComment());

  renderBestMatchImages();
  renderSharePreview();
  renderAxisList("mbti-axis-list", aggregate.mbtiPairs);
  renderAxisList("love-type-axis-list", aggregate.loveTypePairs);
  renderMemberList();

  const shareButton = document.getElementById("share-result");
  if (shareButton) {
    shareButton.addEventListener("click", shareResult);
  }
})();
