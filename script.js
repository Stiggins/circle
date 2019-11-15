var rgb = [];

rgb[0] = [51, 55, 69];
rgb[1] = [230, 52, 98];
rgb[2] = [254, 95, 85];
rgb[3] = [18, 78, 120];

back = "rgb(238, 245, 219)";

var rate = 0.1;
var widt = 60;
var mult = 6;

var count = 0;
var cycle = 0;
var dir = 1;
var lim = 70;
var len = rgb.length;

for(i=len;i<len*mult;i+=len) {
	for(j=0;j<len;j++) rgb[i+j]=rgb[j];
}

var div = document.querySelector(".circle");
var body = document.querySelector("body");
body.style.background = back;

setInterval(function () {

	var pos = count * rate;
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
	if (count * rate <= 0 || count * rate >= lim - widt) {
		dir *= -1;
		count += 2*dir;
		cycle++;
	}

	if (cycle === rgb.length) cycle = 0;
}, 13);