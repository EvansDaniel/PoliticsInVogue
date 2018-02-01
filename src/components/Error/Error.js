import React, {Component} from 'react';
import './Error.less'
import PropTypes from 'prop-types';
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
                </Modal>
            </div>
        );
    }
}

Error.defaultProps = {
    requestClose: () => {return false;}
};

Error.proptypes = {
    error: PropTypes.object.isRequired
};

export default Error;
