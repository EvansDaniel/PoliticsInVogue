import React, {Component} from 'react';
import './Dashboard.less'
import PropTypes from 'prop-types';
import _ from 'lodash';
import empty from 'is-empty';
import API from '../../shared/api-v1';
import URLS from '../../shared/urls';
import renderUtils from '../../utils/render-utils';
import errorUtils from '../../utils/error-utils';
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";
import Loading from '../../components/Loading/Loading';
import {withRouter} from 'react-router-dom';
import validators from '../../utils/validators';
import {MegadraftEditor} from 'megadraft-denistsuman';
import {getJSONFromEditorState, getEditorStateFromJSON, renderJSON} from '../../utils/editor-utils';
import ButtonInput from "../../components/ButtonInput/ButtonInput";
import BodyHtml from "../../components/BodyHtml/BodyHtml";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.createNewArticle = this.createNewArticle.bind(this);
        this.setImageLink = this.setImageLink.bind(this);
        this.setBiography = this.setBiography.bind(this);
        this.state = {
            error: {
                val: false
            },
            info: {},
            loading: true,
            dashboardArticles: null,
            showBioText: true,
            me: null
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
        this.loadMe();
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

    loadMe() {
        const self = this;
        API.getMe({
            success: (response) => {
                self.setState({
                    me: response.data,
                });
            },
            error: () => function () {
                self.setState({
                    error: errorUtils.buildRenderError(true, null,
                        'There was an error loading the data')
                });
            },
        })
    }

    updateMeInfo(updatedMe) {
        const self = this;
        API.updateMe({
            success: function () {
                self.setState({
                    me: updatedMe
                });
            },
            data: updatedMe
        })
    }

    // validates url and calls updateMeInfo to set photograph on client and server side
    setImageLink(value) {
        if (!validators.checkImageUrl(value) && !empty(value)) {
            this.setState({
                info: _.merge(this.state.info, {photograph: 'Please provide a valid image link'})
            });
        } else {
            this.updateMeInfo(_.merge(this.state.me, {photograph: value}));
        }
    }

    setBiography(value) {
        // Value will be an editor state
        const newMeData = _.merge(this.state.me, {biography: getJSONFromEditorState(value)});
        this.setState({
            showBioText: true,
            me: newMeData
        });

        this.updateMeInfo(newMeData);
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
                                {this.state.me.photograph ?
                                    <img src={this.state.me.photograph}
                                         alt="Image of you"/>
                                    : <div>Add a photograph of you below :) </div>
                                }
                            </div>
                            <div>{this.state.info.photograph}</div>
                            <div className="create-article-container">
                                <button className="create-article" onClick={this.createNewArticle}>Write a New Article
                                </button>
                                <ButtonInput onDone={this.setImageLink}
                                             classRoot="edit-img-link"
                                             title="Edit Image"
                                             defaultInputVal={this.state.me.photograph}
                                />
                            </div>
                        </div>
                        <div className="bio-and-editor">
                            <div className="bio">
                                <div className="header">What You've Written About You</div>
                                <div className="bio-editor-text-wrapper">
                                    <ButtonInput onDone={this.setBiography}
                                                 component={Editor}
                                                 classRoot="edit-bio"
                                                 title="Edit Bio"
                                                 onEditClicked={function () {
                                                     self.setState({showBioText: false});
                                                 }}
                                                 /* This should be a valid editorState */
                                                 defaultInputVal={getEditorStateFromJSON(this.state.me.biography)}
                                    />
                                    {
                                        this.state.showBioText ?
                                            <div className="bio-text">
                                            <BodyHtml body={this.state.me.biography}/>
                                        </div> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="articles">
                        <div className="articles-row drafts">
                            <DashboardArticleBlock
                                title="Your Drafts"
                                onClick={function(event, article) {
                                    console.log(URLS.ROUTES.article);
                                    self.props.history.push(URLS.transform(URLS.ROUTES.article, {...article}))
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
                                                    onClick={function(event, article) {
                                                        self.props.history.push(URLS.transform(URLS.ROUTES.article, {...article}))
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
    const toShow = 2;
    return (
        props.articles ? <ArticleBlock
            slider={props.articles.length > toShow}
            settings={{slidesToShow: toShow}}
            articles={props.articles}
            orientation="horizontal"
            {...props}
        /> : null
    );
};


const Editor = (props) => {
    return (
        <MegadraftEditor
            editorState={props.value}
            onChange={props.onChange}
        />
    )
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
