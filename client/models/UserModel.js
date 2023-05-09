
class UserModel {
    constructor() {
        this.id = "";
        this.token = "";
        this.words = [];
    }

    get id() {
        return this._id;
    }
    get token() {
        return this._token;
    }
    get words() {
        return this._words;
    }
    
    set id (id) {
        this._id = id;
    }
    set token(token) {
        this._token = token;
    }
    set words(words) {
        this._words = words
    }

}

export default UserModel;