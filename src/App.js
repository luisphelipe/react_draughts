import React, { Component } from 'react';
import './App.css';

import { isFillable, displayBoard, normalizeCoords, getPossibleMoves, displayPossibleMoves, movePiece } from './misc/Utils'
import Board from './components/Board'

const 
  PLAYER_ONE = 0,
  PLAYER_TWO = 1,
  // this flag defines if the camera follows current player or not
  SINGLE_PLAYER = true; 


function generateBoard() {
  // generate empty matrix
  let board = Array(8).fill(null);
    
  board.forEach((row, idx) => {
    board[idx] = Array(8).fill(null)
  })

  // populate board
  board.forEach((row, row_idx) => {
    // put white pieces on board (PLAYER_ONE)
    if (row_idx < 3) {
      row.forEach((col, col_idx) => {
        if (isFillable(col_idx, row_idx)) {
          row[col_idx] = PLAYER_ONE;
        }
      })
    }

    // put black pieces on board (PLAYER_TWO)
    if (row_idx > 4) {
      row.forEach((col, col_idx) => {
        if (isFillable(col_idx, row_idx)) {
          row[col_idx] = PLAYER_TWO;
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
      board: [],
      whoAmI: null, // only used in multiplayer
      currentPlayer: PLAYER_ONE,
      selectedPiece: [],
      possibleMoves: [],

      handleClick: this.handleClick.bind(this)
    }

  }

  handleClick(row, col) {
    [row, col] = normalizeCoords([row, col], this.state.currentPlayer);

    let 
      previous = this.state.selectedPiece,
      selected = this.state.board[row][col], 
      possibleMoves = [];

    // here we should have the logic for moving selected piece
    if (previous.length > 0 && selected === null) {
      if (!(Object.keys(this.state.possibleMoves).includes(String([row, col])))) return;

      let board = movePiece(this.state.board, previous, [row, col], this.state.possibleMoves[String([row, col])]);

      this.setState(prevState => ({
        board,
        selectedPiece: [], 
        possibleMoves: [], 
        currentPlayer: +!prevState.currentPlayer
      }))

      return;
    }

    // this is the logic for selecting a piece
    if (selected !== this.state.currentPlayer) return;

    // unselect piece if re-clicked it
    if (String(previous) === String([row, col])) {
      this.setState({selectedPiece: [], possibleMoves})
      return;
    }

    possibleMoves = getPossibleMoves(this.state.board, this.state.currentPlayer, row, col)

    this.setState({selectedPiece: [row, col], possibleMoves})
  }


  componentWillMount() {
    let board = generateBoard(); 

    this.setState({ board });
  }

  render() {
    // the board is reversed depending on current player turn
    let  
      adjustedCoords,
      adjustedBoard,
      // game board orientation, depenting if SINGLE_PLAYER or not
      orientation = SINGLE_PLAYER ? this.state.currentPlayer : this.state.whoAmI,
      adjustedMoves = this.state.possibleMoves;
      
      adjustedCoords = String(normalizeCoords(this.state.selectedPiece, orientation));
      adjustedBoard = displayBoard(this.state.board, orientation);
      adjustedMoves = this.state.selectedPiece.length ? displayPossibleMoves(adjustedMoves, orientation) : [];



    return (
      <div className="App">
        <div id="main-container" className="centered-container">
          <Board 
            board={adjustedBoard} 
            selectedPiece={adjustedCoords}
            possibleMoves={adjustedMoves}
            handleClick={this.state.handleClick}
          />
        </div>
      </div>
    );
  }
}

export default App;
