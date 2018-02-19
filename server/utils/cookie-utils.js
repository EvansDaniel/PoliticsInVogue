const constants = require('../../src/shared/constants');

const getCookieOptions = function (options) {
    if(process.env.NODE_ENV === 'production') {
        // This is required because we are setting cookies from
        // subdomain (api.politicsinvogue.com) to the domain (politicsinvogue.com)
        options.domain = constants.HOST_DOMAIN;
        return options;
    } else if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        // Firefox does not set cookies on localhost domains
        // and won't set cookies for prod domain when on localhost:3000
        // but it will set cookies when there is no domain set on localhost:3000
        delete options.domain;
        return options;
    }
    return options;
};

module.exports = {
    getCookieOptions: getCookieOptions,
};