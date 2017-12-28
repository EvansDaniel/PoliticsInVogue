import React, {Component} from 'react';
import './Comments.less'
import fbIcon from '../../../src/img/facebook-app-symbol.svg';
import pinIcon from '../../../src/img/pinterest.svg';
import linkedinIcon from '../../../src/img/linkedin-logo.svg';
import twitterIcon from '../../../src/img/twitter.svg';
import emailIcon from '../../../src/img/email.svg';
import renderHTML from 'react-render-html';

class Comments extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    render() {
        const tabs = [
            {name: 'Facebook', icon: fbIcon, className: 'fb'},
            {name: 'Twitter', icon: twitterIcon, className: 'tweet'},
            {name: 'LinkedIn', icon: linkedinIcon, className: 'link'},
        ];
        const iconHeight = 25;
        return (
            <div className="Comments">
                <div className="tabs">
                    {
                        tabs.map(function (tab) {
                           return (
                               <div className={`tab ${tab.className}`}>
                                   <img src={tab.icon}
                                        className="icon"
                                        height={iconHeight} alt=""/>
                                   <div className="name">{tab.name}</div>
                               </div>
                           );
                        })
                    }
                </div>
                <div className="create-comment">
                    <div className="fb-comments" data-href="http://www.fashionslave.co.uk/search/label/sex%20%26%20love?max-results=6" data-width="100%" data-numposts="10"></div>
                </div>
            </div>
        );
    }
}

const FacebookCommentSection = (props) => {
    return (
        <div class="fb-comments" data-href="http://www.fashionslave.co.uk/search/label/sex%20%26%20love?max-results=6" data-width="100%" data-numposts="10"></div>
    );
};

export default Comments;
