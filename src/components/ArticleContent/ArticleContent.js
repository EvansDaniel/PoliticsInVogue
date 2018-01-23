import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ArticleContent.less';
import SocialMediaBlock from "../SocialMediaBlock/SocialMediaBlock";
import $ from 'jquery';
import Comments from "../Comments/Comments";
import ArticleBlock from "../ArticleBlock/ArticleBlock";
import PropTypes from 'prop-types';
import API from '../../shared/api-v1';
import BodyHtml from "../BodyHtml/BodyHtml";
import URLS from '../../shared/urls';

class ArticleContent extends Component {
    constructor(props) {
        super(props);
        this.changeArticleMeterWidth = this.changeArticleMeterWidth.bind(this);
        this.state = {
            articleMeterWidth: 0,
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

        if (!bodyOffset) {
            return;
        }
        const meterLoc = $(window).scrollTop(),
            bodyBottom = bodyOffset.top + articleBody.height()
                - window.innerHeight;
        let newWidth = meterLoc / bodyBottom * 100;
        if (newWidth < 0) {
            newWidth = 0;
        }

        this.articleMeter.style.width = newWidth + "%";
    }

    getTimeInMin(body) {
        return Math.ceil(body.split(" ").length / 250)
    }

    render() {
        console.log(this.props);
        let articleData = this.props.articleData;
        return (
            <div className="ArticleContent">
                <div className="article-meter" ref={(ref) => {
                    this.articleMeter = ref
                }}></div>
                <div className="wrapper">
                    <div className="article-wrapper">
                        <div className="article">
                            <div className="article-top">
                                <div className="article-info">
                                    <div className="category">
                                        <Link to={{
                                            pathname: URLS.transform(URLS.ROUTES.category, {
                                                category: this.props.preview ?
                                                    articleData.category || 'Default Category' :
                                                    articleData.category
                                            })
                                        }}>
                                            {articleData.category}
                                        </Link>
                                    </div>
                                    <div className="time-to-read">{
                                        this.props.preview ? this.getTimeInMin(articleData.body) : articleData.timeToReadInMin
                                    } min read
                                    </div>
                                    <div className="title">
                                        {articleData.title}
                                    </div>
                                    <div className="author-info">
                                        <div className="date-published">Date
                                            Published: {new Date(articleData.createdAt).toLocaleDateString()}</div>
                                        <div className="author">Written by: <Link to="/about" className="name">Sophie
                                            Clark</Link></div>
                                    </div>
                                </div>
                                <div className="main-image">
                                    <img
                                        src={articleData.showcaseImage}/>
                                </div>
                            </div>
                            <div className="lower-article">
                                <div className="article-main">
                                    {
                                        this.props.suggestedArticles || this.props.preview ?
                                            <div className="suggested">
                                                {
                                                    !this.props.preview ?
                                                        <ArticleBlock
                                                            articles={this.props.suggestedArticles}
                                                            cta={'Articles You Might Like'}
                                                            orientation="vertical"
                                                        /> :
                                                        <p style={{color: 'lightgrey'}}>Suggested articles will go here
                                                            once published</p>
                                                }
                                            </div>
                                            : null
                                    }
                                    <div className="article-body">
                                        <BodyHtml body={articleData.body}/>
                                    </div>
                                    <div className="social-media-block">
                                        <div className="social-media-icons">
                                            <SocialMediaBlock articleData={articleData}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="mobile-suggested-articles">
                                    {
                                        this.props.suggestedArticles ?
                                            <ArticleBlock articles={this.props.suggestedArticles.slice(0, 2)}
                                                          cta={"Other Articles You Might Enjoy"}
                                                          orientation="horizontal"
                                            /> : null
                                    }
                                </div>
                                {
                                    articleData.allowComments ?
                                        <div className="comment-section">
                                            <Comments/>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ArticleContent.defaultProps = {}

ArticleContent.proptypes = {
    articleData: PropTypes.object.isRequired,
    preview: PropTypes.bool
};

export default ArticleContent;
