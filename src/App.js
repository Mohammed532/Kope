import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import * as ROUTES from './constants/routes' 
import Landing from './components/Landing/Landing'
import Signup from './components/Landing/Signup/Signup'
import Home from './components/Home/Home'

class App extends Component {
    constructor(props){
        super(props);
        //enum object for authStatus
        this.AUTHSTATE = {
            UNCONFIRMED: 1,
            LOGOUT: 2,
            LOGIN: 3
        }

        Object.freeze(this.AUTHSTATE)

        this.state = {
            //maybe: login has three states, "unconfirmed", "nouser", and "loggined"
            //initially at unconfirmed, will pass to Landing comp so it could display loading page
            // and also pass to Home comp
            //NOTE: get the auth state from redux in the children comps then update
            // the pass downed prop to update this one, automatically updating the dom accordingly
            authStatus: this.AUTHSTATE.UNCONFIRMED,
        }
    }

    setAuthStatus = (status) => {
        this.setState({authStatus: status})
        console.log(status);
    }

    // //use to get initial auth state and set state.authStatus
    // componentDidMount(){
    //     if(this.state.authStatus !== this.AUTHSTATE.LOGIN){
    //         this.props.history.push('/');
    //     }else{
    //         this.props.history.push('/home');
    //     }
    // }
    
    // // use to push to proper route (didn't work :( )
    // componentDidUpdate(){
        
    // }

    render() {
        return (
            <div className='app'>
                    <Switch>
                        <Route path={ROUTES.HOME}>
                            <Home setAuthStatus={this.setAuthStatus} authEnum={this.AUTHSTATE}/>
                        </Route>
                        <Route path={ROUTES.SIGNUP}>
                            <Signup setAuthStatus={this.setAuthStatus} authEnum={this.AUTHSTATE} />
                        </Route>
                        <Route path={ROUTES.LANDING}>
                            <Landing />
                        </Route>
                    </Switch>
            </div>
        )
    }
}

export default withRouter(App)
