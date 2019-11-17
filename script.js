
var startingColors = [];


startingColors[0] = [51, 55, 69];
startingColors[1] = [230, 52, 98];
startingColors[2] = [254, 95, 85];
startingColors[3] = [18, 78, 120];
startingColors[4] = [238, 245, 219];

var backgroundColor = "rgb(238, 245, 219)";

var periodSize = 3000;
var periodColor = 1500;
var width = 66;
var multiples = 8;


var frameTime = 13;
var cycleColor = 0;
var directionSize = 1;
var colorsLength = 4;
var limitMultiples = 16;
var limitSize = 70;
var rateSize = (limitSize - width) * frameTime * 2 / periodSize;
var countSize = width;
var countColor = 0;
var limitColor;
var colors;

function colorFill() {
	limitColor = periodColor / (frameTime * colorsLength);
	colors = [];
	for (i = 0; i < multiples * colorsLength; i += colorsLength) {
		for (j = 0; j < colorsLength; j++) {
			colors[i + j] = startingColors[j];
		}
	}
}

colorFill();

var div = document.querySelector(".circle");
var body = document.querySelector("body");
body.style.background = backgroundColor;

var colorsMinus = document.querySelector("#colors-minus");
colorsMinus.addEventListener("click", function () {
	if (colorsLength > 2) colorsLength--;
	colorFill();

	if (colorsLength === 2) {
		colorsMinus.setAttribute("disabled", "")
	}
	if (colorsLength === startingColors.length - 1) {
		colorsPlus.removeAttribute("disabled")
	}
})

var colorsPlus = document.querySelector("#colors-plus");
colorsPlus.addEventListener("click", function () {
	if (colorsLength < startingColors.length) colorsLength++;
	colorFill();

	if (colorsLength === startingColors.length) {
		colorsPlus.setAttribute("disabled", "")
	}
	if (colorsLength === 3) {
		colorsMinus.removeAttribute("disabled")
	}
})


var repeatsMinus = document.querySelector("#repeats-minus");
repeatsMinus.addEventListener("click", function () {
	if (multiples > 1) multiples--;
	colorFill();

	if (multiples === 1) {
		repeatsMinus.setAttribute("disabled", "")
	}
	if (multiples === limitMultiples - 1) {
		repeatsPlus.removeAttribute("disabled")
	}
})

var repeatsPlus = document.querySelector("#repeats-plus");
repeatsPlus.addEventListener("click", function () {
	if (multiples < limitMultiples) multiples++;
	colorFill();

	if (multiples === limitMultiples) {
		repeatsPlus.setAttribute("disabled", "")
	}
	if (multiples === 2) {
		repeatsMinus.removeAttribute("disabled")
	}
})


setInterval(function () {

	var shft = countColor / limitColor;
	var gradientString = "radial-gradient(";

	for (var i = 0; i < colors.length; i++) {
		var iCalc = i + cycleColor;
		if (iCalc >= colors.length) iCalc = iCalc % colors.length;
		var rgbCalc = [];
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