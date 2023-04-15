import {configureStore} from '@reduxjs/toolkit';
import localizationReduser from './slices/localizationSlice.js';
import LocalizationController from '../controllers/LocalizationController.js';


export default store=configureStore({
    reducer: {
        localization: localizationReduser,
    }
});

export const localizationController = new LocalizationController(store);