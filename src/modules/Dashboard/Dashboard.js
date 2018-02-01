import React, {Component} from 'react';
import './Dashboard.less'
import PropTypes from 'prop-types';
import API from '../../shared/api-v1';
import URLS from '../../shared/urls';
import Error from '../../components/Error/Error';
import renderUtils from '../../utils/render-utils';
import ArticleBlock from "../../components/ArticleBlock/ArticleBlock";
import Loading from '../../components/Loading/Loading';
import Slider from 'react-slick';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.createNewArticle = this.createNewArticle.bind(this);
        this.state = {
            error: {
                val: false
            },
            loading: true,
            articles: null
        }
    }

    componentDidMount() {
        const self = this;
        API.getArticle({
            success: (response) => {
                self.setState({
                    articles: response.data,
                    loading: false
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
    }

    createNewArticle(event) {
        const self = this;
        API.createArticle({
            success: (response) => {
                const data = response.data;
                self.props.history.push({
                    pathname: URLS.transform(URLS.ROUTES.editArticle, {
                        _id: data._id
                    }),
                    state: {
                        _id: data._id
                    }
                });
            },
            error: () => function () {
                self.setState({
                    error: {
                        val: true,
                        message: 'There was an error while setting up your new article.'
                    }
                });
            }, // TODO:
            data: {
                title: 'Untitled',
                draft: true,
            }
        });
        // call create article api
        // redirect to edit page (with created article state?)
    }

    render() {
        return (
            this.state.loading ? <Loading/> :
            renderUtils.renderIfError(this.state.error) ||
            <div className="Dashboard">
                <div className="about-info">
                    <div className="image-and-create-article">
                        <div className="image">
                            <img src="https://static.pexels.com/photos/248797/pexels-photo-248797.jpeg"
                                 alt="Image of you"/>
                        </div>
                        <div className="create-article-container">
                            <button className="create-article" onClick={this.createNewArticle}>Write a New Article
                            </button>
                        </div>
                    </div>
                    <div className="bio-and-editor">
                        <div className="bio">
                            <div className="header">Biography <button className="edit-bio">Edit</button></div>
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
                        <ArticleBlock
                            title="Your Drafts"
                            slider={true}
                            articles={this.state.articles}
                            orientation="horizontal"
                        />
                    </div>

                    <div className="articles-by-category">
                        {
                            /*[1,2,3,4].map((i) => {
                                return (
                                    <div key={i} className="articles-row category">
                                        <ArticleBlock
                                            title="Category Name"
                                            slider={true}
                                            articles={this.state.articles}
                                            orientation="horizontal"
                                        />
                                    </div>
                                )
                            })*/
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
