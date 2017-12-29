import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './ArticleContent.less';
import SocialMediaBlock from "../SocialMediaBlock/SocialMediaBlock";
import renderHTML from 'react-render-html';
import $ from 'jquery';
import Comments from "../Comments/Comments";
import ArticleBlock from "../ArticleBlock/ArticleBlock";

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
        this.setState({
            articleMeterWidth: `${newWidth}%`
        });
    }

    render() {
        let articleData = this.props.articleData;
        return (
            <div className="ArticleContent">
                <div className="article-meter" style={{width: this.state.articleMeterWidth}}></div>
                <div className="article">
                    <div className="article-top">
                        <div className="article-info">
                            <div className="category"><Link to="/">Category</Link></div>
                            <div className="time-to-read">12 min read</div>
                            <div className="title">
                                {articleData.title}
                            </div>
                            <div className="author-info">
                                <div className="date-published">Date Published: {articleData.datePublished}</div>
                                <div className="author">Written by: <Link to="/about" className="name">Sophie Clark</Link></div>
                            </div>
                        </div>
                        <div className="main-image">
                            <img src="https://blog.hubspot.com/hubfs/00-Blog_Thinkstock_Images/How_to_Write_a_Blog_Post.jpg?t=1514169488746"/>
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
                                <SocialMediaBlock/>
                            </div>
                        </div>
                        {/*
                        <div className="comment-section">
                            <Comments/>
                        </div>
                        */}
                    </div>
                </div>
            </div>
        );
    }
}

export default ArticleContent;
