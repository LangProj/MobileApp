import SettingsModel from '../models/SettingsModel.js';
import { setMotherTongue, setUsername, setAvatar, setLevel, setWordsPerDay, updateSettings } from '../store/slices/settingsSlice.js';
import * as SecureStore from 'expo-secure-store';

class UserController {
    constructor(store) {
        this.store = store;
        this.SettingsModel = new SettingsModel();
    }

    async saveMotherTongue() {
        await this.store.dispatch(setMotherTongue(this.SettingsModel.motherTongue));
        await SecureStore.setItemAsync('motherTongue', String(this.SettingsModel.motherTongue));
    }

    async saveUsername() {
        await this.store.dispatch(setUsername(this.SettingsModel.username));
        await SecureStore.setItemAsync('username', String(this.SettingsModel.username));
    }

    async saveAvatar() {
        await this.store.dispatch(setAvatar(this.SettingsModel.avatar));
        await SecureStore.setItemAsync('avatar', String(this.SettingsModel.avatar));
    }
    
    async saveLevel() {
        await this.store.dispatch(setLevel(this.SettingsModel.level));
        await SecureStore.setItemAsync('level', String(this.SettingsModel.level));
    }

    async saveWordsPerDay() {
        await this.store.dispatch(setWordsPerDay(this.SettingsModel.wordsPerDay));
        await SecureStore.setItemAsync('wordsPerDay', String(this.SettingsModel.wordsPerDay));
    }


    async loadLocalData() {
        this.SettingsModel.motherTongue = await SecureStore.getItemAsync('motherTongue');
        this.SettingsModel.username = await SecureStore.getItemAsync('username');
        this.SettingsModel.avatar = await SecureStore.getItemAsync('avatar');
        this.SettingsModel.level = await SecureStore.getItemAsync('level');
        this.SettingsModel.wordsPerDay = await SecureStore.getItemAsync('wordsPerDay');
        
        await this.saveMotherTongue();
        await this.saveUsername();
        await this.saveAvatar();
        await this.saveLevel();
        await this.saveWordsPerDay();
    }

    async updateSettings(data) {
        console.log("Updating settings...");
        return await this.store.dispatch(updateSettings(data));
    }
}

export default UserController;