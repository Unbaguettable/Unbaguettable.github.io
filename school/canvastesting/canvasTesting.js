var c = document.getElementById("canvas")
var ctx = c.getContext("2d")

function bigBad() {
ctx.clearRect(0, 0, c.width, c.height);
ctx.fillStyle = "#000000"
ctx.fillRect(40, 40, 160, 160)
ctx.fillRect(200, 200, 160, 160)
ctx.font = "100px Arial";
ctx.fillText("BIG BAD", 210, 150);
ctx.fillText("BAD", -5, 320)
}

function square() {
ctx.clearRect(0, 0, c.width, c.height);
ctx.fillStyle = "#298C03"
ctx.fillRect(20, 20, 360, 360)
}
/* THINGS TO LOOK UP 
how to clear canvas - done
how to change colour - done
other shapes - done
*/

