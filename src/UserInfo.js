import React from 'react';
import Peach from './media/peach.png';
import Yoshi from './media/yoshi.png';
import MarioBros from './media/marioBros.png';
import Star from './media/star.png';

const styles = {
  userName: {
    background: '#fad628',
    width: '73px',
    height: '73px',
    borderRadius: '50%',
  },
  character: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    overflow: 'hidden',
    background: '#f6f6f6',
    boxShadow: '-1px 1px 5px #06060685',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
    cursor: 'pointer',
    // border: '1px solid #f03617',
    outline: 'solid 0.1px #f03617',
    transition: 'all 0.4s linear',
  },
  userContainer: {
    position: 'absolute',
    left: '10px',
    top: '10px',
    width: '200px',
    display: 'flex',
    alignItems: 'center',
  },
  level: {
    background: '#f03517',
    color: 'white',
    borderRadius: '50px',
    padding: '2px 5px',
    marginBottom: '5px',
  }
}

const character = {
  peach: Peach,
  yoshi: Yoshi,
  marioBros: MarioBros,
};

const UserInfo = (props) => {
  const {formData} = props;
  return (
    <div style={styles.userContainer}>
      <div style={{width: '90px'}}>
        <div style={styles.character}>
          <img width='80' src={character[formData.character]} alt={character[formData.character]}/>
        </div>
        <p style={{margin: '0px', textAlign: 'center'}}>{formData.name}</p>
      </div>
      <div style={{marginLeft: '10px'}}>
        <div style={styles.level}>Level: {formData.level}</div>
        {Array.from({length: formData.lives}, (_, i) => {
          return (
            <img width='20' src={Star} alt={`star-${i}`}/>
          );
        })}
      </div>
    </div>
  );
}

export default UserInfo;