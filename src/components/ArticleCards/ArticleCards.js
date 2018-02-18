import React, {Component} from "react";
import "./ArticleCards.less";
import ArticleCard from "../ArticleCard/ArticleCard";

class ArticleCards extends Component {
    constructor(props) {
        super(props);

        this.bigCardClass = 'big-card';
        this.smallCardClass = 'small-card';
    }

    componentDidMount() {

    }

    generateCardLayoutJSON(cardData) {
        const len = cardData.length;
        let multipleSizeLayout = [this.bigCardClass, this.smallCardClass, this.smallCardClass];
        if(len % 3 !== 0 || len < 6) {
            return cardData.map((card) => {
                card.className = this.bigCardClass;
                return card;
            });
        } else {
            for(let i = 0; i < len; ) {
                for(let k = 0; k < multipleSizeLayout.length; k++) {
                    cardData[i].className = multipleSizeLayout[k];
                    cardData[i].id = i++;
                }
                multipleSizeLayout = multipleSizeLayout.reverse();
            }
            return cardData;
        }
    }

    render() {
        const cardsData = this.generateCardLayoutJSON(this.props.cardsData);
        return (
            /* TODO: Need to check styling when we have 1, 2, 3, 4, 5, and 6 cards */
            <div className="ArticleCards">
                <div className="section-name">{this.props.sectionName}</div>
                {
                    cardsData.map(function (cardData, i) {
                        return (
                            <ArticleCard key={i} cardData={cardData}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default ArticleCards;
