import React from 'react'
import ReactDOM from 'react-dom'
import Firebase, { FirebaseContext } from './firebase'
import fbConfig from './constants/firebase/fbConfig'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase(fbConfig)}>
        {/* <React.StrictMode> */}
            <App />
        {/* </React.StrictMode> */}
    </FirebaseContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
