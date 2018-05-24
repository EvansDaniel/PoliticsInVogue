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
        // Need the domain of the cookie in order for cookie-js to find it
        const domain = process.env.NODE_ENV === 'production' ? constants.HOST_DOMAIN : '';
        cookies.remove(constants.CACHED_AUTH_COOKIE, {domain: domain});
    }

}

export default Auth;