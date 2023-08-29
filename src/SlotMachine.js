import React, {useState} from 'react';

import useSlotMachine from './hooks/useSlotMachine';
import Wheel from './Wheel';
import Message from './Message';
import Button from './Button';
import styleClasses from './SlotMachine.module.scss';
import Backgroundmain from './media/backgroundmain.jpg';
import Win from './media/win.jpg';
import BackgroundInit from './media/wallpaper2.jpeg';
import Lose from './media/lose.png';
import EnterNameAndLevel from './EnterNameAndLevel';
import UserInfo from './UserInfo';

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
    resultText: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingBottom: '15px',
    },
    optionsContainer: {
        display: 'flex',
        justifyContent: 'center',
        fontSize: '40px',
    },
    optionCard: {
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '9px',
        margin: '5px',
        cursor: 'pointer',
    }
}
const SlotMachine = () => {
    const { wheels, startSpinningHandler, stopSpinningHandler, onSubmit, userForm, resultOptions } = useSlotMachine();
    const {formData} = userForm;
    const srcImgResult = wheels.result === 'winner' ? Win : Lose;
    return (
        <div className={styleClasses['slot-machine']} style={{position: 'relative', backgroundImage: `url(${!userForm.hideForm ? BackgroundInit : Backgroundmain})`, backgroundSize: 'contain'}}>
            {!userForm.hideForm && <EnterNameAndLevel userForm={userForm} />}
            {userForm.hideForm && <div>
                <UserInfo formData={formData}/>
                {(wheels.result || wheels.showGameOver) && 
                    <div style={styles.resultsContainer}>
                        <div style={{textAlign: 'center', width: '100%', paddingTop: '17vh'}}>
                            <div style={styles.resultText}>
                                <img className='win-img' src={srcImgResult} style={{borderRadius: '50%', width: '58vh'}}/>
                            </div>
                            <Button title='Next' onClick={wheels.onNext} />
                        </div>
                        
                    </div>
                }
                <header className={styleClasses['slot-machine__header']}>
                    <h1 className={styleClasses['slot-machine__title']}>Slot Machine</h1>
                </header>

                <div className={styleClasses['slot-machine__wheels-wrapper']}>
                    {wheels.indexes &&
                        wheels.indexes.length &&
                        wheels.indexes.map((randomIndex, currIndex) => <Wheel key={currIndex} signedWheel={currIndex === 1} containerIndex={currIndex} randomIndex={randomIndex} />)}
                </div>

                {!resultOptions?.options?.length &&
                    <div className={styleClasses['slot-machine__btns-wrapper']}>
                        <Button title='Start Spinning' disabled={wheels.status === 'spinning'} onClick={startSpinningHandler} />
                        <Button
                            title='Stop It'
                            disabled={wheels.status !== 'spinning'}
                            severity='none'
                            onClick={stopSpinningHandler}
                        />
                    </div>
                }
                {resultOptions?.options?.length &&
                    <div style={styles.optionsContainer}>
                        {resultOptions?.options.map(
                            option => <div style={styles.optionCard} className={styleClasses['slot-machine__option-btn']} onClick={() => onSubmit(option)}>{option}</div>
                        )}
                    </div>
                }
            </div>}
        </div>
    );
};

export default SlotMachine;
