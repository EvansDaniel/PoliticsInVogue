import URLS from '../shared/urls';
import $ from 'jquery';

const readArticle = (history, articleData) => {
    const transform = URLS.transform,
        articleUrl = URLS.ROUTES.article,
        slug = articleData.articleSlug,
        _id = articleData._id;
    console.log('here');
    history.push({
        path: '/',
        state: {
            _id: _id
        }
    });
    // TODO: make sure this works from any starting page i.e. check readArticle from category page
    $('html').animate({ scrollTop: '0px' });

};

export default readArticle;