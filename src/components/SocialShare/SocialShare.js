import React, {Component} from "react";
import "./SocialShare.less";
import fbIcon from "../../../src/img/facebook-app-symbol.svg";
import pinIcon from "../../../src/img/pinterest.svg";
import linkedinIcon from "../../../src/img/linkedin-logo.svg";
import twitterIcon from "../../../src/img/twitter.svg";
import emailIcon from "../../../src/img/email.svg";
import PropTypes from "prop-types";
import queryString from "query-string";
const CONSTANTS = require('../../shared/constants');

class SocialShare extends Component {
    constructor(props: {}) {
        super(props);
        this.twitterShare = this.twitterShare.bind(this);
        this.linkedinShare = this.linkedinShare.bind(this);
        this.socialMedias = {
            'pinterest': {
                icon: pinIcon,
                shareFunc: this.pinterestShare,
                fontAwesomeHTML: <i className="fa fa-pinterest" aria-hidden="true" onClick={this.pinterestShare}></i>
            },
            'email': {
                icon: emailIcon,
                shareFunc: () => {return false;},
            },
            'facebook': {
                icon: fbIcon,
                shareFunc: this.facebookShare,
                fontAwesomeHTML: <i className="fa fa-facebook" aria-hidden="true" onClick={this.facebookShare}></i>
            },
            'twitter': {
                icon: twitterIcon,
                shareFunc: this.twitterShare,
                fontAwesomeHTML: <i className="fa fa-twitter" aria-hidden="true" onClick={this.twitterShare}></i>
            },
            'linkedin': {
                icon: linkedinIcon,
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
            text: `${articleData && articleData.title + ' by Sophie Clark' 
            || 'Politics In Vogue - A politics, fashion, and opinions blog by Sophie Clark'}`,
            hashtags: `politicsinvogue,${articleData && articleData.categoryName || 'politics, fashion'}`,
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
            title: `${articleData && articleData.title + ' by Sophie Clark' || 'FashionInVogue'}`,
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
                    <img src={socialMedia.icon}/>
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
