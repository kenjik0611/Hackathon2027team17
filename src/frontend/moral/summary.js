(function () {
  if (!window.MoralResultStore) {
    return;
  }

  const store = window.MoralResultStore;
  const aggregate = store.buildAggregate();
  const markdown = store.buildMarkdown(aggregate);
  const resultType = store.getResultType(aggregate);
  const commentDetails = store.getCommentDetails(aggregate);
  const TYPE_SHARE_COLORS = {
    "type-starter": { background: "#edf8ff", chip: "#9bd7ff" },
    "type-monster": { background: "#fff5c2", chip: "#ffcf5a" },
    "type-wildcard": { background: "#f1f5f9", chip: "#ff9f6e" },
    "type-guardian": { background: "#e6fff7", chip: "#66dec7" },
    "type-navigator": { background: "#eaf3ff", chip: "#83c5ff" },
    "type-tuner": { background: "#fff0f6", chip: "#ff9ac5" },
    "type-keeper": { background: "#eef2ff", chip: "#9fb6ff" },
    "type-captain": { background: "#e9fbff", chip: "#8ee8f0" }
  };

  const elements = {
    meta: document.getElementById("summary-meta"),
    totalScore: document.getElementById("total-score"),
    completionBox: document.getElementById("completion-box"),
    scoreRule: document.getElementById("score-rule"),
    axisList: document.getElementById("axis-list"),
    themeList: document.getElementById("theme-list"),
    resultTypeSection: document.getElementById("result-type-section"),
    resultTypeImage: document.getElementById("result-type-image"),
    resultTypeName: document.getElementById("result-type-name"),
    resultTypeDescription: document.getElementById("result-type-description"),
    commentGood: document.getElementById("comment-good"),
    commentImprovement: document.getElementById("comment-improvement"),
    saveMessage: document.getElementById("save-message"),
    saveRecord: document.getElementById("save-record"),
    shareResult: document.getElementById("share-result"),
    shareStatus: document.getElementById("share-status"),
    shareTypeCard: document.getElementById("share-type-card"),
    shareTypeImage: document.getElementById("share-type-image"),
    shareTypeName: document.getElementById("share-type-name"),
    shareTypeDescription: document.getElementById("share-type-description"),
    radarChart: document.getElementById("radar-chart")
  };

  function render() {
    elements.meta.textContent = `匿名ID: ${aggregate.anonymousId}`;
    elements.totalScore.textContent = String(aggregate.totalScore);
    elements.completionBox.textContent = aggregate.complete
      ? "5テーマすべて完了しています。集計結果を最新結果として保存できます。"
      : `未完了テーマがあります。現在 ${aggregate.completedCount} / ${aggregate.totalThemes} テーマ完了です。`;
    elements.completionBox.classList.toggle("is-incomplete", !aggregate.complete);
    elements.scoreRule.textContent = aggregate.complete
      ? "各テーマを100点換算してから平均しているため、5テーマすべてが同じ重みで反映されます。"
      : "完了済みテーマだけを100点換算して平均しています。未完了テーマは総合スコアに含めていません。";
    elements.resultTypeSection.className = `summary-section result-type-section ${resultType.themeClass || "type-starter"}`;
    elements.resultTypeImage.src = resultType.image;
    elements.resultTypeImage.alt = `${resultType.name}のイラスト`;
    elements.resultTypeName.textContent = resultType.name;
    elements.resultTypeDescription.textContent = resultType.description;
    elements.shareTypeCard.className = `share-type-card ${resultType.themeClass || "type-starter"}`;
    elements.shareTypeImage.src = resultType.image;
    elements.shareTypeImage.alt = `${resultType.name}のイラスト`;
    elements.shareTypeName.textContent = resultType.name;
    elements.shareTypeDescription.textContent = resultType.description;
    elements.commentGood.textContent = commentDetails.good;
    elements.commentImprovement.textContent = commentDetails.improvement;

    renderAxisList();
    renderThemeList();
    renderRadarChart();
    renderRecordCount();
  }

  function renderAxisList() {
    elements.axisList.innerHTML = "";

    store.AXES.forEach((axis) => {
      const value = aggregate.axisScores[axis];
      const percent = value.percent === null ? 0 : value.percent;
      const display = value.percent === null ? "未計測" : `${value.percent}点`;

      const item = document.createElement("div");
      item.className = "axis-item";
      item.innerHTML = `
        <div class="axis-heading">
          <span>${axis}</span>
          <span>${display}</span>
        </div>
        <div class="axis-track" aria-hidden="true">
          <div class="axis-bar" style="width: ${percent}%"></div>
        </div>
      `;
      elements.axisList.appendChild(item);
    });
  }

  function renderThemeList() {
    elements.themeList.innerHTML = "";

    aggregate.themeSummaries.forEach((theme) => {
      const item = document.createElement("div");
      const status = theme.completed ? "完了" : "未完了";
      const score = theme.scorePercent === null ? "-" : `${theme.scorePercent}点`;
      item.className = "theme-item";
      item.innerHTML = `
        <div class="theme-heading">
          <span>${theme.name}</span>
          <span class="theme-status ${theme.completed ? "is-complete" : ""}">${status}</span>
        </div>
        <span>スコア: ${score}</span>
      `;
      elements.themeList.appendChild(item);
    });
  }

  function getPoint(center, radius, index, total, scale) {
    const angle = (-90 + (360 / total) * index) * Math.PI / 180;
    return {
      x: center + Math.cos(angle) * radius * scale,
      y: center + Math.sin(angle) * radius * scale
    };
  }

  function pointString(points) {
    return points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  }

  function createSvgElement(name, attributes) {
    const element = document.createElementNS("http://www.w3.org/2000/svg", name);
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    return element;
  }

  function renderRadarChart() {
    const center = 110;
    const radius = 74;
    const total = store.AXES.length;
    elements.radarChart.innerHTML = "";

    [0.25, 0.5, 0.75, 1].forEach((scale) => {
      const points = store.AXES.map((_, index) => getPoint(center, radius, index, total, scale));
      elements.radarChart.appendChild(createSvgElement("polygon", {
        class: "radar-grid",
        points: pointString(points)
      }));
    });

    store.AXES.forEach((axis, index) => {
      const outer = getPoint(center, radius, index, total, 1);
      const label = getPoint(center, radius, index, total, 1.24);

      elements.radarChart.appendChild(createSvgElement("line", {
        class: "radar-axis",
        x1: center,
        y1: center,
        x2: outer.x,
        y2: outer.y
      }));

      const labelElement = createSvgElement("text", {
        class: "radar-label",
        x: label.x,
        y: label.y
      });
      labelElement.textContent = axis;
      elements.radarChart.appendChild(labelElement);
    });

    const dataPoints = store.AXES.map((axis, index) => {
      const value = aggregate.axisScores[axis];
      const scale = value.percent === null ? 0 : value.percent / 100;
      return getPoint(center, radius, index, total, scale);
    });

    elements.radarChart.appendChild(createSvgElement("polygon", {
      class: "radar-shape",
      points: pointString(dataPoints)
    }));

    dataPoints.forEach((point) => {
      elements.radarChart.appendChild(createSvgElement("circle", {
        class: "radar-dot",
        cx: point.x,
        cy: point.y,
        r: 4
      }));
    });
  }

  function renderRecordCount() {
    const [record] = store.getSubmissionRecords();
    elements.saveMessage.textContent = record
      ? `最終保存: ${new Date(record.submittedAt).toLocaleString("ja-JP")} / もう一度保存すると最新結果に更新されます。`
      : "";
  }

  function getScoredAxes() {
    return Object.entries(aggregate.axisScores)
      .filter(([, value]) => value.percent !== null)
      .sort((a, b) => b[1].percent - a[1].percent);
  }

  function formatAxisEntry(entry) {
    if (!entry) {
      return "未計測";
    }
    return `${entry[0]} ${entry[1].percent}点`;
  }

  function getPageUrl() {
    if (window.location.protocol === "http:" || window.location.protocol === "https:") {
      return window.location.href;
    }
    return "";
  }

  function buildShareText() {
    const scoredAxes = getScoredAxes();
    const strongest = scoredAxes[0];
    const weakest = scoredAxes[scoredAxes.length - 1];
    const lines = [
      "【Team17 モラルチェッカー結果】",
      `診断タイプ: ${resultType.name}`,
      resultType.description,
      "",
      `総合スコア: ${aggregate.totalScore}/100`,
      `得意: ${formatAxisEntry(strongest)}`,
      `注意: ${formatAxisEntry(weakest)}`,
      `完了テーマ: ${aggregate.completedCount}/${aggregate.totalThemes}`,
      "",
      "良い点",
      commentDetails.good,
      "",
      "気をつけたい点",
      commentDetails.improvement
    ];

    const pageUrl = getPageUrl();
    if (pageUrl) {
      lines.push("", pageUrl);
    }

    return lines.join("\n");
  }

  function saveRecord() {
    const record = store.saveSubmissionRecord(aggregate, markdown);
    elements.saveMessage.textContent = `最新結果として保存しました。最終保存: ${new Date(record.submittedAt).toLocaleString("ja-JP")} / 前回の保存結果は上書きされます。`;
  }

  function fallbackCopyText(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";
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
    if (navigator.clipboard && window.isSecureContext) {
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

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
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
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("image create failed"));
          return;
        }
        resolve(blob);
      }, "image/png");
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

  async function createResultImageBlob() {
    const colors = TYPE_SHARE_COLORS[resultType.themeClass] || TYPE_SHARE_COLORS["type-starter"];
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const width = 1080;
    const height = 1080;
    const margin = 72;
    const oneLiner = resultType.description.split("。")[0] + "。";

    canvas.width = width;
    canvas.height = height;

    context.fillStyle = colors.background;
    context.fillRect(0, 0, width, height);

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.background);
    gradient.addColorStop(1, "#ffffff");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    fillRoundRect(context, margin, margin, width - margin * 2, height - margin * 2, 34, "#fffdfa");
    strokeRoundRect(context, margin, margin, width - margin * 2, height - margin * 2, 34, "#17202a", 8);

    const image = await loadImage(resultType.image);
    const imageSize = 560;
    context.drawImage(image, (width - imageSize) / 2, 130, imageSize, imageSize);

    context.textAlign = "center";
    context.font = "900 58px sans-serif";
    const chipWidth = Math.min(760, context.measureText(resultType.name).width + 160);
    const chipX = (width - chipWidth) / 2;
    fillRoundRect(context, chipX, 690, chipWidth, 104, 52, colors.chip);
    strokeRoundRect(context, chipX, 690, chipWidth, 104, 52, "#17202a", 6);

    context.fillStyle = "#17202a";
    context.fillText(resultType.name, width / 2, 759);

    context.font = "900 34px sans-serif";
    drawWrappedText(context, oneLiner, width / 2, 875, 780, 50, 2);

    return canvasToBlob(canvas);
  }

  async function shareTextOnly(text, pageUrl) {
    if (navigator.share) {
      await navigator.share({
        title: "Team17 モラルチェッカー結果",
        text,
        url: pageUrl || undefined
      });
      return "shared";
    }

    await copyText(text);
    return "copied";
  }

  async function shareResult() {
    const text = buildShareText();
    const pageUrl = getPageUrl();

    elements.shareResult.disabled = true;
    elements.shareStatus.textContent = "共有画像を作成しています。";

    try {
      const blob = await createResultImageBlob();
      const file = new File([blob], "team17-moral-result.png", { type: "image/png" });

      if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
        await navigator.share({
          title: "Team17 モラルチェッカー結果",
          text,
          files: [file]
        });
        downloadBlob(blob, "team17-moral-result.png");
        elements.shareStatus.textContent = "画像付き共有を実行し、念のため結果画像も保存しました。共有先に画像が出ない場合は保存されたPNGを添付してください。";
        return;
      }

      downloadBlob(blob, "team17-moral-result.png");
      const result = await shareTextOnly(text, pageUrl);
      elements.shareStatus.textContent = result === "shared"
        ? "画像を保存し、共有メニューを開きました。画像も一緒に添付してください。"
        : "結果画像を保存し、共有用テキストをコピーしました。";
    } catch (error) {
      if (error.name === "AbortError") {
        elements.shareStatus.textContent = "共有をキャンセルしました。";
        return;
      }

      try {
        const result = await shareTextOnly(text, pageUrl);
        elements.shareStatus.textContent = result === "shared"
          ? "共有メニューを開きました。画像作成はこの環境では使えませんでした。"
          : "共有用テキストをコピーしました。画像作成はこの環境では使えませんでした。";
      } catch (copyError) {
        elements.shareStatus.textContent = "共有できませんでした。共有文を選択してコピーしてください。";
      }
    } finally {
      elements.shareResult.disabled = false;
    }
  }

  elements.saveRecord.addEventListener("click", saveRecord);
  elements.shareResult.addEventListener("click", shareResult);
  render();
})();
