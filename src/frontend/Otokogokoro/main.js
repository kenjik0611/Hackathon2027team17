(function () {
  const store = window.OtokogokoroResultStore;

  if (!store) {
    return;
  }

  const aggregate = store.getAggregate();
  const summaryElement = document.getElementById("insight-progress-summary");
  const noteElement = document.getElementById("insight-progress-note");

  if (summaryElement) {
    summaryElement.textContent = `${aggregate.completedCount} / ${aggregate.totalMembers}人 完了`;
  }

  if (noteElement) {
    noteElement.textContent = aggregate.completedCount > 0
      ? `総合一致度 ${aggregate.overallMatchPercent}% / 未プレイ ${aggregate.incompleteMembers.length}人`
      : "一致度はメンバーごとに保存されます";
  }

  document.querySelectorAll(".scene-card[data-member-id]").forEach((card) => {
    const memberId = card.dataset.memberId;
    const statusElement = card.querySelector(`[data-member-status="${memberId}"]`);
    const result = aggregate.memberResults[memberId];

    if (!statusElement) {
      return;
    }

    if (result && result.isComplete) {
      card.classList.add("is-complete");
      statusElement.classList.add("is-complete");
      statusElement.textContent = "完了";
      statusElement.title = `一致度 ${result.matchPercent ?? 0}%`;
      statusElement.setAttribute("aria-label", `完了。一致度 ${result.matchPercent ?? 0}%`);
      return;
    }

    if (result && result.answeredCount > 0) {
      statusElement.classList.add("is-progress");
      statusElement.textContent = "途中";
      statusElement.title = `${result.answeredCount} / ${result.questionCount || "?"}問 回答済み`;
      statusElement.setAttribute("aria-label", `途中。${result.answeredCount} / ${result.questionCount || "?"}問 回答済み`);
      return;
    }

    statusElement.textContent = "未完了";
    statusElement.title = "まだ回答していません";
    statusElement.setAttribute("aria-label", "未完了。まだ回答していません");
  });
})();
