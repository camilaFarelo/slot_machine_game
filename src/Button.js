import React from 'react';
import styleClasses from './Button.module.scss';


const Button  = ({ title, severity, disabled, onClick, styles }) => {
    if (!(title && onClick)) return null;

    if (!disabled) {
      disabled = false;
    }

    let btnClasses = [styleClasses['button']];
    if (!severity) {
      btnClasses.push(styleClasses['button--primary']);
    } else if (severity === 'none') {
      btnClasses.push(styleClasses['button--none']);
    }

    return (
        <button className={btnClasses.join(' ')} styles={styles ? styles : {}}type='button' disabled={disabled} onClick={onClick}>
          {title}
        </button>
    );
};

export default Button;
