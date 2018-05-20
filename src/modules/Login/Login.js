import React, {Component} from 'react';
import './Login.less'
const API = require('../../shared/api-v1');
const URLS = require('../../shared/urls');
const constants = require('../../shared/constants');

class Login extends Component {
    constructor(props) {
        super(props);
        this.signIn = this.signIn.bind(this);

        this.loginMessages = {
            emailPasswordWrong: 'Your email or password is incorrect.'
        };

        this.state = {
            email: '',
            password: '',
            loginMessages: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        const target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    onSignInFailed(error) {
        // error.response contains the error object
        this.setState({loginMessages: this.loginMessages.emailPasswordWrong});
    }

    signIn(event) {
        event.preventDefault();
        // No need to check if email/password is empty
        const self = this;
        const emailPassObject = {
            email: this.state.email,
            password: this.state.password,
        };
        if (process.env.NODE_ENV === 'development') {
            API.login({
                success: function (response) {
                    self.props.history.push(URLS.ROUTES.dashboard);
                },
                error: function (error) {
                    self.onSignInFailed(error);
                },
                data: emailPassObject
            });
        } else {
            API.login({
                success: function (response) {
                    self.props.history.push(URLS.ROUTES.dashboard);
                },
                error: function (error) {
                    self.onSignInFailed(error);
                },
                data: emailPassObject
            });
        }
    }

    render() {
        return (
            <div className="Login">
                <div className="outer-container">
                    <div className="login-messages">
                        {this.state.loginMessages}
                    </div>
                    <form className="login-container" onSubmit={this.signIn}>
                        <div id="auth-tabs">
                            <div id="auth-sign-in"
                                 className='tab-selected'>
                                Sign In
                            </div>
                        </div>
                        <div id="auth-fields">
                            <input type="email" placeholder="Email" name="email" value={this.state.email}
                                   onChange={this.onInputChange} icon="email-icon"/>
                            <input type="password" placeholder="Password" name="password" value={this.state.password}
                                   onChange={this.onInputChange} icon="email-icon"/>
                            <button type="submit">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
