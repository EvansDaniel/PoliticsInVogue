import React, {Component} from 'react';
import './Dashboard.less'
import _ from 'lodash';
import empty from 'is-empty';
import API from '../../shared/api-v1';
import URLS from '../../shared/urls';

import errorUtils from '../../utils/error-utils';
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";
import Loading from '../../components/Loading/Loading';
import {withRouter} from 'react-router-dom';
import validators from '../../utils/validators';
import classNames from 'classnames';
import {MegadraftEditor} from 'megadraft-denistsuman';
import ButtonInput from "../../components/ButtonInput/ButtonInput";
import BodyHtml from "../../components/BodyHtml/BodyHtml";
import ShowMore from "../../components/ShowMore/ShowMore";
const editorUtils = require('../../shared/utils/editor-utils');

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
        // TODO: race condition, me might not be loaded until
        // after dashboard articles are loaded, me might be undefined
        API.asynchronousSafeFetch([this.loadDashboardArticles(), this.loadMe()], (function () {
            this.setState({loading: false});
        }).bind(this));
    };

    loadDashboardArticles() {
        const self = this;
        return {
            options: {
                success: (response) => {
                    self.setState({
                        dashboardArticles: response.data,
                    });
                },
                error: (error) => {
                    console.log(error.response);
                    self.setState({
                        error: errorUtils.buildRenderError(true, error.response,
                            'There was an error fetching your articles')
                    });
                },
            },
            apiFunc: API.getDashboardArticles
        }
    }

    loadMe() {
        const self = this;
        return {
            options: {
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
            },
            apiFunc: API.getMe,
        }
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

    // editorState is an instance of EditorState
    setBiography(editorState) {
        const newMeData = _.merge(this.state.me, {biography: editorUtils.getJSONFromEditorState(editorState)});
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
        if(this.state.error) {
            return errorUtils.renderIfError(this.state.error)
        }
        return (
            errorUtils.renderIfError(this.state.error) ||
            this.state.loading ? <Loading/> :
                <div className="Dashboard">
                    <div className="about-info">
                        <div className="image-and-create-article">
                            <div className="image">
                                {this.state.me.photograph ?
                                    <img src={this.state.me.photograph} alt=""/>
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
                        {/*
                         If we are not showing the bio text, then we are editing the biography. Add extra margin-left
                         So that the black + sign is in view
                         */}
                        <div
                            className={classNames('bio-and-editor', {'margin-fix-bio-editor': !this.state.showBioText})}>
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
                                        /* biography should be a valid editorStateJSON */
                                                 defaultInputVal={editorUtils.getEditorStateFromJSON(this.state.me.biography)}
                                    />
                                    {
                                        this.state.showBioText ?
                                            <ShowMore>
                                                <div className="bio-text">
                                                    {!editorUtils.editorStateIsEmpty(this.state.me.biography) ?
                                                        <BodyHtml body={this.state.me.biography}/>
                                                        : "Write about yourself here, and it will show up in the About page"}
                                                </div>
                                            </ShowMore> : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="articles">
                        <div className="articles-row drafts">
                            <DashboardArticleBlock
                                title="Your Drafts"
                                onClick={function (event, article) {
                                    self.props.history.push(URLS.transform(URLS.ROUTES.editArticle, {...article}))
                                }}
                                articles={this.state.dashboardArticles.drafts}
                            />
                        </div>

                        <div className="articles-row hidden">
                            {/*<DashboardArticleBlock
                             title="Your Hidden Articles"
                             articles={this.state.dashboardArticles.hidden}
                             />*/}
                        </div>

                        <div className="articles-by-category">
                            {!empty(this.state.dashboardArticles.categories) ?
                                <div className="articles-by-category-title">Articles By Category</div> : null}
                            {
                                /* TODO: when # articles <= 4, don't use slider */
                                /* TODO: make this ArticleBlock and the drafts into a single component that behave same */
                                this.state.dashboardArticles.categories ?
                                    Object.keys(this.state.dashboardArticles.categories).map(function (category, index) {
                                        return (
                                            <div key={index} className="articles-row category">
                                                <DashboardArticleBlock
                                                    title={category}
                                                    onClick={function (event, article) {
                                                        self.props.history.push(URLS.transform(URLS.ROUTES.editArticle, {...article}))
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
            classRoot="dashboard-article-block"
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

export default withRouter(Dashboard);
