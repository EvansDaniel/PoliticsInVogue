import React, {Component} from 'react';
import './Error.less'
import PropTypes from 'prop-types';
import Modal from '../PopUpModal/PopUpModal';
import errorIcon from "../../../src/img/error.jpg";
import URLS from '../../shared/urls';
import {Link, Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom';

// Handles server errors (404, 400, 401, 500, etc)
class Error extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: true,
            // url to redirect to
            redirect: false,
        }
    }

    render() {
        const self = this;
        const error = this.props.error;
        let msg = error.message || 'There was an error. Please try again later';
        // when res is provided, we check that status code to send a default message to user
        // and it will overwrite error.message
        if(error.res) {
            if(error.res.status === 404) {
                msg = 'It looks like the resource you were searching for doesn\'t exist.'
            }
            if(error.res.status === 401) {
                msg = 'You cannot view this page because you are not signed in. Redirecting you to login...';
                setTimeout((function () {
                    this.setState({redirect: URLS.ROUTES.login});
                }).bind(this), 4000);
            }
        }
        if(this.state.redirect) {
            return (
                <Redirect to={this.state.redirect}/>
            );
        }
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
                    <p>{msg}</p>
                    {
                        this.props.goBackLink ? <div onClick={function () {
                            self.props.history.goBack();
                        }} className="go-back">Go back?</div> : null
                    }
                    {
                        this.props.signInLink ? <Link to={URLS.ROUTES.login}>Go sign in?</Link> : null
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
    goBackLink: true,
    signInLink: false,
};

Error.proptypes = {
    error: PropTypes.object.isRequired,
    goBackLink: PropTypes.bool,
    signInLink: PropTypes.bool,
};

export default withRouter(Error);
