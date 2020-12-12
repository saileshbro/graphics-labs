class Point {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z
  }
  copy() {
    return new Point(this.x, this.y, this.z)
  }
  static plot(x, y, z) {
    point(x, y, z)
  }
}
