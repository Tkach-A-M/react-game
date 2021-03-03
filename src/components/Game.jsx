import React, { useState } from 'react';
import GameField from './GameField';
// import Sounds from './sounds';
import { checkWinner } from '../WinCombinations';
import './Game.css';
import InfoWindow from './InfoWindow';

import Footer from './Footer';

const Game = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [clickCount, setClickCount] = useState(0);
    const [soundPlay, setSoundPlay] = useState(true);
    const [musicPlay, setMusicPlay] = useState(true);
    const [infoWindowActive, setInfoWindowActive] = useState(false);
    const winner = checkWinner(board);
    const [xWinCount, setXWinCount] = useState(0);
    const [zeroWinCount, setZeroWinCount] = useState(0);
    const [drawCount, setDrawCount] = useState(0);
    const [result, setResult] = useState('');

    const xSound = new Audio('https://zvukipro.com/uploads/files/2020-07/1593590712_mouth_foley_puff_09.mp3');
    const zeroSound = new Audio('https://zvukipro.com/uploads/files/2020-02/1581948879_583b80435257f33.mp3');
    const backMusic = new Audio('https://zvukipro.com/uploads/files/2020-05/1588412913_jeremy-blake-powerup.mp3');

    

    if(winner && clickCount === 10){
        return;
    }
    else{
        if(!winner && clickCount === 9){
           console.log('Ничья');
           setDrawCount(drawCount);
           return;
        }
        else{
            // console.log(winner)
            if(winner === '0'){
                console.log(winner);
                setZeroWinCount(zeroWinCount + 1);
                return;
            }
            if(winner === 'X'){
                console.log(winner);
                setXWinCount(xWinCount + 1);
                return;
            }
        }
    }


    // обработка клика
    const handleClick = (index) =>{
        const copyBoard = [...board];

        // игра закончилась или ячейка занята
        if(winner || copyBoard[index]){
            console.log(index);
            return;
        }

        console.log(winner);

        // записываем данные в ячейку
        copyBoard[index] = xIsNext ? 'X' : '0';

        if(xIsNext){
            document.querySelectorAll('.square')[index].classList.add('xFull');
        }
        else{
            document.querySelectorAll('.square')[index].classList.add('zeroFull');
        }

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
        const squares = document.querySelectorAll('.square');
        for(let i = 0; i < squares.length; i++){
            squares[i].classList.remove('xFull');
            squares[i].classList.remove('zeroFull');
        }
    }

    const infoBlock = () => {
        return (
            <div className='infoBlock'>
                <p><b>Shift + N</b> начать игру заново</p>
                <p><b>Shift + R</b> восстановить игру</p>
                <p><b>Shift + F</b> полноэкранный режим</p>
                <p><b>Shift + S</b> отключить звуки</p>
                <p><b>Shift + M</b> отключить музыку</p>
                <p><b>Shift + I</b> показать комбинации</p>
            </div>
        )
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
                const squares = document.querySelectorAll('.square');
                for(let i = 0; i < squares.length; i++){
                    if(squares[i].innerText === 'X'){
                        console.log('X');
                        squares[i].classList.add('xFull');
                    }
                    if(squares[i].innerHTML === '0'){
                        console.log('0')
                        squares[i].classList.add('zeroFull');
                    }
                }
            }
    }
    
    const restoreGame = () => {
        return (
            <button className='restoreBtn' onClick={ //restoreGameFnc 
                () => {
                    const gameData = JSON.parse(localStorage.getItem('gameData'));
                        if(gameData){
                            setBoard(gameData.field);
                            setClickCount(gameData.moves);
                            const squares = document.querySelectorAll('.square');
                            for(let i = 0; i < squares.length; i++){
                                if(squares[i].innerText === 'X'){
                                    console.log('X');
                                    squares[i].classList.add('xFull');
                                }
                                if(squares[i].innerHTML === '0'){
                                    console.log('0')
                                    squares[i].classList.add('zeroFull');
                                }
                            }
                        }
                    }
            } title='Shift + R'>
                Продолжить
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
            <button className='fullscreenBtn' onClick={ toggleFullscreen }  title='Shift + F'>
                1
            </button>
        )
    }

    const toggleSound = () => {
        setSoundPlay(!soundPlay);
    }

    const soundBtn = () => {
        return (
            <button className='soundBtn' onClick={ toggleSound } title='Shift + S'>
                 2
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
            } title='Shift + M'>
                3
            </button>
        )
    }

    const settingsBtn = () => {
        return (
            <button className='settingsBtn' title='Shift + T'>
                4
            </button>
        )
    }

    const showCombinations = () => {
        console.log(infoWindowActive);
        setInfoWindowActive(true);
        console.log(infoWindowActive);
    }

    const combinationsInfoBtn = () => {
        return (
            <button className='combinationsInfoBtn' onClick={ showCombinations } title='Shift + I'>
               5
            </button>
        )
    }


    // hotkeys
    document.onkeydown = event => {
        if(event.key === 'Shift'){
            document.onkeyup = event => {
                const key = event.keyCode;
                
                switch (key) {
                    case 70:
                        toggleFullscreen();
                        break;
                    case 73:
                        showCombinations();
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
            {/* <InfoWindow showInfo={ infoWindowActive } setShowInfo={ setInfoWindowActive }/> */}
            { infoBlock() }
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
                {/* { settingsBtn() } */}
                { combinationsInfoBtn() }
            </div>
            
            <GameField squares={board} click={handleClick}/>
            { restartGame() }
            { restoreGame() }
            {/* { showStatistic() } */}
            <p>{ 'X выиграл ' + xWinCount + ' раз. 0 Вы играл ' + zeroWinCount + ' раз. Ничьих: ' + drawCount }</p>
            <Footer />

        </div>
    )
}

export default Game;