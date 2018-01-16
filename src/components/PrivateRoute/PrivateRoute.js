import React, {Component} from 'react';
import './PrivateRoute.less'
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import {withRouter} from 'react-router-dom';
import API from '../../shared/api-v1';

// TODO: extract to component
class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.component = props.component;
        this.state = {
            loading: true,
            authenticated: false
        }
    }

    isAuthenticated(document) {
        document.cookie = "username=John Doe";
        console.log('cookies', document.cookie);
        console.log(document.cookie.indexOf('connect.sid'));
        return document.cookie.indexOf('connect.sid') > -1;
    }

    componentDidMount() {
        if (!this.isAuthenticated(window.document)) {
            console.log(this.props.history);
            this.props.history.push({
                pathname: '/auth/login',
                state: {
                    redirect: this.props.location.pathname
                }
            });
        } else {
            this.setState({
                authenticated: true,
                loading: false
            });
        }
        /*const self = this;
        API.checkAuthenticated(function (data) {
            if (!data.authenticated) {
                console.log(self.props.history);
                self.props.history.push({
                    pathname: '/auth/login',
                    state: {
                        redirect: self.props.location.pathname
                    }
                });
            } else {
                self.setState({
                    authenticated: data.authenticated,
                    loading: false
                });
            }
        });*/
    }

    render() {
        if (this.state.loading) {
            return (
                'Loading...'
            );
        }
        if (this.state.authenticated) {
            return (
                <Route {...this.props}/>
            );
        }
        // This should never happen b/c if not authenticated
        // we redirect in callback
        return null;
    }
}

PrivateRoute = withRouter(PrivateRoute);

export default PrivateRoute;
