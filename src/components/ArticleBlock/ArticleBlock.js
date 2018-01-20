import React, {Component} from 'react';
import './ArticleBlock.less'
import {withRouter} from 'react-router';
import URLS from '../../shared/urls';
import PropTypes from 'prop-types';
import readArticle from '../../utils/read-article';

class ArticleBlock extends Component {
    constructor(props) {
        super(props);
        this.readArticle = this.readArticle.bind(this);
    }

    readArticle(article) {
        readArticle(this.props.history, article)
    }

    render() {
        const self = this;
        return (
            <div className={"ArticleBlock " + this.props.orientation}>
                {
                    this.props.cta ?
                        <div className="articles-cta">{this.props.cta}</div>
                        : null
                }
                <div className="content-articles">
                    {
                        this.props.articles.map((article) => {
                            return (
                                <div key={article._id} onClick={function (event) {
                                    self.readArticle(article);
                                }}>
                                    <div className="img-block">
                                        <img src={article.showcaseImage} alt={article.title}/>
                                        <div>{article.timeToReadInMin} min read</div>
                                    </div>
                                    <div className="details">
                                        <div className="title">{article._id} {article.title}</div>
                                        <div className="excerpt">{article.category}</div>
                                    </div>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
        );
    }
}

ArticleBlock.defaultProps = {
    orientation: 'vertical'
};

ArticleBlock.proptypes = {
    articles: PropTypes.object.isRequired
};

ArticleBlock = withRouter(ArticleBlock);

export default ArticleBlock;
