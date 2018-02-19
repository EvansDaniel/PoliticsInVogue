import React, {Component} from "react";
import "./Home.less";
import ArticleCards from "../../components/ArticleCards/ArticleCards";
import ArticleCarousel from "../../components/ArticleCarousel/ArticleCarousel";
import Loading from "../../components/Loading/Loading";
import empty from 'is-empty';
import errorUtils from '../../utils/error-utils';
const API = require('../../shared/api-v1');


class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            placedArticles: null,
        };
    }

    componentDidMount() {
        API.asynchronousSafeFetch([this.getPlacedArticles()], (function () {
            this.setState({loading: false});
        }).bind(this));
    }

    getPlacedArticles() {
        const self = this;
        return {
            options: {
                success: function (response) {
                    if (response.status === 200) {
                        self.setState({
                            placedArticles: response.data,
                            loading: false,
                        });
                    }
                },
                error: function () {
                    self.setState({
                        error: errorUtils.buildRenderError(true, null,
                            'There was an error while loading home page articles')
                    });
                }
            },
            apiFunc: API.getPlacedArticles
        }
    }

    render() {
        return (
            errorUtils.renderIfError(this.state.error) || <div className="Home">
                <div className="awesome-banner"></div>
                {this.state.loading ? <Loading/> :
                    <div>
                        {
                            !empty(this.state.placedArticles.carousel) ?
                                <div className="article-carousel">
                                    <ArticleCarousel carouselData={this.state.placedArticles.carousel}/>
                                </div> : null
                        }
                        {
                            !empty(this.state.placedArticles.featured) ?
                                <div className="featured-articles">
                                    <ArticleCards sectionName="Featured Articles"
                                                  cardsData={this.state.placedArticles.featured}/>
                                </div>
                                : null
                        }
                    </div>
                }
            </div>
        );
    }
}

export default Home;