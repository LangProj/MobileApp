import { setId, setToken, setUsername, setLangToLearn, setAvatar, setWordsPerDay, setLevel, setAppLang } from '../store/slices/userSlice.js';

class UserModel {
    constructor(store) {
        this.store = store;
    }
    async setId(id) {
        await this.store.dispatch(setId(id));
    }
    async setToken(token) {
        await this.store.dispatch(setToken(token));
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
    async setAppLang(lang) {
        await this.store.dispatch(setAppLang(lang));
    }
}

export default UserModel;