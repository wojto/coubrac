import React from 'react';
import Weather from './Weather';
import Select from './Select';
import InputEditable from "./InputEditable";
import history from '../config/history';

export default class OptionsForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            location: props.location || 'Warszawa',
            day: '0',
            temperature_scale: props.temperature_scale || 'c',
            gender: props.gender || 'f'
        };

        this.location = this.state.location;

        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.handleDayChange = this.handleDayChange.bind(this);
        this.handleTemperatureScaleChange = this.handleTemperatureScaleChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleGenderChange(value) {
        this.setState({
            gender: value
        });
    }

    handleDayChange(value) {
        this.setState({
            day: value
        });
    }

    handleTemperatureScaleChange(value) {
        this.setState({
            temperature_scale: value
        });
    }

    handleLocationChange(value) {
        this.setState({
            location: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.state.location !== nextState.location || this.state.gender !== nextState.gender
            || this.state.temperature_scale !== nextState.temperature_scale) {
            // update website url
            history.push('/'+nextState.gender+'/'+nextState.temperature_scale+'/'+nextState.location);
        }
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <form method="get" onSubmit={this.handleSubmit}>
                            Co&nbsp;
                            <Select options={[{value: 'f', name: 'kobieta'}, {value : 'm', name: 'mężczyzna'}]}
                                    selected={this.state.gender} onChange={this.handleGenderChange} />
                            &nbsp;{'f' === this.state.gender ? 'powinna' : 'powinien'}&nbsp;
                            <Select options={[{value: '0', name: 'dziś'}, {value : '1', name: 'jutro'}, {value : '2',
                                name: 'pojutrze'}]} selected={this.state.day} onChange={this.handleDayChange} />
                            &nbsp;ubrać w lokalizacji&nbsp;
                            <InputEditable onChange={this.handleLocationChange} value={this.state.location} /><br/>
                            Pokaż pogodę w:&nbsp;
                            <Select options={[{value: 'c', name: '°C'}, {value : 'f', name: '°F'}]}
                                    selected={this.state.temperature_scale}
                                    onChange={this.handleTemperatureScaleChange} />
                        </form>
                    </div>
                </div>
                <Weather location={this.state.location} day={this.state.day}
                         temperature_scale={this.state.temperature_scale} gender={this.state.gender} />
            </div>
        )
    }
}
