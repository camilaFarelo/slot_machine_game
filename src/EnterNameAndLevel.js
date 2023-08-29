import React from 'react';
import {isEmpty} from 'lodash';
import Peach from './media/peach.png';
import Yoshi from './media/yoshi.png';
import MarioBros from './media/marioBros.png';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  submitBtn: {
    marginTop: '10px',
    padding: '9px',
    color: 'white',
    backgroundColor: '#f03617',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
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
  characterSelected: {
    // border: '1px solid #f03617',
    outlineWidth: '5px',
  }
};

const character = {
  peach: Peach,
  yoshi: Yoshi,
  marioBros: MarioBros,
};

const EnterNameAndLevel = ({userForm}) => {
  const {setFormData, formData, handleSubmit} = userForm;
  const disabledButton = isEmpty(formData.name) || isEmpty(formData.level) || isEmpty(formData.character);
  console.log('disabledButton---0', disabledButton);
  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={{width: '300px'}}>
        <h1>Math Game</h1>
        <div>
          <label>Personaje</label>
          <div style={{display: 'flex'}}>
            {['peach', 'yoshi', 'marioBros'].map((item) => (
              <div style={formData.character === item ? {...styles.character, ...styles.characterSelected} : styles.character} onClick={(event) => setFormData({...formData, character: item})}>
                <img src={character[item]} alt={item} width={80}/>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Name</label>
          <input style={{width: '100%', height: '20px', marginBottom: '5px'}} onChange={(event) => setFormData({...formData, name: event.target.value})}/>
        </div>
        <div>
          <label>Nivel</label>
          <select style={{width: '100%'}} name="levels" id="levels" onChange={(event) => setFormData({...formData, level: event.target.value})}>
            <option value="level1">level 1</option>
            <option value="level2">level 2</option>
            <option value="level3">level 3</option>
            <option value="level4">level 4</option>
          </select>
        </div>
        <input type="submit" value="Submit" style={styles.submitBtn} disabled={disabledButton}/>
      </form>
    </div>
  );
};

export default EnterNameAndLevel