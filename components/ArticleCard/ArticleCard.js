import React, {Component} from 'react';
import './ArticleCard.less'

class ArticleCard extends Component {
    componentDidMount() {

    }

    render() {
        const style = {
            'background-image': `url('${this.props.url}')`,
        };
        return (
            <div className={`ArticleCard ${this.props.className}`} style={style}>
                <a href="">
                    <div className="article-info">
                        <div>
                        <div>
                        <div className="article-name">Why do I turn into a child when I'm home for Christmas</div>
                        <div className="article-date">25 Dec 2017</div>
                        </div>
                        </div>
                    </div>
                </a>
            </div>
        );
    }
}

export default ArticleCard;