import React, {Component} from 'react';
import './Comments.less'
import fbIcon from '../../../src/img/facebook-app-symbol.svg';
import pinIcon from '../../../src/img/pinterest.svg';
import linkedinIcon from '../../../src/img/linkedin-logo.svg';
import twitterIcon from '../../../src/img/twitter.svg';
import emailIcon from '../../../src/img/email.svg';
const CONSTANTS = require('../../shared/constants');

class Comments extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: CONSTANTS.FB_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.11'
            });
        };

        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        console.log('did mount');
    }

    /*componentDidUpdate() {
        console.log('did update');
        window.FB.XFBML.parse();
    }*/

    render() {
        const tabs = [
            {name: 'Facebook', icon: fbIcon, className: 'fb'},
            {name: 'Twitter', icon: twitterIcon, className: 'tweet'},
            {name: 'LinkedIn', icon: linkedinIcon, className: 'link'},
        ];
        const iconHeight = 25;
        return (
            <div className="Comments">
                <div className="create-comment">
                    <div className="fb-comments" data-href="https://www.google.com" data-width="100%">
                    </div>
                </div>
            </div>
        );
    }
}

export default Comments;
