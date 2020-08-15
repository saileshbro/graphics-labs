function mpa(x0, y0, xn, yn, color = "#000000", width = 1) {
  stroke(color)
  strokeWeight(width)
  const dx = Math.abs(xn - x0)
  const dy = Math.abs(yn - y0)
  let x, y, xEnd, yEnd
  if (dx > dy) {
    let d = dy - (dx / 2)
    if (x0 > xn) {
      x = xn;
      y = yn;
      xEnd = x0;
    } else {
      x = x0;
      y = y0;
      xEnd = xn;
    }
    point(x, y)
    while (x < xEnd) {
      x++
      if (d < 0) {
        d += dy
      } else {
        y++
        d += (dy - dx)
      }
      point(x, y)
    }
  } else {

    let d = dx - (dy / 2)
    if (y0 > yn) {
      x = xn;
      y = yn;
      yEnd = y0;
    } else {
      x = x0;
      y = y0;
      yEnd = yn;
    }
    point(x, y)
    while (y < yEnd) {
      y++
      if (d < 0) {
        d += dx
      } else {
        x++
        d += (dx - dy)
      }
      point(x, y)
    }
  }
}
