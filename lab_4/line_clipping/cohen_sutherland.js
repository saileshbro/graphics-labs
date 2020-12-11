/**
 * Clips the line with Cohen Sutherlang Line Clipping Algorithm
 * @param {Point} windowBottomLeft
 * @param {Point} windowTopRight
 * @param {Point} lineStart
 * @param {Point} lineEnd
 */
function cohenSutherland(windowBottomLeft, windowTopRight, lineStart, lineEnd) {
  const INSIDE = 0 //0000
  const LEFT = 1 // 0001
  const RIGHT = 2 // 0010
  const BOTTOM = 4 // 0100
  const TOP = 8 //1000
  const xmin = windowBottomLeft.x
  const ymin = windowBottomLeft.y
  const xmax = windowTopRight.x
  const ymax = windowTopRight.y
  /**
   * gets code for the point
   * @param {Point} point
   */
  const generateCode = point => {
    let code = INSIDE
    if (point.x < xmin) {
      code |= LEFT
    } else if (point.x > xmax) {
      code |= RIGHT
    }
    if (point.y < ymin) {
      code |= BOTTOM
    } else if (point.y > ymax) {
      code |= TOP
    }
    return code
  }
  let code1 = generateCode(lineStart)
  let code2 = generateCode(lineEnd)
  let accept = false
  while (true) {
    if (code1 === 0 && code2 === 0) {
      // If both iniside viewport
      accept = true
      break
    } else {
      const checkCode = code1 & code2
      if (checkCode !== 0) {
        accept = false
        break
      } else {
        let codeout
        let point = {}
        if (code1 !== 0) {
          codeout = code1
        } else {
          codeout = code2
        }
        if (codeout & TOP) {
          point.x =
            lineStart.x +
            ((lineEnd.x - lineStart.x) * (ymax - lineStart.y)) /
              (lineEnd.y - lineStart.y)
          point.y = ymax
        } else if (codeout & BOTTOM) {
          point.x =
            lineStart.x +
            ((lineEnd.x - lineStart.x) * (ymin - lineStart.y)) /
              (lineEnd.y - lineStart.y)
          point.y = ymin
        } else if (codeout & RIGHT) {
          point.y =
            lineStart.y +
            ((lineEnd.y - lineStart.y) * (xmax - lineStart.x)) /
              (lineEnd.x - lineStart.x)
          point.x = xmax
        } else if (codeout & LEFT) {
          point.y =
            lineStart.y +
            ((lineEnd.y - lineStart.y) * (xmin - lineStart.x)) /
              (lineEnd.x - lineStart.x)
          point.x = xmin
        }
        if (codeout == code1) {
          lineStart.x = point.x
          lineStart.y = point.y
          code1 = generateCode(lineStart)
        } else {
          lineEnd.x = point.x
          lineEnd.y = point.y
          code2 = generateCode(lineEnd)
        }
      }
    }
  }

  if (accept) {
    return [lineStart, lineEnd]
  } else {
    throw new Error('Line rejected!')
  }
}
