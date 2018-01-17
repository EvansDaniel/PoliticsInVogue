import React, {Component} from "react";
import "./Home.less";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import $ from 'jquery';
import renderHTML from 'react-render-html';
import ArticleCards from "../../components/ArticleCards/ArticleCards";
import ArticleCarousel from "../../components/ArticleCarousel/ArticleCarousel";

class Home extends Component {

    componentDidMount() {
        // TODO: Hack to get the buttons to have the correct inner html
        const slider0 = $('.slider-decorator-0 button'),
                slider1 = $('.slider-decorator-1 button');

        if (slider0.length && slider1.length) {
            slider0[0].innerHTML = '<i class="fa fa-chevron-left" aria-hidden="true"></i>';
            slider1[0].innerHTML = '<i class="fa fa-chevron-right" aria-hidden="true"></i>';
        }
    }

    render() {
        return (
            <div className="Home">
                <div className="awesome-banner"></div>
                <div className="article-carousel">
                    <ArticleCarousel {...this.props}/>
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

export default Home;