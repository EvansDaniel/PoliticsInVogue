import cookies from 'js-cookie';
const constants = require('../shared/constants');

let instance = null;

class Auth {
    constructor() {
        if(!instance){
            instance = this;
        }

        instance.notSignedInMsg = 'You are not signed in.';

        return instance;
    }

    isAuthenticated() {
        return document.cookie.indexOf(constants.CACHED_AUTH_COOKIE) > -1;
    }

    expireAuthToken() {
        cookies.remove(constants.CACHED_AUTH_COOKIE);
    }

}

export default Auth;