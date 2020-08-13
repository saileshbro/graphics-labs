function bla(x0, y0, xn, yn) {
  const dx = Math.abs(xn - x0)
  const dy = Math.abs(yn - y0)
  const twiceDx = 2 * dx
  const twiceDy = 2 * dy
  const twiceDyDx = 2 * (dy - dx)
  const twiceDxDy = 2 * (dx - dy)
  let x, y, xEnd, yEnd;
  let p = twiceDy - dx
  if (dy / dx < 1) {
    if (x0 > xn) {
      x = xn;
      y = yn;
      xEnd = x0;
    } else {
      x = x0;
      y = y0;
      xEnd = xn;
    }
    point(x, y);
    while (x < xEnd) {
      x++;
      if (p < 0) {
        p += twiceDy;

      } else {
        y++;
        p += twiceDyDx
      }
      point(x, y)
    }
  } else {
    if (y0 > yn) {
      x = xn;
      y = yn;
      yEnd = y0;
    } else {
      x = x0;
      y = y0;
      yEnd = yn;
    }
    point(x, y);
    while (y < yEnd) {
      y++;
      if (p < 0) {
        p += twiceDx;
      } else {
        x++;
        p += twiceDxDy
      }
      point(x, y)
    }
  }
}
