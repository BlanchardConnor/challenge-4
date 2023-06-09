// Collecting required HTML elements //
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .retry");
const quizBox = document.querySelector(".quiz-box")
const finishScreen = document.querySelector(".finish-screen");
const timeText = document.querySelector(".timer .timer-txt");
const timeCount = quizBox.querySelector(".timer .timer-sec");
const timeLine = quizBox.querySelector(".timer .time-line");
const bottomQueCounter = document.querySelector("footer .total-que");
const answers = document.querySelector(".answers");

// ------------------------------------------------------------------------------------------------------- //

// Shows and hides dropdown menu with highscores //
const highScores = document.querySelector(".high-scores");
const dropdown = document.querySelector(".dropdown-btn");
const scores = document.querySelector(".scores");

function showScores() {
    if (scores.style.display === "none") {
        scores.style.display = "block";
    }
    else {
        scores.style.display = "none";
    }
}
dropdown.addEventListener("click", showScores);

 startBtn.onclick = ()=> {
    infoBox.classList.add("activeInfo");
 }

// ------------------------------------------------------------------------------------------------------- //

 // Hides info screen if quit button is clicked //
 quitBtn.onclick = ()=> {
infoBox.classList.remove("activeInfo");
 }

 // ... if continue button is clicked //
 continueBtn.onclick = ()=> {
    infoBox.classList.remove("activeInfo"); // hides info screen //
    quizBox.classList.add("activeQuiz"); // shows quiz box //
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
}

let questionCnt = 0;
let questionNumb = 1;
let counter;
let timeVaule = 15;
let widthValue = 0;
const restartQuiz = finishScreen.querySelector(".buttons .retry");
let userScore = 0;

const nextBtn = quizBox.querySelector("footer .next-btn");

// ------------------------------------------------------------------------------------------------------- //

// Displays the next question if Next Question button is clicked //
nextBtn.onclick =()=> {
    if (questionCnt < questions.length - 1) {
        questionCnt++;
        questionNumb++;
        showQuestions(questionCnt);
        queCounter(questionNumb);
        clearInterval(counter);
        startTimer(timeVaule);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = "none";
    }
    else {
        console.log("- - - - - - - -");
        console.log("All done!");
        console.log("How'd you do?");
        showResultBox();
    }
}

// Getting questions and corresponding answers from questions.js array //
function showQuestions(index) {
    const questionTxt = document.querySelector(".question-txt");
    let questionTag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let answersTag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
                        + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
                        + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
                        + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    questionTxt.innerHTML = questionTag;
    answers.innerHTML = answersTag;
    const option = answers.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let checkIcon = '<div class="check"><span>&#9989</span></div>';
let crossIcon = '<div class="cross"><span>&#10060</span></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    nextBtn.style.display = "block";
    let userAns = answer.textContent;
    let correctAns = questions[questionCnt].answer;
    let allAns = answers.children.length;
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Correct answer!");
        answer.insertAdjacentHTML("beforeend", checkIcon);
    }
    else {
        console.log(userAns , "is incorrect,");
        console.log("Correct answer is:" , correctAns);
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIcon);
        
    }

    for (let i = 0; i < allAns; i++) {
        answers.children[i].classList.add("disabled");
    }

    for (let i = 0; i < allAns; i++) {
        if (answers.children[i].textContent == correctAns) {
            answers.children[i].setAttribute("class", "option correct");
            answers.children[i].insertAdjacentHTML("beforeend", checkIcon);
        }
    }
}

function queCounter(index) {
const bottomQueCounter = quizBox.querySelector("footer .total-que");
let totalQueCntTag = '<span><p>'+ index +'</p> <p>Of</p> <p>'+ questions.length +'</p> <p>Questions</p></span>';
bottomQueCounter.innerHTML = totalQueCntTag; 
}

// ------------------------------------------------------------------------------------------------------- //

// Displays the finish screen once all questions are answered //
finishScreen.style.display = "none";

function showResultBox() {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    finishScreen.style.display = "flex";
    finishScreen.classList.add("activeFin");
    let score = '<div class="score"><span>Your Score: '+ userScore +'</span></div>';
    scores.innerHTML = score;
}


// Collecting input information to send to local storage
// Function to add an item to local storage
const username = document.getElementById("name");
const endScore = scores.innerHTML;
function addToLocalStorage(username, endScore) {
  if (typeof username !== 'string' || typeof endScore !== 'string') {
    console.error('username and endScore must be strings');
    return;
  }

  localStorage.setItem(username, endScore);
  console.log(`Item '${username}' successfully added to local storage.`);
}

// Function to retrieve an item from local storage
function getFromLocalStorage(username) {
  if (typeof username !== 'string') {
    console.error('username must be a string');
    return;
  }

  const endScore = localStorage.getItem(username);
  if (endScore === null) {
    console.log(`Item '${username}' not found in local storage.`);
    return;
  }

  console.log(`Item '${username}' retrieved from local storage: ${endScore}`);
  return endScore;
}

// Returns user to starting screen if restartQuiz button clicked
restartQuiz.onclick = ()=> {
    window.location.reload();
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;
        if(time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if(time < 0) {
            clearInterval(counter);
            timeCount.textContent = "00";
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1;
        timeLine.style.width = time + "px";
        if(time > 549) {
            clearInterval(counterLine);
            timeCount.textContent = "00";
        }
    }
}