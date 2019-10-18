function easyMode() {
hideBtn()
alert("This is being worked on right now.")
}

function mediumMode() {
hideBtn()
alert("This does not work yet!")
}

function hardMode() {
hideBtn()
alert("This does not work yet!")
}

function hideBtn() {
document.getElementById("easyBtn").style.visibility = "hidden"
document.getElementById("mediumBtn").style.visibility = "hidden"
document.getElementById("hardBtn").style.visibility = "hidden"
}

function showBtn() {
document.getElementById("easyBtn").style.visibility = "visible"
document.getElementById("mediumBtn").style.visibility = "visible"
document.getElementById("hardBtn").style.visibility = "visible"
}