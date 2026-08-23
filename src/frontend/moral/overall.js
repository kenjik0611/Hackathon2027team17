(function initialiseOverallResult() {
  "use strict";

  const moral = window.Team17Moral;
  if (!moral) {
    return;
  }

  const partNames = Object.fromEntries(moral.parts.map((part) => [part.id, part.name]));
  const results = moral.store.getAllParts();
  const result = moral.scoring.evaluateOverall(results);
  const incompletePanel = document.getElementById("incomplete-panel");
  const overallPanel = document.getElementById("overall-panel");

  if (!result.complete) {
    incompletePanel.hidden = false;
    const list = document.getElementById("missing-part-list");
    result.missingPartIds.forEach((partId) => {
      const item = document.createElement("div");
      item.className = "part-score-row";
      item.textContent = `${partNames[partId]}編：未挑戦`;
      list.appendChild(item);
    });
    return;
  }

  overallPanel.hidden = false;
  document.getElementById("type-icon").textContent = result.type.icon;
  document.getElementById("overall-title").textContent = result.type.name;
  document.getElementById("type-description").textContent = result.type.description;
  document.getElementById("type-strength").textContent = result.type.strength;
  document.getElementById("type-next-action").textContent = result.type.nextAction;

  const axisLabels = {
    commonSense: "常識",
    response: "対応力",
    empathy: "思いやり"
  };
  const axisSummary = document.getElementById("axis-summary");
  Object.entries(axisLabels).forEach(([axis, label]) => {
    const item = document.createElement("div");
    item.className = "axis-summary-item";
    const head = document.createElement("div");
    head.className = "axis-summary-head";
    head.innerHTML = `<span>${label}</span><span>${result.axes[axis]} / 100</span>`;
    const track = document.createElement("div");
    track.className = "axis-summary-track";
    const bar = document.createElement("div");
    bar.className = "axis-summary-bar";
    track.appendChild(bar);
    item.append(head, track);
    axisSummary.appendChild(item);
    requestAnimationFrame(() => {
      bar.style.width = `${result.axes[axis]}%`;
    });
  });

  const scoreList = document.getElementById("part-score-list");
  moral.parts.forEach((part) => {
    const item = document.createElement("div");
    item.className = "part-score-row";
    item.innerHTML = `<span>${part.name}編</span><strong>${results[part.id].score} / 100</strong>`;
    scoreList.appendChild(item);
  });

  document.getElementById("clear-results-button").addEventListener("click", () => {
    if (!window.confirm("5パートすべての保存済み結果をリセットします。もう一度解くまで元に戻せません。")) {
      return;
    }

    const status = document.getElementById("reset-status");
    if (moral.store.clearAll()) {
      window.location.href = "main.html";
      return;
    }
    status.hidden = false;
    status.classList.add("is-warning");
    status.textContent = moral.store.getLastError();
  });
})();
