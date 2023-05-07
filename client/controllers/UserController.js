import UserModel from '../models/UserModel.js';
import {createUser, fetchUser, updateSettings, getNewWords, getAllWords } from '../store/slices/userSlice.js';

class UserController {
    constructor(store) {
        this.store = store;
        this.UserModel = new UserModel(this.store);
    }

    async loadLocalData() {
        const token = await this.UserModel.getToken()
        this.UserModel.setToken(token);
        this.UserModel.setId(await this.UserModel.getId());
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

    async updateSettings(data) {
        console.log("Updating settings...");
        return await this.store.dispatch(updateSettings(data));
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