import React from 'react'
import { useRouteMatch, Route, Switch } from 'react-router-dom'
import { withFirebase } from './../../firebase'
import { Navbar } from './../ui'
import Feed from './Feed/Feed'
import Topics from './Topics/Topics'
import Account from './Account/Account'
import styles from './home.module.css'

function Home({ firebase }){
    let { path } = useRouteMatch();
    //let history = useHistory();

    return(
        <div className={styles.home}>
            <h1>Kope</h1>
            <Switch>
                <Route path={`${path}/:user/feed`}>
                    <Feed />
                </Route>
                <Route path={`${path}/:user/topics`}>
                    <Topics />
                </Route>
                <Route path={`${path}/:user/account`}>
                    <Account />
                </Route>
            </Switch>
            <Navbar username='bigmo' />
        </div>
    )
}

export default withFirebase(Home)