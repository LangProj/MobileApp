import { NativeModules, Platform } from 'react-native';

class LocalizationModel {
    constructor() {
        this.localization = (Platform.OS === 'ios'
                            ?   NativeModules.SettingsManager.settings.AppleLocale || 
                                NativeModules.SettingsManager.settings.AppleLanguages[0]
                            :   NativeModules.I18nManager.localeIdentifier);
        console.log("Model created, ", this.localization);
    }
    getLocale() {
        return this.localization;
    }
    setLocale(locale) {
        this.localization = locale;
    }
}

export default LocalizationModel;