let _ = require('lodash');

const API_BASE = '/api',
    API_VERSION = 'v1';

let API_URLS_SHORTS = {
    article: 'article',
    createArticle: 'article/create',
};

let API_URLS = {};

_.forOwn(API_URLS_SHORTS, function(val, key) {
    API_URLS[key] = `${API_BASE}/${API_VERSION}/${val}`
});

module.exports = API_URLS;