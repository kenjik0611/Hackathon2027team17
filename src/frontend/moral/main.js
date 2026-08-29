(function () {
  if (!window.MoralResultStore) {
    return;
  }

  const aggregate = window.MoralResultStore.buildAggregate();
  const results = window.MoralResultStore.getThemeResults();
  const progress = window.MoralResultStore.getThemeProgress ? window.MoralResultStore.getThemeProgress() : {};
  const progressSummary = document.getElementById("progress-summary");
  const anonymousLabel = document.getElementById("anonymous-label");

  progressSummary.textContent = `${aggregate.completedCount} / ${aggregate.totalThemes} テーマ完了`;
  anonymousLabel.textContent = `匿名ID: ${aggregate.anonymousId}`;

  window.MoralResultStore.THEMES.forEach((theme) => {
    const isComplete = Boolean(results[theme.id]);
    const themeProgress = progress[theme.id] || null;
    const isInProgress = !isComplete && Boolean(themeProgress);
    const card = document.querySelector(`[data-theme-id="${theme.id}"]`);
    const status = document.querySelector(`[data-theme-status="${theme.id}"]`);

    if (card) {
      card.classList.toggle("is-complete", isComplete);
      card.classList.toggle("is-in-progress", isInProgress);
    }

    if (status) {
      status.textContent = isComplete ? "完了" : isInProgress ? "途中" : "未完了";
    }
  });
})();
