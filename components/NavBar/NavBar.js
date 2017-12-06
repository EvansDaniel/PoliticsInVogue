import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './NavBar.less'

class NavBar extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="NavBar">
                <div className="inner-content">
                    <div>
                        <Link to="/">Home</Link>
                    </div>
                    <div>
                        <Link to="/about">About</Link>
                    </div>
                    <div className="dropdown">
                        Categories <i class="fa fa-caret-down"></i>
                        <div class="dropdown-content">
                            <a href="#">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                        </div>
                    </div>
                    <div>
                        Search
                    </div>
                    <div className="icons">
                        <a href="mailto:clarksl0@sewanee.edu">
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavBar;