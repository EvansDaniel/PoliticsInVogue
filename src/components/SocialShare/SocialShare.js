import React, {Component} from "react";
import "./SocialShare.less";
import bluePinterestIcon from "../../../src/img/pinterest.svg";
import whitePinterestIcon from "../../../src/img/pinterest-white.svg";
import blueFbIcon from "../../../src/img/facebook-app-symbol.svg";
import whiteFbIcon from "../../../src/img/facebook-white.svg";
import blueLinkedinIcon from "../../../src/img/linkedin-logo.svg";
import whiteLinkedinIcon from "../../../src/img/linkedin-white.svg";
import blueEmailIcon from "../../../src/img/email.svg";
import whiteEmailIcon from "../../../src/img/email-white.svg";
import blueTwitterIcon from "../../../src/img/twitter.svg";
import whiteTwitterIcon from "../../../src/img/twitter-white.svg";

import PropTypes from "prop-types";
import queryString from "query-string";
const CONSTANTS = require('../../shared/constants');

class SocialShare extends Component {
    constructor(props) {
        super(props);
        this.twitterShare = this.twitterShare.bind(this);
        this.linkedinShare = this.linkedinShare.bind(this);
        let icons = props.icons;
        icons = icons || {};
        this.socialMedias = {
            'pinterest': {
                icon: icons.pinterest === 'white' ? whitePinterestIcon : bluePinterestIcon,
                shareFunc: this.pinterestShare,
                fontAwesomeHTML: <i className="fa fa-pinterest" aria-hidden="true" onClick={this.pinterestShare}></i>
            },
            'email': {
                icon: icons.email === 'white' ? whiteEmailIcon : blueEmailIcon,
                shareFunc: () => {return false;},
            },
            'facebook': {
                icon: icons.facebook === 'white' ? whiteFbIcon : blueFbIcon,
                shareFunc: this.facebookShare,
                fontAwesomeHTML: <i className="fa fa-facebook" aria-hidden="true" onClick={this.facebookShare}></i>
            },
            'twitter': {
                icon: icons.twitter === 'white' ? whiteTwitterIcon : blueTwitterIcon,
                shareFunc: this.twitterShare,
                fontAwesomeHTML: <i className="fa fa-twitter" aria-hidden="true" onClick={this.twitterShare}></i>
            },
            'linkedin': {
                icon: icons.linkedin === 'white' ? whiteLinkedinIcon : blueLinkedinIcon,
                shareFunc: this.linkedinShare,
            },
        };
    }

    componentDidMount() {
        // TODO: add notifications as optional, perhaps when a user subscribes or when the user shares a post
    }

    twitterShare() {
        const articleData = this.props.articleData;
        const baseShareUrl = 'https://twitter.com/intent/tweet';
        const queryParams = {
            url: window.encodeURI(window.location.href),
            text: `${(articleData && articleData.title + ' by Sophie Clark') 
            || 'Politics In Vogue - A politics, fashion, and opinions blog by Sophie Clark'}`,
            hashtags: `politicsinvogue,${(articleData && articleData.categoryName) || 'politics, fashion'}`,
            via: 'politicsinvogue',
        };
        window.open(`${baseShareUrl}?${queryString.stringify(queryParams)}`);
    }

    pinterestShare() {
        window.PinUtils.pinAny();
    }

    linkedinShare() {
        const articleData = this.props.articleData;
        const baseShareUrl = 'https://www.linkedin.com/shareArticle';
        const queryParams = {
            url: window.encodeURI(window.location.href),
            title: `${(articleData && articleData.title + ' by Sophie Clark') || 'FashionInVogue'}`,
            // summary: 'my description', TODO: include this maybe?
            mini: true,
            source: window.encodeURI(window.location.hostname)
        };
        const url = `${baseShareUrl}?${queryString.stringify(queryParams)}`;
        window.open(url);
    }

    facebookShare() {
        // TODO: get app id
        window.FB.ui({
            app_id: CONSTANTS.FB_APP_ID,
            method: 'share',
            display: 'popup',
            href: 'http://www.politicsinvogue.com'
        }, function (response) {
            console.log('FB share response', response);
        });
    }

    render() {
        const socialMedia = this.socialMedias[this.props.type];
        // TODO: linkedin and email do not have this icon stuff yet
        if(this.props.fontAwesome) {
            return (
                socialMedia.fontAwesomeHTML
            );
        } else {
            return (
                <div className={`SocialShare ${this.props.transitionType}`}
                     onClick={socialMedia.shareFunc}>
                    <img src={socialMedia.icon} alt="Social Media"/>
                </div>
            );
        }
    }
}

SocialShare.defaultProps = {
    // TODO: write custom validator
    transitionType: 'float',
    fontAwesome: false
};

SocialShare.propTypes = {
    // TODO: write custom validator
    type: PropTypes.string.isRequired,
    articleData: PropTypes.object,
    transitionType: PropTypes.string,
    fontAwesome: PropTypes.bool
};


export default SocialShare;
