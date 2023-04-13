import {configureStore} from '@reduxjs/toolkit';

import rootReducer from './reducers/rootReducer.js';
import LocalizationController from '../controllers/LocalizationController.js';

const store = configureStore({reducer: rootReducer});
export default store;
export const localizationController = new LocalizationController(store);
