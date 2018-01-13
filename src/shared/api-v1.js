// @flow
const URLS = require('./urls');
const queryString = require('query-string');
const axios = require('axios');

/*
TODO: add the app version of the api urls from the URLS module
TODO: i.e. /v1/article -> {domain}/v1/article/
 cosnt API_DOMAIN = 'http://api.politicsinvogue.com';
 for(let key in URLS) {
 const isProd = process.env.NODE_ENV === 'production';

 if(URLS.hasOwnProperty(key)) {
 // configure client api url for prod or dev
 if(isProd) {
 URLS.APP[key] = `${API_DOMAIN}/${API_VERSION}/${URLS[key]}`
 } else {
 URLS.APP[key] = `/${API_VERSION}/${URLS[key]}`
 }

 // add server API url
 URLS.API[key] = `/${API_VERSION}/${URLS[key]}`;
 }
 }
 */
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
        let articleUrl = buildApiUrl(URLS.article);
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
        let createArticleUrl = URLS.createArticle;
        post(createArticleUrl, options);
    }
};