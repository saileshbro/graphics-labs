function dda(x0, y0, xn, yn, color = "#000000", width = 1) {
  stroke(color)
  strokeWeight(width)
  let x = x0,
    y = y0
  const dx = xn - x0
  const dy = yn - y0
  let setpSize = Math.abs(dx) > Math.abs(dy) ? Math.abs(dx) : Math.abs(dy)
  const xInc = dx / setpSize
  const yInc = dy / setpSize
  point(x, y)
  for (let k = 0; k < setpSize; k++) {
    x += xInc
    y += yInc
    point(x, y)
  }
}
