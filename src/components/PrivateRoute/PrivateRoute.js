import React, {Component} from 'react';
import './PrivateRoute.less'
import {Route} from 'react-router';
import {withRouter} from 'react-router-dom';
import URLS from '../../shared/urls';
import Loading from '../Loading/Loading';
import Auth from '../../services/auth';
import API from '../../shared/api-v1';
import {Redirect} from 'react-router-dom';

// TODO: extract to component
class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.auth = new Auth();
        this.component = props.component;
        this.state = {
            loading: true,
            authenticated: false,
        }
    }

    componentDidMount() {
        // check if we are locally authenticated
        // TODO: what if we are not server authenticated?
        if (!this.auth.isAuthenticated()) {
            this.props.history.push({
                pathname: URLS.ROUTES.login,
                state: {
                    redirect: this.props.location.pathname
                }
            });
        } else {
            this.setState({
                authenticated: true,
                loading: false
            });
            // we are signed in, but we need to continue to check if the user is logged in
            this.authenticationCheckPolling();
        }
    }

    isPrivateRoute() {
        // if it is a dashboard route, it is private
        return window.location.pathname.indexOf(URLS.ROUTES.dashboard) > -1;
    }

    // Polls to see if user is still signed in
    authenticationCheckPolling() {
        const self = this;
        const interval = setInterval(function () {
            API.checkAuthenticated({
                success: function (response) {
                    if(!response.data.authenticated && self.isPrivateRoute()) {
                        alert('You have been logged out. Please log in again to continue.');
                        self.auth.expireAuthToken();
                        self.setState({authenticated: false});
                        clearInterval(interval);
                    }
                    if(!self.isPrivateRoute()) {
                        clearInterval(interval);
                    }
                }
            });
            // check every 10 seconds
        }, 10000);
    }

    render() {
        if (this.state.loading) {
            return (
                <Loading/>
            );
        }
        if (this.state.authenticated) {
            return (
                <Route {...this.props}/>
            );
        } else {
            return (
                <Redirect to={URLS.ROUTES.login}/>
            );
        }
    }
}

PrivateRoute = withRouter(PrivateRoute);

export default PrivateRoute;
