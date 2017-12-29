import React, {Component} from 'react';
import './SocialMediaBlock.less'
import fbIcon from '../../../src/img/facebook-app-symbol.svg';
import pinIcon from '../../../src/img/pinterest.svg';
import linkedinIcon from '../../../src/img/linkedin-logo.svg';
import twitterIcon from '../../../src/img/twitter.svg';
import emailIcon from '../../../src/img/email.svg';

class SocialMediaBlock extends Component {
    constructor(props) {
        super(props);
        this.facebookShare = this.facebookShare.bind(this);
    }

    componentDidMount() {

    }

    facebookShare() {
        window.FB.ui({
            method: 'share',
            display: 'popup',
            href: 'https://developers.facebook.com/docs/'
        }, function(response){});
    }

    render() {
        const iconHeight = 25;
        const socialMediaObjs = [
            {icon: twitterIcon, func: this.facebookShare},
            {icon: fbIcon, func: this.facebookShare},
            {icon: emailIcon, func: this.facebookShare},
            {icon: linkedinIcon, func: this.facebookShare},
            {icon: pinIcon, func: this.facebookShare}
        ];
        return (
            <div className="SocialMediaBlock">
                {
                    socialMediaObjs.map(function (socialMediaObj) {
                        return (
                            <div onClick={socialMediaObj.func}>
                                <img src={socialMediaObj.icon} height={iconHeight}/>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default SocialMediaBlock;
