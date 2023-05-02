import UserModel from '../models/UserModel.js';
import {createUser, fetchUser, updateSettings } from '../store/slices/userSlice.js';

class UserController {
    constructor(store) {
        this.store = store;
        this.UserModel = new UserModel(this.store);
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
        return await this.store.dispatch(updateSettings(data))
    }
}

export default UserController;