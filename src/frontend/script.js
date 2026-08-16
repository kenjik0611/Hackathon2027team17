const modes = {
  moral: {
    description: "日常の迷いやすい場面で、相手や周囲に配慮した選択を選びます。"
  },
  insight: {
    description: "恋愛・友人関係・会話で起きやすい受け取り方を、決めつけずに読む練習をします。"
  }
};

const modeEntryPages = {
  moral: "moral/main.html",
  insight: "Otokogokoro/main.html"
};

const elements = {
  modeButtons: document.querySelectorAll(".mode-tab"),
  modeDescription: document.getElementById("mode-description"),
  startButton: document.getElementById("start-button")
};

const state = {
  selectedMode: "moral"
};

function updateModeUI() {
  const mode = modes[state.selectedMode];
  elements.modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === state.selectedMode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  elements.modeDescription.textContent = mode.description;
  elements.modeDescription.classList.toggle("insight", state.selectedMode === "insight");
}

elements.modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    state.selectedMode = button.dataset.mode;
    updateModeUI();
  });
});

elements.startButton.addEventListener("click", () => {
  window.location.href = modeEntryPages[state.selectedMode];
});

updateModeUI();
