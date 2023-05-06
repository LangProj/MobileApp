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
        await this.store.dispatch(setUsername(username));
    }
    async setAvatar(avatar) {
        await this.store.dispatch(setAvatar(avatar));
    }
    async setWordsPerDay(wordsPerDay) {
        await this.store.dispatch(setWordsPerDay(wordsPerDay));
    }
    async setLevel(lvl) {
        await this.store.dispatch(setLevel(lvl));
    }
    async setMotherTongue(lang) {
        await this.store.dispatch(setMotherTongue(lang));
    }
}

export default UserModel;