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

window.Fetch = window.fetch;
window.fetch = function (url, init) {
    console.log('URL:','\n',url, '\n', 'INIT:','\n', init);
    return window.Fetch(url, init);
};

class App extends Component {
    componentDidMount() {
        /*fetch('/api/v1/storageListing')
         .then(response => response.json())
         .then((response) => {
         console.log(response);
         })
         .catch(error => {
         console.log('request failed', error);
         });*/
    }

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"
                           component={withTemplate(Home)}/>
                    <Route exact path="/about"
                           component={withTemplate(About)}/>
                    <Route path="/:year/:month/:title"
                           component={withTemplate(Article)}/>
                    <Route path="/:category"
                           component={withTemplate(Category)}/>
                    <Route path="/article/create"
                           component={withTemplate(CreateArticle)}/>
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