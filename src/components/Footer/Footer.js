import React, {Component} from "react";
import "./Footer.less";
import {Link} from 'react-router-dom';
import SocialShare from "../SocialShare/SocialShare";
import $ from 'jquery';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.fixPushDownDivHeight = this.fixPushDownDivHeight.bind(this);
    }

    fixPushDownDivHeight() {
        /*const pushDownDivHeight = window.innerHeight - this.footer.clientHeight - this.footer.offsetTop;
        console.log(this.footer.getBoundingClientRect());
        console.log(window.innerHeight, this.footer.clientHeight, this.footer.offsetTop, pushDownDivHeight);
        if(pushDownDivHeight > 0) {
            this.pushDownDiv.style.height = pushDownDivHeight + 'px';
        }

        if (window.innerHeight > this.footer.offsetTop) {
            /!*$(this.footer).css("position", "relative");
            $(this.footer).css("bottom", "0");*!/
        }*/

        /*var wraph = $('#root').outerHeight();
        if(wraph < window.innerHeight){ //if content is less than screenheight
            console.log('here');
            var footh   = this.footer.offsetHeight;
            //var foottop = window.innerHeight - (headh + conth + footh);
            var foottop = window.innerHeight - (footh*2);
            //this.pushDownDiv.style.height = foottop + 'px';
            $(this.footer).css({top:foottop+'px'});
        }*/
    }

    componentDidMount() {
        this.fixPushDownDivHeight();
        // TODO: debounce this
        window.addEventListener('onresize', this.fixPushDownDivHeight);
    }

    componentWillUnmount() {
        // TODO: debounce this
        window.removeEventListener('onresize', this.fixPushDownDivHeight);
    }

    render() {
        return (
            <footer className="Footer" ref={(footer) => this.footer = footer}>
                <div className="push-down-div" ref={(pushDownDiv) => this.pushDownDiv = pushDownDiv}></div>
                <div className="footer-container">
                    <div className="site-link-row">
                        <div className="column">
                            <div className="title">About
                                <div className="underline"></div>
                            </div>
                            <div className="list">
                                <div>Created by Daniel Evans</div>
                                <div>
                                    Icons by <a href="https://www.flaticon.com/authors/rami-mcmin">Dave G</a>, <a
                                    href="https://www.flaticon.com/authors/linh-pham">Linh P</a>, <a
                                    href="https://www.flaticon.com/authors/rami-mcmin">Rami M</a>, and <a
                                    href="http://www.freepik.com">FreePik</a>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="title">Popular Categories
                                <div className="underline"></div>
                            </div>
                            <div className="list">
                                <Link to="/politics">
                                    <div>Politics</div>
                                </Link>
                                <Link to="/fashion">
                                    <div>Fashion</div>
                                </Link>
                                <Link to="/gymtime">
                                    <div>#gymtime</div>
                                </Link>
                            </div>
                        </div>
                        <div className="column">
                            <div className="title">Get Fashion In Vogue delivered to your inbox
                                <div className="underline"></div>
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
                            <div className="title">Share on Social Media
                                <div className="underline"></div>
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
