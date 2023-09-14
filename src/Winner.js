import React from 'react';
import GameOverBg from './media/losebg.png';
import WinImg from './media/win.jpg';
import Button from './Button';

const styles = {
  resultsContainer: {
      position: 'absolute',
      background: 'rgba(255, 255, 255, 72%)',
      top: '0px',
      bottom: '0px',
      left: '0px',
      right: '0px',
      zIndex: 2,
      display: 'flex',
  },
}

const Winner = (props) => {
  const {wheels} = props;
  const resultsContainerStyles = wheels.showGameOver ? {...styles.resultsContainer, backgroundImage: `url(${GameOverBg})`, backgroundSize: 'contain'} : styles.resultsContainer;

  return (
    <div style={resultsContainerStyles}>
      <div style={{textAlign: 'center', width: '100%', paddingTop: '17vh'}}>
          <div><img className='win-img' src={WinImg} alt="winner" width={300}/></div>
          <Button title='Play Again' onClick={wheels.onRestart} />
      </div>
    </div>
  );
}

export default Winner;