import React, {Component} from 'react';
import './ArticleBlock.less'
import URLS from '../../shared/urls';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import readArticle from '../../utils/read-article';

class ArticleBlock extends Component {
    constructor(props) {
        super(props);
        this.readArticle = this.readArticle.bind(this);
    }

    readArticle(article) {
        //readArticle(this.props.history, article)
    }

    render() {
        const self = this;
        var settings = {
            infinite: true,
            speed: 500,
            className: 'ArticleBlockSlider',
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: true,
            centerMode: true,
            nextArrow: <Arrow right={true}/>,
            prevArrow: <Arrow/>,
        };
        const ArticleUI = this.props.articleUI;
        return (
            <div className={"ArticleBlock " + this.props.orientation}>
                {
                    this.props.title ?
                        <div className="articles-title">{this.props.title}</div>
                        : null
                }
                <div className="content-articles">
                    {
                        this.props.slider ?
                            <Slider {...settings}>
                                {

                                    this.props.articles.map(function (article) {
                                        if (article.title === "Untitled") {
                                            return null;
                                        }
                                        return (
                                            <div key={article._id} className="block" onClick={function (event) {
                                                //this.readArticle(article); // TODO: make this the onclick default
                                                this.props.onClick(event, article);
                                            }}>
                                                <div className="img-block">
                                                    <img src={article.showcaseImage} alt={article.title}/>
                                                    <div>{article.timeToReadInMin} min read</div>
                                                </div>
                                                <div className="details">
                                                    <div className="title">{article.title}</div>
                                                    <div className="excerpt">{article.excerpt}</div>
                                                </div>
                                            </div>
                                        );
                                    })
                                    /*this.props.articles.map(function (article) {
                                     return (
                                     <ArticleUI article={article} onClick={self.props.onClick}/>
                                     )
                                     })*/
                                }
                            </Slider> :
                            this.props.articles.map(function (article) {
                                if (article.title === "Untitled") {
                                    return null;
                                }
                                return (
                                    <div key={article._id} className="block" onClick={function (event) {
                                        //this.readArticle(article); // TODO: make this the onclick default
                                        this.props.onClick(event, article);
                                    }}>
                                        <div className="img-block">
                                            <img src={article.showcaseImage} alt={article.title}/>
                                            <div>{article.timeToReadInMin} min read</div>
                                        </div>
                                        <div className="details">
                                            <div className="title">{article.title}</div>
                                            <div className="excerpt">{article.excerpt}</div>
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
    orientation: 'vertical',
    settings: {},
    title: 'hello world',
    slider: false,
    onClick: (event, article) => {
        return false;
    },
    // Default UI for an article
    articleUI: (props) => {
        if (props.article.title === "Untitled") {
            return null;
        }
        return (
            <div key={props.article._id} className="block" onClick={function (event) {
                //this.readArticle(article); // TODO: make this the onclick default
                props.onClick(event, props.article);
            }}>
                <div className="img-block">
                    <img src={props.article.showcaseImage} alt={props.article.title}/>
                    <div>{props.article.timeToReadInMin} min read</div>
                </div>
                <div className="details">
                    <div className="title">{props.article.title}</div>
                    <div className="excerpt">{props.article.excerpt}</div>
                </div>
            </div>
        );
    }
}

ArticleBlock.proptypes = {
    articles: PropTypes.object.isRequired,
    orientation: PropTypes.string,
    settings: PropTypes.object,
    slider: PropTypes.bool,
    articleTransform: PropTypes.func,
    onClick: PropTypes.func,
};

const Arrow = (props) => {
    const {className, style, ...other} = props;
    return (
        <button {...other} style={{
            border: '0px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            outline: '0px',
            opacity: '1',
            cursor: 'pointer',
            display: 'inline',
            flex: '1 0 auto'
        }}>
            {
                props.right ? <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    : <i className="fa fa-chevron-left" aria-hidden="true"></i>
            }
        </button>
    );
};

export default ArticleBlock;
