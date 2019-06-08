function isFillable(x, y, reversed = false) {
  let fillable = !((x % 2 + y % 2) % 2);
  return reversed ? !fillable : fillable;
}

function isValidCoords(x, y) {
  return (x >= 0 && x <= 7 && y >= 0 && y <= 7);
}

function reverse(x) {
  return 7 - x;
}

function normalizeCoords(coords, reversed = false) {
  if (!coords) return; 

  let 
    x = coords[0],
    y = coords[1];

  x = reversed ? x : reverse(x);
  y = reversed ? reverse(y) : y;

  return [x, y]
}

/*
  This function is necessary because the matrix is stored from left to right, from top to bottom.
  and we display the board as we would see it in the real world (left to right, from bottom to top)
*/
function displayBoard(board, reversed = false) {
  let new_board = board.slice();

  // invert X case current player is player one (white)
  if (!reversed) 
    new_board = new_board.reverse();

  // invert Y case current player is player two (black)
  if (reversed) {
    new_board = new_board.map((row) => (
      row.slice().reverse()
    ))
  }

  return new_board;
}

function displayPossibleMoves(moveList, reversed = false) {
  let possibleMoves = [];

  Object.keys(moveList).forEach((coord) => {
    possibleMoves.push(String(normalizeCoords(coord.split(','), reversed)))
  })

  return possibleMoves;
}

function getPossibleMoves(board, direction, row, col) {
  direction = direction ? -1 : 1;

  let 
    d1 = col - 1,
    d2 = col + 1,
    targetRow = row + direction,
    possibleMoves = [];


    //// extract this into a function
  if (isValidCoords(targetRow, d1) && isFillable(targetRow, d1)) {
    if (board[targetRow][d1] === null) {
      possibleMoves[[targetRow, d1]] = [];
    } else {
      let 
        tr2 = targetRow + direction,
        d11 = d1 - 1;

      if (isValidCoords(tr2, d11) && isFillable(tr2, d11) && board[tr2][d11] === null) {
        possibleMoves[[tr2, d11]] = [[targetRow, d1]]
      }
    }
  }

  if (isValidCoords(targetRow, d2) && isFillable(targetRow, d2)) {
    if (board[targetRow][d2] === null) {
      possibleMoves[[targetRow, d2]] = [];
    } else {
      let 
        tr2 = targetRow + direction,
        d22 = d2 + 1;

      if (isValidCoords(tr2, d22) && isFillable(tr2, d22) && board[tr2][d22] === null) {
        possibleMoves[[tr2, d22]] = [[targetRow, d2]]
      }
    }
  }

  return possibleMoves;
}

function movePiece(board, oldCoords, newCoords, captures = []) {
  let q = board[oldCoords[0]][oldCoords[1]];

  board[oldCoords[0]][oldCoords[1]] = null
  board[newCoords[0]][newCoords[1]] = q

  captures.forEach((coords) => {
    board[coords[0]][coords[1]] = null;
  })

  return board;
}


export { normalizeCoords, isFillable, displayBoard, getPossibleMoves, displayPossibleMoves, movePiece };