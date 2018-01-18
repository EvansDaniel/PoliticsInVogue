import React, {Component} from 'react';
import './PrivateRoute.less'
import PropTypes from 'prop-types';
import {Route} from 'react-router';
import {withRouter} from 'react-router-dom';
import API from '../../shared/api-v1';
import URLS from '../../shared/urls';
import Loading from '../Loading/Loading';

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
        // TODO: Keep the real isAuthenticated below
        document.cookie = "username=John Doe";
        return document.cookie.indexOf('connect.sid') > -1;
    }

    componentDidMount() {
        if (!this.isAuthenticated(window.document)) {
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
        }
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
        }
        // This should never happen b/c if not authenticated
        // we redirect in callback
        return null;
    }
}

PrivateRoute = withRouter(PrivateRoute);

export default PrivateRoute;
