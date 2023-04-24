// collecting required HTML elements
const highScores = document.querySelector(".high-scores");
const dropdown = document.querySelector(".dropdown-btn");
const scores = document.querySelector(".scores");
const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = document.querySelector(".buttons .retry");
const quizBox = document.querySelector(".quiz-box")
const finishScreen = document.querySelector(".finish-screen");
const timeText = document.querySelector(".timer .timer-txt");
const timeCount = document.querySelector(".timer .timer-sec");
const bottomQueCounter = document.querySelector("footer .total-que");
const answers = document.querySelector(".answers");

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
 startBtn.onclick = ()=> {
    infoBox.classList.add("activeInfo");
 }


 // Hides info screen if quit button is clicked //
 quitBtn.onclick = ()=> {
infoBox.classList.remove("activeInfo");
 }

 // if continue button is clicked //
 continueBtn.onclick = ()=> {
    infoBox.classList.remove("activeInfo"); // hides info screen //
    quizBox.classList.add("activeQuiz"); // shows quiz box //
    showQuestions(0);
    queCounter(1);
     }

let questionCnt = 0;
let questionNumb = 1;

const nextBtn = quizBox.querySelector("footer .next-btn");
// if Next Question button is clicked //
nextBtn.onclick =()=> {
    if (questionCnt < questions.length - 1) {
        questionCnt++;
        questionNumb++;
        showQuestions(questionCnt);
        queCounter(questionNumb);
    }
    else {
        console.log("questions completed");
    }
}

// getting questions and corresponding answers from questions.js array //
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

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[questionCnt].answer;
    let allAns = answers.children.length;
    if (userAns == correctAns) {
        console.log("Correct answer!");
        answer.classList.add("correct");
    }
    else {
        console.log(userAns , "is incorrect,");
        console.log("Correct answer is:" , correctAns);
        answer.classList.add("incorrect");
    }

    for (let i = 0; i < allAns; i++) {
        answers.children[i].classList.add("disabled");
    }

    for (let i = 0; i < allAns; i++) {
        if (answers.children[i].textContent == correctAns) {
            answers.children[i].setAttribute("class", "option correct");
        }
    }
}

function queCounter(index) {
const bottomQueCounter = quizBox.querySelector("footer .total-que");
let totalQueCntTag = '<span><p>'+ index +'</p> <p>Of</p> <p>'+ questions.length +'</p> <p>Questions</p></span>';
bottomQueCounter.innerHTML = totalQueCntTag; 
}