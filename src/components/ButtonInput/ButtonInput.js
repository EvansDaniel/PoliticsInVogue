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

    onInputChange(eventOrChangedState) {
        // we have an event
        if (eventOrChangedState.target) {

            const target = eventOrChangedState.target,
                value = target.type === 'checkbox' ? target.checked : target.value,
                name = eventOrChangedState.target.name;

            this.setState({
                inputVal: value
            });
            // we have the changedState
        } else {
            this.setState({
                inputVal: eventOrChangedState
            });
        }
    }

    onEditButtonClicked() {
        this.props.onEditClicked();
        // Switch to input
        this.setState({
            showInput: true,
        })
    }

    render() {
        const Component = this.props.component;
        return (
            <div className={classNames('ButtonInput', this.props.classRoot)}>
                {
                    this.state.showInput ?
                        <div>
                            {
                                /* Add a className to Component ??? */
                                Component ? <Component onChange={this.onInputChange} value={this.state.inputVal}/> :
                                    <input className="default-input" onChange={this.onInputChange}
                                           value={this.state.inputVal} type="text"/>
                            }
                            <button className={
                                classNames('done-button', {'has-default-input': !this.props.component})
                            } onClick={this.onDoneClicked}>Done</button>
                        </div>
                        :
                        <div>
                            <button className="edit-button" onClick={this.onEditButtonClicked}>{this.props.title}</button>
                        </div>
                }
            </div>
        );
    }
}

ButtonInput.defaultProps = {
    defaultInputVal: '',
    classRoot: '',
    // Defaults to noop
    onEditClicked: () => {}
};

ButtonInput.proptypes = {
    onDone: PropTypes.func.isRequired,
    onEditClicked: PropTypes.func,
    defaultInputVal: PropTypes.string,
    classRoot: PropTypes.string,
    title: PropTypes.string.isRequired,
};

export default ButtonInput;
