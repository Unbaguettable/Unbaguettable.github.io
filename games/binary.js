setVariables()

function setVariables() {
timerEle = document.getElementById("timerElement")
subtitleEle = document.getElementById("subtitle")
questionEle = document.getElementById("question")
document.getElementById("checkAnswer").style.visibility = "hidden"
document.getElementById("questionAnswer").style.visibility = "hidden"
}

function easyMode() {
hideBtn()
subtitleEle.innerHTML = "Easy Mode"
globalThis(mode = "easy")
timerStart(30)
newQuestion(31)
}

function mediumMode() {
hideBtn()
subtitleEle.innerHTML = "Medium Mode"
globalThis(mode = "medium")
timerStart(20)
newQuestion(63)
}

function hardMode() {
hideBtn()
subtitleEle.innerHTML = "Hard Mode"
globalThis(mode = "hard")
timerStart(10)
newQuestion(255)
}

function hideBtn() {
document.getElementById("easyBtn").style.visibility = "hidden"
document.getElementById("mediumBtn").style.visibility = "hidden"
document.getElementById("hardBtn").style.visibility = "hidden"
document.getElementById("checkAnswer").style.visibility = "visible"
document.getElementById("questionAnswer").style.visibility = "visible"
}

function showBtn() {
document.getElementById("easyBtn").style.visibility = "visible"
document.getElementById("mediumBtn").style.visibility = "visible"
document.getElementById("hardBtn").style.visibility = "visible"
document.getElementById("checkAnswer").style.visibility = "hidden"
document.getElementById("questionAnswer").style.visibility = "hidden"
}

function timerStart(seconds) {
globalThis(timer = seconds)
globalThis(originalTime = seconds)
timerEle.innerHTML = timer
globalThis(timerExpired = 0)
globalThis(timerInterval = setInterval(function() {
timer -= 1
timerEle.innerHTML = timer
if (timer === -1) {
    questionEle.innerHTML = "The timer has run out. You Lose."
    timerExpired = 1
    clearInterval(timerInterval)
    showBtn()
    timerEle.innerHTML = ""
    document.getElementById("questionAnswer").value = ""
    subtitleEle.innerHTML = "By Unbaguettable"
}
}, 1000))
}

function newQuestion(maxNumber) {
var rdmDecNum = Math.floor((Math.random() * maxNumber) + 1);
var rdmBinNum = decToBin(rdmDecNum)
questionEle.innerHTML = `Convert ${rdmBinNum} to decimal!`
globalThis(answerToQuestion = rdmDecNum)
}

function checkAnswer() {
var checkAnswerInput = document.getElementById("questionAnswer").value
if (checkAnswerInput == answerToQuestion) {
    newQuestion()
    switch(mode) {
        case "easy":
            newQuestion(31)
            timer += 20
            break;
        case "medium":
            newQuestion(63)
            timer += 15
            break;
        case "hard":
            newQuestion(255)
            timer += 10        
    }
    document.getElementById("questionAnswer").value = "";
} else {
    clearInterval(timerInterval)
    showBtn()
    questionEle.innerHTML = `Incorrect. The correct answer was ${answerToQuestion}.`;
    document.getElementById("questionAnswer").value = "";
    timerEle.innerHTML = ""
    subtitleEle.innerHTML = "By Unbaguettable"
}
}

function globalThis() {
}