import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './NavBar.less';
import Auth from '../../services/auth';
import API from '../../shared/api-v1';
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
        var categories = [
            {id: 1, category: 'Politics'},
            {id: 2, category: 'Workouts'},
            {id: 3, category: 'Lifestyle'},
            {id: 4, category: 'Good Books'},
            {id: 5, category: 'Writing'},
            {id: 6, category: 'Fashion'},
        ];
        const loggedIn = this.auth.isAuthenticated();
        return (
            <nav className="NavBar" style={loggedIn ? {'fontSize': '11px'} : {}}>
                <div className="inner-content">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li>
                        <Link to="/">Categories</Link>
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
    let categories = props.categories.map(function (category) {
        // TODO: slug will be provided
        const href = category
        // replace all non-alphanumeric characters
        // that isn't space
            .replace(/[^a-zA-Z\d\s:]/g, '')
            // replace space with "-"
            .replace(new RegExp(" ", 'g'), '-')
            .toLowerCase();
        return {
            href: href,
            name: category
        }
    });
    return (
        <ul>
            {categories.map((category, i) =>
                <Link key={i} to={`/category/${category.href}`}>
                    <li>
                        {category.name}
                    </li>
                </Link>)
            }
        </ul>
    )
};

export default NavBar;