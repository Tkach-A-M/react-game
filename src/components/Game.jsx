import React, { useState } from 'react';
import GameField from './GameField';
import { checkWinner } from '../WinCombinations';
import './Game.css';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [clickCount, setClickCount] = useState(0);
    const winner = checkWinner(board);
    
    // обработка клика
    const handleClick = (index) =>{
        const copyBoard = [...board];

        // игра закончилась или ячейка занята
        if(winner || copyBoard[index]){
            return;
        }

        // чей ход
        copyBoard[index] = xIsNext ? 'X' : '0';

        setClickCount(clickCount + 1);
        setBoard(copyBoard);
        console.log(copyBoard);
        setXIsNext(!xIsNext);

        const gameData = {
            'field': copyBoard,
            'moves': clickCount + 1
        }

        localStorage.setItem('gameData', JSON.stringify(gameData));

    }

    const restartGame = () => {
        return (
            <button className='restartBtn' onClick={ () => {
                setBoard(Array(9).fill(null));
                setXIsNext(true);
                setClickCount(0);
                localStorage.clear();  
            }
        }>Заново</button>
        )
    }
    
    const restoreGame = () => {
        return (
            <button className='restoreBtn' onClick={ () => {
                    const gameData = JSON.parse(localStorage.getItem('gameData'));
                    setBoard(gameData.field);
                    setClickCount(gameData.moves);
                }
            }>
                Restore
            </button>            
        )
    }

    return(
        <div className='wrapper'>
            <p>
                { winner ? 'Победил ' + winner : 'Сейчас ходит ' + ( xIsNext ? 'x' : '0' ) }
            </p>
            <p>
                Ходов: { clickCount }
            </p>
            <GameField squares={board} click={handleClick}/>
            { restartGame() }
            { restoreGame() }

        </div>
    )
}

export default Game;