// @flow
const URLS = require('./urls');
const axios = require('axios');
const CONSTANTS = require('./constants'),
    API_DOMAIN = CONSTANTS.API_DOMAIN;
const _ = require('lodash');


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
    console.log('options', options);
    console.log('data', data);
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
    const isProd = process.env.NODE_ENV === 'production';
    axios({
        url: url,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        params: options.queryParams || {},
    }).then(response => {
        if(!isProd) {
            console.log('success', url, response);
        }
        options.success && options.success(response)
    }).catch(error => {
        if (error.response) {
            if(!isProd) {
                console.log(`${url} request failed`, error);
            }
        } else {
            if(!isProd) {
                console.log(`successful request but error while calling success function`, error);
            }
        }
        options.error && options.error(error);
    });
};

module.exports = {

    /**
     * utility function for safely loading multiple fetchables
     * @param fetchables an array of functions that take a function to be called when the API call returns
     * @param onLoaded
     */
    asynchronousSafeFetch(fetchables, onLoaded) {
        if (fetchables) {
            if(!_.isFunction(onLoaded)) {
                throw new Error('onLoaded is required and must be a function')
            }
            if(!_.isArray(fetchables)) {
                fetchables = [fetchables];
            }
            let numFetchablesLeft = fetchables.length;
            fetchables.forEach(function (fetchable, i) {
                const oldSuccess = fetchable.options.success.bind({});
                // replace old success function via merge
                fetchable.apiFunc(_.merge(fetchable.options, {
                    success: function (response) {
                        --numFetchablesLeft;
                        oldSuccess(response);
                    }
                }));
            });
            // Poll every second to determine if we have fetched everything
            let interval = setInterval(function () {
                if (!numFetchablesLeft) {
                    onLoaded();
                    console.log('Safe asynchronous load complete');
                    clearInterval(interval);
                }
            }, 500);
        } else {
            console.error('No fetchables provided');
        }
    },

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

    checkAuthenticated: function (options) {
        get(URLS.APP.checkAuthenticated, options)
    },

    login: function (options) {
        // Since all other post requests require data in the form:
        // data = {data: {...data fields...}} and passport requires just {email: ..., password: ...}
        // we will do the full axios request rather than call post()
        axios({
            url: URLS.APP.login,
            method: 'POST',
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(options.data)
        }).then(response => {
            console.log(response);
            options.success && options.success(response.data)
        }).catch(error => {
            console.log('request failed', error.response);
            options.error && options.error(error);
        });
    }
};