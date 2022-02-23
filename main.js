let cnv;
let backgroundColor;
let textColor;

let mode = 0;
let counter = 0;

let nameFont;

function setup() {
	let headerSize = (document.getElementById("header")).getBoundingClientRect();
	let canvasSize = (document.getElementById("mainPage")).getBoundingClientRect();
	cnv = createCanvas(canvasSize.width, canvasSize.height);
	cnv.position(0,headerSize.height);
	
	nameFont = loadFont("assets/headerfont.ttf");

	backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
	textColor = getComputedStyle(document.documentElement).getPropertyValue('--contrast-text');
}

function draw(){
	background(backgroundColor);
	// line(0,cnv.height/2,cnv.width,cnv.height/2);
	if(mode == 0){
		let center = createVector(cnv.width/6,cnv.height/2);
		let r = cnv.height*0.75/2;
		noStroke(0);
		fill(100);
		ellipse(center.x,center.y,r*2,r*2);
		let minorOffset = counter;
		let colorArray = ['#FF0000','#FF8700','#FFD300','#DEFF0A','#A1FF0A','#0AFF99','#0AEFFF','#147DF5','#580AFF','#BE0AFF'];
		for(var a = 0;a < colorArray.length;a++){
			let majorOffset = (360/colorArray.length) * a;
			drawArc(counter+majorOffset,counter+minorOffset+majorOffset,0.5*abs(sin(minorOffset)),r*sin(minorOffset)*0.8,center.x,center.y,r,colorArray[a]);
		}
		noFill();
		strokeWeight(10);
		stroke(0);
		ellipse(center.x,center.y,r*2,r*2);
		counter++;

		fill(0);
		stroke(textColor);
		textSize(300);
		textFont(nameFont);
		textAlign(CENTER,CENTER);
		text("Erich",cnv.width*0.6,cnv.height/2);
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}


function drawArc(startAngle,endAngle,mid,dist,x,y,r,col){
	strokeWeight(10);
	noFill();
	stroke(col);
	angleMode(DEGREES);
	let startPoint = createVector(r*cos(startAngle)+x,r*sin(startAngle)+y);
	let endPoint = createVector(r*cos(endAngle)+x,r*sin(endAngle)+y);
	let midAngle = (endAngle - startAngle)*mid;
	let midpoint = createVector(dist*cos(midAngle)+x,dist*sin(midAngle)+y);
	
	beginShape();
	curveVertex(startPoint.x,startPoint.y);
	curveVertex(startPoint.x,startPoint.y);
	curveVertex(midpoint.x,midpoint.y);
	curveVertex(endPoint.x,endPoint.y);
	curveVertex(endPoint.x,endPoint.y);
	endShape();

	strokeWeight(15);
	stroke(0);
	point(midpoint.x,midpoint.y);
}