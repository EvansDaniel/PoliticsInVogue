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

    render() {
        return (
            <div className="Comments">
                <div className="fb-comments" data-href="http://www.politicsinvogue.com" data-width="100%">
                </div>
            </div>
        );
    }
}

export default Comments;
