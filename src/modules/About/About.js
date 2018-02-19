import React, {Component} from 'react';
import API from '../../shared/api-v1';
import errorUtils from '../../utils/error-utils';
import Loading from '../../components/Loading/Loading';

import './About.less'
import BodyHtml from "../../components/BodyHtml/BodyHtml";

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            me: {},
            error: false,
            loading: true,
        }
    }

    componentDidMount() {
        const self = this;
        API.getMe({
            success: (response) => {
                self.setState({
                    loading: false,
                    me: response.data,
                });
            },
            error: () => function () {
                self.setState({
                    error: errorUtils.buildRenderError(true, null,
                        'There was an error loading the data')
                });
            },
        })
    }

    render() {
        return (
            this.state.loading ? <Loading/> :
                errorUtils.renderIfError(this.state.error) ||
                <div className="About">
                    <div className="text-wrapper">
                        <div className="photograph-wrapper">
                            <img className="photograph" src={this.state.me.photograph} alt="Sophie Clark"/>
                        </div>
                        <div className="biography">
                            <BodyHtml body={this.state.me.biography}/>
                        </div>
                    </div>
                </div>
        );
    }
}

export default About;