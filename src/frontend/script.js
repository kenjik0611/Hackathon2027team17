function checkMoral(score) {
  const result = document.getElementById("result");

  if (score === 100) {
    result.innerHTML = "あなたのモラル度は100点！😇<br>完璧なモラルの持ち主です！";
  } 
  else if (score === 50) {
    result.innerHTML = "あなたのモラル度は50点！🙂<br>普通くらいのモラルです！";
  } 
  else if (score === 25) {
    result.innerHTML = "あなたのモラル度は25点！😅<br>ちょっと危ないかも...";
  } 
  else {
    result.innerHTML = "あなたのモラル度は0点！😈<br>モラルはどこへ...";
  }
}