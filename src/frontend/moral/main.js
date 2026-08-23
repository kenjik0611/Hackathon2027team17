(function initialiseMoralSceneSelect() {
  "use strict";

  const moral = window.Team17Moral;
  if (!moral) {
    return;
  }

  const results = moral.store.getAllParts();
  const completedCount = moral.parts.filter((part) => Boolean(results[part.id])).length;
  const count = document.getElementById("completion-count");
  const overallLink = document.getElementById("overall-result-link");

  document.querySelectorAll("[data-part-id]").forEach((card) => {
    const result = results[card.dataset.partId];
    const status = card.querySelector("[data-scene-status]");
    if (!status) {
      return;
    }

    if (result) {
      status.textContent = `最新 ${result.score} / 100`;
      card.classList.add("is-complete");
    }
  });

  count.textContent = `${completedCount} / ${moral.parts.length}`;
  if (completedCount === moral.parts.length) {
    overallLink.removeAttribute("aria-disabled");
  } else {
    overallLink.addEventListener("click", (event) => event.preventDefault());
  }
})();
