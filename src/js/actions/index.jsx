export const SET_WEATHER = 'SET_WEATHER'
export const SET_WEATHER_ERROR = 'SET_WEATHER_ERROR'
export const GET_WEATHER = 'GET_WEATHER'
export const SET_WEAR_LIST = 'SET_WEAR_LIST'
export const SET_WEAR_LIST_ERROR = 'SET_WEAR_LIST_ERROR'
export const GET_WEAR_LIST = 'GET_WEAR_LIST'

export const setWeather = (weather) => ({
    type: SET_WEATHER,
    weather
})

export const setWeatherError = (error) => ({
    type: SET_WEATHER_ERROR,
    error
})

export const getWeather = () => ({
    type: GET_WEATHER
})

export const setWearList = (wearList) => ({
    type: SET_WEAR_LIST,
    wearList
})

export const setWearListError = (error) => ({
    type: SET_WEAR_LIST_ERROR,
    error
})

export const getWearList = () => ({
    type: GET_WEAR_LIST
})
