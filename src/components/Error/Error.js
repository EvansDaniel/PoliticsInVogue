import React, {Component} from 'react';
import './Error.less'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import URLS from '../../shared/urls';
import Modal from '../PopUpModal/PopUpModal';
import errorIcon from "../../../src/img/error.jpg";

// Handles server errors (404, 400, 401, 500, etc)
class Error extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
        }
    }

    render() {
        const error = this.props.error,
            self = this;
        return (
            <div className="Error">
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={() => {
                        self.props.requestClose();
                        self.setState({showModal: false});
                    }}
                    shouldCloseOnOverlayClick={true}
                    portalClassName="ErrorModalPortal"
                    className="ErrorModalContent"
                    overlayClassName="ErrorModalOverlay"
                >
                    <img src={errorIcon}/>
                    <p>{this.props.error}</p>
                    {
                        this.props.addHomeLink ? <Link to={URLS.ROUTES.home}>Go back to home page?</Link> : null
                    }
                </Modal>
            </div>
        );
    }
}

Error.defaultProps = {
    // TODO: by default on request close could redirect user to wherever they were just before coming to this page?
    requestClose: () => {
        return false;
    },
    addHomeLink: false
};

Error.proptypes = {
    error: PropTypes.object.isRequired,
    addHomeLink: PropTypes.bool
};

export default Error;
