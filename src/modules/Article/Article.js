import React, {Component} from 'react';
import './Article.less';
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import Comments from "../../components/Comments/Comments";
import PropTypes from 'prop-types';
import Loading from '../../components/Loading/Loading';
import {Helmet} from 'react-helmet';
import CONSTANTS from '../../shared/constants';
const API = require('../../shared/api-v1');

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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
            },
            params: {
                category: articleData.category,
                exclude: articleData._id,
            }
        });
    }

    getData() {
        if (!this.props.articleData) {
            const queryParams = {
                    // TODO: fix this, check that state is defined
                    _id: this.props.location.state._id
                },
                self = this;

            API.getArticle({
                success: function (res) {
                    self.getSuggestedArticles(res.data);
                },
                params: queryParams
            });
        } else {
            this.setState({
                loading: false,
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevProps || !prevState) {
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

Article.proptypes = {

};

export default Article;
