import React from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from './../../constants/routes'
import { Button } from './../ui'
import styles from './landing.module.css'

function Landing(){
    let history = useHistory();

    const onClick = () =>{
        history.push(ROUTES.SIGNUP)
    }

    return(
        <div className={styles.landing}>
            <div className={styles.title}>
                <h1>Kope</h1>
            </div>
            <p className={styles.slogan}>FIND HOPE WITH KOPE</p>
            <Button text={"Get Started"} onClick={onClick} pill/>
        </div>
    )
}

export default Landing