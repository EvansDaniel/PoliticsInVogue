import React, {Component} from 'react';
import './Error.less'
import PropTypes from 'prop-types';
import Modal from '../PopUpModal/PopUpModal';
import errorIcon from "../../../src/img/error.jpg";
import {withRouter} from 'react-router-dom';

// Handles server errors (404, 400, 401, 500, etc)
class Error extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
        }
    }

    render() {
        const self = this;
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
                    <img src={errorIcon} alt="There was an error :("/>
                    <p>{this.props.error}</p>
                    {
                        this.props.goBackLink ? <div onClick={function () {
                            self.props.history.goBack();
                        }} className="go-back">Go back?</div> : null
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
    goBackLink: true
};

Error.proptypes = {
    error: PropTypes.object.isRequired,
    goBackLink: PropTypes.bool
};

export default withRouter(Error);
