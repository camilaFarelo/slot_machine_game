import { useState, useCallback, useRef, useEffect } from 'react';
import {debounce, toNumber, shuffle} from 'lodash';

import { logger } from './../scripts/utils';

const getRandom = () => Math.floor(Math.random() * 200);
const getRandoms = () => [getRandom(), getRandom(), getRandom()];


export const getScore = (valuesArr) => {
    const map = new Map();
    const valuesLen = valuesArr.length;

    for (let i = 0; i < valuesLen; i += 1) {
        map.set(valuesArr[i], i);
    }

    // no match
    if (map.size === valuesLen) return '';

    // full match
    if (map.size === 1) return 'full';

    // non-consecutive
    // consecutive
    for (let i = 0; i < valuesLen; i += 1) {
        const val = valuesArr[i];

        if (map.has(val) && map.get(val) === i) continue;

        if (map.has(val) && map.get(val) === i + 1) {
            return 'consecutive';
        } else {
            return 'inconsecutive';
        }
    }

    return '';
};

const useSlotMachine = () => {
    const [result, setResult] = useState('');
    const [indexes, setIndexes] = useState(getRandoms());
    const [status, setStatus] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [showResultInput, setShowResultInput] = useState(false);
    const [score, setScore] = useState('');
    const [formData, setFormData] = useState({name: '', level: '', lives: 5, character: null});
    const [hideForm, setHideForme] = useState(false);
    const [options, setOptions] = useState(null);
    const [showGameOver, setShowGameOver] = useState(true);

    const timerRef = useRef();
    const intervalRef = useRef();

    const onSetInputValue = debounce(
      (event) => {setInputValue(event.target.value)}, 500,
    );

    const onRestart = () => {
        setResult('');
        setStatus('');
        setInputValue('');
        setScore('');
        setFormData({name: '', level: '', lives: 5, character: null})
        setHideForme(false);
        setOptions(null);
        setShowGameOver(false);
    }

    const onSubmitLevelAndName = (event) => setHideForme(true);
    
    const stopSpinningHandler = useCallback(() => {
        logger.debug('[useSlotMachine]', 'stopSpinningHandler');
        logger.debug('👩 score is:', getScore(indexes) || 'no match');

        setIndexes(indexes);
        setStatus('spun');
        setShowResultInput(true);
        setScore(getScore(indexes));
        const num1 = document.getElementById("number1").textContent;
        const num2 = document.getElementById("number2").textContent;
        const operation = document.getElementById("mathsigne").textContent;
        let result;
        switch (operation) {
            case '+':
                result = toNumber(num1) + toNumber(num2);
                break;
            case '-':
                result = toNumber(num1) - toNumber(num2);
                break;
            case 'x':
                result = toNumber(num1) * toNumber(num2);
                break;
            case '/':
                result = toNumber(num1) / toNumber(num2);
                break;
            default:
                result = 'error';
        }
        setOptions({correct: result, options: shuffle([result, getRandom(), getRandom()])});
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, [indexes]);

    const startSpinningHandler = useCallback(() => {
        logger.debug('[useSlotMachine]', 'startSpinningHandler');

        setScore('');
        setStatus('spinning');
        setShowResultInput(false);

        // clear auto start timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        intervalRef.current = setInterval(() => {
            setIndexes(getRandoms());
        }, 50);

        timerRef.current = setTimeout(() => {
            stopSpinningHandler();
        }, 10000);
    }, [setIndexes, stopSpinningHandler, setStatus]);

    const onSubmit = (value) => {
      const winOrLose = options.correct === toNumber(value) ? 'winner' : 'loser';
      if (winOrLose === 'loser') {
        const lives = formData.lives - 1;
        if (!lives) {
            setShowGameOver(true);
        } else {
            setFormData({...formData, lives: formData.lives - 1});
        }
      }
      setResult(winOrLose);
    }

    const onNext = () => {
        setResult('');
        setOptions(null);
        startSpinningHandler();
    }

    return {
        wheels: { indexes, status, score, showResultInput, inputValue, result, onNext, showGameOver, onRestart },
        startSpinningHandler,
        stopSpinningHandler,
        onSetInputValue,
        onSubmit,
        userForm: {setFormData, formData, handleSubmit: onSubmitLevelAndName, hideForm},
        resultOptions: options,
    };
};

export default useSlotMachine;
