import React, {Component} from 'react';
import {Link} from "react-router-dom";
import './NavBar.less'

class NavBar extends Component {
    componentDidMount() {

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
        return (
            <div className="NavBar">
                <div className="inner-content">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li>
                        Categories
                        <i className="fa fa-caret-down"></i>
                        <SubMenu categories={categories}/>
                    </li>
                    <li>
                        <Link to="/">Search</Link>
                    </li>
                    <li>
                        <a className="icon" href="mailto:clarksl0@sewanee.edu">
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </a>
                    </li>
                </div>
            </div>
        );
    }
}

const SubMenu = (props) => {
  //TODO: Will need to add category href to <a> tag
  let categories = props.categories;
  for(let i  = 0; i < categories.length; i++) {
      categories[i]['href'] = categories[i].category
                // replace all non-alphanumeric characters
                // that isn't space
                .replace(/[^a-zA-Z\d\s:]/g, '')
                // replace space with "-"
                .replace(new RegExp(" ", 'g'), '-')
                .toLowerCase();

  }
  return (
      <ul>
          {categories.map((category) =>
              <Link key={category.id} to={`/${category.href}`}>
                  <li>
                      {category.category}
                  </li>
              </Link>)
          }
      </ul>
  )
};

export default NavBar;