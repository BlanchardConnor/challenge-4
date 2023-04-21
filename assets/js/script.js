const highScores = document.querySelector(".high-scores");
const dropdown = document.querySelector(".dropdown-btn");
const scores = document.querySelector(".scores");
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quitBtn = document.querySelector(".buttons .quit");
const retryBtn = document.querySelector(".buttons .retry");
const questions = document.querySelector(".questions");
const finishScreen = document.querySelector(".finish-screen");
const answers = document.querySelector(".answers");
const timeText = document.querySelector(".timer .timer-txt");
const timeCount = document.querySelector(".timer .timer-sec");

//Shows and hides dropdown menu with highscores //
function showScores() {
    if (scores.style.display === "none") {
        scores.style.display = "block";
    }
    else {
        scores.style.display = "none";
    }
}
dropdown.addEventListener("click", showScores);


// Shows info screen if start button is clicked //
 function showInfo() {
     if (infoBox.style.display === "none") {
         infoBox.style.display = "block";
     }
  else {
     infoBox.style.display = "none";
 }
 }
 startBtn.addEventListener("click", showInfo);


 // Hides info screen if quit button is clicked //
 function hideInfo() {
    if (infoBox.style.display === "block") {
        infoBox.style.display = "none";
    }
 }
 quitBtn.addEventListener("click", hideInfo);

 // if continue button is clicked //
 function continueBtn() {
    if (questions.style.display === "none") {
        questions.style.display = "block";
    }
    else {
        questions.style.display = "none";
    }
 }
 retryBtn.addEventListener("click", continueBtn);