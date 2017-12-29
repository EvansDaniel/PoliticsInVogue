import React, {Component} from "react";
import "./Footer.less";
import {Link} from 'react-router-dom';
import fbIcon from "../../../src/img/facebook-app-symbol.svg";
import pinIcon from "../../../src/img/pinterest.svg";
import linkedinIcon from "../../../src/img/linkedin-logo.svg";
import twitterIcon from "../../../src/img/twitter.svg";

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
                            <div>
                                <div><img src={fbIcon}/></div>
                                <div><img src={twitterIcon}/></div>
                            </div>
                            <div>
                                <div><img src={pinIcon}/></div>
                                <div><img src={linkedinIcon}/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
