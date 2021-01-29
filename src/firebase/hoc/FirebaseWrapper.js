import React from 'react'
import FirebaseContext from '../context/fbContext'

const withFirebase = (Comp) => (props)  => (
    <FirebaseContext.Consumer>
        {firebase => <Comp {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default withFirebase