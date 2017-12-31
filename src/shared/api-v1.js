// @flow
const API_URLS = require('./api-urls');
const queryString = require('query-string');
const axios = require('axios');
let post = (url, options) => {
    return fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(options)
    });
};

const buildApiUrl = (baseUrl, queryParams) => {
    return [baseUrl, queryString.stringify(queryParams)].join('?');
};

module.exports = {
    getArticle: function (callback: (response: {}) => void, queryParams?: {}) {
        // TODO: check for the necessary query params
        let articleUrl = buildApiUrl(API_URLS.article);
        console.log('getArticle', articleUrl);
        axios({
            url: articleUrl,
            method: 'GET',
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log(response);
            callback(response.data)
        }).catch(error => {
            console.log('request failed', error);
        });
    },

    createArticle: function (callback: (response: {}) => void, options: {}) {
        let createArticleUrl = API_URLS.createArticle;
        post(createArticleUrl, options);
    }
};