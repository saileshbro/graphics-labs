const points = [
  new Point(10, 10),
  new Point(10, 200),
  new Point(200, 200),
  new Point(200, 10),
]
const polygon = new Polygon(...points)
function setup() {
  createCanvas(windowWidth, windowHeight)
}

function draw() {
  fullscreen()
  background(245)
  push()
  // drawing coordinate system to visualize transformations
  line(width / 2, 0, width / 2, height)
  line(0, height / 2, width, height / 2)
  translate(width / 2, height / 2)
  scale(1, -1)
  polygon.draw()
  // polygon.drawSheared(0.1, 0.1)
  polygon.drawReflected(0, 100)
  pop()
}
