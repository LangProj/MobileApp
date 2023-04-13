import {combineReducers} from 'redux';
import localizationReducer from './localizationReducer/localizationReducer.js';


export default rootReducer = combineReducers({
    localization: localizationReducer,
});