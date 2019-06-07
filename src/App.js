import React, { Component } from 'react';
import './App.css';

import isDarkCell from './misc/Utils'
import Board from './components/Board'


function generateBoard(starting_player = 0) {
  // generate empty matrix
  let board = Array(8).fill(null);
    
  board.forEach((row, idx) => {
    board[idx] = Array(8).fill(null)
  })

  // populate board
  board.forEach((row, row_idx) => {
    // put black pieces on board
    if (row_idx < 3) {
      row.forEach((col, col_idx) => {
        if (isDarkCell(col_idx, row_idx)) {
          row[col_idx] = starting_player;
        }
      })
    }

    // put white pieces on board
    if (row_idx > 4) {
      row.forEach((col, col_idx) => {
        if (isDarkCell(col_idx, row_idx)) {
          row[col_idx] = +!starting_player;
        }
      })
    }
  })

  return board;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: []
    }
  }

  componentWillMount() {
    // generate new board with 1 (dark pieces) as starting player
    let board = generateBoard(1); 

    this.setState({ board });
  }

  render() {
    return (
      <div className="App">
        <div id="main-container" className="centered-container">
          <Board board={this.state.board.slice().reverse()}/>
        </div>
      </div>
    );
  }
}

export default App;
