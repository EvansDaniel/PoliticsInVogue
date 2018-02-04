import React, {Component} from 'react';
import './Article.less';
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import Comments from "../../components/Comments/Comments";
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';
import {Helmet} from 'react-helmet';
import CONSTANTS from '../../shared/constants';
import renderUtils from '../../utils/render-utils';
import errorUtils from '../../utils/error-utils';
const API = require('../../shared/api-v1');

class Article extends Component {
    constructor(props) {
        super(props);
        // TODO: possibly make loading an object that specifies different parts of the page that are loading
        // possibly do that rather than have to go get all the data before rendering anything
        this.state = {
            loading: true,
            error: false,
            articleMeterWidth: 0,
        };
    }

    getSuggestedArticles(articleData) {
        const self = this;
        API.getSuggestedArticles({
            success: function (response) {
                self.setState({
                    loading: false,
                    articleData: articleData,
                    suggestedArticles: response.data
                });
            },
            error: function () {
                // TODO:
                self.setState({
                    loading: false,
                    articleData: articleData,
                    suggestedArticles: []
                });
            },
            params: {
                category: articleData.category,
                exclude: articleData._id,
            }
        });
    }

    getData() {
        const slug = this.props.match.params.articleSlug;
        console.log(slug);
        const queryParams = {
                articleSlug: slug
            },
            self = this;

        // get the article with the slug in the queryParams
        API.getArticle({
            success: function (res) {
                self.getSuggestedArticles(res.data);
            },
            error: function (res) {
                if (res.status === 404) {
                    self.setState({
                        error: errorUtils.buildRenderError(true, res)
                    });
                }
            },
            params: queryParams
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps || !prevState) {
            return false;
        }

        if (prevState.articleData &&
            prevState.articleData._id !== this.props.location.state._id) {
            this.getData();
        }
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        // For previewing the article
        const articleData = this.state.articleData;
        if(this.state.error) {
            // add link to redirect home
            return renderUtils.renderIfError(this.state.error, true);
        }
        return (
            <div className="Article">
                <Helmet>
                    <title>{CONSTANTS.APP_NAME} | TITLE</title>
                    <meta property="og:image" content={articleData && articleData.showcaseImage}/>
                </Helmet>
                {
                    this.state.loading ? <Loading/> :
                        <ArticleContent suggestedArticles={this.state.suggestedArticles}
                                        articleData={articleData}
                        />
                }
            </div>
        );
    }
}

Article.proptypes = {};

export default Article;
