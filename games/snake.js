var c = document.getElementById("playingField")
var ctx = c.getContext("2d")
document.getElementById("playingField").style.visibility = "hidden"
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
var resetGame = 0
createRect(0, 0, c.width, c.height, "lightgrey")
document.getElementById("startBtn").style.visibility = "hidden";
document.getElementById("playingField").style.visibility = "visible"
globalThis(snake = [[20, 200]])
globalThis(rotation = "ArrowRight")
createRect(40, 200, 60, 220, "black")
createRect(c.width / 2, c.height / 2, c.width / 2 + 20, c.height / 2 + 20, "red")
globalThis(apple = [c.width / 2, c.height / 2])
globalThis(loop = setInterval(function() {
    newSnakeLoc()
}, 100))
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
var oldX = snake[0][0]
var oldY = snake[0][1]
createRect(oldX, oldY, oldX + 20, oldY + 20, "lightgrey")
snake.shift();
//Rotataion Detection

switch (rotation) {
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
        console.log("BIG ERROR - NO DIRECTION FOUND")
        break;
}
createRect(xToChange, yToChange, xToChange + 20, yToChange + 20, "black")
snake.push([xToChange, yToChange])
// detection
if (xToChange == apple[0]) {
    if (yToChange == apple[1]) {
        apple.shift;
        snake.unshift([oldX, oldY])
        createRect(oldX, oldY, oldX + 20, oldY + 20, "black")
        findApple(snake)

    }
}
console.log(xToChange)
console.log(yToChange)
if (xToChange == -20 || xToChange == c.width || yToChange == -20 || yToChange == c.height) {
document.getElementById("startBtn").style.visibility = "visible";
document.getElementById("playingField").style.visibility = "hidden";
clearInterval(loop);


}
/*if (xToChange == -10 || xToChange == 400) {
    var resetGame = 1
    console.log("restarting game time")
    document.getElementById("startBtn").style.visibility = "visible";
    document.getElementById("playingField").style.visibility = "hidden"
}
if (yToChange == -10 || yToChange == 400) {
    var resetGame = 1
    console.log("restarting game time")
    document.getElementById("startBtn").style.visibility = "visible";
    document.getElementById("playingField").style.visibility = "hidden"
}
if (resetGame == 1) {
    clearInterval(loop);
}

If frong (xToChange / yToChange) equals another x and y of another part of array, stop.
*/

/*for (let i = snake.length - 2; i == 0; i - 1) {
    const element = snake[i];
    console.log(element)
    if (element[0] == xToChange) {
        console.log("x bad")
        if (element[1] == yToChange) {
            console.log("resetting game")
            document.getElementById("startBtn").style.visibility = "visible";
            document.getElementById("playingField").style.visibility = "hidden"

        }
    }   
} 
}*/

document.addEventListener('keydown', function(event) {
 switch (event.key) {
    case "ArrowLeft":
        if (rotation != "ArrowRight") {
            rotation = "ArrowLeft"
        }
         break;
    case "ArrowRight":
        if (rotation != "ArrowLeft") {
            rotation = "ArrowRight"
        }
        break;
    case "ArrowUp":
        if (rotation != "ArrowDown") {
            rotation = "ArrowUp"
        }
        break;
    case "ArrowDown":
        if (rotation != "ArrowUp") {
            rotation = "ArrowDown"
        }
        break;
    default:
        console.log("non arrow key clicked")
        break;
 }
});
}
