import React, {Component} from 'react';
import './ArticleCarousel.less'
import PropTypes from 'prop-types';
const Carousel = require('nuka-carousel');

class ArticleCarousel extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        // TODO: carousel does not load properly when only one item
        const carouselInfo = [
            {
                title: "MY WINTER UNIFORM (THAT ISN'T JEANS...)",
                excerpt: "Hands up if you have a bit of a bad habit of sticking to wearing jeans and jumpers in the winter? Yes, I'm right there with you",
                articleSlug: '2017/12/my-title',
                id: '5a5faf7f142e2e5f03cd6c39',
                key: '1'
            }
        ];
        return (
            <div className="ArticleCarousel">
                <Carousel {...this.props}>
                    {
                        carouselInfo.map((info) => {
                            return <CarouselItem {...info} {...this.props} />
                        })
                    }
                </Carousel>
            </div>
        );
    }
}

const CarouselItem = (props) => {
    return (
        <div className="carousel-image" onClick={function () {
            props.history.push(`/articles/${props.year}/${props.month}/${props.slugTitle}`, {id: props.id})
        }}>
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

export default ArticleCarousel;
