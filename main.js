let cnv;
function setup() {
	let headerSize = (document.getElementById("header")).getBoundingClientRect();
	let canvasSize = (document.getElementById("mainPage")).getBoundingClientRect();
	cnv = createCanvas(canvasSize.width, canvasSize.height);
	cnv.position(0,headerSize.height);
}

function draw(){
	line(0,cnv.height/2,cnv.width,cnv.height/2);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
