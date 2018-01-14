import React, {Component} from 'react';
import './CreateArticle.less'
import CKEditor from 'react-ckeditor-component';
import $ from 'jquery';
import Article from '../../modules/Article/Article';
import _ from 'lodash';
import {waitBeforeCall} from '../../shared/utils';
import previewIcon from '../../../src/img/preview.svg';
import publishIcon from '../../../src/img/publish.svg';


class CreateArticle extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeView = this.changeView.bind(this);
        this.publishArticle = this.publishArticle.bind(this);
        this.changeCategoryAction = this.changeCategoryAction.bind(this);

        this.SAVING_ACTIONS = {
            changesSaved: 'All changes saved',
            savingChanges: 'Saving latest changes...',
        };

        this.EDITING_ACTIONS = {
            showPreview: 'Show preview',
            keepEditing: 'Keep editing'
        };

        this.CATEGORY_ACTIONS = {
            existingCategory: 'or add to existing category',
            newCategory: 'or add to new category'
        };

        this.state = {
            showPreview: false,
            buttonViewText: 'Show preview',
            savingAction: this.SAVING_ACTIONS.changesSaved,
            addNewCategory: false,
            categoryAction: this.CATEGORY_ACTIONS.newCategory,
            articleData: {
                body: '',
                title: '',
                datePublished: '',
                category: ''
            }
        };
    }

    changeView(event) {
        this.setState({
            showPreview: !this.state.showPreview,
            buttonViewText: !this.state.showPreview ?
                this.EDITING_ACTIONS.keepEditing
                : this.EDITING_ACTIONS.showPreview
        });
    }

    publishArticle() {

    }

    saveChanges(articleData) {
        this.setState({
            savingAction: this.SAVING_ACTIONS.savingChanges
        });
        const self = this;
        setTimeout(function () {
            self.setState({
                savingAction: self.SAVING_ACTIONS.changesSaved
            });
        }, 1000);
    }

    handleInputChange(event) {
        let name = null, value = null;
        if (event.editor) {
            value = event.editor.getData();
            name = 'body';
        } else {
            value = event.target.value;
            name = event.target.name;
        }

        const articleData = _.merge(this.state.articleData, {
            [name]: value
        });

        const self = this;
        waitBeforeCall(function () {
            self.saveChanges(articleData);
        }, 1000);

        this.setState({
            articleData: articleData
        });
    }

    changeCategoryAction(event) {
        if(this.state.addNewCategory) {
            this.setState({
                addNewCategory: !this.state.addNewCategory,
                categoryAction: this.CATEGORY_ACTIONS.newCategory
            });
        } else {
            this.setState({
                addNewCategory: !this.state.addNewCategory,
                categoryAction: this.CATEGORY_ACTIONS.existingCategory
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(!prevState.addNewCategory && this.state.addNewCategory) {
            // Since we just changed to adding a new category
            // erase old value and focus input
            this.categoryInput.value = '';
            this.categoryInput.focus();
        }
    }

    buildDate() {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    }

    componentDidMount() {
        this.titleInput.focus();
    }

    render() {
        return (
            <div className="CreateArticle">
                <input className="title-input" type="text"
                       placeholder="What is the article title?"
                       ref={(input) => {
                           this.titleInput = input;
                       }}
                       name="title"
                       onChange={this.handleInputChange}
                       value={this.state.articleData.title}
                />
                <input className="showcase-image-input"
                       type="text"
                       placeholder="Enter the url for the main article image. This will appear at the top of the article"
                       name="showcaseImage"
                       value={this.state.articleData.showcaseImage}
                />
                <div className="category-control">
                    {
                     !this.state.addNewCategory ?
                    <div>
                        <label className="category-select-label">Choose an existing category</label>
                        <select className="category-select">
                            <option value="">Option 1</option>
                            <option value="">Option 2</option>
                            <option value="">Option 3</option>
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

                    {/*<button onClick={this.changeView} className="upload-image-button">
                     Upload image
                     </button>*/}

                    <button onClick={this.publishArticle} className="save-as-draft-button">
                        <img src={publishIcon}/>
                        <span>Publish article</span>
                    </button>
                    <div className="saving-actions">
                        {this.state.savingAction}
                    </div>
                </div>
                {
                    !this.state.showPreview ?
                        < div className="editing">
                            <CKEditor activeClass="editor"
                                      content={this.state.articleData.body}
                                      config={{height: this.state.editorHeight}}
                                      events={{
                                          "change": this.handleInputChange
                                      }}
                            />
                        </div>
                        :
                        <div className="preview">
                            <Article articleData={this.state.articleData}/>
                        </div>
                }
            </div>
        );
    }
}

export default CreateArticle;