class LocalizationModel {
    constructor() {
        this.localization = 'en';
        console.log("Model created");
    }
    getLocale() {
        return this.localization;
    }
    setLocale(locale) {
        this.localization = locale;
    }
}

export default LocalizationModel;