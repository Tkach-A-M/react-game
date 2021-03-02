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


    const restartGameFnc = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setClickCount(0);
        localStorage.clear();  
    }

    const restartGame = () => {
        return (
            <button className='restartBtn' onClick={ restartGameFnc } title='Shift + N'>
                Заново
            </button>
        )
    }

    const restoreGameFnc = () => {
        const gameData = JSON.parse(localStorage.getItem('gameData'));
            if(gameData){
                setBoard(gameData.field);
                setClickCount(gameData.moves);
            }
    }
    
    const restoreGame = () => {
        return (
            <button className='restoreBtn' onClick={ restoreGameFnc } title='Shift + R'>
                Продолжить
            </button>
        )
    }


    const toggleSound = () => {
        setSoundPlay(!soundPlay);
        console.log('sound switched')
    }

    const soundBtn = () => {
        return (
            <button className='soundBtn' onClick={ toggleSound } title='Shift + S'>
                MS
            </button>
        )
    }

    const musicBtn = () => {

        // backMusic.play();

        return (
            <button className='musicBtn' onClick={ () => {
                    if(backMusic.muted){
                        backMusic.muted = false;
                    }
                    else{
                        backMusic.muted = true;
                    }
                }
            }>
                MM
            </button>
        )
    }

    const toggleFullscreen = () => {
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

    const fullscreenBtn = () => { 
        return (
            <button className='fullscreenBtn' onClick={ toggleFullscreen } title='Shift + F'>
                FS
            </button>
        )
    }

    const settingsBtn = () => {
        return (
            <button className='settingsBtn'>
                S
            </button>
        )
    }

    const combinationsInfoBtn = () => {
        return (
            <button className='combinationsInfoBtn'>
                I
            </button>
        )
    }


    // hotkeys
    document.onkeydown = event => {
        if(event.key == 'Shift'){
            document.onkeyup = event => {
                const key = event.keyCode;
                
                switch (key) {
                    case 70:
                        toggleFullscreen();
                        break;
                    case 78:
                        restartGameFnc();
                        break;
                    case 82:
                        restoreGameFnc();
                        break;
                    case 83:
                        toggleSound();
                        break;
                    default:
                        break;
                }
            }
        }
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
                { settingsBtn() }
                { combinationsInfoBtn() }
            </div>
            
            <GameField squares={board} click={handleClick}/>
            { restartGame() }
            { restoreGame() }
            <Footer/>

        </div>
    )
}

export default Game;