const line = new Line(800, 800, 0, 0)

function setup() {
  createCanvas(800, 800)
}

function draw() {
  background(245);
  line.setColor("red")
  line.setWidth(2)
  line.drawByBLA()
}
