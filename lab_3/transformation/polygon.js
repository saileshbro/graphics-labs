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
   * angle of rotation in degrees
   * @param {number} angle
   */
  drawRotated(angle) {
    const homogeneousCoords = this.getHomogeneousCoordinates()
    const rotationMatrix = this._getRotationMatrix(angle)
    const multipliedMatrix = this._multiplyMatrices(
      rotationMatrix,
      homogeneousCoords,
    )
    const rotatedPoints = this.getPointsFromHomogeneousCoords(multipliedMatrix)
    stroke('red')
    beginShape()
    rotatedPoints.forEach(e => vertex(e.x, e.y))

    endShape(CLOSE)
  }
  drawTranslated(x, y) {
    const homogeneousCoords = this.getHomogeneousCoordinates()
    const rotationMatrix = this._getTranslationMatrix(x, y)
    const multipliedMatrix = this._multiplyMatrices(
      rotationMatrix,
      homogeneousCoords,
    )
    const translatedPoints = this.getPointsFromHomogeneousCoords(
      multipliedMatrix,
    )
    stroke('green')
    beginShape()
    translatedPoints.forEach(e => vertex(e.x, e.y))

    endShape(CLOSE)
  }
  drawScaled(sx, sy) {
    const homogeneousCoords = this.getHomogeneousCoordinates()
    const scaleMatrix = this._getScalingMatrix(sx, sy)
    const multipliedMatrix = this._multiplyMatrices(
      scaleMatrix,
      homogeneousCoords,
    )
    const translatedPoints = this.getPointsFromHomogeneousCoords(
      multipliedMatrix,
    )
    stroke('purple')
    beginShape()
    translatedPoints.forEach(e => vertex(e.x, e.y))
    endShape(CLOSE)
  }
  _getRotationMatrix(angle) {
    const rads = (Math.PI * angle) / 180
    return [
      [Math.cos(rads), Math.sin(rads), 0],
      [-1 * Math.sin(rads), Math.cos(rads), 0],
      [0, 0, 1],
    ]
  }
  _getTranslationMatrix(x, y) {
    return [
      [1, 0, x],
      [0, 1, y],
      [0, 0, 1],
    ]
  }
  _getScalingMatrix(sx, sy) {
    return [
      [sx, 0, 0],
      [0, sy, 0],
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
