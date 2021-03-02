import React, { useState } from 'react';
import GameField from './GameField';
// import Sounds from './sounds';
import { checkWinner } from '../WinCombinations';
import './Game.css';
import Footer from './Footer';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [clickCount, setClickCount] = useState(0);
    const [soundPlay, setSoundPlay] = useState(true);
    const [musicPlay, setMusicPlay] = useState(true);
    const winner = checkWinner(board);
    

    const xSound = new Audio('https://zvukipro.com/uploads/files/2020-07/1593590712_mouth_foley_puff_09.mp3');
    const zeroSound = new Audio('https://zvukipro.com/uploads/files/2020-02/1581948879_583b80435257f33.mp3');
    const backMusic = new Audio('https://zvukipro.com/uploads/files/2020-05/1588412913_jeremy-blake-powerup.mp3');


    // обработка клика
    const handleClick = (index) =>{
        const copyBoard = [...board];

        

        // игра закончилась или ячейка занята
        if(winner || copyBoard[index]){
            console.log(winner);
            return;
        }

        // чей ход
        copyBoard[index] = xIsNext ? 'X' : '0';

        if(soundPlay){
            if(xIsNext){
                xSound.play();
            }
            else{
                zeroSound.play();
            }
        }

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
                    if(gameData){
                        setBoard(gameData.field);
                        setClickCount(gameData.moves);
                    }
                }
            }>Продолжить</button>            
        )
    }

    const soundBtn = () => {
        return (
            <button className='soundBtn' onClick={ () => {
                setSoundPlay(!soundPlay);
                }

            }>
                MS
            </button>
        )
    }

    const musicBtn = () => {
        return (
            <button className='musicBtn' onClick={ () => {
                    if(backMusic.paused){
                        backMusic.play();
                    }
                    else{
                        backMusic.pause();
                    }
                }
            }>
                MM
            </button>
        )
    }

    const fullscreenBtn = () => { 
        return (
            <button className='fullscreenBtn' onClick={ () => {
                    const isFullscreen = document.fullscreenElement 
                    || document.webkitFullscreenElement
                    || document.mozFullscreenElement
                    || document.msFullscreenElement;

                    if(isFullscreen){
                        document.exitFullscreen();
                    }
                    else{
                        document.documentElement.requestFullscreen().catch(console.log);
                    }
                }
            }>
                FS
            </button>
        )
    }



    return(
        <div className='wrapper'>
            {/* { backMusic.play() } */}
            <p>
                { winner ? 'Победил ' + winner : 'Сейчас ходит ' + ( xIsNext ? 'x' : '0' ) }
            </p>
            <p>
                Ходов: { clickCount }
            </p>
            <div className='controls'>
                { fullscreenBtn() }
                { soundBtn() }
                { musicBtn() }
                
            </div>
            
            <GameField squares={board} click={handleClick}/>
            { restartGame() }
            { restoreGame() }
            <Footer/>

        </div>
    )
}

export default Game;