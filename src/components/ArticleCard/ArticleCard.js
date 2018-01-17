import React, {Component} from 'react';
import './ArticleCard.less';
import {Link} from 'react-router-dom';

class ArticleCard extends Component {
    componentDidMount() {

    }

    render() {
        const style = {
            'backgroundImage': `url('${this.props.url}')`,
        };
        return (
            <div className={`ArticleCard ${this.props.className}`} style={style}>
                <Link to="/">
                    <div className="article-info">
                        <div>
                            <div>
                                <div className="article-name">Why do I turn into a child when I'm home for Christmas</div>
                                <div className="article-date">25 Dec 2017</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ArticleCard;