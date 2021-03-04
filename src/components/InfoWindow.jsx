import React from 'react';
import './InfoWindow.css';

const InfoWindow = ({showInfo, setShowInfo}) => {
    console.log(showInfo);
    return (
        <div className={ showInfo ? 'infoWindowBcg show' : 'infoWindowBcg'} onClick={ () => setShowInfo(false) }>
            <div className='infoWindowContent' onClick={ e => e.stopPropagation()}>
            
            </div>
        </div>
    )
}

export default InfoWindow;
