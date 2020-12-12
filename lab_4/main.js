const points = [
  new Point(-100, -100, -100),
  new Point(100, -100, -100),
  new Point(0, 0, 100),
  new Point(100, -100, -100),
  new Point(100, 100, -100),
  new Point(0, 0, 100),
  new Point(100, 100, -100),
  new Point(-100, 100, -100),
  new Point(0, 0, 100),
  new Point(-100, 100, -100),
  new Point(-100, -100, -100),
  new Point(0, 0, 100),
]
const polyhedron = new Polyhedron(...points)
function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL)
}

function draw() {
  fullscreen()
  background(245)
  polyhedron.draw()
  polyhedron.drawTranslated(300, 0, 0)
  polyhedron.drawRotated('z', PI / 4)
  polyhedron.drawScaled(1, 1.5, 1)
}
