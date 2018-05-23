import React, {Component} from 'react';
import './ArticleBlock.less'
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import _ from 'lodash';
import classNames from 'classnames';

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
            slidesToScroll: 4,
            arrows: true,
            nextArrow: <Arrow right={1 /* we use 1 as a truth value instead of true b/c React complains about using boolean value*/}/>,
            prevArrow: <Arrow/>,
        };
        settings = _.merge(settings, this.props.settings);
        // We want to scroll all of them if we scroll more than 1 at a time
        if (settings.slidesToShow > 1) {
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
        const articleBlocks = this.props.articles.map(function (article, i) {
            return (
                <div className="block-wrapper" key={i}>
                    <ArticleUI {...self.props} article={article} onClick={self.props.onClick}/>
                </div>
            )
        });
        return (
            <div className={classNames('ArticleBlock', this.props.orientation, this.props.classRoot)}>
                {
                    this.props.title ?
                        <div className="articles-title-wrapper"><div className="articles-title">{this.props.title}</div></div>
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
    // root class to customize look
    classRoot: '',
    // shows black borders around horizontal article blocks when true
    rowBorder: false,
    onClick: (event, article) => {
        return false;
    },
    // Default UI for an article
    articleUI: (props) => {
        return (
            <div key={props.article._id} className="block" onClick={function (event) {
                //this.readArticle(article); // TODO: make this the onclick default
                props.onClick(event, props.article);
            }}>
                <div className="img-block">
                    {
                        props.article.showcaseImage ? [
                            <img key={1} src={props.article.showcaseImage} alt={props.article.title}/>,
                            props.timeToRead ? <div key={2}>{props.article.timeToReadInMin} min read</div> : null
                        ] : null
                    }
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
    classRoot: PropTypes.string,
    rowBorder: PropTypes.bool,
    articleTransform: PropTypes.func,
    onClick: PropTypes.func,
};

const Arrow = (props) => {
    const {className, style, ...other} = props;
    const margin = props.right ? {
        'marginLeft': '10px'
    } : {'marginRight': '10px'};
    return (
        <button {...other} style={_.merge({
            border: '0px',
            background: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px',
            outline: '0px',
            opacity: '1',
            cursor: 'pointer',
            display: 'inline',
            flex: '1 0 auto'
        }, margin)}>
            {
                props.right ? <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    : <i className="fa fa-chevron-left" aria-hidden="true"></i>
            }
        </button>
    );
};

export default ArticleBlock;
