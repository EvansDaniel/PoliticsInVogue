import React, {Component} from 'react';
import './AlternatingArticleBlock.less'

class AlternatingArticleBlock extends Component {
	constructor(props) {
        super(props);
        this.readArticle = this.readArticle.bind(this);
    }

    componentDidMount() {

    }

    readArticle(url) {
        this.props.history.push(url);
    }

    render() {
	    const classNames = [];
	    for(let i = 0; i < 5; i++) {
	        i % 2 === 0 ? classNames.push('') : classNames.push('reverse');
        }
        return (
            <div className="AlternatingArticleBlock">
                {
                    classNames.map(function (name) {
                        return (
                            <SideBySideArticleBlock orientation={name}/>
                        )
                    })
                }
            </div>
        );
    }
}

const SideBySideArticleBlock = (props) => {
    return (
        <div className="SideBySideArticleBlock">
            <div className="category-wrapper">
                <div className={`article-flip ${props.orientation}`}>
                    <div className="article-info">
                        <div className="title">WHY DO I TURN INTO A CHILD WHEN I'M HOME FOR CHRISTMAS?</div>
                        <div className="date">25/12/2017</div>
                        {/*<div className="excerpt">dsfhsd hsdjkh fdsfhsd hsdjkh fdsfhsd hsdjkh fdsfhsd hsdjkh f</div>*/}
                        <button className="read-article-button" onClick={this.readArticle}>Read Article</button>
                    </div>
                    <div className="article-image">
                        <div className="image-content">
                            <div className="excerpt">
                                I am such a child, and I f**king love it. Can't wait to be home this Christmas
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlternatingArticleBlock;
