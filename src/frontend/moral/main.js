(function () {
  if (!window.MoralResultStore) {
    return;
  }

  const aggregate = window.MoralResultStore.buildAggregate();
  const results = window.MoralResultStore.getThemeResults();
  const progressSummary = document.getElementById("progress-summary");
  const anonymousLabel = document.getElementById("anonymous-label");

  progressSummary.textContent = `${aggregate.completedCount} / ${aggregate.totalThemes} テーマ完了`;
  anonymousLabel.textContent = `匿名ID: ${aggregate.anonymousId}`;

  window.MoralResultStore.THEMES.forEach((theme) => {
    const isComplete = Boolean(results[theme.id]);
    const card = document.querySelector(`[data-theme-id="${theme.id}"]`);
    const status = document.querySelector(`[data-theme-status="${theme.id}"]`);

    if (card) {
      card.classList.toggle("is-complete", isComplete);
    }

    if (status) {
      status.textContent = isComplete ? "完了" : "未完了";
    }
  });
})();
