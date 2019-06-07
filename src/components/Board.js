import React from 'react';

import isDarkCell from '../misc/Utils'

function Piece(props) {
  return (
    <div className={`board-piece board-piece-${ props.player ? 'black' : 'white' }`}>
    </div>
  ) 
}

function Cell(props) {
  return (
    <div className={`board-cell board-cell-${ props.isDark ? 'dark' : 'light' }`}>
      { 
        props.cell !== null && 
          <Piece player={props.cell}/>
      }
    </div>
  ) 
}

function Row(props) {
  return (
    <div className="board-row">
      {
        props.row.map((col, idx) => (
          <Cell isDark={isDarkCell(props.idx, idx)} cell={col} key={idx}/>
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
          <Row row={row} key={idx} idx={idx} />
        ))
      }
    </div>
  );
}

export default Board;
