import { setId, setToken, setUsername, setAvatar, setWordsPerDay, setLevel, setMotherTongue } from '../store/slices/userSlice.js';
import * as SecureStore from 'expo-secure-store';


class UserModel {
    constructor(store) {
        this.store = store;
    }
    async setId(id) {
        await this.store.dispatch(setId(id));
        await SecureStore.setItemAsync('id', id);
    }
    async setToken(token) {
        await this.store.dispatch(setToken(token));
        await SecureStore.setItemAsync('token', token);
    }
    async setUsername(username) {
        console.log(username);
        await this.store.dispatch(setUsername(username));
        await SecureStore.setItemAsync('username', username);
    }
    async setAvatar(avatar) {
        console.log(avatar);
        await this.store.dispatch(setAvatar(avatar));
        await SecureStore.setItemAsync('avatar', avatar);
    }
    async setWordsPerDay(wordsPerDay) {
        console.log(wordsPerDay);
        await this.store.dispatch(setWordsPerDay(wordsPerDay));
        await SecureStore.setItemAsync('wordsPerDay', String(wordsPerDay));
    }
    async setLevel(lvl) {
        console.log(lvl);
        await this.store.dispatch(setLevel(lvl));
        await SecureStore.setItemAsync('level', lvl);
    }
    async setMotherTongue(lang) {
        console.log(lang);
        await this.store.dispatch(setMotherTongue(lang));
        await SecureStore.setItemAsync('motherTongue', lang);
    }
    async getId() {
        return await SecureStore.getItemAsync('id');
    }
    async getToken() {
        return await SecureStore.getItemAsync('token');
    }
    async getUsername() {
        return await SecureStore.getItemAsync('username');
    }
    async getAvatar() {
        return await SecureStore.getItemAsync('avatar');
    }
    async getWordsPerDay() {
        return await SecureStore.getItemAsync('wordsPerDay');
    }
    async getLevel() {
        return await SecureStore.getItemAsync('level');
    }
    async getMotherTongue() {
        return await SecureStore.getItemAsync('motherTongue');
    }
}

export default UserModel;