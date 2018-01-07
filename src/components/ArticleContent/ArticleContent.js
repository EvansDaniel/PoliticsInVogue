import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ArticleContent.less';
import SocialMediaBlock from "../SocialMediaBlock/SocialMediaBlock";
import renderHTML from 'react-render-html';
import $ from 'jquery';
import Comments from "../Comments/Comments";
import ArticleBlock from "../ArticleBlock/ArticleBlock";
import PropTypes from 'prop-types';

class ArticleContent extends Component {
    constructor(props) {
        super(props);
        this.changeArticleMeterWidth = this.changeArticleMeterWidth.bind(this);
        this.state = {
            articleMeterWidth: 0
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.changeArticleMeterWidth);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.changeArticleMeterWidth);
    }

    changeArticleMeterWidth() {
        const articleBody = $('.article-body'),
            bodyOffset = articleBody.offset();

        if(!bodyOffset) {
            return;
        }
        const meterLoc = $(window).scrollTop(),
            bodyBottom = bodyOffset.top + articleBody.height()
                - window.innerHeight;
        let newWidth = meterLoc / bodyBottom * 100;
        if (newWidth < 0) {
            newWidth = 0;
        }

        console.log(newWidth);
        this.articleMeter.style.width = newWidth+"%";
    }

    render() {
        let articleData = this.props.articleData;
        // TODO: test the article with really long and short article length
        return (
            <div className="ArticleContent">
                <div className="article-meter" ref={(ref) => {this.articleMeter = ref}}></div>
                <div className="article">
                    <div className="article-top">
                        <div className="article-info">
                            <div className="category"><Link to="/">{articleData.categoryName}</Link></div>
                            <div className="time-to-read">{articleData.timeToReadInMin} min read</div>
                            <div className="title">
                                {articleData.title}
                            </div>
                            <div className="author-info">
                                <div className="date-published">Date Published: {articleData.datePublished}</div>
                                <div className="author">Written by: <Link to="/about" className="name">Sophie Clark</Link></div>
                            </div>
                        </div>
                        <div className="main-image">
                            <img src={articleData.mainImage}/>
                        </div>
                    </div>
                    <div className="lower-article">
                        <div className="article-main">
                            <div className="suggested-articles">
                                <ArticleBlock/>
                                <ArticleBlock/>
                                <ArticleBlock/>
                                <ArticleBlock/>
                            </div>
                            <div className="article-body">
                                {renderHTML(articleData.body)}
                            </div>
                            <div className="social-media-block">
                                <SocialMediaBlock articleData={articleData}/>
                            </div>
                        </div>
                        <div className="comment-section">
                            <Comments/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ArticleContent.proptypes = {
    articleData: PropTypes.object.isRequired
};

export default ArticleContent;
