import React, {Component} from 'react';
import './Error.less'
import PropTypes from 'prop-types';
import Modal from 'react-modal';

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
                    contentLabel="Final Details"
                    isOpen={this.state.showModal}
                    onRequestClose={() => self.setState({showModal: false})}
                    shouldCloseOnOverlayClick={true}
                >
                    <p>Sorry there was an error :(. Try again later.</p>
                </Modal>
            </div>
        );
    }
}

Error.proptypes = {
    error: PropTypes.object.isRequired
};

export default Error;
