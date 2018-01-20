import URLS from '../shared/urls';

const readArticle = (history, articleData) => {
    const transform = URLS.transform,
        articleUrl = URLS.ROUTES.article,
        slug = articleData.articleSlug,
        _id = articleData._id;
    history.push({
        path: '/',
        state: {
            _id: _id
        }
    });
    console.log('here',_id, slug, transform(articleUrl, {
        articleSlug: slug
    }));
};

export default readArticle;