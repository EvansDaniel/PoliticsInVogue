import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router';
import {BrowserRouter, withRouter} from 'react-router-dom'
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
import API from './shared/api-v1';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <PrivateRoute path="/article/:id/edit"
                                  component={withTemplate(EditArticle)}
                    />
                    <PrivateRoute path="/dashboard"
                                  component={withTemplate(Dashboard)}
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

const withTemplate = (ModuleComponent) => {
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
                    <Footer/>
                ]
            )
        }
    }
};

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

    componentDidMount() {
        const self = this;
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
        });
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

/*const PrivateRoute = ({component: Component, ...rest}) => (
 <Route {...rest} render={function (props) {
 alert(rest.authenticated);
 return (
 props.authenticated
 ? <Component {...props} {...rest}/>
 : <Redirect to='/auth/login'/>
 )
 }}/>
 );*/

export default App;