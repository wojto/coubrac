import React from 'react';
import Wear from './Wear';
import Loader from './Loader';
import { server } from '../config/index';
import PropTypes from 'prop-types';
import { SET_WEATHER, SET_WEATHER_ERROR } from "../actions/index";
import { connect } from 'react-redux'
import * as weatherActions from '../actions/index';
import { bindActionCreators } from 'redux';

class Weather extends React.Component {
    constructor(props){
        super();

        this.api_url = server + '/api/weather';
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location || this.props.day !== prevProps.day)
        {
            this.loadWeatherForecastFromServer();
        }
    }

    componentDidMount() {
        this.loadWeatherForecastFromServer();
    }

    loadWeatherForecastFromServer() {
        console.info('loadWeatherForecastFromServer from <Weather />');
        fetch(this.api_url+'?location='+this.props.location+'&day='+this.props.day)
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    this.props.actions.setWeatherError({
                        type: SET_WEATHER_ERROR,
                        error: data.error
                    });
                } else {
                    this.props.actions.setWeather({
                        type: SET_WEATHER,
                        weather: {
                            temperature: data.temperature,
                            humidity: data.humidity,
                            wind: data.wind,
                            rain: data.rain,
                            clouds: data.clouds,
                            icon: data.icon
                        }
                    });

                    // this.setState({
                    //     temperature: data.temperature,
                    //     humidity: data.humidity,
                    //     wind: data.wind,
                    //     rain: data.rain,
                    //     clouds: data.clouds,
                    //     icon: data.icon
                    // });
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    renderTemperature() {
        let result = this.props.weather.temperature;

        if ('f' === this.props.temperature_scale) {
            result = this.celciusToFahrenheit(this.props.weather.temperature);
        }

        return Math.round(result);
    }

    celciusToFahrenheit(value) {
        return (value * 1.8) + 32;
    }

    render() {
        // console.info('render <Weather />');
        if (this.props.weather.error) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        {this.props.weather.error}
                    </div>
                </div>
            )
        } else if (this.props.weather.temperature) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        Pogoda na {'today' === this.props.day ? 'dziś' : ('tomorrow' === this.props.day ? 'jutro'
                        : 'pojutrze' )}: {this.renderTemperature()}°{this.props.temperature_scale.toUpperCase()}
                        <img src={this.props.weather.icon} alt="Pogoda" />
                    </div>

                    {/*<Wear gender={this.props.gender} temperature={this.props.weather.temperature}*/}
                          {/*humidity={this.props.weather.humidity} wind={this.props.weather.wind}*/}
                          {/*rain={this.props.weather.rain} clouds={this.props.weather.clouds}  />*/}
                    <Wear gender={this.props.gender} />
                </div>
            )
        } else {
            return (
                <Loader />
            )
        }
    }
}

Weather.propTypes = {
    gender: PropTypes.oneOf(['m', 'f']).isRequired,
    location: PropTypes.string,
    day: PropTypes.string.isRequired,
    temperature_scale: PropTypes.oneOf(['c', 'f']).isRequired
};

const mapStateToProps = (state) => ({
    weather: state.weather
});
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(weatherActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather)
