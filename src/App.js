import React, {Component} from 'react';
import {Route, Switch} from 'react-router';
import {BrowserRouter} from 'react-router-dom'
import Home from './modules/Home/Home'
import About from './modules/About/About'
import NavBar from "./components/NavBar/NavBar";
import Article from "./modules/Article/Article";
import Category from "./modules/Category/Category";
import CreateArticle from "./modules/CreateArticle/CreateArticle";
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Footer from "./components/Footer/Footer";
import Login from "./modules/Login/Login";

class App extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"
                           component={withTemplate(Home)}/>
                    <Route exact path="/about"
                           component={withTemplate(About)}/>
                    <Route path="/articles/:year/:month/:title"
                           component={withTemplate(Article)}/>
                    <Route path="/category/:category"
                           component={withTemplate(Category)}/>
                    <Route path="/article/create"
                           component={withTemplate(CreateArticle)}/>
                    <Route path="/auth/login"
                           component={withTemplate(Login)}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

const withTemplate = (ModuleComponent) => {
    return class extends React.Component {
        render() {
            return (
                [
                    <NavBar key="nav"/>,
                    <ModuleComponent key="component"
                                     {...this.props} />,
                    <Footer/>
                ]
            )
        }
    }
};

export default App;