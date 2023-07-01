// 200 and 400 draw lines
buildBoard = function() {
    makeLine(height/3);makeLine(height/3*2);
    ctx.strokeStyle = "blue"
    makeLine(height/9);makeLine(height/9*2);makeLine(height/9*4);makeLine(height/9*5);makeLine(height/9*7);makeLine(height/9*8);
}

makeLine = function(line) {
    ctx.moveTo(0, line);
    ctx.lineTo(height, line);
    ctx.moveTo(line, 0);
    ctx.lineTo(line, width);
    ctx.stroke();
}

const height = 900;
const width = 900;

c = document.getElementById("gameBoard")
ctx = c.getContext("2d")
ctx.strokeStyle = "black"
buildBoard()
