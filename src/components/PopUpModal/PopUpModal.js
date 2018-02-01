import React, {Component} from 'react';
import './PopUpModal.less'
import PropTypes from 'prop-types';
import Modal from 'react-modal'
import _ from 'lodash';

class PopUpModal extends Component {
    constructor(props) {
        super(props);
        Modal.setAppElement(document.querySelector('#root'));
    }

    render() {
        const {children, style, ...other} = this.props;
        return (
            <div className="PopUpModal">
                <Modal
                    style={_.merge({
                        overlay: {
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.75)',
                        },
                        content: {
                            position: 'absolute',
                            top: '40px',
                            left: '40px',
                            right: '40px',
                            bottom: '40px',
                            border: '1px solid #ccc',
                            background: '#fff',
                            overflow: 'auto',
                            WebkitOverflowScrolling: 'touch',
                            borderRadius: '4px',
                            outline: 'none',
                            padding: '20px'
                        }
                    }, style)
                    }
                    {...other}
                >
                    {children}
                </Modal>
            </div>
        );
    }
}

PopUpModal.defaultProps = {
    style: {},
};

PopUpModal.proptypes = {
    style: PropTypes.object
};

export default PopUpModal;
