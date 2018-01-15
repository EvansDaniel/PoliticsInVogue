import React, {Component} from 'react';
import './Login.less'
import PropTypes from 'prop-types';
const API = require('../../shared/api-v1');

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
        API.login(function (response) {
            console.log(response);
            console.log(self.props);
            self.props.history.push(locationState && locationState.redirect || '/');
        }, {
            email: 'clarksl0@sewanee.edu',
            password: 'password'
        });
    }

    render() {
        console.log(this.props);
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
