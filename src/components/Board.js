import React from 'react';

import { isFillable } from '../misc/Utils'

function Piece(props) {
  return (
    <div className={
      `
        board-piece 
        ${ 
          props.possibleMove 
          ? 'board-piece-possible'
          : `board-piece-${ props.selected ? 'selected' : props.player ? 'black' : 'white' }`
        }
      `
      }>
    </div>
  ) 
}

function Cell(props) {
  return (
    <div 
      className={`board-cell board-cell-${ props.isFillable ? 'dark' : 'light' }`}
      onClick={() => ( props.handleClick() )} 
      >
      { 
        props.cell !== null && 
          <Piece 
            player={props.cell}
            selected={props.selected}
            />
      }

      { 
        props.possibleMove && 
          <Piece 
            possibleMove={true}
            />
      }

    </div>
  ) 
}


function Row(props) {
  return (
    <div className="board-row">
      {
        props.row.map((col, idx) => (
          <Cell 
            cell={col} 
            key={idx} 
            selected={String([props.idx, idx]) === props.selectedPiece}
            possibleMove={props.possibleMoves.includes(String([props.idx, idx]))}
            isFillable={!isFillable(props.idx, idx)} // NOT, since display is reversed
            handleClick={() => ( props.handleClick(idx) )}
            />
        ))
      }
    </div>
  )
}

function Board(props) {
  return (
    <div className="board">
      {
        props.board.map((row, idx) => (
          <Row 
            row={row} 
            key={idx} 
            idx={idx} 
            selectedPiece={props.selectedPiece} 
            possibleMoves={props.possibleMoves} 
            handleClick={(col) => ( props.handleClick(idx, col) )}
            />
        ))
      }
    </div>
  );
}

export default Board;
