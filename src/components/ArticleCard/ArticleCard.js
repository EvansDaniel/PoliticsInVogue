import React, {Component} from 'react';
import './ArticleCard.less';
import {Link} from 'react-router-dom';

class ArticleCard extends Component {
    componentDidMount() {

    }

    render() {
        const cardData = this.props.cardData;
        const style = {
            'backgroundImage': `url('${cardData.showcaseImage}')`,
        };
        return (
            <div className={`ArticleCard ${cardData.className}`} style={style}>
                <Link to="/">
                    <div className="article-info">
                        <div>
                            <div>
                                <div className="article-name">{cardData.title}</div>
                                <div className="article-date">May 25 2017</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ArticleCard;