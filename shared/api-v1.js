const API_URLS = require('./api-urls');
const queryString = require('query-string');

let post = function (url, options) {
    return fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(options)
        });
};

module.exports = {
    getArticle: function (queryParams, callback) {
        // TODO: check for the necessary query params
        let articleUrl = API_URLS.article + '?'
                + queryString.stringify(queryParams);

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

    createArticle: function (options, callback) {
        let createArticleUrl = API_URLS.createArticle;
        post(createArticleUrl, options);
    }
};