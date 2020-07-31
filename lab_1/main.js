// drawing made with reference to this origin just to move if overflow
const originX = 25;
const originY = 25;
// followed official guide from the constitution of nepal
const baseLength = 600;

function setup() {
  const screenResolution = `${displayWidth}x${displayHeight}`
  createP("<b>Programming Language:</b> JavaScript")
  createP("<b>Graphics Library:</b> p5.js")
  createP(`<b>Screen Resolution:</b> ${screenResolution}`)
  createCanvas(800, 800)
}

function draw() {
  background(245);
  drawBorder();
  drawMoon(originX + baseLength / 4, originY + 11 * baseLength / 30);
  drawSun(originX + baseLength / 4, originY + 43 * baseLength / 48, 7 * baseLength / 40, 7 * baseLength / 60, 12);
}

function drawBorder() {
  fill(234, 0, 52);
  stroke(47, 0, 150)
  beginShape();
  strokeWeight(baseLength / 50);
  vertex(originX, originY);
  vertex(originX, originY + 5 * baseLength / 4)
  vertex(originX + baseLength, originY + 5 * baseLength / 4);
  vertex(originX + 7 * baseLength / 24, originY + 13 * baseLength / 24);
  vertex(originX + baseLength, originY + 13 * baseLength / 24);
  endShape(CLOSE);
}

function drawMoon(x, y) {
  fill(255)
  noStroke();
  arc(x, y, 7 * baseLength / 25, 7 * baseLength / 27, 0, -PI, CHORD);
  fill(234, 0, 52);
  arc(x, y, 7 * baseLength / 25, 23 * baseLength / 150, 0, -PI, CHORD);
  fill(255)
  noStroke();
  drawSun(x, y + 11 * baseLength / 300, 3 * baseLength / 40, 7 * baseLength / 150, 14)

}

function drawSun(x, y, outRadius, inRadius, spikes) {

  let angle = TWO_PI / spikes;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * outRadius;
    let sy = y + sin(a) * outRadius;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * inRadius;
    sy = y + sin(a + halfAngle) * inRadius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
