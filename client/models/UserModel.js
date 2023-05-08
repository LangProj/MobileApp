
class UserModel {
    constructor(id, token) {
        this.id = id;
        this.token = token;
    }

    get id() {
        return this._id;
    }
    get token() {
        return this._token;
    }
    
    set id (id) {
        this._id = id;
    }
    set token(token) {
        this._token = token;
    }

}

export default UserModel;