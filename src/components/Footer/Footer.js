import React, {Component} from "react";
import "./Footer.less";
import SocialShare from "../SocialShare/SocialShare";
import API from '../../shared/api-v1';

class Footer extends Component {

    constructor(props) {
        super(props);

        this.onInputChange = this.onInputChange.bind(this);
        this.createSubscriber = this.createSubscriber.bind(this);

        this.state = {
            subscriberEmail: '',
        };
    }

    createSubscriber(event) {
        event.preventDefault();
        const self = this;
        API.createSubscriber({
            success: function (response) {
                // TODO: show a thank you popup and stuff
                // since it's now been recorded, reset input
                self.setState({subscriberEmail: ''});
            },
            error: () => {},
            data: {
                email: this.state.subscriberEmail
            }
        });
    }

    onInputChange(event) {
        const target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <footer className="Footer">
                <div className="push-down-div"></div>
                <div className="footer-container">
                    <div className="site-link-row">
                        <div className="column">
                            <div className="title-wrapper">
                                <div className="title">About
                                    <div className="underline"></div>
                                </div>
                            </div>
                            <div className="list">
                                <div><a href="https://www.linkedin.com/in/danielevans11/">Developed by Daniel Evans</a></div>
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
                                <form className="footer-input" onSubmit={this.createSubscriber.bind(this)}>
                                    <input type="email"
                                           name="subscriberEmail"
                                           placeholder="Your Email Address Here"
                                           value={this.state.subscriberEmail} onChange={this.onInputChange}/>
                                    <button type="submit">Subscribe</button>
                                </form>
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
                            <SocialShare icons={{
                                pinterest: 'white', facebook: 'white',
                                email: 'white', twitter: 'white', linkedin: 'white'
                            }} type={socialMedia[index]}
                                         key={key}
                                         transitionType='float'/>
                        )
                    })}
                </div>
            )
        })
    )
}

export default Footer;
