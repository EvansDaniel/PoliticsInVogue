import React, {Component} from 'react';
import './Article.less';
import renderHTML from 'react-render-html';
import SocialMediaBlock from "../../components/SocialMediaBlock/SocialMediaBlock";
const API = require('../../shared/api-v1');

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
    }

    componentDidMount() {
        if (!this.props.articleData) {
            const queryParams = {
                    year: this.props.match.params.year,
                    month: this.props.match.params.month,
                    title: this.props.match.params.title
                },
                self = this;

            API.getArticle(queryParams, function (res) {
                self.setState({
                    loading: false,
                    articleData: res
                });
            });
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    render() {
        const articleData = this.state.articleData || this.props.articleData;
        return (
            <div className="Article">
                {
                    this.state.loading ? "Loading..." :
                        <ArticleContent articleData={articleData}/>
                }
            </div>
        );
    }
}

const ArticleContent = (props) => {
    let articleData = props.articleData;
    return (
        <div className="ArticleContent">
            <div className="article-top">
                <div className="article-info">
                    <div className="category"><a href="">Category</a></div>
                    <div className="time-to-read">12 min read</div>
                    <div className="title">
                        {articleData.title}
                    </div>
                    <div className="author-info">
                        <div className="date-published">Date Published: {articleData.datePublished}</div>
                        <div className="author">Written by: <span className="name">Sophie Clark</span></div>
                    </div>
                </div>
                <div className="main-image">
                    <img src="https://blog.hubspot.com/hubfs/00-Blog_Thinkstock_Images/How_to_Write_a_Blog_Post.jpg?t=1514169488746"/>
                </div>
            </div>
            {/*<div className="social-media-block">
             <SocialMediaBlock/>
             </div>*/}
            <div className="lower-article">
                <div className="social-media-block">
                    <SocialMediaBlock/>
                </div>
                <div className="body">
                    {renderHTML(articleData.body)}
                </div>
            </div>
        </div>
    );
};

export default Article;