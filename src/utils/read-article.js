import URLS from '../shared/urls';

const readArticle = (history, articleData) => {
    const transform = URLS.transform,
        articleUrl = URLS.ROUTES.article,
        slug = articleData.articleSlug,
        _id = articleData._id;
    history.push({
        path: transform(articleUrl, {
            articleSlug: slug
        }),
        state: {
            _id: _id
        }
    });
};

export default readArticle;