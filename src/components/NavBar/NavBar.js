import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './NavBar.less';
import Auth from '../../services/auth';
import API from '../../shared/api-v1';
import URLS from '../../shared/urls';
import SocialShare from "../SocialShare/SocialShare";

// TODO: add hamburger menu with transitions like leetcode.com
class NavBar extends Component {
    constructor(props) {
        super(props);
        // so we can check to show dashboard link or not
        this.auth = new Auth();
        this.state = {
            categories: []
        }
    }

    componentDidMount() {
        const self = this;
        API.getAllCategories({
            success: function (res) {
                self.setState({
                    categories: res.data,
                });
            }
        })
    }

    render() {
        const loggedIn = this.auth.isAuthenticated();
        return (
            <nav className="NavBar" style={loggedIn ? {'fontSize': '11px'} : {}}>
                <div className="inner-content">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li className="categories">
                        <span>Categories</span>
                        <i className="fa fa-caret-down"></i>
                        <SubMenu categories={this.state.categories}/>
                    </li>
                    {
                        loggedIn ? <li><Link to="/dashboard">Dashboard</Link></li> : null
                    }
                    <li>
                        <a className="icon" href="mailto:clarksl0@sewanee.edu">
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </a>
                        <a className="icon">
                            <SocialShare type="twitter" fontAwesome={true}/>
                        </a>
                        <a className="icon">
                            <SocialShare type="facebook" fontAwesome={true}/>
                        </a>
                    </li>
                </div>
            </nav>
        );
    }
}

const SubMenu = (props) => {
    return (
        // Only show if there are categories
        props.categories.length ? <ul>
            {props.categories.map((categoryData, i) =>
                <Link key={i} to={URLS.transform(URLS.ROUTES.category, {categorySlug: categoryData.categorySlug})}>
                    <li>
                        {categoryData.category}
                    </li>
                </Link>)
            }
        </ul> : null
    )
};

export default NavBar;