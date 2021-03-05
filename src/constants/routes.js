export const LANDING  = '/'
export const SIGNUP = '/signin'
export const HOME = '/home'
export const FEED = (username) => {return `${HOME}/${username}/feed`}
export const TOPICS = (username) => {return `${HOME}/${username}/topics`}
export const ACCOUNT = (username) => {return `${HOME}/${username}/account`}