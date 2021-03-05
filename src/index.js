import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router} from 'react-router-dom'
import Firebase, { FirebaseContext } from './firebase'
import fbConfig from './constants/firebase/fbConfig'
import userStore from './utils/userStore'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase(fbConfig)}>
        <Provider store={userStore}>
            {/* <React.StrictMode> */}
            <Router>
                <App />
            </Router>
            {/* </React.StrictMode> */}
        </Provider>
    </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
