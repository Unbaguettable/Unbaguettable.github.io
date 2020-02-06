var c = document.getElementById("playingField")
var ctx = c.getContext("2d")
/* if (sessionStorage.getItem("canvasXSNAKE") != null) {
    ctx.width = sessionStorage.getItem("canvasXSNAKE")
    console.log(ctx.width)
} */
document.getElementById("playingField").style.visibility = "hidden"
document.getElementById("scoreEle").innerHTML = "Click Start To Play!"
if (localStorage.getItem("highscoreSNAKE") === null) {
    localStorage.setItem("highscoreSNAKE", 0)
}
document.getElementById("highscoreEle").innerHTML = `Your highscore is ${localStorage.getItem("highscoreSNAKE")}`
function clearCanvas() {
    ctx.clearRect(0, 0, c.width, c.height);
}

function createRect(startX, startY, endX, endY, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(startX, startY, endX - startX, endY - startY)
}

function findApple(snakeList) {
while (true) {
    willBreak = 0;
    var rdmX = Math.floor(Math.random() * c.width / 20)
    var rdmY = Math.floor(Math.random() * c.height / 20)
    rdmX = rdmX * 20
    rdmY = rdmY * 20
    //var tempList = [rdmX, rdmY]
    for (let i = 0; i < snakeList.length; i++) {
        const element = snakeList[i];
        if (element[0] == rdmX) {
            console.log("x bad")
            if (element[1] == rdmY) {
                console.log("BEEP ALL BAD BEEP")
            } 
        } else {
            if (i == snakeList.length - 1) {
            console.log("apple loc gud boi")
            var willBreak = 1;
            break;
            }
        }
        
    }
    if (willBreak == 1) {
        break;
    }
}
createRect(rdmX, rdmY, rdmX + 20, rdmY + 20, "red")
globalThis(apple = [rdmX, rdmY])
}


function globalThis() {
}

function startGame() {

createRect(0, 0, c.width, c.height, "lightgrey")
document.getElementById("startBtn").style.visibility = "hidden";
document.getElementById("playingField").style.visibility = "visible"
document.getElementById("custoBtn").style.visibility = "hidden";
globalThis(snake = [[20, 200], [40, 200], [60, 200]])
globalThis(rotation = "ArrowRight")
globalThis(score = 0)
// Colours
if (sessionStorage.getItem("chosenBodySNAKE") === null) {
globalThis(chosenBody = "black")  
} else {
globalThis(chosenBody = sessionStorage.getItem("chosenBodySNAKE")) // Body Colour
}
if (sessionStorage.getItem("chosenHeadSNAKE") === null) {
globalThis(chosenHead = "black")
} else {
globalThis(chosenHead = sessionStorage.getItem("chosenHeadSNAKE")) // Head Colour
} // Head Colour
// Speed
if (sessionStorage.getItem("speedSNAKE") === null) {
globalThis(speed = 100)
} else {
globalThis(speed = sessionStorage.getItem("speedSNAKE"))
}
document.getElementById("scoreEle").innerHTML = score
createRect(20, 200, 40, 220, chosenBody)
createRect(40, 200, 60, 220, chosenBody)
createRect(60, 200, 80, 220, chosenHead)
createRect(c.width / 2, c.height / 2, c.width / 2 + 20, c.height / 2 + 20, "red")
globalThis(apple = [c.width / 2, c.height / 2])
globalThis(loop = setInterval(function() {
    newSnakeLoc()
}, speed)) // DEFAULT 100
}

function newSnakeLoc() {
/*
1st in array = old.
Last in array = new.
Must:
Get 1st array.
Delete interation in 1st place.
Append new coord to array

1 2  3 4 5,
Delete 1
*/
var length = snake.length - 1;
var xToChange = snake[length][0]
var yToChange = snake[length][1]
createRect(xToChange, yToChange, xToChange + 20, yToChange + 20, chosenBody)
var oldX = snake[0][0]
var oldY = snake[0][1]
createRect(oldX, oldY, oldX + 20, oldY + 20, "lightgrey")
snake.shift();
//Rotataion Detectio
rotationP = rotation;

switch (rotationP) {
    case "ArrowRight":
        xToChange += 20
        break;
    case "ArrowLeft":
        xToChange += -20
        break;
    case "ArrowUp":
        yToChange += -20
        break;
    case "ArrowDown":
        yToChange += 20
        break;

    default:
        console.log("Error - No Detection Found")
        break;
}
createRect(xToChange, yToChange, xToChange + 20, yToChange + 20, chosenHead)
snake.push([xToChange, yToChange])
// Apple Detection
if (xToChange == apple[0]) {
    if (yToChange == apple[1]) {
        apple.shift;
        snake.unshift([oldX, oldY])
        createRect(oldX, oldY, oldX + 20, oldY + 20, chosenBody)
        findApple(snake)
        score++
        document.getElementById("scoreEle").innerHTML = score

    }
}
// Border Detectio
if (xToChange == -20 || xToChange == c.width || yToChange == -20 || yToChange == c.height) {
document.getElementById("startBtn").style.visibility = "visible";
document.getElementById("playingField").style.visibility = "hidden";
document.getElementById("custoBtn").style.visibility = "visible"
document.getElementById("scoreEle").innerHTML = `You hit the border! Your score was ${score}!`
if (localStorage.getItem("highscoreSNAKE") < score) {
localStorage.setItem("highscoreSNAKE", score)
document.getElementById("highscoreEle").innerHTML = `Your highscore is ${localStorage.getItem("highscoreSNAKE")}`
}
clearInterval(loop);
}
// Player Detection
for (let index = 0; index < snake.length - 1; index++) {
    const element = snake[index];
    if (element[0] == xToChange) {
        if (element[1] == yToChange) {
            document.getElementById("startBtn").style.visibility = "visible";
            document.getElementById("playingField").style.visibility = "hidden";
            document.getElementById("custoBtn").style.visibility = "visible"
            document.getElementById("scoreEle").innerHTML = `You hit yourself! Your score was ${score}!` 
            if (localStorage.getItem("highscoreSNAKE") < score) {
                localStorage.setItem("highscoreSNAKE", score)
                document.getElementById("highscoreEle").innerHTML = `Your highscore is ${localStorage.getItem("highscoreSNAKE")}`
                }
            clearInterval(loop);
        }
    }
}

document.addEventListener('keydown', function(event) {
 switch (event.key) {
    case "ArrowLeft":
        if (rotationP != "ArrowRight") {
            rotation = "ArrowLeft"
        }
         break;
    case "ArrowRight":
        if (rotationP != "ArrowLeft") {
            rotation = "ArrowRight"
        }
        break;
    case "ArrowUp":
        if (rotationP != "ArrowDown") {
            rotation = "ArrowUp"
        }
        break;
    case "ArrowDown":
        if (rotationP != "ArrowUp") {
            rotation = "ArrowDown"
        }
        break;
        case "a":
            if (rotationP != "ArrowRight") {
                rotation = "ArrowLeft"
            }
             break;
        case "d":
            if (rotationP != "ArrowLeft") {
                rotation = "ArrowRight"
            }
            break;
        case "w":
            if (rotationP != "ArrowDown") {
                rotation = "ArrowUp"
            }
            break;
        case "s":
            if (rotationP != "ArrowUp") {
                rotation = "ArrowDown"
            }
            break;
    default:
        console.log("non arrow key clicked")
        break;
 }
});
}
