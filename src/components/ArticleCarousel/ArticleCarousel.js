import React, {Component} from 'react';
import './ArticleCarousel.less'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import readArticle from '../../utils/read-article';
import $ from 'jquery';
import {withRouter} from 'react-router-dom';
import URLS from '../../shared/urls';
const Carousel = require('nuka-carousel');

class ArticleCarousel extends Component {
    constructor(props) {
        super(props);

    }

    fixSliderArrows() {
        // TODO: Hack to get the buttons to have the correct inner html
        const slider0 = $('.slider-decorator-0 button'),
            slider1 = $('.slider-decorator-1 button');

        if (slider0.length && slider1.length) {
            slider0[0].innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>';
            slider1[0].innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
        }
    }

    componentDidMount() {
        this.fixSliderArrows();
    }

    render() {
        // TODO: carousel does not load properly when only one item, see temp fix below
        return (
            <div className="ArticleCarousel">
                {this.props.carouselData.length === 1 ?
                    <Carousel {...this.props}>
                        {
                            this.props.carouselData.map((carouselData, i) => {
                                return <CarouselItem key={i} {...carouselData} />
                            })
                        }
                        {
                            <div style={{display: 'none'}}></div>
                        }
                    </Carousel> :
                    <Carousel {...this.props}>
                        {
                            this.props.carouselData.map((carouselData, i) => {
                                return <CarouselItem key={i} {...carouselData} />
                            })
                        }
                    </Carousel>
                }
            </div>
        );
    }
}

let CarouselItem = (props) => {
    const carouselImageStyle = {
        backgroundImage: `url(${props.showcaseImage})`
    };
    return (
        <div className="carousel-image"
             style={carouselImageStyle}
             onClick={function () {
                 props.history.push(URLS.transform(URLS.ROUTES.article, {
                     articleSlug: props.articleSlug, year: props.year, month: props.month
                 }));
             }}
        >
            <div className="article-info">
                <div className="title">
                    {props.title}
                </div>
                <div className="excerpt">
                    {props.excerpt}
                </div>
            </div>
        </div>
    );
};

CarouselItem = withRouter(CarouselItem);

ArticleCarousel.proptypes = {
    // TODO: finalize articleData object type and add here as PropTypes.shape(<shape>)
    carouselData: PropTypes.object.isRequired
};

export default ArticleCarousel;
