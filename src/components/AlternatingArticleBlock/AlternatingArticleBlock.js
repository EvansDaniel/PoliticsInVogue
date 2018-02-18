import React, {Component} from 'react';
import './AlternatingArticleBlock.less'
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import URLS from '../../shared/urls';

class AlternatingArticleBlock extends Component {
    render() {
        // Add the alternating orientation to the article
        const newArticles = this.props.articles.map((article, i) => {
	        if(i % 2 === 0) {
                article.orientation = '';
            } else {
                article.orientation = 'reverse';
            }
            return article;
        });
        return (
            <div className="AlternatingArticleBlock">
                {
                    newArticles.map(function (newArticle, i) {
                        return (
                            <SideBySideArticleBlock key={i} orientation={newArticle.orientation} article={newArticle}/>
                        )
                    })
                }
            </div>
        );
    }
}

let SideBySideArticleBlock = (props) => {
    const article = props.article;
    const readArticle = () => {
        props.history.push(URLS.transform(URLS.ROUTES.article, {...article}))
    };
    return (
        <div className="SideBySideArticleBlock">
            <div className="category-wrapper">
                <div className={`article-flip ${props.orientation}`}>
                    <div className="article-info">
                        <div className="title">{article.title}</div>
                        <div className="date">{new Date(article.createdAt).toLocaleDateString()}</div>
                        <button className="read-article-button" onClick={readArticle}>Read Article</button>
                    </div>
                    <div className="article-image" onClick={readArticle}
                         style={{'backgroundImage': `url(${article.showcaseImage})`}}>
                        <div className="image-content">
                            <div className="excerpt">{article.excerpt}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SideBySideArticleBlock = withRouter(SideBySideArticleBlock);

AlternatingArticleBlock.defaultProps = {

};

AlternatingArticleBlock.proptypes = {
    articles: PropTypes.object.isRequired
};

export default withRouter(AlternatingArticleBlock);
