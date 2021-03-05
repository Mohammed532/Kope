import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as ROUTES from './../../../constants/routes'
import { Button, TextField } from './../../ui'
import styles from './../landing.module.css'

function SetupPages(){
    const [page, setPage] = useState(1);
    const history = useHistory();

    const backPage = () => {
        if(page === 1){
            history.goBack();
        }else{
            setPage(page - 1);
        }
    }

    const nextPage = () => {
        if(page === 5){
            history.push(ROUTES.HOME);
        }else{
            setPage(page + 1);
        }
    }

    const display = () => {
        switch (page) {
            case 1: return <Page1 />
            case 2: return <Page2 />
            case 3: return <Page3 />
            case 4: return <Page4 />
            case 5: return <Page5 />
            default: return(
                <div>
                    Error, please refresh
                </div>
            )
        }
    }

    return(
        <div className={styles.setup_pages}>
            {display()}
            <Button className={styles.setup_btn_back} text="Back" onClick={backPage} size="small" secondary pill/>
            <Button className={styles.setup_btn_next} text="Next" onClick={nextPage} size="small" primary pill/>
        </div>
    )
}

function Page1(){
    return(
        <div className="setup-page-1">
            <h2>Before You Continue . . .</h2>
            <p>
                Kope is an app that allows you to share your experiences with any 
                mental health issues and ask for advice. It allows for you to have a voice 
                when regarding your mental health
            </p>
            <p>
                Kope is NOT a place to come to if you are facing an immediate threat of  
                suicidal thoughts, self harm, or other life-threatening concerns. Please 
                refer to our Professional Resources page for hotlines and other places to 
                seek proffesional help. 
            </p>
        </div>
    )
}

function Page2(){
    return(
        <div className="setup-page-2">
            <TextField label="name" />
            <TextField label="age"  />
            <TextField label="username"  />
            <TextField label="email"  />
            <TextField label="password"  />
            <TextField label="confirm password"  />
        </div>
    )
}

function Page3(){
    return(
        <div className="setup-page-3">
            <h2>Preferred Topics?</h2>
            <h2>(may select multiple)</h2>
            <Button text="anxiety" secondary fill/>
            <Button text="depression" secondary fill />
            <Button text="PTSD" secondary fill />
            <Button text="eating disorders" secondary fill />
            <Button text="unspecified trauma" secondary fill />
            <Button text="family issues" secondary fill />
            <Button text="relationships" secondary fill />
        </div>
    )
}

function Page4(){
    return(
        <div className="setup-page-3">
            <h2>Any topics to avoid?</h2>
            <h2>(may select multiple)</h2>
            <Button text="rape / sexual assault" secondary fill/>
            <Button text="suicidal ideation" secondary fill />
            <Button text="compulsions" secondary fill />
            <Button text="eating disorders" secondary fill />
            <Button text="intimate partner violence" secondary fill />
            <Button text="physical abuse" secondary fill />
            <Button text="childhood trauma" secondary fill />
        </div>
    )
}

function Page5(){
    return(
        <div className="setup-page-5">
            <h2>What are your goals in joining Kope?</h2>
            <Button text="learn more about a mental health disorder" secondary fill/>
            <Button text="share knowledge / advice" secondary fill />
            <Button text="build community" secondary fill />
            <Button text="create and use a new wellness regimen" secondary fill />
        </div>
    )
}

export default SetupPages