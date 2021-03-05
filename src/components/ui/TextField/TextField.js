import React, { useState, useEffect } from 'react'
import { TextInput } from 'react-materialize'
import styles from './text-field.module.css'

function TextField({id, onChange, label, value, type, pass, dark, light, email, password }){
    const [color, setColor] = useState(styles.dark);

    useEffect(() => {
        if(dark){setColor(styles.dark)};
        if(light){setColor(styles.light)}
    }, [dark, light])

    const changeHandler = (e) => {
        e.preventDefault();
        onChange(e);
    }

    return (
        <TextInput 
          inputClassName={`${styles.input} ${color}`}
          id={id} 
          onChange={changeHandler}
          value={value}
          placeholder={label}
          password={password}
          email={email}
          />
    )
}

export default TextField