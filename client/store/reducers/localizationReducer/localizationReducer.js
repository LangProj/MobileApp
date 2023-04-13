import {SET_LOCALE, FETCH_LOCALE} from '../../actions/localizationActions.js';

const initialState = {
    localization: 'en',
}

export default localizationReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOCALE:
            return {
                ...state,
                localization: action.payload.localization
            };
        case FETCH_LOCALE:
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state;
    }
}