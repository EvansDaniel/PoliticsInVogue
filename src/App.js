import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom'
import Home from './modules/Home/Home'
import About from './modules/About/About'
import NavBar from "./components/NavBar/NavBar";
import Article from "./modules/Article/Article";
import Category from "./modules/Category/Category";
import EditArticle from "./modules/EditArticle/EditArticle";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Footer from "./components/Footer/Footer";
import Login from "./modules/Login/Login";
import Dashboard from "./modules/Dashboard/Dashboard";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import './App.less';

// This is required so that
// See https://medium.com/@andrewzey/google-seo-with-create-react-app-fixing-the-hidden-gotcha-c164063106d
import 'babel-polyfill'
// This file must be loaded before api-v1.js
const URLS = require('./shared/urls');
const constants = require('./shared/constants');
require('./shared/api-v1');

class App extends Component {
    componentDidMount() {
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: constants.FB_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.11'
            });
        };

        (function (d, s, id) {
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path={URLS.ROUTES.editArticle}
                                  component={withTemplate(EditArticle, false)}
                    />
                    <PrivateRoute path={URLS.ROUTES.dashboard}
                                  component={withTemplate(Dashboard, false)}
                    />
                    <Route exact path={URLS.ROUTES.home}
                           component={withTemplate(Home)}/>
                    <Route exact path={URLS.ROUTES.about}
                           component={withTemplate(About)}/>
                    <Route path={URLS.ROUTES.article}
                           component={withTemplate(Article)}/>
                    <Route path={URLS.ROUTES.category}
                           component={withTemplate(Category)}/>
                    <Route path={URLS.ROUTES.login}
                           component={withTemplate(Login)}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

const withTemplate = (ModuleComponent, footer) => {
    footer = footer === false ? footer : true;
    return class extends React.Component {
        render() {
            // Content div is to fix footer to bottom
            return (
                [
                    <div className="content" key="content">
                        <NavBar/>
                        <ModuleComponent {...this.props} />
                    </div>,
                    footer ? <Footer key="footer"/> : null
                ]
            )
        }
    }
};

export default App;