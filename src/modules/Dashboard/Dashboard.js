import React, {Component} from 'react';
import './Dashboard.less'
import PropTypes from 'prop-types';
import _ from 'lodash';
import API from '../../shared/api-v1';
import URLS from '../../shared/urls';
import renderUtils from '../../utils/render-utils';
import errorUtils from '../../utils/error-utils';
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";
import Loading from '../../components/Loading/Loading';
import {withRouter} from 'react-router-dom';
import readArticle from '../../utils/read-article';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.createNewArticle = this.createNewArticle.bind(this);
        this.state = {
            error: {
                val: false
            },
            loading: true,
            dashboardArticles: null
        }
    }

    componentDidMount() {
        const self = this;
        API.getArticle({
            success: (response) => {
                self.setState({
                    articles: response.data
                })
            },
            error: (response) => {
                self.setState({
                    error: {
                        val: true,
                        message: 'There was an error while fetching your articles'
                    }
                });
            }
        });
        this.loadDashboardArticles();
    }

    loadDashboardArticles() {
        const self = this;
        API.getDashboardArticles({
            success: (response) => {
                self.setState({
                    dashboardArticles: response.data,
                    loading: false
                });
            },
            error: () => function () {
                self.setState({
                    error: errorUtils.buildRenderError(true, null,
                        'There was an error fetching your articles')
                });
            },
        });
    }

    createNewArticle(event) {
        const self = this;
        API.createArticle({
            success: (response) => {
                const data = response.data;
                self.props.history.push({
                    pathname: URLS.transform(URLS.ROUTES.editArticle, {
                        _id: data._id
                    })
                });
            },
            error: () => function () {
                self.setState({
                    error: errorUtils.buildRenderError(true, null,
                        'There was an error while setting up your new article')
                });
            }, // TODO:
            data: {
                title: 'Untitled',
                draft: true,
            }
        });
    }

    render() {
        const self = this;
        return (
            this.state.loading ? <Loading/> :
            renderUtils.renderIfError(this.state.error) ||
            <div className="Dashboard">
                <div className="about-info">
                    <div className="image-and-create-article">
                        <div className="image">
                            <img src=""
                                 alt="Image of you"/>
                        </div>
                        <div className="create-article-container">
                            <button className="create-article" onClick={this.createNewArticle}>Write a New Article
                            </button>
                            <button className="edit-img-link" onClick={() => {}}>Edit Image</button>
                        </div>
                    </div>
                    <div className="bio-and-editor">
                        <div className="bio">
                            <div className="header">What You've Written About You <button className="edit-bio">Edit</button></div>
                            <div className="text">
                                sdkjfl ksdjfkl sdjfklsdj fkl;sdjf lksjflksdj fkljsd fkl
                                sdkjfl ksdjfkl sdjfklsdj fkl;sdjf lksjflksdj fkljsd fkl
                                sdkjfl ksdjfkl sdjfklsdj fkl;sdjf lksjflksdj fkljsd fkl
                                sdkjfl ksdjfkl sdjfklsdj fkl;sdjf lksjflksdj fkljsd fkl
                                sdkjfl ksdjfkl sdjfklsdj fkl;sdjf lksjflksdj fkljsd fkl
                                sdkjfl ksdjfkl sdjfklsdj fkl;sdjf lksjflksdj fkljsd fkl
                                sdkjfl ksdjfkl sdjfklsdj fkl;sdjf lksjflksdj fkljsd fkl
                                sdkjfl ksdjfkl sdjfklsdj fkl;sdjf lksjflksdj fkljsd fkl
                            </div>
                        </div>
                    </div>
                </div>
                <div className="articles">
                    <div className="articles-row drafts">
                        <DashboardArticleBlock
                            title="Your Drafts"
                            onClick={(event, article) => {
                                self.props.history(URLS.transform(URLS.ROUTES.article, {...article}))
                            }}
                            articles={this.state.dashboardArticles.drafts}
                        />
                    </div>

                    <div className="articles-row hidden">
                        <DashboardArticleBlock
                            title="Your Hidden Articles"
                            articles={this.state.dashboardArticles.hidden}
                        />
                    </div>

                    <div className="articles-by-category">
                        {
                            /* TODO: when # articles <= 4, don't use slider */
                            /* TODO: make this ArticleBlock and the drafts into a single component that behave same */
                            this.state.dashboardArticles.categories ?
                                Object.keys(this.state.dashboardArticles.categories).map(function (category, index) {
                                    return (
                                        <div key={index} className="articles-row category">
                                            <DashboardArticleBlock
                                                title={category}
                                                onClick={(event, article) => {
                                                    self.props.history(URLS.transform(URLS.ROUTES.article, {...article}))
                                                }}
                                                articles={self.state.dashboardArticles.categories[category]}
                                            />
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const DashboardArticleBlock = (props) => {
  return (
      props.articles ? <ArticleBlock
          slider={true}
          settings={{slidesToShow: 4}}
          articles={props.articles}
          orientation="horizontal"
          {...props}
      /> : null
  );
};

const DashboardArticleBlockUI = (props) => {
    return (
        <div className="DashboardArticleBlockUI">
            <div style={{'background-image': props.article.showcaseImage}}>

            </div>
        </div>
    )
};

export default withRouter(Dashboard);
