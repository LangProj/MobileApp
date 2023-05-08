import UserModel from '../models/UserModel.js';
import {setId, setToken, createUser, fetchUser, getNewWords, getAllWords } from '../store/slices/userSlice.js';
import * as SecureStore from 'expo-secure-store';

class UserController {
    constructor(store) {
        this.store = store;
        this.UserModel = new UserModel();
    }

    async saveId() {
        await this.store.dispatch(setId(this.UserModel.id));
        await SecureStore.setItemAsync('id', String(this.UserModel.id));
    }

    async saveToken() {
        await this.store.dispatch(setToken(this.UserModel.token));
        await SecureStore.setItemAsync('token', String(this.UserModel.token));
    }

    async loadLocalData() {
        const token = await SecureStore.getItemAsync('token');
        this.UserModel.token = token;
        const id = await SecureStore.getItemAsync('id');
        this.UserModel.id = id;
        await this.saveId();
        await this.saveToken();
        return token;
    }

    async createNewUser(data) {
        console.log("Creating user...");
        return await this.store.dispatch(createUser(data));
    }

    async fetchUser(data) {
        console.log("Fetching user...");
        return await this.store.dispatch(fetchUser(data));
    }

    async getNewWords(data) {
        console.log("Getting new words...");
        return await this.store.dispatch(getNewWords(data));
    }

    async addWords(data) {
        console.log("Adding words");
        return await this.store.dispatch(addWords(data));
    }

    async getAllWords(data) {
        console.log("Fetching all words");
        return await this.store.dispatch(getAllWords(data));
    }
}

export default UserController;