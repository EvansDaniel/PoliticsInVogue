import React, {Component} from 'react';
import './ArticleBlock.less'
import URLS from '../../shared/urls';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import _ from 'lodash';
import readArticle from '../../utils/read-article';

class ArticleBlock extends Component {
    constructor(props) {
        super(props);
        this.readArticle = this.readArticle.bind(this);
    }

    setupSettings() {
        let settings = {
            infinite: true,
            speed: 500,
            className: 'ArticleBlockSlider',
            slidesToShow: 5,
            slidesToScroll:4,
            arrows: true,
            nextArrow: <Arrow right={true}/>,
            prevArrow: <Arrow/>,
        };
        settings = _.merge(settings, this.props.settings);
        // We want to scroll all of them if we scroll more than 1 at a time
        if(settings.slidesToShow > 1) {
            settings.slidesToScroll = settings.slidesToShow - 1;
        } else {
            // Just scroll one at a time
            settings.slidesToScroll = settings.slidesToShow;
        }
        return settings;
    }

    readArticle(article) {
        //readArticle(this.props.history, article)
    }

    render() {
        const self = this;
        const settings = this.setupSettings();
        const ArticleUI = this.props.articleUI;
        const articleBlocks = this.props.articles.map(function (article) {
            return (
                <div className="block-wrapper">
                    <ArticleUI article={article} onClick={self.props.onClick}/>
                </div>
            )
        });
        return (
            <div className={"ArticleBlock " + this.props.orientation}>
                {
                    this.props.title ?
                        <div className="articles-title">{this.props.title}</div>
                        : null
                }
                <div className={classNames('content-articles', {'row-border': this.props.rowBorder})}>
                    {
                        this.props.slider ?
                            <Slider {...settings}>
                                {articleBlocks}
                            </Slider>
                            :
                            articleBlocks
                    }
                </div>
            </div>
        );
    }
}

ArticleBlock.defaultProps = {
    orientation: 'vertical',
    // will do nothing if props.slider = false
    settings: {},
    title: '',
    slider: false,
    // shows black borders around horizontal article blocks when true
    rowBorder: false,
    onClick: (event, article) => {
        return false;
    },
    // Default UI for an article
    articleUI: (props) => {
        // TODO: remove this check
        if(props.title === 'Untitled') {
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
};

ArticleBlock.proptypes = {
    articles: PropTypes.object.isRequired,
    orientation: PropTypes.string,
    settings: PropTypes.object,
    slider: PropTypes.bool,
    rowBorder: PropTypes.bool,
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
