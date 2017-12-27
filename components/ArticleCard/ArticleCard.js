import React, {Component} from 'react';
import './ArticleCard.less'

class ArticleCard extends Component {
    componentDidMount() {

    }

    render() {
        const imgUrl = 'https://3.bp.blogspot.com/-payJOzdVdME/WjD1Nyg5znI/AAAAAAAAXTE/FZ3My_xkbtc1u5DsX8u3nFm8TDAA6UY_ACLcBGAs/s1600/cindy%2Bkimberly3.jpg';
        const backgroundImgStyle = {
            'background-image': `url('${imgUrl}')`
        };
        return (
            <div className="ArticleCard" style={backgroundImgStyle}>

            </div>
        );
    }
}

export default ArticleCard;