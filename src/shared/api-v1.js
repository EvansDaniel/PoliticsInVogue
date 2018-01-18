// @flow
const URLS = require('./urls');
const queryString = require('query-string');
const axios = require('axios');
const CONSTANTS = require('./constants'),
    API_VERSION = CONSTANTS.API_VERSION,
    API_DOMAIN = CONSTANTS.API_DOMAIN;


// TODO: add the app version of the api urls from the URLS module
// TODO: i.e. /v1/article -> {domain}/v1/article/
URLS.APP = {};
for (let key in URLS.API) {
    const isProd = process.env.NODE_ENV === 'production';
    if (URLS.API.hasOwnProperty(key)) {
        // configure client api url for prod or dev
        if (isProd) {
            URLS.APP[key] = `${API_DOMAIN}/${API_VERSION}/${URLS.API[key]}`
        } else {
            URLS.APP[key] = `${URLS.API[key]}`
        }

        // add server API url
        URLS.API[key] = `/${API_VERSION}/${URLS[key]}`;
    }
}

let post = (url, options) => {
    options = options || {};
    // server expects data this way for all post requests
    const data = {
        data: options.data
    };
    console.log(options);
    axios({
        url: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(data)
    }).then(response => {
        console.log(url, response);
        options.success && options.success(response)
    }).catch(error => {
        console.log(`${url} request failed`, error.response);
        options.error && options.error(error.response);
    });
};

let get = function (url, options) {
    options = options || {};
    axios({
        url: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: options.queryParams || {},
    }).then(response => {
        console.log(url, response);
        options.success && options.success(response)
    }).catch(error => {
        console.log(`${url} request failed`, error.response);
        options.error && options.error(error.response);
    });
};

module.exports = {
    getArticle: function (options) {
        options = options || {}
        // TODO: check for the necessary query params
        get(URLS.APP.article, {
            success: options.success,
            error: options.error,
            queryParams: options.params
        })
    },

    getPlacedArticles: function (options: {}) {
        get(URLS.APP.articlePlacement, {
            success: options.success,
            error: options.error
        });
    },

    createArticle: function (callback: (response: {}) => void, options: {}) {
        let createArticleUrl = URLS.APP.createArticle;
        post(createArticleUrl, {
            success: callback,
            data: options.data
        })
    },

    getSuggestedArticles: function (options) {
        get(URLS.APP.suggestedArticles, {
            success: options.success,
            error: options.error,
            queryParams: options.params
        });
    },

    checkAuthenticated: function (callback: (response: {}) => void, options: {}) {
        axios({
            url: URLS.APP.checkAuthenticated,
            method: 'GET',
        }).then(response => {
            console.log(response);
            callback(response.data)
        }).catch(error => {
            console.log('request failed', error);
        });
    },

    login: function (callback: (response: {}) => void, options: {email: string, password: string}) {
        axios({
            url: URLS.APP.login,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(options)
        }).then((response) => {
            console.log(response);
            callback(response.data)
        }).catch(error => {
            console.log('request failed', error);
        });
    }
};