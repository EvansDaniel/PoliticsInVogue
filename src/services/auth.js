const constants = require('../shared/constants');

let instance = null;

class Auth {
    constructor() {
        if(!instance){
            instance = this;
        }
        return instance;
    }

    isAuthenticated() {
        return document.cookie.indexOf(constants.CACHED_AUTH_COOKIE) > -1;
    }

    expireCachedAuthToken() {
        return
    }
}

module.exports = Auth;