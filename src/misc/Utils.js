function isDarkCell(x, y) {
  return !((x % 2 + y % 2) % 2);
}

export default isDarkCell;