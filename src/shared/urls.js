const CONSTANTS = require('./constants'),
    API_VERSION = CONSTANTS.API_VERSION,
    empty = require('is-empty');

let URLS = {
    API: {
        article: 'article',
        articles: 'articles',
        createArticle: 'article/create',
        editArticle: 'article/edit',
        suggestedArticles: 'articles/suggested',
        articlePlacement: 'article/placement',
        categories: 'articles/categories',
        login: 'login',
        checkAuthenticated: 'checkAuthenticated'
    },

    ROUTES: {
        home: '/',
        editArticle: '/dashboard/article/:_id/edit',
        dashboard: '/dashboard',
        about: '/about',
        article: '/articles/:year/:month/:articleSlug',
        category: '/category/:category',
        login: '/auth/login'
    }
};

URLS.transform = function (url, params) {
    params = params || {};
    console.log('here', params);
    // Strip param values of leading slash
    Object.keys(params).forEach((paramKey) => {
        const paramVal = params[paramKey];
        // set the value to be empty string so as to be picked up later
        if(!paramVal) {
            params[paramKey] = '';
        } else if (paramVal.length > 0 && paramVal[0] === '/') {
            params[paramKey] = paramVal
                .substring(1, paramVal.length);
        }
    });
    const pathParts = url.split('/');
    return pathParts.map((pathPart) => {
        // is url param
        if (pathPart && pathPart.length > 0 && pathPart[0] === ':') {
            const urlParam = pathPart.substring(1, pathPart.length);
            // if not passed params has correct property and truthy value
            if (!params.hasOwnProperty(urlParam) || empty(params[urlParam])) {
                throw new Error(`Invalid parameters for ${url}. ${urlParam} is required.` +
                    `\nGot ${JSON.stringify(params, null, 2)}`
                );
            } else {
                return params[urlParam]
            }
        } else {
            // not a parameter value so skip
            return pathPart;
        }
        // Join on slash to rebuild url
    }).join('/');
};

// add version to api urls
for (let url in URLS.API) {
    if (URLS.API.hasOwnProperty(url)) {
        URLS.API[url] = `/${API_VERSION}/${URLS.API[url]}`
    }
}

// TODO: setup logging in prod
console.log(JSON.stringify(URLS, null, 2));

module.exports = URLS;