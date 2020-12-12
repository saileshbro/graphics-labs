class Polyhedron {
  constructor(...points) {
    this.vertices = points
  }
  draw() {
    strokeWeight(2)
    stroke('black')
    this._drawVertices(this.vertices)
    strokeWeight(1)
    noFill()
  }
  drawTranslated(x, y, z) {
    const homogeneousCoords = this.getHomogeneousCoordinates()
    const translationMatrix = this._getTranslationMatrix(x, y, z)
    const multipliedMatrix = this._multiplyMatrices(
      translationMatrix,
      homogeneousCoords,
    )
    const translatedPoints = this.getPointsFromHomogeneousCoords(
      multipliedMatrix,
    )
    strokeWeight(2)
    stroke('green')
    this._drawVertices(translatedPoints)
    strokeWeight(1)
    noFill()
  }
  /**
   *
   * @param {number} sx
   * @param {number} sy
   * @param {number} sz
   */
  drawScaled(sx, sy, sz) {
    const homogeneousCoords = this.getHomogeneousCoordinates()
    const scalingMatrix = this._getScalingMatrix(sx, sy, sz)
    const multipliedMatrix = this._multiplyMatrices(
      scalingMatrix,
      homogeneousCoords,
    )
    const translatedPoints = this.getPointsFromHomogeneousCoords(
      multipliedMatrix,
    )
    strokeWeight(2)
    stroke('purple')
    this._drawVertices(translatedPoints)
    strokeWeight(1)
    noFill()
  }
  /**
   * @param {"x"|"y"|"z"} axis axis of rotation
   * @param {number} angle angle of rotation in pi
   */
  drawRotated(axis, angle) {
    const homogeneousCoords = this.getHomogeneousCoordinates()
    const rotationMat = this._getRotationMatrix(axis, angle)
    const multipliedMatrix = this._multiplyMatrices(
      rotationMat,
      homogeneousCoords,
    )
    const translatedPoints = this.getPointsFromHomogeneousCoords(
      multipliedMatrix,
    )
    strokeWeight(2)
    stroke('red')
    this._drawVertices(translatedPoints)
    strokeWeight(1)
    noFill()
  }
  _drawVertices(vertices) {
    beginShape()
    fill('black')
    vertices.forEach(({ x, y, z }) => vertex(x, y, z))
    endShape(CLOSE)
  }
  _getTranslationMatrix(x, y, z) {
    return [
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1],
    ]
  }
  _getScalingMatrix(x, y, z) {
    return [
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1],
    ]
  }
  /**
   * @param {"x"|"y"|"z"} axis axis of rotation
   * @param {number} angle angle of rotation in pi
   */
  _getRotationMatrix(axis, angle) {
    switch (axis) {
      case 'x':
        return [
          [1, 0, 0, 0],
          [0, cos(angle), -sin(angle), 0],
          [0, sin(angle), cos(angle), 0],
          [0, 0, 0, 1],
        ]

      case 'y':
        return [
          [cos(angle), 0, sin(angle), 0],
          [0, 1, 0, 0],
          [-sin(angle), 0, cos(angle), 0],
          [0, 0, 0, 1],
        ]
      case 'z':
        return [
          [cos(angle), -sin(angle), 0, 0],
          [sin(angle), cos(angle), 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1],
        ]
    }
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
    const arrZ = []
    this.vertices.forEach(val => {
      arrX.push(val.x)
      arrY.push(val.y)
      arrZ.push(val.z)
    })
    return [arrX, arrY, arrZ, arrX.map(e => 1)]
  }
  getPointsFromHomogeneousCoords(homogeneousCoords) {
    const newPoints = []
    for (let i = 0; i < homogeneousCoords.length - 3; i++) {
      for (let j = 0; j < homogeneousCoords[i].length; j++) {
        newPoints.push(
          new Point(
            homogeneousCoords[i][j],
            homogeneousCoords[i + 1][j],
            homogeneousCoords[i + 2][j],
          ),
        )
      }
    }
    return newPoints
  }
}
