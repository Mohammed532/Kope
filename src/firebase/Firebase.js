import fb from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

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

    * *pre: Username, email, and password must NOT be null or und. Password needs to be at least 8 characters long 
    * *post: New user will be created, and will be added to the firestore database 
    * 
    * TODO: Might shrink all params down into a single object
    **/
    createAccount(name = null, age, username, email, password, preferredTopics = [], unwantedTopics = []){
        this.auth.createUserWithEmailAndPassword(email, password)
          .then(newUser => {
            newUser.user.updateProfile({ displayName: username });
            this.updateUserInfo(newUser.user.uid, {name, age, preferredTopics, unwantedTopics});
          })
          .catch(error => {
            console.error(error);
          });
    }

    /** 
    * @param {string} email user's email
    * @param {string} password user's password
    **/
    login(email, password){
        this.auth.signInWithEmailAndPassword(email, password)
          .then(() => {console.log('yea');})
          .catch(err => {
              console.error(err);
          })
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
     * @param {Object} postInfo object with all post info
     * @param {string} postInfo.uid user id
     * @param {string} postInfo.username user's display name
     * @param {string[]} postInfo.topics post's topic
     * @param {string} postInfo.body post's body
     * @param {number} postInfo.timestamp time post was created (in milliseconds)
     * @param {string} postInfo.tag user's acount type (default, doctor, therapist, etc)
     * @param {string[]} postInfo.mood post's mood
     */
    createPost(postInfo){
        this.db.collection('posts').add(postInfo)
    }

    /**
     * ! WIP !
     * @param {string} uid user's id
     * @returns {Object} object with all of the post info 
     *                   ({ uid: string, username: string, ...})
     * TODO List out all of object elements in @return thingy
     * TODO write function
     */
    getPostByUID(){

    }

    /**
     * @param {string[]} topics array topics to search for post by (Anxiety, Depression, etc)
     * @returns {Object[]} object with all of the post info 
     *                   ({ uid: string, username: string, ...})
     * 
     * TODO List out all of object elements in @return thingy
     * TODO write function
     */
    getPostByTopics(topics){
        let topic_list = [];
        this.db.collection('posts').where('topics', 'array-contains-any', ['Depression', 'Anxiety'])
          .get()
          .then(snapshot => {
              console.log('Snap: ', snapshot);
              snapshot.forEach(doc => {
                  console.log('Doc: ', doc.data());
                  topic_list.unshift(doc.data()); //* may change to .push()
              });
              console.log(topic_list);
              return topic_list;
          })
          .catch(err => {console.error(err);})
    }
}


export default Firebase
