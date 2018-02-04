import URLS from '../shared/urls';
import $ from 'jquery';

const readArticle = (self, articleData) => {
    const transform = URLS.transform,
        articleUrl = URLS.ROUTES.article,
        slug = articleData.articleSlug,
        url = transform(articleUrl,
            {
                articleSlug: slug,
                year: articleData.year,
                month: articleData.month
            });
    self.props.history.push({
        path: url,
    });
    self.props.history.go({
        path: url,
    });
    // TODO: make sure this works from any starting page i.e. check readArticle from category page
};

export default readArticle;