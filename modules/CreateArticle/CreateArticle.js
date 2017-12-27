import React, {Component} from 'react';
import './CreateArticle.less'
import CKEditor from 'react-ckeditor-component';
import $ from 'jquery';
import Article from '../../modules/Article/Article';
import _ from 'lodash';
import {waitBeforeCall} from '../../shared/utils';


class CreateArticle extends Component {

    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.changeView = this.changeView.bind(this);
        this.publishArticle = this.publishArticle.bind(this);

        this.SAVING_ACTIONS = {
            changesSaved: 'All changes saved',
            savingChanges: 'Saving latest changes...',
        };

        this.EDITING_ACTIONS = {
            showPreview: 'Show preview',
            keepEditing: 'Keep editing'
        };

        this.state = {
            showPreview: false,
            buttonViewText: 'Show preview',
            savingAction: this.SAVING_ACTIONS.changesSaved,
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
        if(event.editor) {
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
                <input className="category-input" type="text"
                       placeholder="What is the article category?"
                       name="category"
                       onChange={this.handleInputChange}
                       value={this.state.articleData.category}
                />
                <div className="editor-controls">
                    <button onClick={this.changeView} className="view-button">
                        {this.state.buttonViewText}
                    </button>

                    {/*<button onClick={this.changeView} className="upload-image-button">
                        Upload image
                    </button>*/}

                    <button onClick={this.publishArticle} className="save-as-draft-button">
                        Publish article
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