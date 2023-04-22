import UserModel from '../models/UserModel.js';
import {createUser} from '../store/slices/userSlice.js';

class UserController {
    constructor(store) {
        this.UserModel = new UserModel();
        this.store = store;
    }

    async createNewUser(data) {
        console.log("Creating user...");
        return await this.store.dispatch(createUser(data));
    }
}

export default UserController;