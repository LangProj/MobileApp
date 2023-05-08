import {configureStore} from '@reduxjs/toolkit';

import localizationReduser from './slices/localizationSlice.js';
import userReducer from './slices/userSlice.js';
import settingsReducer from './slices/settingsSlice.js';

import UserController from '../controllers/UserController.js';
import LocalizationController from '../controllers/LocalizationController.js';
import SettingsController from '../controllers/SettingsController.js';

export default store=configureStore({
    reducer: {
        localization: localizationReduser,
        user: userReducer,
        settings: settingsReducer,
    }
});

export const localizationController = new LocalizationController(store);
export const userController = new UserController(store);
export const settingsController = new SettingsController(store);
