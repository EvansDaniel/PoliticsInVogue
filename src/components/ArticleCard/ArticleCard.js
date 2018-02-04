import React, {Component} from 'react';
import './ArticleCard.less';
import {Link} from 'react-router-dom';
import URLS from '../../shared/urls';

class ArticleCard extends Component {
    componentDidMount() {

    }

    render() {
        // article data for the card
        const cardData = this.props.cardData;
        const style = {
            'backgroundImage': `url('${cardData.showcaseImage}')`,
        };
        console.log(cardData);
        return (
            <div className={`ArticleCard ${cardData.className}`} style={style}>
                <Link to={{
                    pathname: URLS.transform(URLS.ROUTES.article, {
                        articleSlug: cardData.articleSlug, year: cardData.year, month: cardData.month
                    })
                }}
                >
                    <div className="article-info">
                        <div>
                            <div>
                                <div className="article-name">{cardData.title}</div>
                                <div className="article-date">{new Date(cardData.createdAt).toDateString()}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default ArticleCard;