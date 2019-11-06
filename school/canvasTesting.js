var c = document.getElementById("canvas")
var ctx = c.getContext("2d")

function go() {
ctx.fillRect(40, 40, 160, 160)
ctx.fillRect(200, 200, 160, 160)
ctx.font = "100px Arial";
ctx.fillText("BIG BAD", 210, 150);
ctx.fillText("BAD", -5, 320)
}
/* THINGS TO LOOK UP 
how to clear canvas
how to change colour
other shapes
*/

