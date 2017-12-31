// @flow
const API_URLS = require('./api-urls');
const queryString = require('query-string');

let post = (url, options) => {
    return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(options)
        });
};

const buildApiUrl = (baseUrl, queryParams) => {
    return [baseUrl,queryString.stringify(queryParams)].join('?');
};

module.exports = {
    getArticle: function (callback: (response: {}) => void, queryParams?: {}) {
        // TODO: check for the necessary query params
        let articleUrl = buildApiUrl(API_URLS.article);
        alert(articleUrl);
        window.fetch(articleUrl)
            .then(response => response.json())
            .then((response) => {
                console.log(response);
                callback(response)
            })
            .catch(error => {
                console.log('request failed', error);
            });
    },

    createArticle: function(callback: (response: {}) => void, options: {}) {
        let createArticleUrl = API_URLS.createArticle;
        post(createArticleUrl, options);
    }
};