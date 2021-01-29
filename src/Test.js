import React from 'react'
import { withFirebase } from './firebase'

const Test = ({ firebase }) => {
    //firebase.createAccount('Mo', 18, 'bigmo', 'mo@gmail.com', '1234567', ['stress', 'depression'], ['anger']);
    //firebase.updateUserInfo(firebase.user, {age: 19});
    //firebase.login('mo@gmail.com', '1234567');
    console.log(firebase.getUserID());

    let post = {
        uid: 'ajkdfl;ajsf;d',
        username: 'Darryl',
        topics: ['Anxiety', 'Depression'],
        body: "Man does life suck and shit am i right lol",
        timestamp: Date.now(),
        tag: 'default',
        mood: ['Sad', 'Tense']
    }
    //firebase.createPost(post)
    
    console.log(firebase.getPostByTopics(['Depression']));
    
    
    return(
        <div>
        </div>
    )
}

export default withFirebase(Test)