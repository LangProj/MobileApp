import UserModel from '../models/UserModel.js';
import {createUser, fetchUser} from '../store/slices/userSlice.js';

class UserController {
    constructor(store) {
        this.UserModel = new UserModel();
        this.store = store;
    }

    async createNewUser(data) {
        console.log("Creating user...");
        return await this.store.dispatch(createUser(data));
    }

    async fetchUser(data) {
        console.log("Fetching user...");
        return await this.store.dispatch(fetchUser(data));
    }
}

export default UserController;