class ViewPort {
  /**
   * Draws a viewport with bottomleft and topright
   * @param {Point} windowBottomLeft
   * @param {Point} windowTopRight
   */
  constructor(windowBottomLeft, windowTopRight) {
    this.bottomLeft = windowBottomLeft
    this.topRight = windowTopRight
    this._lines = []
    this._clippedLines = []
  }
  drawWindow() {
    stroke('black')
    beginShape()
    strokeWeight(2)
    vertex(this.bottomLeft.x, this.bottomLeft.y)
    vertex(this.topRight.x, this.bottomLeft.y)
    vertex(this.topRight.x, this.topRight.y)
    vertex(this.bottomLeft.x, this.topRight.y)
    endShape(CLOSE)
    strokeWeight(1)
  }
  /**
   * Adds line before clipping the line
   * @param {Point} start
   * @param {Point} end
   */
  addLine(start, end) {
    this._lines.push([start, end])
  }
  clipAllLines() {
    const clippedLines = []
    for (const [start, end] of this._lines) {
      try {
        const clipped = cohenSutherland(
          this.bottomLeft,
          this.topRight,
          start.copy(),
          end.copy(),
        )
        clippedLines.push(clipped)
      } catch (error) {
        console.log(error)
      }
    }
    this._clippedLines = clippedLines
  }
  drawClippedLines() {
    stroke('red')
    strokeWeight(2)
    for (const [start, end] of this._clippedLines) {
      line(start.x, start.y, end.x, end.y)
    }
    strokeWeight(1)
    noStroke()
  }
  drawLine() {
    for (const [start, end] of this._lines) {
      line(start.x, start.y, end.x, end.y)
    }
  }
  /**
   * Draws line after clipping the line
   * @param {Point} start
   * @param {Point} end
   */
  drawClippedLine(start, end) {
    const [clippedStart, clippedEnd] = cohenSutherland(
      this.bottomLeft,
      this.topRight,
      start,
      end,
    )
    console.log(clippedStart, clippedEnd)
    stroke('red')
    line(clippedStart.x, clippedStart.y, clippedEnd.x, clippedEnd.y)
  }
}
