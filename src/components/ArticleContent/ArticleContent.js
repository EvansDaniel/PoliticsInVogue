import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ArticleContent.less';
import SocialMediaBlock from "../SocialMediaBlock/SocialMediaBlock";
import renderHTML from 'react-render-html';
import $ from 'jquery';
import Comments from "../Comments/Comments";
import ArticleBlock from "../ArticleBlock/ArticleBlock";
import PropTypes from 'prop-types';
import API from '../../shared/api-v1';

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

    render() {
        let articleData = this.props.articleData;
        let temp = [articleData._id].concat(this.props.suggestedArticles.map((article) => {
            return article._id
        }));
        let otherTemp = {};
        temp.forEach((t) => {
            otherTemp[t] = t;
        });
        // TODO: test the article with really long and short article length
        return (
            <div className="ArticleContent">
                <div className="article-meter" ref={(ref) => {
                    this.articleMeter = ref
                }}></div>
                <div className="article">
                    <div className="article-top">
                        <div className="article-info">
                            <div className="category"><Link to="/">{articleData.category}</Link></div>
                            <div className="time-to-read">{articleData.timeToReadInMin} min read</div>
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
                            <div className="suggested">
                                {
                                    this.props.suggestedArticles ? <div className="articles">
                                        <div className="suggested-cta">Articles You Might Like</div>
                                        {
                                            this.props.suggestedArticles.map((suggestedArticle) => {
                                                return (
                                                    <ArticleBlock key={suggestedArticle._id}
                                                                  article={suggestedArticle}/>
                                                )
                                            })
                                        }
                                    </div> : null
                                }
                            </div>
                            <div className="article-body">
                                {/*<p>
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 </p>
                                 <p>
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 </p><p>
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 </p><p>
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 </p><p>
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 </p><p>
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 </p><p>
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 </p><p>
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 </p><p>
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 slkdfjs ldkfjasdkl fjsdklfjsdklfj sdklfj sdklfj sdklfj
                                 </p>*/}
                                {articleData._id}
                                <br/>
                                {`is => ${temp.length === Object.keys(otherTemp).length}`}
                            </div>
                            <div className="social-media-block">
                                <div className="social-media-icons">
                                    <SocialMediaBlock articleData={articleData}/>
                                </div>
                            </div>
                        </div>
                        {
                            this.props.suggestedArticles ?
                                <div>
                                    <div className="cta">Other Articles You Might Enjoy</div>
                                    <div className="mobile-suggested">
                                        <div className="articles">
                                            {
                                                this.props.suggestedArticles.splice(0, 2).map((suggestedArticle) => {
                                                    return (
                                                        <ArticleBlock key={suggestedArticle._id}
                                                                      article={suggestedArticle}
                                                                      orientation={'horizontal'}
                                                        />
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div> : null
                        }
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
