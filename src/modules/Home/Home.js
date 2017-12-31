import React, {Component} from "react";
import "./Home.less";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import $ from 'jquery';
import renderHTML from 'react-render-html';
import ArticleCards from "../../components/ArticleCards/ArticleCards";
let Carousel = require('nuka-carousel');

class Home extends Component {

    componentDidMount() {
        // TODO: Hack to get the buttons to have the correct inner html
        $('.slider-decorator-1 button')[0].innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
        $('.slider-decorator-0 button')[0].innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>';
    }

    render() {
        return (
            <div className="Home">
                <div className="awesome-banner"></div>
                <div className="article-carousel">
                    <HomePageCarousel {...this.props}/>
                </div>
                {
                    /*
                    abstract this to a component that
                    retrieves max 4 articles based on
                    some strategy: latest, popular, etc.
                    */
                }
                <div className="recent-articles">
                    <ArticleCards/>
                </div>
            </div>
        );
    }
}

const HomePageCarousel = (props) => {
    // TODO: carousel does not load properly when only one item
    const carouselInfo = [
        {
            title: "MY WINTER UNIFORM (THAT ISN'T JEANS...)",
            excerpt: "Hands up if you have a bit of a bad habit of sticking to wearing jeans and jumpers in the winter? Yes, I'm right there with you",
            year: 2017,
            month: 12
        },
        {
            title: "3 PARTY LOOKS FOR 3 PARTY OCCASIONS",
            excerpt: "Party season is upon us! Almost - count down the days with me. I hope you've practiced your best fake (and real) smiles",
            year: 2017,
            month: 11
        }
    ];
    return (
        <Carousel {...props}>
            {
                carouselInfo.map((info) => {
                    return <CarouselItem {...info} {...props} />
                })
            }
        </Carousel>
    );
};

const CarouselItem = (props) => {
    //TODO: Probs should just store this transformation in the database as normalizedTitle
    const normalizedTitle = props.title
            // replace all non-alphanumeric characters
            // that isn't space
            .replace(/[^a-zA-Z\d\s:]/g, '')
            // replace space with "-"
            .replace(new RegExp(" ", 'g'), '-')
            .toLowerCase();
    return (
        <div className="carousel-image" onClick={function () {
            props.history.push(`/${props.year}/${props.month}/${normalizedTitle}`)
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

export default Home;