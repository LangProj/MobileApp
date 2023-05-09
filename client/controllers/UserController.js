import UserModel from '../models/UserModel.js';
import {setId, setToken, setWords, createUser, fetchUser, getNewWords, getAllWords, addWords } from '../store/slices/userSlice.js';
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

    async saveWords() {
        await this.store.dispatch(setWords(this.UserModel.words));
    }

    async loadLocalData() {
        const token = await SecureStore.getItemAsync('token');
        this.UserModel.token = token;

        const id = await SecureStore.getItemAsync('id');
        this.UserModel.id = id;


        await this.saveId();
        await this.saveToken();
        await this.saveWords();

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
        console.log("Adding words...");
        if (this.UserModel.words) {
            this.UserModel.words = this.UserModel.words.concat(data);
        }
        else {
            this.UserModel.words = data;
        }
        this.saveWords();
        //return await this.store.dispatch(addWords(data));
    }

    async getAllWords(data) {
        console.log("Fetching all words...");
        return await this.store.dispatch(getAllWords(data));
    }
}

export default UserController;