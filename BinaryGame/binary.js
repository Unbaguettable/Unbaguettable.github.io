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
alert("This does not work yet!")
}

function hardMode() {
hideBtn()
subtitleEle.innerHTML = "Hard Mode"
alert("This does not work yet!")
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
    timerEle.innerHTML = "The timer has run out. YOU ARE NOW OFFICIALY A FAILURE AND YOU LOST."
    timerExpired = 1
    clearInterval(timerInterval)
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
            timer += 30
            break;
        case "medium":
            //newQuestion()
            //timer += unkonwn
            break;
        case "hard":
            //newQuestion()
            //timer += unkonwn
        
    }
    document.getElementById("questionAnswer").value = "";
} else {
    clearInterval(timerInterval)
    showBtn()
    questionEle.innerHTML = `Incorrect. The correct answer was ${answerToQuestion}.`;
    document.getElementById("questionAnswer").value = "";
}
}

function globalThis() {
}