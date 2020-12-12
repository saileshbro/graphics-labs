class Polygon {
  constructor(...points) {
    this.vertices = points
  }
  draw() {
    strokeWeight(2)
    stroke('black')
    fill('black')
    beginShape()
    this.vertices.forEach(e => vertex(e.x, e.y))
    endShape()
    noFill()
  }
  /**
   * Draws reflection about given param
   * @param {"x"|"y"|"xy"|"o"} about
   */
  drawReflected(about) {
    const homogeneousCoords = this.getHomogeneousCoordinates()
    const [color, reflectionMatrix] = this._getReflectionMatrix(about)
    const multipliedMatrix = this._multiplyMatrices(
      reflectionMatrix,
      homogeneousCoords,
    )
    const shearedPoints = this.getPointsFromHomogeneousCoords(multipliedMatrix)
    stroke(color)
    fill(color)
    beginShape()
    shearedPoints.forEach(e => vertex(e.x, e.y))
    endShape(CLOSE)
    noFill()
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
    fill('green')
    beginShape()
    shearedPoints.forEach(e => vertex(e.x, e.y))
    endShape(CLOSE)
    noFill()
  }
  /**
   * @param {"x"|"y"|"xy"|"o"} type
   */
  _getReflectionMatrix(type) {
    switch (type) {
      case 'x':
        return [
          'red',
          [
            [1, 0, 0],
            [0, -1, 0],
            [0, 0, 1],
          ],
        ]
      case 'y':
        return [
          'green',
          [
            [-1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
          ],
        ]
      case 'xy':
        return [
          'orange',
          [
            [0, 1, 0],
            [1, 0, 0],
            [0, 0, 1],
          ],
        ]
      case 'o':
        return [
          'purple',
          [
            [-1, 0, 0],
            [0, -1, 0],
            [0, 0, 1],
          ],
        ]
    }
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
