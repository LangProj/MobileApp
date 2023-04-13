import { setLocalization, fetchLocalization } from '../store/actions/localizationActions.js';
import LocalizationModel from '../models/LocalizationModel.js';


class LocalizationController {
    constructor(store) {
        this.LocalizationModel = new LocalizationModel();
        this.store = store;
        console.log("Controller creaated");
    }
    setLocale(locale) {
        console.log("Setting locale");
        this.LocalizationModel.setLocale(locale);
        this.store.dispatch(setLocalization(locale));
        this.fetchLocale();
    }
    fetchLocale() {
        console.log("Fetching locale");
        this.store.dispatch(fetchLocalization());
    }
}


export default LocalizationController;