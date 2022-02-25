let cnv;
let backgroundColor;
let textColor;

let mode = 1;
let counter = 0;
let change = 0.5;

let nameFont;

let toggleAnimation = 1;
let center
let r;

let points; 
let textBox;

function preload(){
	nameFont = loadFont("assets/headerfont.ttf");

	let data = document.querySelector(':root');

	let r = round(random(0,1));

	if(r == 0){
		/* Color Scheme A */
		data.style.setProperty('--background-color','#1C0475');
		data.style.setProperty('--back-accent','#ED0C4C');
		data.style.setProperty('--back--accent-offset','#8b1235');
		data.style.setProperty('--contrast-text','#C0F20A');
		data.style.setProperty('--dark-text','#A0CC02');
		data.style.setProperty('--light-accent','#8BA820');
	}else{
		/* Color Scheme B */
		data.style.setProperty('--background-color','#02273a');
		data.style.setProperty('--back-accent','#ffb703');
		data.style.setProperty('--back--accent-offset','#a1760a');
		data.style.setProperty('--contrast-text','#20c2eb');
		data.style.setProperty('--dark-text','#fb8500');
		data.style.setProperty('--light-accent','#8ecae6');
	}
}

function setup() {
	let headerSize = (document.getElementById("header")).getBoundingClientRect();
	let canvasSize = (document.getElementById("mainPage")).getBoundingClientRect();
	cnv = createCanvas(canvasSize.width, canvasSize.height);
	cnv.position(0,headerSize.height);

	mode = round(random(0,1));
	
	backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');
	textColor = getComputedStyle(document.documentElement).getPropertyValue('--contrast-text');

	points = nameFont.textToPoints("Erich",cnv.width*0.7,cnv.height/2,windowWidth/6,CENTER,CENTER);
	textBox = nameFont.textBounds("Erich",cnv.width*0.7,cnv.height/2,windowWidth/6,CENTER,CENTER);

	for(let p = 0;p < points.length;p++){
		let newPoint = new customPoint(points[p].x,points[p].y,-cnv.width/2,textBox.h/2,random(0.1,3));
		points[p] = newPoint;
	}
}

function draw(){
	background(backgroundColor);
	// line(0,cnv.height/2,cnv.width,cnv.height/2);
	if(mode == 0){
		center = createVector(cnv.width*0.2,cnv.height/2);
		r = cnv.height*0.75/2;

		noStroke();
		fill(10);
		ellipse(center.x,center.y,r*2,r*2);
		let minorOffset = counter;
		let colorArray = ['#FF0000','#FF8700','#FFD300','#DEFF0A','#A1FF0A','#0AFF99','#0AEFFF','#147DF5','#580AFF','#BE0AFF'];
		for(var a = 0;a < colorArray.length;a++){
			let majorOffset = (360/colorArray.length) * a;
			drawArc(counter+majorOffset,counter+minorOffset+majorOffset,0.5*abs(sin(minorOffset)),r*sin(minorOffset)*0.8,center.x,center.y,r,colorArray[a]);
		}
		noFill();
		strokeWeight(11);
		stroke(0);
		ellipse(center.x,center.y,r*2,r*2);
		if(toggleAnimation > 0){
			counter+=change;
		}

		fill(0);
		stroke(textColor);
		textSize(windowWidth/6);
		textFont(nameFont);
		textAlign(CENTER,CENTER);
		text("Erich",cnv.width*0.7,cnv.height/2);
	}else if(mode == 1){
		fill(0);
		stroke(textColor);
		strokeWeight(11);

		for(let i = 0;i < points.length;i++){
			points[i].render();
			points[i].update(2);
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	let headerSize = (document.getElementById("header")).getBoundingClientRect();
	let canvasSize = (document.getElementById("mainPage")).getBoundingClientRect();
	cnv = createCanvas(canvasSize.width, canvasSize.height);
	cnv.position(0,headerSize.height);

	points = nameFont.textToPoints("Erich",cnv.width*0.7,cnv.height/2,windowWidth/6,CENTER,CENTER);
	textBox = nameFont.textBounds("Erich",cnv.width*0.7,cnv.height/2,windowWidth/6,CENTER,CENTER);

	for(let p = 0;p < points.length;p++){
		let newPoint = new customPoint(points[p].x,points[p].y,-cnv.width/2,textBox.h/2,random(0.1,3));
		points[p] = newPoint;
	}
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

function mousePressed(){
	if(mode == 0){
		if(dist(mouseX,mouseY,center.x,center.y) <= r){
			toggleAnimation *= -1;
		}
	
		change*=toggleAnimation;
	}
}