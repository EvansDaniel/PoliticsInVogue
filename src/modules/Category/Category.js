import React, {Component} from "react";
import "./Category.less";
import AlternatingArticleBlock from "../../components/AlternatingArticleBlock/AlternatingArticleBlock";
import errorUtils from '../../utils/error-utils';

import API from '../../shared/api-v1';
import Loading from '../../components/Loading/Loading';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
        };
    }

    componentDidMount() {
        this.loadCategories();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps || !prevState) {
            return false;
        }

        // Category slugs changed, so load new articles for the new category
        if (prevProps.match.params.categorySlug !== this.props.match.params.categorySlug) {
            this.loadCategories();
        }
    }

    // Loads articles for the given category
    loadCategories() {
        API.asynchronousSafeFetch([this.getArticlesFromCategory()], (function () {
            this.setState({loading: false})
        }).bind(this));
    }

    getArticlesFromCategory() {
        const self = this;
        return {
            options: {
                success: (response) => {
                    self.setState({
                        articles: response.data,
                    });
                    // There are no articles in the given category
                    if(!response.data.length) {
                        self.setState({
                            error: errorUtils.buildRenderError(true, null,
                                'Sorry there are no articles in that category')
                        })
                    }
                },
                error: (error) => {
                    self.setState({
                        error: errorUtils.buildRenderError(true, null,
                            'There was an error fetching articles in this category')
                    });
                },
                params: {
                    categorySlug: this.props.match.params.categorySlug
                }
            },
            apiFunc: API.getArticle
        }
    }

    render() {
        return (
            errorUtils.renderIfError(this.state.error) ||
            <div className="Category">
                {
                    this.state.loading ? <Loading/> : <div>
                        <div className="category-title">
                            {/* Since there must be at least one article w/ this category, this should work.
                                Fall back to the params category though just in case
                            */}
                            {(this.state.articles[0] && this.state.articles[0].category) || this.props.match.params.category}
                        </div>
                        <AlternatingArticleBlock articles={this.state.articles}/></div>
                }
            </div>
        );
    }
}

export default Category;
