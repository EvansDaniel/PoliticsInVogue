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

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path="/article/:id/edit"
                                  component={withTemplate(EditArticle, false)}
                    />
                    <PrivateRoute path="/dashboard"
                                  component={withTemplate(Dashboard, false)}
                    />
                    <Route exact path="/"
                           component={withTemplate(Home)}/>
                    <Route exact path="/about"
                           component={withTemplate(About)}/>
                    <Route path="/articles/:year/:month/:title"
                           component={withTemplate(Article)}/>
                    <Route path="/category/:category"
                           component={withTemplate(Category)}/>
                    <Route path="/auth/login"
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
                    <div className="content">
                        <NavBar key="nav"/>
                        <ModuleComponent key="component"
                                         {...this.props} />
                    </div>,
                    footer ? <Footer/> : null
                ]
            )
        }
    }
};

export default App;