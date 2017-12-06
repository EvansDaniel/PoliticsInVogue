import React, {Component} from 'react';
import './Home.less'
import NavBar from "../../components/NavBar/NavBar";

class Home extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="Home">
                <NavBar/>
            </div>
        );
    }
}

export default Home;