const API_BASE = '',
    API_VERSION = 'v1';

let API_URLS_SHORTS = {
    article: 'article',
    createArticle: 'article/create',
};

let API_URLS = {};

for(let key in API_URLS_SHORTS) {
    if(API_URLS_SHORTS.hasOwnProperty(key)) {
        API_URLS[key] = `/${API_VERSION}/${API_URLS_SHORTS[key]}`
    }
}

console.log(API_URLS);

module.exports = API_URLS;