const introPanel = document.getElementById("intro-panel");
const quizPanel = document.getElementById("quiz-panel");
const startButton = document.getElementById("start-button");
const backProfileButton = document.getElementById("back-profile-button");

function showQuiz() {
  introPanel.hidden = true;
  quizPanel.hidden = false;
  quizPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showProfile() {
  quizPanel.hidden = true;
  introPanel.hidden = false;
  introPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

startButton.addEventListener("click", showQuiz);
backProfileButton.addEventListener("click", showProfile);
