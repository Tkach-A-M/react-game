import React, { useState } from 'react';
import GameField from './GameField';
import { checkWinner } from '../WinCombinations';
import './Game.css';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, sttXIsNext] = useState(true);
    const winner = checkWinner(board);

    const handleClick = (index) =>{
        const copyBoard = [...board];

        // игра закончилась или ячейка занята
        if(winner || copyBoard[index]){
            return;
        }

        // чей ход
        copyBoard[index] = xIsNext ? 'X' : '0';

        setBoard(copyBoard);
        sttXIsNext(!xIsNext);

    }
    
    return(
        <div className='wrapper'>
            <GameField squares = {board} click={handleClick}/>
        </div>
    )
}

export default Game;