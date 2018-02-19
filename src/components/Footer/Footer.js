import React, {Component} from "react";
import "./Footer.less";
import SocialShare from "../SocialShare/SocialShare";

class Footer extends Component {
    render() {
        return (
            <footer className="Footer" ref={(footer) => this.footer = footer}>
                <div className="push-down-div" ref={(pushDownDiv) => this.pushDownDiv = pushDownDiv}></div>
                <div className="footer-container">
                    <div className="site-link-row">
                        <div className="column">
                            <div className="title-wrapper">
                                <div className="title">About
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <div className="list">
                                <div><a href="https://www.linkedin.com/in/danielevans11/">Created by Daniel Evans</a></div>
                                <div>
                                    Icons by <a href="https://www.flaticon.com/authors/rami-mcmin">Dave G</a>, <a
                                    href="https://www.flaticon.com/authors/linh-pham">Linh P</a>, <a
                                    href="https://www.flaticon.com/authors/rami-mcmin">Rami M</a>, and <a
                                    href="http://www.freepik.com">FreePik</a>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="title-wrapper">
                                <div className="title">Get Politics In Vogue delivered to your inbox
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <div className="list">
                                <div className="footer-input">
                                    <input type="text"
                                           placeholder="Your Email Address Here"/>
                                    <button>Subscribe</button>
                                </div>
                            </div>
                        </div>
                        <div className="column social-media">
                            <div className="title-wrapper">
                                <div className="title">Share on Social Media
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <div className="social-media-list">
                                <SocialMediaList/>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

}

const SocialMediaList = (props) => {
    const socialMediaList = [
        ['facebook', 'twitter'],
        ['pinterest', 'linkedin'],
    ];
    let key = 0;
    return (
        socialMediaList.map(function (socialMedia) {
            return (
                <div key={key}>
                    {Array.from(new Array(socialMedia.length), (val, index) => index).map((index) => {
                        key++;
                        return (
                            <SocialShare type={socialMedia[index]} key={key} transitionType='float'/>
                        )
                    })}
                </div>
            )
        })
    )
}

export default Footer;
