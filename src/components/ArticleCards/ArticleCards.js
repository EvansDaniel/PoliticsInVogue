import React, {Component} from 'react';
import './ArticleCards.less'
import ArticleBlock from "../ArticleBlock/ArticleBlock";
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
        let articleCards = [
            {
                showcaseImage: 'https://2.bp.blogspot.com/-AuLlxJCRk3M/WkE3m_0uD6I/AAAAAAAAbWU/24a0ToPfPVY-kiaFvQQxm6HvesO0nNAJgCLcBGAs/s1600/xmas2.jpg',
                className: 'big-card',
                title: 'Title',
                id: 1
            },
            {
                showcaseImage: 'https://4.bp.blogspot.com/-inamSa3r4BU/Wi2DmCoN4uI/AAAAAAAAWRc/MGw7YcJShkwIkgG5piMJZ6aIX9kFy_-_wCLcBGAs/s1600/haters%2Band%2Btrolls%25C2%25A7.jpg',
                className: 'small-card',
                title: 'Title',
                id: 2
            },
            {
                showcaseImage: 'https://2.bp.blogspot.com/-Zl51OC3SQeg/Wi12WesRjrI/AAAAAAAAWRE/AYQlVV_ZpQksoWU1AGzccecrGthEYvSxgCEwYBhgL/s1600/radley%25C2%25A7.jpg',
                className: 'small-card',
                title: 'Title',
                id: 3
            },
            {
                showcaseImage: 'https://1.bp.blogspot.com/-Qur9SQCqPd0/WiR00hpwxcI/AAAAAAAASIE/TPWvxMliwTgCELxHfm5AMtl7Y83iSer3gCLcBGAs/s1600/girls%2Bnight%2Bin1.jpg',
                className: 'small-card',
                title: 'Title',
                id: 4
            },
            {
                showcaseImage: 'https://4.bp.blogspot.com/-xI1_GMIS7wo/Wh8jBE194BI/AAAAAAAARk8/QYQE6-8MHUgxyoNDnou7X8zosL7f5SOeQCEwYBhgL/s1600/dune%2Bparty2.jpg',
                className: 'small-card',
                title: 'Title',
                id: 5
            },
            {
                showcaseImage: 'https://4.bp.blogspot.com/-xI1_GMIS7wo/Wh8jBE194BI/AAAAAAAARk8/QYQE6-8MHUgxyoNDnou7X8zosL7f5SOeQCEwYBhgL/s1600/dune%2Bparty2.jpg',
                className: 'big-card',
                title: 'Title',
                id: 6
            },
            {
                showcaseImage: 'https://4.bp.blogspot.com/-xI1_GMIS7wo/Wh8jBE194BI/AAAAAAAARk8/QYQE6-8MHUgxyoNDnou7X8zosL7f5SOeQCEwYBhgL/s1600/dune%2Bparty2.jpg',
                className: 'big-card',
                title: 'Title',
                id: 5
            },
            {
                showcaseImage: 'https://4.bp.blogspot.com/-xI1_GMIS7wo/Wh8jBE194BI/AAAAAAAARk8/QYQE6-8MHUgxyoNDnou7X8zosL7f5SOeQCEwYBhgL/s1600/dune%2Bparty2.jpg',
                className: 'small-card',
                title: 'Title',
                id: 6
            },
            {
                showcaseImage: 'https://4.bp.blogspot.com/-xI1_GMIS7wo/Wh8jBE194BI/AAAAAAAARk8/QYQE6-8MHUgxyoNDnou7X8zosL7f5SOeQCEwYBhgL/s1600/dune%2Bparty2.jpg',
                className: 'small-card',
                title: 'Title',
                id: 6
            },{
                showcaseImage: 'https://1.bp.blogspot.com/-Qur9SQCqPd0/WiR00hpwxcI/AAAAAAAASIE/TPWvxMliwTgCELxHfm5AMtl7Y83iSer3gCLcBGAs/s1600/girls%2Bnight%2Bin1.jpg',
                className: 'small-card',
                title: 'Title',
                id: 4
            },
            {
                showcaseImage: 'https://4.bp.blogspot.com/-xI1_GMIS7wo/Wh8jBE194BI/AAAAAAAARk8/QYQE6-8MHUgxyoNDnou7X8zosL7f5SOeQCEwYBhgL/s1600/dune%2Bparty2.jpg',
                className: 'small-card',
                title: 'Title',
                id: 5
            },
            {
                showcaseImage: 'https://4.bp.blogspot.com/-xI1_GMIS7wo/Wh8jBE194BI/AAAAAAAARk8/QYQE6-8MHUgxyoNDnou7X8zosL7f5SOeQCEwYBhgL/s1600/dune%2Bparty2.jpg',
                className: 'big-card',
                title: 'Title',
                id: 6
            }
        ];
        const cardsData = this.generateCardLayoutJSON(this.props.cardsData);
        return (
            /* TODO: Need to check styling when we have 1, 2, 3, 4, 5, and 6 cards */
            <div className="ArticleCards">
                <div className="section-name">{this.props.sectionName}</div>
                {
                    cardsData.map(function (cardData) {
                        return (
                            <ArticleCard key={cardData.id} cardData={cardData}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default ArticleCards;
