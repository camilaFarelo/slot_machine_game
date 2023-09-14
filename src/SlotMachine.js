import React from 'react';

import useSlotMachine from './hooks/useSlotMachine';
import Wheel from './Wheel';
import Button from './Button';
import styleClasses from './SlotMachine.module.scss';
import Backgroundmain from './media/backgroundmain.jpg';
import BackgroundInit from './media/wallpaper2.jpeg';
import EnterNameAndLevel from './EnterNameAndLevel';
import UserInfo from './UserInfo';
import GameOver from './GameOver';
import Winner from './Winner';
import Sound from './Sound';

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
    const { wheels, startSpinningHandler, stopSpinningHandler, onSubmit, userForm, resultOptions, winner } = useSlotMachine();
    const {formData} = userForm;
    return (
        <div className={styleClasses['slot-machine']} style={{position: 'relative', backgroundImage: `url(${!userForm.hideForm ? BackgroundInit : Backgroundmain})`, backgroundSize: 'contain'}}>
            <Sound showWinner={winner.showWinner}/>
            {!userForm.hideForm && <EnterNameAndLevel userForm={userForm} />}
            {userForm.hideForm && <div>
                <UserInfo formData={formData} score={userForm.score}/>
                {(wheels.showGameOver) && <GameOver wheels={wheels} />}
                {winner.showWinner && <Winner wheels={wheels} />}
                <header className={styleClasses['slot-machine__header']}>
                    <h1 className={styleClasses['slot-machine__title']}>Slot Machine</h1>
                </header>

                <div className={styleClasses['slot-machine__wheels-wrapper']}>
                    {wheels.indexes &&
                        wheels.indexes.length &&
                        wheels.indexes.map(
                            (randomIndex, currIndex) => <Wheel key={currIndex} level={userForm.formData.level} signedWheel={currIndex === 1} containerIndex={currIndex} randomIndex={randomIndex} />
                        )
                    }
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
