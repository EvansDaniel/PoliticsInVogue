import React, {Component} from 'react';
import './Login.less'
import PropTypes from 'prop-types';

class Login extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

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
                        <button>Sign In</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
