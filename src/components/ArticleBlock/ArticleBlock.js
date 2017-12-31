import React, {Component} from 'react';
import './ArticleBlock.less'

class ArticleBlock extends Component {
	constructor(props) {
        super(props);
        
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="ArticleBlock">
                <div className="img-block">
                    <img src="https://images.taboola.com/taboola/image/fetch/f_jpg%2Cq_auto%2Ch_80%2Cw_120%2Cc_fill%2Cg_faces:auto%2Ce_sharpen/https%3A//tctechcrunch2011.files.wordpress.com/2017/05/kuri-bot.gif" alt=""/>
                    {/*TODO: determine if this is necessary*/}
                    <div>12 min read</div>
                </div>
                <div className="excerpt">Hands up if you have a bit of a bad habit of sticking to wearing jeans and jumpers in the winter? Yes, I'm right there with you</div>
            </div>
        );
    }
}

export default ArticleBlock;
