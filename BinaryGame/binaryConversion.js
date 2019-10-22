/*
Binary to Decimal Conversion
1010 = 10 = 8 + 2

1st Digit = 0 * 1 = 0
1 * 2 = 2
2nd Digit = 1 * 2 = 2
2 * 2 = 4
3rd Digit = 0 * 4 = 0
4 * 2 = 8
4th Digit = 1 * 8 = 8

0 + 2 + 0 + 8 = 10!
*/

function binToDec(numberToWorkWith) {
var multiplier = 1
var indexToWorkWith = numberToWorkWith.length - 1
var decNum = 0
for (var i = 0; i < numberToWorkWith.length; i++) {
    //ForLoop = Goes through the number backwards, using times.
    var letterIndex = numberToWorkWith.charAt(indexToWorkWith)
    var letterIndexNUM = parseInt(letterIndex)
    var tempNumber = letterIndexNUM * multiplier;
    var decNum = tempNumber + decNum
    var multiplier = multiplier * 2
    var indexToWorkWith = indexToWorkWith - 1
}
if (isNaN(decNum) == false) {
return decNum
}
}

/* 
Decimal to Binary Conversion
10 = 1010
10/2 = 5 R: 0
5/2 = 2 R: 1
2/2 = 1 R: 0
1/2 = 0 R: 1
1010

*/
function decToBin(numberToWorkWith) {
var numberToWorkWith = parseInt(numberToWorkWith)
if (isNaN(numberToWorkWith) == true) {
return "Conversion Failed"
} else {
var binNum = ""
var index = 0
while (numberToWorkWith != 0) {
var remainder = numberToWorkWith % 2
var numberToWorkWith = numberToWorkWith / 2
var numberToWorkWith = Math.floor(numberToWorkWith)
var binNum = `${remainder}${binNum}`
}
return binNum
}
}