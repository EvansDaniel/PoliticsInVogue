const CONSTANTS = require('./constants'),
    API_VERSION = CONSTANTS.API_VERSION;

let URLS = {
    API: {
        article: 'article',
        articles: 'articles',
        createArticle: 'article/create',
        editArticle: 'article/edit',
        articlePlacement: 'article/placement',
        categories: 'categories',
        editCategory: 'category/edit',
        login: 'login',
    }
};

// add version to api urls
for(let url in URLS.API) {
    if(URLS.API.hasOwnProperty(url)) {
        URLS.API[url] = `/${API_VERSION}/${URLS.API[url]}`
    }
}

// TODO: setup logging in prod
console.log(JSON.stringify(URLS, null, 2));

module.exports = URLS;