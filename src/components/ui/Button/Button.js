import React, { useState, useEffect } from 'react'
import styles from './button.module.css'

function Button({ className='', text = 'Click Me', onClick = null, onSelected = null, size, primary, secondary, rounded, pill, fill }) {
    
    const [type, setType] = useState("");
    const [shape, setShape] = useState("");
    const [btnSize, setSize] = useState("");
    const [width, setWidth] = useState("");

    useEffect(() => {
        if(primary){setType(styles.primary)}
        if(secondary){setType(styles.secondary)}
        if(rounded){setShape(styles.rounded)}
        if(pill){setShape(styles.pill)}
        if(size === 'small'){setSize(styles.small)}
        if(size === 'medium'){setSize("")}
        if(fill){setWidth(styles.fill)}
        //eslint-disable-next-line
    }, [type, shape, size])

    const clickHandler = (e) => {
        e.preventDefault();
        //if user passes in custom onClick function
        if (onClick) {
            onClick();
            return;
        } else if (onSelected) {
            onSelected();
        }

        // console.log('button clicked', primary, secondary);
    }


    
    return(
        <div className={`${className} ${styles.button} ${type} ${shape} ${btnSize} ${width}`} 
        onClick={clickHandler}>
            {text}
        </div>
    )
}

export default Button