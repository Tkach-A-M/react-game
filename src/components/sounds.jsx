import React from 'react'

const Sounds = () => {
    const xSound = new Audio('https://zvukipro.com/uploads/files/2020-07/1593590712_mouth_foley_puff_09.mp3');
    const zeroSound = new Audio('https://zvukipro.com/uploads/files/2020-02/1581948879_583b80435257f33.mp3');
    const backMusic = new Audio('https://zvukipro.com/uploads/files/2020-05/1588412913_jeremy-blake-powerup.mp3');

    backMusic.play();
}

export default Sounds;

