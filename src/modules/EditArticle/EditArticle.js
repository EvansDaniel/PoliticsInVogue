import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './EditArticle.less'
import _ from 'lodash';
import {waitBeforeCall} from '../../shared/utils';
import {JSONToHTML, getEditorStateFromRaw, getJSONFromEditorState} from '../../utils/editor-utils'
import previewIcon from '../../../src/img/preview.svg';
import publishIcon from '../../../src/img/publish.svg';
import API from '../../shared/api-v1';
import Loading from '../../components/Loading/Loading';
import {MegadraftEditor} from 'megadraft-denistsuman';
import '../../css/megadraft.css';
import ArticleContent from "../../components/ArticleContent/ArticleContent";
import validators from '../../utils/validators';
import PopUpModal from '../../components/PopUpModal/PopUpModal';
import '../../css/pretty-checkbox.css';
const empty = require('is-empty');
const URLS = require('../../shared/urls');
const constants = require('../../shared/constants');

class EditArticle extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeView = this.changeView.bind(this);
        this.initialPublishArticle = this.initialPublishArticle.bind(this);
        this.finishPublishing = this.finishPublishing.bind(this);
        this.changeCategoryAction = this.changeCategoryAction.bind(this);

        this.SAVING_ACTIONS = {
            changesSaved: 'All changes saved as draft',
            savingChanges: 'Saving latest changes...',
            errorSaving: 'There was an error saving changes. If this persists, try again later.'
        };

        this.uiWaitTime = 1000;

        this.EDITING_ACTIONS = {
            showPreview: 'Show preview',
            keepEditing: 'Keep editing'
        };

        this.CATEGORY_ACTIONS = {
            existingCategory: 'or add to existing category',
            newCategory: 'or add to new category'
        };
        this.onEditorChange = this.onEditorChange.bind(this);

        this.state = {
            showPreview: false,
            buttonViewText: 'Show preview',
            savingAction: this.SAVING_ACTIONS.changesSaved,
            addNewCategory: true,
            errorMsg: '',
            loading: true,
            categoryAction: this.CATEGORY_ACTIONS.existingCategory,
            articleData: {},
            editorState: getEditorStateFromRaw(null),
            showModal: false
        };
    }

    onEditorChange(editorState) {
        this.changeArticleData({body: getJSONFromEditorState(editorState)});
        this.setState({
            editorState: editorState
        });
        // Debugging
        // console.log(stateToHTML(editorState.getCurrentContent(), options));
    }


    changeView(event) {
        this.setState({
            showPreview: !this.state.showPreview,
            buttonViewText: !this.state.showPreview ?
                this.EDITING_ACTIONS.keepEditing
                : this.EDITING_ACTIONS.showPreview
        });
    }

    finishPublishing() {
        this.setState({
            showModal: false
        });

        const self = this;
        this.changeArticleData({
            draft: false,
        });
        this.props.history.push(URLS.ROUTES.dashboard);
    }

    initialPublishArticle() {
        // TODO: remove this and check if everything works
        /*const valid = validators.publishValidateArticleData(this.state.articleData, 'Can\'t publish yet');
         if (!valid.valid) {
         this.setState({
         errorMsg: valid.message
         });
         return false;
         }*/

        this.setState({
            showModal: true
        });
    }

    saveChanges(articleData) {
        this.setState({
            savingAction: this.SAVING_ACTIONS.savingChanges
        });
        const self = this;
        const waitAfterSave = (message) => setTimeout(function () {
            self.setState({
                savingAction: message
            });
        }, this.uiWaitTime / 2);

        console.log('here i am', articleData);
        API.editArticle({
            success: (response) => {
                waitAfterSave(self.SAVING_ACTIONS.changesSaved)
            },
            error: (error) => {
                waitAfterSave(self.SAVING_ACTIONS.errorSaving);
            },
            // Since we have made an edit to the article, we always want to
            // save the article as a draft until it is published or republished
            data: articleData
        });
    }

    changeArticleData(articleData) {
        if(!articleData.hasOwnProperty('draft')) {
            // Unless otherwise specified, all edits to the article
            // will be a draft. When we publish, we will specify that draft is false
            articleData.draft = true;
        }
        const mergedArticleData = _.merge(this.state.articleData, articleData);

        const valid = validators.prePublishValidateArticleData(mergedArticleData);
        if (!valid.valid) {
            this.setState({
                errorMsg: valid.message
            });
            return false;
        } else {
            this.setState({
                errorMsg: ''
            });
        }

        const self = this;
        waitBeforeCall(function () {
            self.saveChanges(mergedArticleData);
        }, this.uiWaitTime);

        this.setState({
            articleData: mergedArticleData
        });
    }

    handleInputChange(event) {
        const target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = event.target.name;

        this.changeArticleData({
            [name]: value
        });
    }

    changeCategoryAction(event) {
        if (this.state.addNewCategory) {
            this.setState({
                addNewCategory: !this.state.addNewCategory,
                categoryAction: this.CATEGORY_ACTIONS.newCategory,
                articleData: _.merge(this.state.articleData, {category: this.categoryInput.value})
            }, () => {
                // Only have access to this ref after state changes above
                this.changeArticleData({category: this.categorySelect.value});
            });
        } else {
            this.setState({
                addNewCategory: !this.state.addNewCategory,
                categoryAction: this.CATEGORY_ACTIONS.existingCategory
            }, () => {
                // Only have access to this ref after state changes above
                this.changeArticleData({category: this.categoryInput.value});
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.addNewCategory && this.state.addNewCategory) {
            // Since we just changed to adding a new category
            // erase old value and focus input
            this.categoryInput.value = '';
            this.categoryInput.focus();
        }
    }

    getArticleData() {
        const self = this;
        // make ajax call to get data
        API.getArticle({
            success: function (response) {
                // TODO: make this better
                if (response.status === 200) {
                    self.setState({
                        articleData: response.data,
                        editorState: getEditorStateFromRaw(response.data.body)
                    })
                }
            },
            error: function (error) {

            },
            params: {
                _id: self.props.match.params._id
            }
        });
    }

    componentDidMount() {
        if (!this.state.loading) {
            this.titleInput.focus();
        }

        if (this.props.match.params._id) {
            // TODO: go back to dashboard if there is no article with this _id
            this.getArticleData();
        }
    }

    getPreviewArticleData(articleData) {
        return _.merge(articleData,
            {body: JSONToHTML(articleData.body)});
    }

    render() {
        const self = this;
        return (
            !this.state.articleData ? <Loading/> :
                <div className="EditArticle">
                    <div id="modal"></div>
                    <PopUpModal
                        contentLabel="Final Details"
                        isOpen={this.state.showModal}
                        onRequestClose={() => self.setState({showModal: false})}
                        shouldCloseOnOverlayClick={true}
                        portalClassName="FinishPublishingModalPortal"
                        className="FinishPublishingModalContent"
                    >
                        <h4 className="title">Final Details</h4>
                        <div className="inner-content">
                            <div className="allow-comments">
                                <div class="pretty p-default p-round">
                                    <input type="checkbox"
                                           name="allowComments"
                                           onChange={this.handleInputChange}
                                           value={this.state.articleData.allowComments}
                                    />
                                    <div class="state p-primary-o">
                                        <label className="label">Allow comments for this article?</label>
                                    </div>
                                </div>
                            </div>
                            <div className="placement">
                                <label>Where do you want it placed?</label>
                                <select name="placement"
                                        className="placement"
                                        value={this.state.placement}
                                        onChange={this.handleInputChange}
                                >
                                    <option value="featured">featured</option>
                                    <option value="carousel">carousel</option>
                                    <option value="none">none</option>
                                </select>
                                <ul>
                                    <li>Put "none" if you don't want it to show up on the home page</li>
                                    <li>"carousel" if you want it to show up on the slider on the home page</li>
                                    <li>"featured" if you want it to show up in the featured section on the home page</li>
                                </ul>
                            </div>
                            <button onClick={this.finishPublishing}>Finish publishing</button>
                        </div>
                    </PopUpModal>
                    <div className="edit-article-container">
                        <input className="title-input" type="text"
                               placeholder="What is the article title?"
                               ref={(input) => {
                                   this.titleInput = input;
                               }}
                               name="title"
                               onChange={this.handleInputChange}
                               value={this.state.articleData.title}
                        />
                        <div className="showcase-image-wrapper">
                            <input className="showcase-image-input"
                                   type="text"
                                   placeholder="Enter the url for the image that will go at the top of the article"
                                   name="showcaseImage"
                                   onChange={this.handleInputChange}
                                   value={this.state.articleData.showcaseImage}
                            />
                            {
                                validators.checkImageUrl(this.state.articleData.showcaseImage) ?
                                    <img className="image-preview" src={this.state.articleData.showcaseImage}/> : null
                            }
                        </div>
                        <div className="category-control">
                            {
                                !this.state.addNewCategory ?
                                    <div>
                                        <label className="category-select-label">Choose an existing category</label>
                                        <select className="category-select"
                                                name="category"
                                                ref={(select) => {
                                                    this.categorySelect = select
                                                }}
                                                value={this.state.category} /*Select 1st by default*/
                                                onChange={this.handleInputChange}
                                        >
                                            <option value="Option 1">Option 1</option>
                                            <option value="Option 2">Option 2</option>
                                            <option value="Option 3">Option 3</option>
                                        </select>
                                    </div> :
                                    <input className="category-input" type="text"
                                           placeholder="Add new category"
                                           ref={(input) => {
                                               this.categoryInput = input
                                           }}
                                           name="category"
                                           onChange={this.handleInputChange}
                                           value={this.state.articleData.category}
                                    />
                            }
                            <button onClick={this.changeCategoryAction}>{this.state.categoryAction}</button>
                        </div>
                        <div className="editor-controls">
                            <button onClick={this.changeView} className="view-button">
                                <img src={previewIcon} alt=""/>
                                <span>{this.state.buttonViewText}</span>
                            </button>

                            <button onClick={this.initialPublishArticle} className="publish-article">
                                <img src={publishIcon}/>
                                <span>Publish article</span>
                            </button>
                            <div className="saving-actions">
                                {this.state.savingAction}
                            </div>
                            <div className="error-msg">
                                {this.state.errorMsg}
                            </div>
                        </div>
                        {
                            !this.state.showPreview ?
                                <div className="editing">
                                    <MegadraftEditor
                                        editorState={this.state.editorState}
                                        onChange={this.onEditorChange}
                                    />
                                </div>
                                : null
                        }
                    </div>
                    {
                        this.state.showPreview ? <div className="preview">
                            <ArticleContent preview={this.state.showPreview}
                                            articleData={this.getPreviewArticleData(this.state.articleData)}/>
                        </div> : null
                    }
                </div>
        );
    }
}

export default withRouter(EditArticle);
