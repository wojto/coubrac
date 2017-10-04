import React from 'react';
import PropTypes from 'prop-types';

export default class InputEditable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            in_edit_mode: false
        };

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.focus = this.focus.bind(this);
    }

    handleKeyPress(event) {
        if ('Enter' === event.key) {
            this.handleBlur(event);
        }
    }

    handleClick() {
        this.setState({
            in_edit_mode: true
        });
        setTimeout(() => this.focus(), 0);
    }

    handleBlur(event) {
        this.setState({
            value: event.target.value,
            in_edit_mode: false
        });
    }

    focus() {
        this.textInput.focus();

        let len = this.textInput.value.length;
        this.textInput.setSelectionRange(len, len);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this.props.onChange(this.state.value)
        }
    }

    render () {
        return (
            <span className="input-editable">
                <span className="current" onClick={this.handleClick} style={{display: this.state.in_edit_mode ? 'none'
                    : 'inline'}}>
                    {this.state.value}
                </span>
                <input defaultValue={this.props.value} style={{display: this.state.in_edit_mode ? 'inline' : 'none'}}
                    onBlur={this.handleBlur} onKeyPress={this.handleKeyPress}
                    ref={(input) => { this.textInput = input; }} />
            </span>
        );
    }
}
