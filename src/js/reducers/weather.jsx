import { SET_WEATHER, SET_WEATHER_ERROR, GET_WEATHER } from "../actions/index";

const weather = (state = [], action) => {
    switch (action.type) {
        case SET_WEATHER:
                return action.weather.weather
        case SET_WEATHER_ERROR:
            return action.error
        case GET_WEATHER:
            return weather
        default:
            return state
    }
}

export default weather