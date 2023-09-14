import React from 'react';

import styleClasses from './Wheel.module.scss';
import Strawberry from './media/strawberry.png';
import Orange from './media/orange.png';
import Banana from './media/banana.png';
import Monkey from './media/monkey.png';

const items = [
    'Strawberry',
    'Orange',
    'Banana',
    'Monkey',
];

const components = {
    'Strawberry': Strawberry,
    'Orange': Orange,
    'Banana': Banana,
    'Monkey': Monkey,
};

const signos = {
    level1: {
        'Strawberry': '+',
        'Orange': '-',
        'Banana': '+',
        'Monkey': '-',
    },
    level2: {
        'Strawberry': '+',
        'Orange': '-',
        'Banana': 'x',
        'Monkey': 'x',
    },
    level3: {
        'Strawberry': '+',
        'Orange': '-',
        'Banana': 'x',
        'Monkey': '/',
    }
};

const styles = {
    numberBag: {
        fontSize: '20px',
        backgroundColor: '#c8270e',
        color: 'white',
        borderRadius: '100px',
        padding: '5px 10px',
        position: 'absolute',
        left: '-50%',
        height: '10px',
        display: 'flex',
        justifycontent: 'center',
        alignItems: 'center',
    }
};
  

const Wheel = ({ randomIndex, containerIndex, signedWheel, level }) => {
    const wheelItems = [].concat(...new Array(200).fill(items));
    const getSpanId = (idx) => {
        if (randomIndex === idx) {
            if (containerIndex === 0) {
                return 'number1';
            } else if (containerIndex === 1) {
                return 'mathsigne'
            } else if (containerIndex === 2) {
                return 'number2';
            }
        }
        return '';
    }
    const mathSign = signos[level];
    return (
        <div className={styleClasses['wheel']}>
            {wheelItems.map((wheelItem, idx) => {
                const ImageSvg = components[wheelItem];
                return (
                    <div className={randomIndex === idx ? styleClasses['active'] : ''} style={randomIndex === idx ? {position: 'absolute'} : {}}>
                        <span id={getSpanId(idx)} style={styles.numberBag}>{signedWheel ? mathSign[wheelItem] : idx}</span>
                        <img src={ImageSvg} alt={wheelItem} width={80} />
                    </div>
                );
            })}
        </div>
    );
};

export default Wheel;
