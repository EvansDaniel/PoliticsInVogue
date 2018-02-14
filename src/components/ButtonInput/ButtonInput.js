import React, {Component} from 'react';
import './ButtonInput.less'
import PropTypes from 'prop-types';
import classNames from 'classnames';

class ButtonInput extends Component {
	constructor(props) {
        super(props);
        this.state = {
            showInput: false,
            inputVal: props.defaultInputVal
        };
        this.onDoneClicked = this.onDoneClicked.bind(this);
        this.onEditButtonClicked = this.onEditButtonClicked.bind(this);
        this.onInputChange = this.onInputChange.bind(this);

    }

    onDoneClicked() {
	    // Fire user function and switch back to button
        this.setState({
            // show button
            showInput: false
        });
        this.props.onDone(this.state.inputVal);
    }

    onInputChange(event) {
        const target = event.target,
            value = target.type === 'checkbox' ? target.checked : target.value,
            name = event.target.name;

        this.setState({
            [name]: value
        });
    }

    onEditButtonClicked() {
	    // Switch to input
        this.setState({
            showInput: true,
        })
    }

    render() {
        return (
            <div className={classNames('ButtonInput', this.props.classRoot)}>
                {
                    this.state.showInput ?
                        <div>
                            <input className="input" name="inputVal" onChange={this.onInputChange}
                                   value={this.state.inputVal} type="text"/>
                            <button className="done-button" onClick={this.onDoneClicked}>Done</button>
                        </div>
                        :
                        <div>
                            <button className="edit-button" onClick={this.onEditButtonClicked}>Edit Image</button>
                        </div>
                }
            </div>
        );
    }
}

ButtonInput.defaultProps = {
    defaultInputVal: '',
    classRoot: '',
};

ButtonInput.proptypes = {
    onDone: PropTypes.func.isRequired,
    defaultInputVal: PropTypes.string,
    classRoot: PropTypes.string,
};

export default ButtonInput;
