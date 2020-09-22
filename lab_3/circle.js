class Circle {
  /**
   * Constructs a circle object with center and the radius
   * @param {number} x x-center of the circle
   * @param {number} y y-center of the circle
   * @param {number} r raduis of the circle
   */
  constructor(x, y, r) {
    this.center = new Point(x, y)
    this.radius = r
    this._color = 'black'
    this._weight = 1
  }
  /**
   *
   * @param {number} weight
   */
  setWidth(weight) {
    this._weight = weight
  }
  /**
   *
   * @param {String} color
   */
  setColor(color) {
    this._color = color
  }
  /**
   * Attempts to draw the circle using mid point algorithm
   */
  drawByMPA() {
    stroke(this._color)
    strokeWeight(this._weight)
    let x = 0,
      y = this.radius
    Point.plot(x + this.center.x, y + this.center.y)
    if (this.radius > 0) {
      Point.plot(x + this.center.x, -y + this.center.y)
      Point.plot(y + this.center.x, x + this.center.y)
      Point.plot(-y + this.center.x, x + this.center.y)
    }
    let p = 5 / 4 - this.radius
    for (x = 0; x <= y; x++) {
      // midpoint is inside or on the circumference
      if (p < 0) {
        p = p + (2 * x + 1)
      } else {
        y--
        p = p + 2 * x - (2 * y + 1)
      }
      Point.plot(x + this.center.x, -y + this.center.y)
      Point.plot(-x + this.center.x, y + this.center.y)
      Point.plot(x + this.center.x, y + this.center.y)
      Point.plot(-x + this.center.x, -y + this.center.y)
      Point.plot(y + this.center.x, x + this.center.y)
      Point.plot(-y + this.center.x, x + this.center.y)
      Point.plot(y + this.center.x, -x + this.center.y)
      Point.plot(-y + this.center.x, -x + this.center.y)
    }
    noStroke()
  }
}
