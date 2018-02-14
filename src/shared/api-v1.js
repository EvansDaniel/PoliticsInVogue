// @flow
const URLS = require('./urls');
const queryString = require('query-string');
const axios = require('axios');
const CONSTANTS = require('./constants'),
    API_DOMAIN = CONSTANTS.API_DOMAIN;


// TODO: add the app version of the api urls from the URLS module
// TODO: i.e. /v1/article -> {domain}/v1/article/
URLS.APP = {};
for (let key in URLS.API) {
    if (URLS.API.hasOwnProperty(key)) {
        // configure client api url for prod or dev
        if (process.env.NODE_ENV === 'production') {
            URLS.APP[key] = `${API_DOMAIN}${URLS.API[key]}`;
            // console.log('prod', API_DOMAIN, API_VERSION, URLS.API[key]);
        } else {
            URLS.APP[key] = `${URLS.API[key]}`;
        }
    }
}

let post = (url, options) => {
    options = options || {};
    // server expects data this way for all post requests
    const data = {
        data: options.data || options
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
        console.log(`${url} request failed`, 'response err', error,
            'response err', error.response);
        options.error && options.error(error);
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
        console.log('success', url, response);
        options.success && options.success(response)
    }).catch(error => {
        if(error.response) {
            console.log(`${url} request failed`, error);
        } else {
            console.log(`successful request but error while calling success function`, error);
        }
        options.error && options.error(error);
    });
};

module.exports = {
    // TODO: use object destructuring / pass options object to minimize code duplication here
    getAllCategories: function (options) {
        options = options || {};
        get(URLS.APP.categories, {
            success: options.success,
            error: options.error,
            queryParams: options.params
        });
    },

    updateMe: function (options) {
        options = options || {};
        post(URLS.APP.editMe, {
            success: options.success,
            error: options.error,
            data: options.data
        });
    },

    getMe: function (options) {
        options = options || {};
        get(URLS.APP.me, {
            success: options.success,
            error: options.error,
        });
    },

    getDashboardArticles: function (options) {
        options = options || {};
        get(URLS.APP.dashboardArticles, {
            success: options.success,
            error: options.error,
            data: options.data
        });
    },

    getArticle: function (options) {
        options = options || {};
        // TODO: check for the necessary query params??
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

    createArticle: function (options: {}) {
        let createArticleUrl = URLS.APP.createArticle;
        post(createArticleUrl, {
            success: options.success,
            error: options.error,
            data: options.data
        })
    },

    editArticle: function (options) {
        post(URLS.APP.editArticle, {
            success: options.success,
            error: options.error,
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