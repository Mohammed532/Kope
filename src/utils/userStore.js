import { createStore } from 'redux'

const initUserState = {
    isSignedIn: false,
    uid: "",
    name: "",
    username: "",
    email: "",
    age: null,
    topics: [],
    posts: [], //any posts the user makes
}

const rootReducer = (state = initUserState, action) => {
    if (action.type === 'SIGN_USER_IN'){
        console.log(action.user);
        return {
            ...state,
            ...action.user,
            isSignIn: true
        }
    }
    return state;
}

const userStore = createStore(rootReducer);

export default userStore