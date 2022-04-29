segNum = 30;
segH = 50;
segL = 70;
finOffset = 1;

finColour = '#E81B05';
cp = ['#188B58','#6A3FFA','#6789C9','#023FB7','#3BA2A1','#6482DB'];
c = [];

x = [];
y = [];
xdrag = 0;
ydrag = 0;


function preload(){
  face = loadImage("data/head.png");
  claw1 = loadImage("data/claw_1.png");
  claw2 = loadImage("data/claw_2.png");
  claw3 = loadImage("data/claw_3.png");
  claw4 = loadImage("data/claw_4.png");
  pearl = loadImage("data/pearl.png");
  webgazer.setGazeListener(function(data, elapsedTime) {
    if (data == null) {
        return;
    }
    xdrag = xdrag + (data.x - xdrag)/4; //these x coordinates are relative to the viewport
    ydrag = ydrag + (data.y - ydrag)/4; //these y coordinates are relative to the viewport
  }).begin();
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  background(0);
  for (let i=0; i<segNum; i++){
    c.push((cp[int(random(cp.length))]));
    x.push(0);
    y.push(0);
  }
}


function draw() {
//  background('#0B2431');
  background(0);
  xstart = width-xdrag*1.25;
  ystart = height-ydrag*1.25;
  
    dragSegment(0, xstart, ystart); // screenopposite of mouse
//  dragSegment(0, mouseX, mouseY);
  for(let i=0; i<x.length-1; i++) {
    dragSegment(i+1, x[i], y[i]);
  }
  imageMode(CENTER);
  image(face,xstart,ystart,0.25*windowWidth,0.25*windowHeight);
//  image(face,mouseX,mouseY);

  image(pearl, xdrag, ydrag);

}// end draw

function dragSegment (i, xin, yin){
  const dx = xin - x[i];
  const dy = yin - y[i];
  const angle = atan2(dy, dx);  
  x[i] = xin - cos(angle) * segL;
  y[i] = yin - sin(angle) * segL;
  segment(x[i], y[i], angle, i);
  
  // Draw Legs
  if(i == segNum/5){
    image(claw1,x[i]-250,y[i]);
    image(claw2,x[i]+250,y[i]);
  }if(i == segNum/5*3){
    image(claw4,x[i]-250,y[i]);
    image(claw3,x[i]+250,y[i]);
  }
}

function segment(x, y, a, i) {
  push();
  translate(x, y);
  rotate(a);
  
  //Fins
  noStroke();
  fill(color(finColour));
  triangle(segL/3,segH,segL/3*2,segH,segL/2,segH*2.5); // middle triangle
  fill(color('#860B0B'));
  triangle(0+finOffset,segH,segL/3,segH,segL/6-finOffset,segH*2); // front
  triangle(segL/3*2+finOffset,segH,segL-finOffset,segH,segL/6*5,segH*2); // back

  //Body Segment
  stroke(color(c[i]));
  strokeWeight(30);
  
  //beginShape(POINTS);
  // texture(t1);
  // vertex(0, 0);
  // vertex(segH, 0);
  // vertex(segH, segL);
  // vertex(0, segL);
  //endShape(CLOSE);
  
  fill(color(c[i]));
  rect(0,0,segL,segH,10);

  
//  line(0, 0, segLength, 0); ------------ from original code
  pop();
}

function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
}
