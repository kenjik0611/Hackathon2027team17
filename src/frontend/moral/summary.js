(function () {
  if (!window.MoralResultStore) {
    return;
  }

  const store = window.MoralResultStore;
  const aggregate = store.buildAggregate();
  const markdown = store.buildMarkdown(aggregate);

  const elements = {
    meta: document.getElementById("summary-meta"),
    totalScore: document.getElementById("total-score"),
    completionBox: document.getElementById("completion-box"),
    axisList: document.getElementById("axis-list"),
    themeList: document.getElementById("theme-list"),
    comment: document.getElementById("summary-comment"),
    markdownOutput: document.getElementById("markdown-output"),
    saveMessage: document.getElementById("save-message"),
    copyMarkdown: document.getElementById("copy-markdown"),
    saveRecord: document.getElementById("save-record"),
    radarChart: document.getElementById("radar-chart")
  };

  function render() {
    elements.meta.textContent = `匿名ID: ${aggregate.anonymousId}`;
    elements.totalScore.textContent = String(aggregate.totalScore);
    elements.completionBox.textContent = aggregate.complete
      ? "5テーマすべて完了しています。集計結果を最新結果として保存できます。"
      : `未完了テーマがあります。現在 ${aggregate.completedCount} / ${aggregate.totalThemes} テーマ完了です。`;
    elements.completionBox.classList.toggle("is-incomplete", !aggregate.complete);
    elements.comment.textContent = store.getComment(aggregate);
    elements.markdownOutput.value = markdown;

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

  async function copyMarkdown() {
    try {
      await navigator.clipboard.writeText(elements.markdownOutput.value);
      elements.saveMessage.textContent = "Markdownをコピーしました。";
    } catch (error) {
      elements.markdownOutput.select();
      document.execCommand("copy");
      elements.saveMessage.textContent = "Markdownをコピーしました。";
    }
  }

  function saveRecord() {
    const record = store.saveSubmissionRecord(aggregate, elements.markdownOutput.value);
    elements.saveMessage.textContent = `最新結果として保存しました。最終保存: ${new Date(record.submittedAt).toLocaleString("ja-JP")} / 前回の保存結果は上書きされます。`;
  }

  elements.copyMarkdown.addEventListener("click", copyMarkdown);
  elements.saveRecord.addEventListener("click", saveRecord);
  render();
})();
