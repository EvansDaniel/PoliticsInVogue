import React, {Component} from 'react';
import './Dashboard.less'
import PropTypes from 'prop-types';
import API from '../../shared/api-v1';
import URLS from '../../shared/urls';

class Dashboard extends Component {
	constructor(props) {
        super(props);
        this.createNewArticle = this.createNewArticle.bind(this);
    }

    componentDidMount() {

    }

    createNewArticle(event) {
	    const self = this;
	    API.createArticle(function (response) {
	        const data = response.data;
	        self.props.history.push({
                pathname: URLS.transform(URLS.ROUTES.editArticle, {
                    _id: data._id
                }),
                state: {
                    article: data
                }
            });
        }, {
	        data: {
	            title: 'Untitled',
            }
        });
	    // call create article api
        // redirect to edit page (with created article state?)
    }

    render() {
        return (
            <div className="Dashboard">
                <button onClick={this.createNewArticle}>Create New Article</button>
            </div>
        );
    }
}

export default Dashboard;
