import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: {
                value: props.selected,
                name: this.getNameOfValue(props.options, props.selected)
            },
            open: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSelectedClick = this.handleSelectedClick.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    getNameOfValue(options, selected) {
        let result;
        options.map(function(option){
            if (option.value === selected) {
                result = option.name;
            }
        });
        return result;
    }

    handleChange(event) {
        this.setState({
            selected: {
                value: event.target.getAttribute('data-value'),
                name: event.target.innerHTML
            },
            open: false
        });
    }

    handleSelectedClick(event) {
        this.setState({
            open: true
        });
    }

    handleMouseEnter() {
        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.setState({
            open: true
        });
    }

    handleMouseLeave() {
        this.timer = setTimeout(function(self) {
            self.setState({
                open: false
            });
        }, 100, this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected.value !== this.state.selected.value) {
            this.props.onChange(this.state.selected.value)
        }
    }

    render () {
        return (
            <span className="select">
                <span className="selected" onClick={this.handleSelectedClick} onMouseLeave={this.handleMouseLeave}>
                    {this.state.selected.name}
                </span>
                <div className="options" style={{display: this.state.open ? 'block' : 'none'}}
                     onMouseLeave={this.handleMouseLeave} onMouseEnter={this.handleMouseEnter}>
                    {this.props.options.map(function(object){
                        return (
                            <div key={object.value} className={this.state.selected.value === object.value ? 'selected'
                                : ''} onClick={this.handleChange} data-value={object.value}>
                                {object.name}
                            </div>
                        );
                    }, this)}
                </div>
            </span>
        );
    }
}

Select.propTypes = {
    options: PropTypes.array.isRequired
};
