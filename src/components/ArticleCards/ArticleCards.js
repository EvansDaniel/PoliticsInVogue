import React, {Component} from 'react';
import './ArticleCards.less'
import ArticleBlock from "../ArticleBlock/ArticleBlock";
import ArticleCard from "../ArticleCard/ArticleCard";

class ArticleCards extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        const articleCards = [
            {
                img: 'https://2.bp.blogspot.com/-AuLlxJCRk3M/WkE3m_0uD6I/AAAAAAAAbWU/24a0ToPfPVY-kiaFvQQxm6HvesO0nNAJgCLcBGAs/s1600/xmas2.jpg',
                className: 'big-card'
            },
            {
                img: 'https://4.bp.blogspot.com/-inamSa3r4BU/Wi2DmCoN4uI/AAAAAAAAWRc/MGw7YcJShkwIkgG5piMJZ6aIX9kFy_-_wCLcBGAs/s1600/haters%2Band%2Btrolls%25C2%25A7.jpg',
                className: 'small-card'
            },
            {
                img: 'https://2.bp.blogspot.com/-Zl51OC3SQeg/Wi12WesRjrI/AAAAAAAAWRE/AYQlVV_ZpQksoWU1AGzccecrGthEYvSxgCEwYBhgL/s1600/radley%25C2%25A7.jpg',
                className: 'small-card'
            },
            {
                img: 'https://1.bp.blogspot.com/-Qur9SQCqPd0/WiR00hpwxcI/AAAAAAAASIE/TPWvxMliwTgCELxHfm5AMtl7Y83iSer3gCLcBGAs/s1600/girls%2Bnight%2Bin1.jpg',
                className: 'small-card'
            },
            {
                img: 'https://4.bp.blogspot.com/-xI1_GMIS7wo/Wh8jBE194BI/AAAAAAAARk8/QYQE6-8MHUgxyoNDnou7X8zosL7f5SOeQCEwYBhgL/s1600/dune%2Bparty2.jpg',
                className: 'small-card'
            },
            {
                img: 'https://4.bp.blogspot.com/-xI1_GMIS7wo/Wh8jBE194BI/AAAAAAAARk8/QYQE6-8MHUgxyoNDnou7X8zosL7f5SOeQCEwYBhgL/s1600/dune%2Bparty2.jpg',
                className: 'big-card'
            }
        ];
        return (
            <div className="ArticleCards">
                {
                    articleCards.map(function (card) {
                        return (
                            <ArticleCard url={card.img}
                                         className={card.className}
                            />
                        );
                    })
                }
            </div>
        );
    }
}

export default ArticleCards;
