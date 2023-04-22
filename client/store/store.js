import {configureStore} from '@reduxjs/toolkit';
import localizationReduser from './slices/localizationSlice.js';
import userReducer from './slices/userSlice.js';

import UserController from '../controllers/UserController.js';
import LocalizationController from '../controllers/LocalizationController.js';

export default store=configureStore({
    reducer: {
        localization: localizationReduser,
        user: userReducer,
    }
});

export const localizationController = new LocalizationController(store);
export const userController = new UserController(store);
