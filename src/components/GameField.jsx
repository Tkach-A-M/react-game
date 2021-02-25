import React from 'react';
import './GameField.css';
import Square from './Square';



const GameField = ({squares, click}) => {
    return(
        <div className="gameField">
            {
                squares .map((square, i) => 
                (
                    <Square key={i} value={square} onClick= { () =>
                        click(i)
                    }/>
                ))
            }
        </div>
    )
}

export default GameField;