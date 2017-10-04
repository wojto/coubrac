import { SET_WEAR_LIST, SET_WEAR_LIST_ERROR, GET_WEAR_LIST } from "../actions/index";

const wearList = (state = [], action) => {
    switch (action.type) {
        case SET_WEAR_LIST:
            return action.wearList.wearList
        case SET_WEAR_LIST_ERROR:
            return action.error
        case GET_WEAR_LIST:
            return wearList
        default:
            return state
    }
}

export default wearList