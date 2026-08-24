(function () {
  if (!window.MoralResultStore) {
    return;
  }

  const store = window.MoralResultStore;
  const config = window.MoralResultConfig || {};
  const aggregate = store.buildAggregate();
  const markdown = store.buildMarkdown(aggregate);
  const resultType = store.getResultType(aggregate);
  const commentDetails = store.getCommentDetails(aggregate);
  const spreadsheetEndpoint = (config.spreadsheetEndpoint || "").trim();

  const elements = {
    meta: document.getElementById("summary-meta"),
    totalScore: document.getElementById("total-score"),
    completionBox: document.getElementById("completion-box"),
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
    submitSheet: document.getElementById("submit-sheet"),
    sheetSendStatus: document.getElementById("sheet-send-status"),
    radarChart: document.getElementById("radar-chart")
  };

  function render() {
    elements.meta.textContent = `匿名ID: ${aggregate.anonymousId}`;
    elements.totalScore.textContent = String(aggregate.totalScore);
    elements.completionBox.textContent = aggregate.complete
      ? "5テーマすべて完了しています。集計結果を最新結果として保存できます。"
      : `未完了テーマがあります。現在 ${aggregate.completedCount} / ${aggregate.totalThemes} テーマ完了です。`;
    elements.completionBox.classList.toggle("is-incomplete", !aggregate.complete);
    elements.resultTypeSection.className = `summary-section result-type-section ${resultType.themeClass || "type-starter"}`;
    elements.resultTypeImage.src = resultType.image;
    elements.resultTypeImage.alt = `${resultType.name}のイラスト`;
    elements.resultTypeName.textContent = resultType.name;
    elements.resultTypeDescription.textContent = resultType.description;
    elements.commentGood.textContent = commentDetails.good;
    elements.commentImprovement.textContent = commentDetails.improvement;

    renderAxisList();
    renderThemeList();
    renderRadarChart();
    renderRecordCount();
    renderSheetSubmitState();
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

  function renderSheetSubmitState() {
    if (!spreadsheetEndpoint) {
      elements.submitSheet.disabled = true;
      elements.sheetSendStatus.textContent = "送信先URLが未設定です。";
      return;
    }

    if (!aggregate.complete) {
      elements.submitSheet.disabled = true;
      elements.sheetSendStatus.textContent = `5テーマ完了後に送信できます。現在 ${aggregate.completedCount} / ${aggregate.totalThemes} テーマ完了です。`;
      return;
    }

    elements.submitSheet.disabled = false;
    elements.sheetSendStatus.textContent = "最新結果をスプレッドシートへ送信できます。";
  }

  function saveRecord() {
    const record = store.saveSubmissionRecord(aggregate, markdown);
    elements.saveMessage.textContent = `最新結果として保存しました。最終保存: ${new Date(record.submittedAt).toLocaleString("ja-JP")} / 前回の保存結果は上書きされます。`;
  }

  async function submitSheet() {
    if (!spreadsheetEndpoint || !aggregate.complete) {
      renderSheetSubmitState();
      return;
    }

    const submittedAt = new Date().toISOString();
    const payload = {
      ...store.buildSheetPayload(aggregate, markdown),
      submittedAt
    };

    elements.submitSheet.disabled = true;
    elements.sheetSendStatus.textContent = "送信中です。";

    try {
      const request = {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(payload)
      };

      if (spreadsheetEndpoint.includes("script.google.com")) {
        request.mode = "no-cors";
      }

      const response = await fetch(spreadsheetEndpoint, request);
      if (request.mode !== "no-cors" && !response.ok) {
        throw new Error("Spreadsheet request failed");
      }

      store.saveSubmissionRecord(aggregate, markdown);
      elements.sheetSendStatus.textContent = `送信リクエストを送信しました。最終送信: ${new Date(submittedAt).toLocaleString("ja-JP")}`;
      elements.saveMessage.textContent = "最新結果をローカルにも保存しました。";
    } catch (error) {
      elements.sheetSendStatus.textContent = "送信できませんでした。送信先URLまたは通信環境を確認してください。";
    } finally {
      elements.submitSheet.disabled = !spreadsheetEndpoint || !aggregate.complete;
    }
  }

  elements.saveRecord.addEventListener("click", saveRecord);
  elements.submitSheet.addEventListener("click", submitSheet);
  render();
})();
