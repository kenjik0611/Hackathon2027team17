(function () {
  "use strict";

  const overallStore = window.OverallResultStore;
  const moralStore = window.MoralResultStore;
  const insightStore = window.OtokogokoroResultStore;
  const elements = {
    statusPanel: document.querySelector(".status-panel"),
    statusChip: document.getElementById("status-chip"),
    statusTitle: document.getElementById("overall-status-title"),
    statusDescription: document.getElementById("status-description"),
    completionTotal: document.getElementById("completion-total"),
    moralCompletion: document.getElementById("moral-completion"),
    insightCompletion: document.getElementById("insight-completion"),
    incompleteList: document.getElementById("incomplete-list"),
    moralScore: document.getElementById("moral-score"),
    moralType: document.getElementById("moral-type"),
    moralTypeDescription: document.getElementById("moral-type-description"),
    moralGood: document.getElementById("moral-good"),
    moralImprovement: document.getElementById("moral-improvement"),
    moralAxisList: document.getElementById("moral-axis-list"),
    moralThemeBody: document.getElementById("moral-theme-body"),
    insightMatch: document.getElementById("insight-match"),
    insightBest: document.getElementById("insight-best"),
    insightMbti: document.getElementById("insight-mbti"),
    insightLove: document.getElementById("insight-love"),
    insightMemberBody: document.getElementById("insight-member-body"),
    profileCopy: document.getElementById("profile-copy"),
    downloadButton: document.getElementById("download-result"),
    downloadStatus: document.getElementById("download-status")
  };

  function formatScore(value, suffix) {
    return value === null || value === undefined ? "未測定" : `${value}${suffix}`;
  }

  function getStatusLabel(status) {
    if (status === "complete") {
      return "完了";
    }
    if (status === "in_progress") {
      return "途中";
    }
    return "未着手";
  }

  function createStatusBadge(status) {
    const badge = document.createElement("span");
    badge.className = `table-status table-status-${status}`;
    badge.textContent = getStatusLabel(status);
    return badge;
  }

  function renderOverallStatus(snapshot) {
    elements.statusPanel.classList.toggle("is-complete", snapshot.status === "complete");
    elements.statusPanel.classList.toggle("is-empty", !snapshot.hasResults);
    elements.completionTotal.textContent = `${snapshot.completedItemCount} / ${snapshot.totalItemCount}`;
    elements.moralCompletion.textContent = `${snapshot.moral.completedCount} / ${snapshot.moral.totalThemes}テーマ`;
    elements.insightCompletion.textContent = `${snapshot.insight.completedCount} / ${snapshot.insight.totalMembers}人`;

    if (!snapshot.hasResults) {
      elements.statusChip.textContent = "未測定";
      elements.statusTitle.textContent = "診断結果はまだありません";
      elements.statusDescription.textContent = "モラル編または男心編を1項目完了すると、途中診断を確認してファイルへ保存できます。";
      return;
    }

    elements.statusChip.textContent = snapshot.statusLabel;
    elements.statusTitle.textContent = snapshot.status === "complete"
      ? "両編の診断が完了しました"
      : "現在の回答から途中診断を表示しています";
    elements.statusDescription.textContent = snapshot.status === "complete"
      ? "モラル編5テーマと男心編5人分をもとにした結果です。"
      : "未完了項目を回答すると、スコア・相性候補・総合プロフィールが更新されます。";
  }

  function renderIncompleteItems(snapshot) {
    elements.incompleteList.replaceChildren();

    if (snapshot.incompleteItems.length === 0) {
      const completeMessage = document.createElement("p");
      completeMessage.className = "complete-message";
      completeMessage.textContent = "未完了項目はありません。両編すべて完了しています。";
      elements.incompleteList.appendChild(completeMessage);
      return;
    }

    snapshot.incompleteItems.forEach((item) => {
      const link = document.createElement("a");
      const copy = document.createElement("span");
      const section = document.createElement("small");
      const name = document.createElement("strong");

      link.className = `incomplete-item incomplete-item-${item.status}`;
      link.href = item.href;
      section.textContent = item.section;
      name.textContent = item.name;
      copy.append(section, name);
      link.append(copy, createStatusBadge(item.status));
      elements.incompleteList.appendChild(link);
    });
  }

  function renderMoralResult(moral) {
    elements.moralScore.textContent = formatScore(moral.totalScore, " / 100");
    elements.moralType.textContent = moral.resultType ? moral.resultType.name : "未測定";
    elements.moralTypeDescription.textContent = moral.resultType ? moral.resultType.description : "モラル編を1テーマ完了すると表示されます。";
    elements.moralGood.textContent = moral.comments && moral.comments.good ? moral.comments.good : "未測定です。";
    elements.moralImprovement.textContent = moral.comments && moral.comments.improvement ? moral.comments.improvement : "未測定です。";

    elements.moralAxisList.replaceChildren();
    moral.axes.forEach((axis) => {
      const row = document.createElement("div");
      const heading = document.createElement("div");
      const name = document.createElement("span");
      const value = document.createElement("strong");
      const track = document.createElement("div");
      const bar = document.createElement("span");
      const percent = axis.percent === null ? 0 : axis.percent;

      row.className = `score-row${axis.percent === null ? " is-unmeasured" : ""}`;
      heading.className = "score-row-heading";
      name.textContent = axis.name;
      value.textContent = formatScore(axis.percent, "点");
      heading.append(name, value);
      track.className = "score-track";
      track.setAttribute("aria-hidden", "true");
      bar.className = "score-bar";
      bar.style.width = `${percent}%`;
      track.appendChild(bar);
      row.append(heading, track);
      elements.moralAxisList.appendChild(row);
    });

    elements.moralThemeBody.replaceChildren();
    moral.themes.forEach((theme) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("th");
      const statusCell = document.createElement("td");
      const scoreCell = document.createElement("td");

      nameCell.scope = "row";
      nameCell.textContent = theme.name;
      statusCell.appendChild(createStatusBadge(theme.status));
      scoreCell.textContent = formatScore(theme.scorePercent, "点");
      row.append(nameCell, statusCell, scoreCell);
      elements.moralThemeBody.appendChild(row);
    });
  }

  function renderInsightResult(insight) {
    elements.insightMatch.textContent = formatScore(insight.overallMatchPercent, "%");
    elements.insightBest.textContent = insight.bestMatch
      ? `${insight.bestMatch.name} ${insight.bestMatch.matchPercent}%`
      : "未測定";
    elements.insightMbti.textContent = insight.suggestedMbti;
    elements.insightLove.textContent = insight.suggestedLoveType;

    elements.insightMemberBody.replaceChildren();
    insight.members.forEach((member) => {
      const row = document.createElement("tr");
      const nameCell = document.createElement("th");
      const statusCell = document.createElement("td");
      const scoreCell = document.createElement("td");

      nameCell.scope = "row";
      nameCell.textContent = member.name;
      statusCell.appendChild(createStatusBadge(member.status));
      scoreCell.textContent = formatScore(member.matchPercent, "%");
      row.append(nameCell, statusCell, scoreCell);
      elements.insightMemberBody.appendChild(row);
    });
  }

  function renderProfile(profile) {
    elements.profileCopy.replaceChildren();
    profile.forEach((sentence) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = sentence;
      elements.profileCopy.appendChild(paragraph);
    });
  }

  function createCurrentSnapshot() {
    return overallStore.createSnapshot(moralStore, insightStore);
  }

  function renderPage() {
    try {
      const snapshot = createCurrentSnapshot();
      renderOverallStatus(snapshot);
      renderIncompleteItems(snapshot);
      renderMoralResult(snapshot.moral);
      renderInsightResult(snapshot.insight);
      renderProfile(snapshot.profile);
      elements.downloadButton.disabled = !snapshot.hasResults;
      if (!snapshot.hasResults) {
        elements.downloadStatus.textContent = "1項目以上完了するとダウンロードできます。";
      }
      return snapshot;
    } catch (error) {
      elements.statusChip.textContent = "読込エラー";
      elements.statusTitle.textContent = "診断結果を読み込めませんでした";
      elements.statusDescription.textContent = "ページを再読み込みしても解消しない場合は、トップ画面からもう一度開いてください。";
      elements.downloadButton.disabled = true;
      elements.downloadStatus.textContent = "結果データを読み込めないため、ファイルを作成できません。";
      return null;
    }
  }

  function downloadTextFile(content, filename) {
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  function downloadResult() {
    elements.downloadButton.disabled = true;
    elements.downloadStatus.textContent = "診断結果ファイルを作成しています。";

    try {
      const snapshot = createCurrentSnapshot();
      if (!snapshot.hasResults) {
        renderPage();
        return;
      }

      const generatedAt = new Date();
      const markdown = overallStore.buildOkfMarkdown(snapshot, generatedAt);
      const filename = overallStore.buildFilename(generatedAt);
      downloadTextFile(markdown, filename);
      elements.downloadStatus.textContent = `${filename} を保存しました。外部への送信は行っていません。`;
    } catch (error) {
      elements.downloadStatus.textContent = "ファイルを作成できませんでした。ページを再読み込みして、もう一度お試しください。";
    } finally {
      const snapshot = renderPage();
      elements.downloadButton.disabled = !(snapshot && snapshot.hasResults);
    }
  }

  if (!overallStore || !moralStore || !insightStore) {
    elements.statusChip.textContent = "読込エラー";
    elements.statusTitle.textContent = "必要な集計処理を読み込めませんでした";
    elements.statusDescription.textContent = "トップ画面から総合診断結果を開き直してください。";
    elements.downloadStatus.textContent = "結果データを読み込めないため、ファイルを作成できません。";
  } else {
    elements.downloadButton.addEventListener("click", downloadResult);
    window.addEventListener("pageshow", renderPage);
    window.addEventListener("storage", renderPage);
    renderPage();
  }
})();
