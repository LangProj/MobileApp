import { setLocale, fetchLocale } from '../store/slices/localizationSlice.js';
import LocalizationModel from '../models/LocalizationModel.js';

class LocalizationController {
    constructor(store) {
        this.LocalizationModel = new LocalizationModel();
        this.store = store;
        console.log("Controller created");
    }
    setLocale(locale) {
        console.log("Setting locale");
        this.store.dispatch(setLocale(locale));
    }
    fetchCurrentLocale() {
        console.log("Fetching locale");
        this.store.dispatch(fetchLocale(this.LocalizationModel.getLocale()));
    }
}

export default LocalizationController;