import React, {Component} from 'react';
import './Login.less'
const API = require('../../shared/api-v1');
const URLS = require('../../shared/urls');
const constants = require('../../shared/constants');

class Login extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {

    }

    signIn(event) {
        const locationState = this.props.location.state;
        const self = this;
        if (process.env.NODE_ENV === 'development') {
            API.login(function (response) {
                self.props.history.push((locationState && locationState.redirect) || URLS.ROUTES.home);
            }, {
                email: constants.DEV_EMAIL,
                password: constants.DEV_PASSWORD,
            });
        } else {
            API.login(function (response) {
                self.props.history.push((locationState && locationState.redirect) || URLS.ROUTES.home);
            }, {
                email: this.state.email,
                password: this.state.password
            });
        }
    }

    render() {
        return (
            <div className="Login">
                <div className="login-container">
                    <div id="auth-tabs">
                        <div id="auth-sign-in"
                             className='tab-selected'>
                            Sign In
                        </div>
                    </div>
                    <div id="auth-fields">
                        <input type="email" placeholder="Email" icon="email-icon"/>
                        <input type="password" placeholder="Password" icon="email-icon"/>
                        <button onClick={this.signIn}>Sign In</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
