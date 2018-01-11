const API_BASE = '',
    API_VERSION = 'v1',
    API_DOMAIN = 'http://api.politicsinvogue.com',
    API_URL_NAME_SUFFIX = 'Api';

let API_URLS_SHORTS = {
    article: 'article',
    articlePlacement: 'article/placement/:placement',
    createArticle: 'article/create',
    login: 'login',
};

let API_URLS = {};

for(let key in API_URLS_SHORTS) {
    const isProd = process.env.NODE_ENV === 'production';

    if(API_URLS_SHORTS.hasOwnProperty(key)) {
        // configure client api url for prod or dev
        if(isProd) {
            API_URLS[key] = `${API_DOMAIN}/${API_VERSION}/${API_URLS_SHORTS[key]}`
        } else {
            API_URLS[key] = `/${API_VERSION}/${API_URLS_SHORTS[key]}`
        }

        // add server API url
        API_URLS[key + API_URL_NAME_SUFFIX] = `/${API_VERSION}/${API_URLS_SHORTS[key]}`;
    }
}

// TODO: setup logging in prod
console.log(API_URLS);

module.exports = API_URLS;