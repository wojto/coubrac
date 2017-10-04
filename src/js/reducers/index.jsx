import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux'
import weather from './weather';
import wearList from './wearList';

const rootReducer = combineReducers({
    weather,
    wearList,
    routing
})

export default rootReducer