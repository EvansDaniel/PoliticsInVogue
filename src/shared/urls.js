const API_BASE = '',
    API_VERSION = 'v1';

let URLS = {
    API: {
        article: 'article',
        articlePlacement: 'article/placement',
        createArticle: 'article/create',
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
console.log(URLS);

module.exports = URLS;