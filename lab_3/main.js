const points = [
  new Point(100, 100),
  new Point(200, 100),
  new Point(400, 400),
  new Point(200, 200),
  new Point(100, 200),
]
const polygon = new Polygon(...points)
function setup() {
  createCanvas(600, 600)
  // scale between 0 and 1
}

function draw() {
  background(245)
  polygon.draw()
  polygon.drawScaled(1.1, 0.8)
  polygon.drawRotated(10)
  polygon.drawTranslated(-50, 50)
}
