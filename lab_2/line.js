class Line {
  /**
   *
   * @param {number} x0
   * @param {number} x1
   * @param {number} y0
   * @param {number} y1
   */
  constructor(x0, y0, x1, y1) {
    this.start = new Point(x0, y0)
    this.end = new Point(x1, y1)
    this._dx = (this.end.x - this.start.x)
    this._dy = (this.end.y - this.start.y)
    this._slope = this._dy / this._dx
    this._color = "black"
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
   * Draws line using BLA algorithm
   */
  drawByBLA() {
    stroke(this._color)
    strokeWeight(this._weight)
    let x, y, xEnd, yEnd
    const absDx = Math.abs(this._dx)
    const absDy = Math.abs(this._dy)
    const absSlope = Math.abs(this._slope)
    let p = (2 * absDy) - absDx
    if (absSlope < 1) {
      if (this.start.x > this.end.x) {
        x = this.end.x
        y = this.end.y
        xEnd = this.start.x
      } else {
        x = this.start.x
        y = this.start.y
        xEnd = this.end.x
      }
      Point.plot(x, y)
      while (x < xEnd) {
        x++
        if (p < 0) {
          p += 2 * absDy
        } else {
          y++
          p += 2 * (absDy - absDx)
        }
        Point.plot(x, y)
      }
    } else {
      if (this.start.y > this.end.y) {
        x = this.end.x;
        y = this.end.y;
        yEnd = this.start.y;
      } else {
        x = this.start.x;
        y = this.start.y;
        yEnd = this.end.y;
      }
      Point.plot(x, y)
      while (y < yEnd) {
        y++;
        if (p < 0) {
          p += 2 * absDx;
        } else {
          x++;
          p += 2 * (absDx - absDy)
        }
        Point.plot(x, y)
      }
    }
  }

  drawByDDA() {
    stroke(this._color)
    strokeWeight(this._weight)
    let x = this.start.x;
    let y = this.start.y;
    const setpSize = Math.abs(this._dx) > Math.abs(this._dy) ? Math.abs(this._dx) : Math.abs(this._dy)
    const xInc = this._dx / setpSize
    const yInc = this._dy / setpSize
    Point.plot(x, y)
    for (let k = 0; k < setpSize; k++) {
      x += xInc
      y += yInc
      Point.plot(x, y)
    }
  }
  drawByMPA() {
    stroke(this._color)
    strokeWeight(this._weight)
    let x, y, xEnd, yEnd
    const absDx = Math.abs(this._dx)
    const absDy = Math.abs(this._dy)
    if (absDx > absDy) {
      let d = absDy - (absDx / 2)
      if (this.start.x > this.end.x) {
        x = this.end.x
        y = this.end.y
        xEnd = this.start.x
      } else {
        x = this.start.x
        y = this.start.y
        xEnd = this.end.x
      }
      Point.plot(x, y)
      while (x < xEnd) {
        x++
        if (d < 0) {
          d += absDy
        } else {
          y++
          d += 2 * (absDy - absDx)
        }
        Point.plot(x, y)
      }
    } else {
      let d = absDx - (absDy / 2)
      if (this.start.y > this.end.y) {
        x = this.end.x;
        y = this.end.y;
        yEnd = this.start.y;
      } else {
        x = this.start.x;
        y = this.start.y;
        yEnd = this.end.y;
      }
      Point.plot(x, y)
      while (y < yEnd) {
        y++;
        if (d < 0) {
          d += absDx;
        } else {
          x++;
          d += 2 * (absDx - absDy)
        }
        Point.plot(x, y)
      }
    }
  }
}
