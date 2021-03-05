import React from 'react'
import { withFirebase } from './firebase'
import { Button } from './components/ui'

const Test = ({ firebase }) => {
    //firebase.createAccount('Mo', 18, 'bigmo', 'mo@gmail.com', '1234567', ['stress', 'depression'], ['anger']);
    //firebase.updateUserInfo(firebase.user, {age: 19});
    //firebase.login('mo@gmail.com', '1234567');
    console.log(firebase.getUserID());

    // let post = {
    //     uid: 'ajkdfl;ajsf;d',
    //     username: 'Darryl',
    //     topics: ['Anxiety', 'Depression'],
    //     body: "Man does life suck and shit am i right lol",
    //     post_time: Date.now(),
    //     tag: 'default',
    //     mood: ['Sad', 'Tense']
    // }

    // let comment = {
    //     body: 'So sad too',
    //     post_time: Date.now(),
    //     tag: 'default'
    // }
    // //firebase.createPost(post)

    // // firebase.commentOnPost('6GqGoIACoTvnwZwS1Dc3', comment)
    // //     .then(() => console.log('success'));
    
    // // firebase.getPostByUID('jincmlsmer')
    // //     .then(posts => {
    // //         console.log(posts);
    // //         posts.forEach(post => {
    // //             firebase.getPostComments(post.id)
    // //                 .then(c => console.log(c))
    // //         });
    // //     });
    
    // const works = () =>{
    //     console.log("It works!!");
    // }
    
    return(
        <div>
            <Button text="Hello" secondary/>
            <p className='test1'>Ubuntu</p>
            <p className='test2'>Public</p>
        </div>
    )
}

export default withFirebase(Test)