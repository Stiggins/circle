
var colors = [];


colors[0] = [51, 55, 69];
colors[1] = [230, 52, 98];
colors[2] = [254, 95, 85];
colors[3] = [18, 78, 120];

var backgroundColor = "rgb(238, 245, 219)";

var periodSize = 3000;
var periodColor = 1500;
var width = 66;
var multiples = 8;


var frameTime = 13;
var cycleColor = 0;
var directionSize = 1;
var limitSize = 70;
var colorsLength = colors.length;
var limitColor = periodColor / (frameTime * colorsLength);
var rateSize = (limitSize - width) * frameTime * 2 / periodSize;
var countSize = width;
var countColor = 0;
var colorsLength = colors.length;

for (i = colorsLength; i < colorsLength * multiples; i += colorsLength) {
	for (j = 0; j < colorsLength; j++) colors[i + j] = colors[j];
}

var div = document.querySelector(".circle");
var body = document.querySelector("body");
body.style.background = backgroundColor;

setInterval(function () {

	var shft = countColor / limitColor;
	var gradientString = "radial-gradient(";

	for (var i = 0; i < colors.length; i++) {
		var iCalc = i + cycleColor;
		if (iCalc >= colors.length) iCalc -= colors.length;
		rgbCalc = [];
		if (iCalc + 1 < colors.length) {
			for (var j = 0; j < 3; j++) {
				rgbCalc[j] = colors[iCalc][j] + (colors[iCalc + 1][j] - colors[iCalc][j]) * shft;
			}
		} else {
			for (var j = 0; j < 3; j++) {
				rgbCalc[j] = colors[iCalc][j] + (colors[0][j] - colors[iCalc][j]) * shft;
			}
		}
		var color = "rgb(" + rgbCalc[0] + "," + rgbCalc[1] + "," + rgbCalc[2] + ")";
		if (i !== 0) gradientString += color + " " + (countSize * i / colors.length) + "%, ";
		gradientString += color + " " + (countSize * (i + 1) / colors.length) + "%, ";
	}
	gradientString += backgroundColor + " " + countSize + "%)";

	div.style.background = gradientString;

	countSize += directionSize * rateSize;
	countColor += 1;
	if (countSize <= width || countSize >= limitSize) {
		directionSize *= -1;
		countSize += 2 * directionSize * rateSize;
	}

	if (countColor >= limitColor) {
		countColor = 0;
		cycleColor++;
	}

	if (cycleColor === colors.length) cycleColor = 0;
}, frameTime);