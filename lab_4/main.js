const points = [new Point(0, 100), new Point(50, 300), new Point(100, 0)]
const polygon = new Polygon(...points)
const viewport = new ViewPort(new Point(400, 100), new Point(800, 500))
function setup() {
  createCanvas(windowWidth, windowHeight)
  viewport.addLine(new Point(200, 600), new Point(900, 200))
  viewport.addLine(new Point(200, 500), new Point(900, 300))
  viewport.addLine(new Point(500, 300), new Point(900, 500))
  viewport.clipAllLines()
}

function draw() {
  fullscreen()
  background(245)
  background(200)
  // rotateX(frameCount * 0.01)
  // rotateY(frameCount * 0.01)
  // drawing coordinate system to visualize transformations
  // push()
  // line(width / 2, 0, width / 2, height)
  // line(0, height / 2, width, height / 2)
  // translate(width / 2, height / 2)
  // scale(1, -1)
  // polygon.draw()
  // polygon.drawReflected('xy')
  // polygon.drawReflected('y')
  // polygon.drawReflected('x')
  // polygon.drawReflected('o')
  // pop()
  viewport.drawWindow()
  viewport.drawLine()
  viewport.drawClippedLines()
}
