class Polygon {
  constructor(...points) {
    this.vertices = points
  }
  draw() {
    strokeWeight(2)
    stroke('black')
    beginShape()
    this.vertices.forEach(e => vertex(e.x, e.y))

    endShape(CLOSE)
  }
  /**
   * Draws a polygon reflected about the given line
   * @param {number} m Slope of the line
   * @param {number} c y-intercept of the line
   */
  drawReflected(m = 1, c = 0) {
    // extended_line(m, c)
  }
  drawSheared(sx, sy) {
    const homogeneousCoords = this.getHomogeneousCoordinates()
    const shearedMatrix = this._getShearedMatrix(sx, sy)
    const multipliedMatrix = this._multiplyMatrices(
      shearedMatrix,
      homogeneousCoords,
    )
    const shearedPoints = this.getPointsFromHomogeneousCoords(multipliedMatrix)
    stroke('green')
    beginShape()
    shearedPoints.forEach(e => vertex(e.x, e.y))
    endShape(CLOSE)
  }

  _getShearedMatrix(sx, sy) {
    return [
      [1, sx, 0],
      [sy, 1, 0],
      [0, 0, 1],
    ]
  }
  _multiplyMatrices(a, b) {
    let aRows = a.length
    let aCols = a[0].length
    let bCols = b[0].length
    let result = new Array(aRows)
    for (let r = 0; r < aRows; ++r) {
      const row = new Array(bCols)
      result[r] = row
      const ar = a[r]
      for (let c = 0; c < bCols; ++c) {
        let sum = 0
        for (let i = 0; i < aCols; ++i) {
          sum += ar[i] * b[i][c]
        }
        row[c] = sum
      }
    }
    return result
  }
  getHomogeneousCoordinates() {
    const arrX = []
    const arrY = []
    this.vertices.forEach(val => {
      arrX.push(val.x)
      arrY.push(val.y)
    })
    return [arrX, arrY, arrX.map(e => 1)]
  }
  getPointsFromHomogeneousCoords(homogeneousCoords) {
    const newPoints = []
    for (let i = 0; i < homogeneousCoords.length - 2; i++) {
      for (let j = 0; j < homogeneousCoords[i].length; j++) {
        newPoints.push(
          new Point(homogeneousCoords[i][j], homogeneousCoords[i + 1][j]),
        )
      }
    }
    return newPoints
  }
}
