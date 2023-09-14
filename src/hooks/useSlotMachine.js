import { useState, useCallback, useRef, useEffect } from 'react';
import {debounce, toNumber, shuffle} from 'lodash';
import useSound from 'use-sound';

import spin from '../media/spin.mp3';
import win from '../media/win.mp3';
import lose from '../media/lose.mp3';
import superWin from '../media/superwin.mp3';
import smallLose from '../media/smallLose.mp3';

import { logger } from './../scripts/utils';

const getRandom = () => Math.floor(Math.random() * 200);
const getRandoms = () => [getRandom(), getRandom(), getRandom()];

const useSlotMachine = () => {
    const [playSpin, stopSpin] = useSound(spin);
    const [playWin] = useSound(win);
    const [playLose] = useSound(lose);
    const [playSuperWin] = useSound(superWin);
    const [playSmallLose] = useSound(smallLose);
    const [result, setResult] = useState('');
    const [indexes, setIndexes] = useState(getRandoms());
    const [status, setStatus] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [showResultInput, setShowResultInput] = useState(false);
    const [score, setScore] = useState(0);
    const [formData, setFormData] = useState({name: '', level: '', lives: 5, character: null});
    const [hideForm, setHideForme] = useState(false);
    const [options, setOptions] = useState(null);
    const [showGameOver, setShowGameOver] = useState(false);
    const [showWinner, setShowWinner] = useState(false);

    const timerRef = useRef();
    const intervalRef = useRef();

    const onSetInputValue = debounce(
      (event) => {setInputValue(event.target.value)}, 500,
    );

    const onRestart = () => {
        setResult('');
        setStatus('');
        setInputValue('');
        setScore(0);
        setFormData({name: '', level: '', lives: 5, character: null})
        setHideForme(false);
        setOptions(null);
        setShowGameOver(false);
        setShowWinner(false);
        setShowResultInput(false);
    }

    const onSubmitLevelAndName = (event) => setHideForme(true);
    
    const stopSpinningHandler = useCallback(() => {
        stopSpin.stop();
        logger.debug('[useSlotMachine]', 'stopSpinningHandler');

        setIndexes(indexes);
        setStatus('spun');
        setShowResultInput(true);
        const num1 = document.getElementById("number1") && document.getElementById("number1").textContent;
        const num2 = document.getElementById("number2") && document.getElementById("number2").textContent;
        const operation = document.getElementById("mathsigne") && document.getElementById("mathsigne").textContent;
        let result;
        if (!num1 || !num2 || !operation) {
            return false;
        };
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
        playSpin();
        logger.debug('[useSlotMachine]', 'startSpinningHandler');
        setStatus('spinning');
        setShowResultInput(false);

        // clear auto start timer
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        intervalRef.current = setInterval(() => {
            setIndexes(getRandoms());
        }, 50);
    }, [setIndexes, setStatus]);

    const onSubmit = (value) => {
      const winOrLose = options.correct === toNumber(value) ? 'winner' : 'loser';
      if (winOrLose === 'loser') {
        const lives = formData.lives - 1;
        if (!lives) {
            stopSpin.stop();
            playLose();
            setScore(0);
            return setShowGameOver(true);
        } else {
            playSmallLose();
            stopSpin.stop();
            setScore(score ? score - 10 : 0);
            setFormData({...formData, lives: formData.lives - 1});
        }
      } else {
        if (score + 100 >= 1000) {
            playSuperWin();
            stopSpin.stop();
            return setShowWinner(true);
        } else {
            playWin();
            setScore(score + 100);
        }
      }
        onNext();
      setResult(winOrLose);
    }

    const onNext = () => {
        setOptions(null);
        startSpinningHandler();
    }

    return {
        wheels: { indexes, status, score, showResultInput, inputValue, result, showGameOver, onRestart },
        startSpinningHandler,
        stopSpinningHandler,
        onSetInputValue,
        onSubmit,
        userForm: {setFormData, formData, handleSubmit: onSubmitLevelAndName, hideForm, score},
        resultOptions: options,
        winner: {showWinner}
    };
};

export default useSlotMachine;
