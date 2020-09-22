class Ellipse {
  /**
   * Constructs a circle object with center and the radius
   * @param {number} x x-center of the circle
   * @param {number} y y-center of the circle
   * @param {number} this.rx radius along x-axis of the circle
   * @param {number} this.ry radius along y-axis of the circle
   */
  constructor(x, y, rx, ry) {
    this.center = new Point(x, y)
    this.rx = rx
    this.ry = ry
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
    let dx, dy, p1, p2, x, y
    x = 0
    y = this.ry
    p1 = this.ry ** 2 - this.rx ** 2 * this.ry + 0.25 * this.rx ** 2
    p2 =
      this.ry ** 2 * (x + 0.5) ** 2 +
      this.rx ** 2 * (y - 1) ** 2 -
      this.rx ** 2 * this.ry ** 2

    dx = 2 * this.ry ** 2 * x
    dy = 2 * this.rx ** 2 * y

    // For region 1
    while (dx < dy) {
      // Print points based on 4-way symmetthis.ry
      Point.plot(x + this.center.x, y + this.center.y)
      Point.plot(-x + this.center.x, y + this.center.y)
      Point.plot(x + this.center.x, -y + this.center.y)
      Point.plot(-x + this.center.x, -y + this.center.y)
      // Checking and updating value of
      // decision parameter based on algorithm
      x++
      dx += 2 * this.ry ** 2
      if (p1 < 0) {
        p1 = p1 + dx + this.ry ** 2
      } else {
        y--
        dy += -2 * this.rx ** 2
        p1 += dx - dy + this.ry ** 2
      }
    }
    // Plotting points of region 2
    while (y >= 0) {
      // Print points based on 4-way symmetthis.ry
      Point.plot(x + this.center.x, y + this.center.y)
      Point.plot(-x + this.center.x, y + this.center.y)
      Point.plot(x + this.center.x, -y + this.center.y)
      Point.plot(-x + this.center.x, -y + this.center.y)
      // Checking and updating parameter
      // value based on algorithm
      y--
      dy += -2 * this.rx ** 2
      if (p2 > 0) {
        p2 += this.rx ** 2 - dy
      } else {
        x++
        dx += 2 * this.ry ** 2
        p2 += dx - dy + this.rx ** 2
      }
    }
    noStroke()
  }
}
