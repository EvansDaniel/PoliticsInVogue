import React, {Component} from 'react';
import './ArticleBlock.less'
import {withRouter} from 'react-router';
import URLS from '../../shared/urls';
import readArticle from '../../utils/read-article';

class ArticleBlock extends Component {
    constructor(props) {
        super(props);
        this.readArticle = this.readArticle.bind(this);
    }

    readArticle() {
        readArticle(this.props.history, this.props.article)
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={"ArticleBlock " + this.props.orientation}
                 onClick={this.readArticle}
            >
                <div className="img-block">
                    <img src={this.props.article.showcaseImage} alt={this.props.article.title}/>
                    <div>{this.props.article.timeToReadInMin} min read</div>
                </div>
                <div className="details">
                    <div className="title">{this.props.article.title}</div>
                    <div className="excerpt">{this.props.article.category}</div>
                </div>
            </div>
        );
    }
}

ArticleBlock.defaultProps = {
    orientation: 'vertical'
};

ArticleBlock = withRouter(ArticleBlock);

export default ArticleBlock;
