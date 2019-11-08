var c = document.getElementById("binaryGuy")
var ctx = c.getContext("2d")
var speakEle = document.getElementById("speak")
var equationEle = document.getElementById("equation")

function go() {
    hideBtn()
    clearCanvas()
    /*createRect(180, 400, 220, 250)
    createRect(120, 250, 280, 90)
    ctx.clearRect(160, 210, 80, -80)*/
    buildBinGuy(180, 400)
    setTimeout(buildBinGuy, 1000, 180, 380)
    setTimeout(buildBinGuy, 1300, 180, 360)
    setTimeout(buildBinGuy, 1700, 180, 380)
    setTimeout(buildBinGuy, 2100, 180, 400)
    setTimeout(print, 2500, "Hello! I am Binary Guy!")
    // each letter takes 100 seconds. Count letters * 100 + 2000?
    // 23 * 100 = 2300 + 2000 = 4300 + 2500 = 6800
    //setTimeout(print, 6800, " ")
    setTimeout(print, 6800, "Today, I'm going to teach you about Decimal to Binary conversion!")
    // 65 * 100 = 6500 + 2000 = 8500 + 7200 = 15700
    setTimeout(print, 15300, " ")
    setTimeout(buildBinGuy, 15500, 160, 400)
    setTimeout(buildBinGuy, 15900, 140, 400)
    setTimeout(buildBinGuy, 16300, 120, 400)
    setTimeout(buildBinGuy, 16700, 100, 400)
    setTimeout(buildBinGuy, 17100, 80, 400)
    setTimeout(buildBinGuy, 18100, 80, 380)
    setTimeout(buildBinGuy, 18400, 80, 360)
    setTimeout(buildBinGuy, 18800, 80, 380)
    setTimeout(buildBinGuy, 19200, 80, 400)

    /* 
Decimal to Binary Conversion
10 = 1010
10/2 = 5 R: 0
5/2 = 2 R: 1
2/2 = 1 R: 0
1/2 = 0 R: 1
1010

*/
setTimeout(print, 19600, "First, get the number you want to convert into binary.")
// 54 * 100 = 5400 + 2000 = 7400 + 19200 = 26600
setTimeout(print, 26600, "Imagine my number was 10...")
setTimeout(function() {
equationEle.innerHTML = "10"
}, 29300)
// 27 * 100 = 2700 + 2000 = 4700 + 26600 = 31300
setTimeout(print, 31300, "Now, let's divide that number by two!")
// 37 * 100 = 3700 + 2000 = 5700 + 31300 = 37000
setTimeout(print, 37000, "10/2 = 5!")
setTimeout(function() {
equationEle.innerHTML = "10 / 2 = 5"
}, 37900)
// 9 * 100 = 900 + 2000 = 2900 + 37000 = 39900
setTimeout(print, 39900, "Now we remember the remainder.")
// 30 * 100 = 3000 + 2000 = 5000 + 39900 = 44900
setTimeout(print, 44900, "So the remainder of 10/2 is 0!")
// 30 * 100 = 3000 + 2000 = 5000 + 44900 = 49900
setTimeout(print, 49900, "Now write down 0 on a piece of paper. That's the last digit of the binary number!")
setTimeout(function() {
equationEle.innerHTML = "10 / 2 = 5 R: 0"
}, 58000)
// 81 * 100 = 8100 + 2000 = 10100 + 49900 = 60000
setTimeout(print, 60000, "Now we do the same for the new number. 5 divided by 2...")
setTimeout(function() {
equationEle.innerHTML = "5 / 2"
}, 67600)
// 56 * 100 = 5600 + 2000 = 7600 + 60000 = 67600

}
function hideBtn() {
    document.getElementById("infoPara").innerHTML = ""
    document.getElementById("goBtn").style.visibility = "hidden"
}

function clearCanvas() {
ctx.clearRect(0, 0, c.width, c.height);
}

function createRect(startX, startY, endX, endY) {
ctx.fillRect(startX, startY, endX - startX, endY - startY)
}

function buildBinGuy(bottomX, bottomY) {
clearCanvas()
createRect(bottomX, bottomY, bottomX + 40, bottomY - 150)
createRect(bottomX - 60, bottomY - 150, bottomX + 100, bottomY - 310)
ctx.clearRect(bottomX - 20, bottomY - 190, 80, -80)
}

function print(text) {
    globalThis(currTxt = "")
    globalThis(i = 0)
    globalThis(txtLength = text.length)
    globalThis(textReal = text)
    printWrite()
}

function printWrite() {
    console.log(textReal[i])
    console.log(i)
    console.log(currTxt)
    if (textReal[i] == " ") {
        currTxt = currTxt + " "
    } else {
    currTxt = currTxt + textReal[i]
}
    i++
    speakEle.innerHTML = currTxt
    if (i != txtLength) {
        setTimeout(printWrite, 100)
    }
}

function globalThis() {
}

/* for (let i = 0; i < text.length; i++) {
        var currTxt = currTxt + text[i]
        speakEle.innerHTML = currTxt
        
    } */