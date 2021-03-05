import React, {useState} from 'react'
import { useRouteMatch, useHistory, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { withFirebase } from './../../../firebase'
import { TextField, Button } from './../../ui'
import * as ROUTES from './../../../constants/routes'
import SetupPages from './SetupPages'
import styles from './../landing.module.css'

function Signup({ setAuthStatus, authEnum, firebase, isSignedIn, logUserToState }){
    const [loginCred, updateLoginCreds] = useState({email: "", password: ""});
    let { path, url } = useRouteMatch();
    let history = useHistory();

    const goToSetup = () => {
        history.push(`${url}/setup`)
    }

    const inputChange = (e) => {
        if(e.target.id === 'login-email'){updateLoginCreds({...loginCred, email: e.target.value})}
        if(e.target.id === 'login-password'){updateLoginCreds({...loginCred, password: e.target.value})}
    }

    const login = () => {
        firebase.login(loginCred.email, loginCred.password)
          .then((userInfo) => {
              logUserToState(userInfo);
              setAuthStatus(authEnum.LOGIN);
              history.push(ROUTES.FEED(userInfo.username))
          })
        
    }

    return(
        <Switch>
            <Route exact path={path} >
                <div className={styles.signup}>
                    <h2 className={styles.signin_heading}>Sign in with Kope...</h2>
                    <TextField id='login-email' label='email' onChange={inputChange} light email/>
                    <TextField id='login-password' label='password' onChange={inputChange} light password />
                    <Button text="Login" onClick={login} />
                    <h2 className={styles.signin_heading}>...Or Make and Account</h2>
                    <Button text='Make an Account' onClick={goToSetup}/>
                </div>
            </Route>
            <Route path={`${path}/setup`}>
                <SetupPages />
            </Route>

        </Switch>
    )
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.isSignedIn
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logUserToState: (user) => { dispatch({type: 'SIGN_USER_IN', user: user}) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withFirebase(Signup))