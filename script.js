var rgb = [];
rgb[0] = [219, 43, 57];
rgb[1] = [41, 51, 92];
rgb[2] = [243, 167, 18];
rgb[3] = [51, 24, 50];
rgb[4] = [23, 190, 187];
back = "rgb(198, 216, 211)";

var div = document.querySelector(".circle");
var body = document.querySelector("body");
body.style.background = back;

var count = 0;
var dir = 1;
var mult = 0.2;
var widt = 40;
var lim = 70;
var cycle = 0;

setInterval(function () {

	var pos = count * mult;
	var shft = (0.5 - dir / 2) + dir * pos / (lim - widt);
	var str = "radial-gradient(" + back + " " + pos + "%, ";
	for (var i = 0; i < rgb.length; i++) {
		var iCalc = i + cycle;
		if (iCalc >= rgb.length) iCalc -= rgb.length;
		rgbCalc = [];
		if (iCalc + 1 < rgb.length) {
			for (var j = 0; j < 3; j++) {
				rgbCalc[j] = rgb[iCalc][j] + (rgb[iCalc + 1][j] - rgb[iCalc][j]) * shft;
			}
		} else {
			for (var j = 0; j < 3; j++) {
				rgbCalc[j] = rgb[iCalc][j] + (rgb[0][j] - rgb[iCalc][j]) * shft;
			}
		}
		var color = "rgb(" + rgbCalc[0] + "," + rgbCalc[1] + "," + rgbCalc[2] + ")";
		str += color + " " + (pos + widt * i / rgb.length) + "%, ";
		str += color + " " + (pos + widt * (i + 1) / rgb.length) + "%, ";
	}
	str += back + " " + (pos + widt) + "%)";

	div.style.background = str;
	count += dir;
	if (count * mult <= 0 || count * mult >= lim - widt) {
		dir *= -1;
		cycle++;
	}
	if (cycle === rgb.length) cycle = 0;
}, 13);