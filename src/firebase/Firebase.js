import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

/**
 * TODO convert to typescript
 */

class Firebase {
    /**
     * @constructor
     * @param {Object} config 
     */
    constructor(config){
        fb.initializeApp(config);

        this.auth = fb.auth();
        this.db = fb.firestore();
    }

    // AUTH //

    /** 
    * @param {string} name name of user (can be null to remain anonymous)
    * @param {number} age age of user
    * @param {string} username user's username (can be different to name, their actual display name)
    * @param {string} email string, user's email 
    * @param {string} password string, user's password
    * @param {string[]} preferredTopics string[], topics the user prefers to see
    * @param {string[]} unwantedTopics string[], topics the user wantes to avoid
    *
    * @returns {Promise<{}>} userInfo
    * *pre: Username, email, and password must NOT be null or und. Password needs to be at least 8 characters long 
    * *post: New user will be created, and will be added to the firestore database 
    * 
    * TODO Might shrink all params down into a single object
    **/
    async createAccount(name = null, age, username, email, password, preferredTopics = [], unwantedTopics = []){
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password)
        
        newUser.user.updateProfile({ displayName: username });
        this.updateUserInfo(newUser.user.uid, {name, age, preferredTopics, unwantedTopics});

        return { uid: newUser.user.uid, name: name, username: username, email: email, age: age, topics: preferredTopics, posts: [] }
        
    }

    /** 
    * @param {string} email user's email
    * @param {string} password user's password
    * TODO make async
    **/
    async login(email, password){
        //gets user info from auth
        const userCreds = await this.auth.signInWithEmailAndPassword(email, password);  
        let user = userCreds.user;

        //gets additional info from database
        const userDoc = await this.db.collection('users').doc(user.uid).get();
        let userData = userDoc.data();

        //gets user post
        const posts = await this.getPostByUID(user.uid);

        return { uid: user.uid, name: userData.name, username: user.displayName, email: user.email, age: userData.age, topics: userData.preferredTopics, posts: posts }
    }

    /**
     * ! WIP !
     */
    deleteUser(){
        this.user.delete();
    }

    /**
    * * Returns: boolean, if any user is signed in or not
    */
    isSignedIn(){
        let user = this.auth.currentUser;
        return user ? true : false;
    }

    /**
    * @returns {string | null} user uid
    */
   /*eslint getter-return: ["error", { allowImplicit: true }]*/
    getUserID(){
        let user = this.auth.currentUser;

        if (user){
            return user.uid;
        }else{
            return null;
        }
    }

    // DATABASE //

    /**
     * @param {string} uid user id
     * @param {Object} userInfo object with the new user info needed to be updated
     */
    updateUserInfo(uid, userInfo){
        this.db.collection('users').doc(uid).set(userInfo, { merge: true });
    }

    /**
     * ! WIP !
     * @param {string} uid user id
     */
    deleteUserInfo(uid){

    }

    // POSTS //
    /**
     * type for post
     * 
     * @typedef Post 
     * @property {string} uid user's id
     */

     /**
      * type for comments
      * 
      * @typedef Comment
      * @property {string} id comment id (don't include when posting comment, auto-gen by Firestore)
      * @property {string} body comment body
      * @property {number} likes amount of likes on comment
      * @property {number} post_time time comment was posted (in millis)
      * @property {string} tag type of account that made the comment (default, doctor, tharapist, etc)
      * 
      */

    /**
     * @param {Object} postInfo object with all post info
     * @param {string} postInfo.uid user id
     * @param {string} postInfo.username user's display name
     * @param {string[]} postInfo.topics post's topic
     * @param {string} postInfo.body post's body
     * @param {number} postInfo.timestamp time post was created (in milliseconds)
     * @param {string} postInfo.tag user's acount type (default, doctor, therapist, etc)
     * @param {string[]} postInfo.mood post's mood
     * 
     * TODO make async
     */
    createPost(postInfo){
        this.db.collection('posts').add(postInfo)
    }

    /**
     * ! WIP !
     * @param {string} uid user's id
     * @returns {Promise<Post[]>} a promise to the list of posts
     *                   
     * TODO List out all of object elements in @return thingy
     * TODO write function
     */
    async getPostByUID(uid){
        let posts = [];

        const snapshot = await this.db.collection('posts').where('uid', '==', uid).get();
        snapshot.forEach(doc => {
            //add doc id to post info
            let docData = doc.data();
            let docID = {id: doc.id};
            let docInfo = {...docData, ...docID};
            //adds topics to list
            posts.push(docInfo);
        })

        return posts;
    }

    /**
     * @param {string[]} topics array topics to search for post by (Anxiety, Depression, etc)
     * @returns {Promise<Post[]>} a promise to the list of posts
     * 
     * TODO List out all of object elements in typedef
     * TODO Sort list by time
     * TODO Limit the amount of post recieved
     */
    async getPostByTopics(topics){
        let posts = [];

        const snapshot = await this.db.collection('posts').where('topics', 'array-contains-any', ['Depression', 'Anxiety']).get();
        snapshot.forEach(doc => {
            //add doc id to doc info
            let docData = doc.data();
            let docID = {id: doc.id};
            let docInfo = {...docData, ...docID};
            //adds doc to list
            posts.push(docInfo);
        })

        return posts;
    }

    /**
     * @param {string} post_id id of post to comment on
     * @param {Object} comment_info info about comment (refer to Comment typdef)
     */
    async commentOnPost(post_id, comment_info){
        //sets likes of comment to zero
        comment_info.likes = 0;
        //adds comment to database
        this.db.collection('posts').doc(post_id)
               .collection('comments').add(comment_info);
    }

    /**
     * @param {string} post_id id of the comment's post
     * @returns {Promise<Post[]>} a promise to the list of comments under the specified post
     * 
     * TODO Sort list by likes
     */
    async getPostComments(post_id){
        let comments = [];
        const snapshot = await this.db.collection('posts').doc(post_id)
                                      .collection('comments').get();
        console.log(snapshot);
        snapshot.forEach(doc => {
            //add doc id to doc info  
            let docData = doc.data();
            let docID = {id: doc.id};
            let docInfo = {...docData, ...docID};
            //add doc to list
            comments.push(docInfo);
        })

        return comments;
    }
}


export default Firebase
