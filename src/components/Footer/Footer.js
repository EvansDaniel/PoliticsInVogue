import React, {Component} from "react";
import "./Footer.less";
import {Link} from 'react-router-dom';
import SocialShare from "../SocialShare/SocialShare";

class Footer extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="Footer">
                <div className="site-link-row">
                    <div className="column">
                        <div className="title">About <div className="underline"></div></div>
                        <div className="list">
                            <div>Created by Daniel Evans</div>
                            <div>
                                Icons by <a href="https://www.flaticon.com/authors/rami-mcmin">Dave G</a>, <a href="https://www.flaticon.com/authors/linh-pham">Linh P</a>, <a href="https://www.flaticon.com/authors/rami-mcmin">Rami M</a>, and <a href="http://www.freepik.com">FreePik</a>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="title">Popular Categories <div className="underline"></div></div>
                        <div className="list">
                            <Link to="/politics"><div>Politics</div></Link>
                            <Link to="/fashion"><div>Fashion</div></Link>
                            <Link to="/gymtime"><div>#gymtime</div></Link>
                        </div>
                    </div>
                    <div className="column">
                        <div className="title">Get Fashion In Vogue delivered to your inbox <div className="underline"></div></div>
                        <div className="list">
                            <div className="footer-input">
                            <input type="text"
                                   placeholder="Your Email Address Here"/>
                                <button>Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className="column social-media">
                        <div className="title">Share on Social Media <div className="underline"></div></div>
                        <div className="social-media-list">
                            <SocialMediaList/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

const SocialMediaList = (props) => {
    const socialMediaList = [
        ['facebook', 'twitter'],
        ['pinterest','linkedin'],
    ];
    return (
        socialMediaList.map(function (socialMedia) {
            return (
                <div>
                    {Array.from(new Array(socialMedia.length),(val,index)=>index).map((index) => {
                        return (
                            <SocialShare type={socialMedia[index]} transitionType='grow'/>
                        )
                    })}
                </div>
            )
        })
    )
}

export default Footer;