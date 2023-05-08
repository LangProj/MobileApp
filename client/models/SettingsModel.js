
class UserModel {
    constructor(motherTongue, username, avatar, wordsPerDay, level) {
        this.motherTongue = motherTongue;
        this.username = username;
        this.avatar = avatar;
        this.wordsPerDay = wordsPerDay;
        this.level = level;
    }

    get motherTongue() {
        return this._motherTongue;
    }
    get username() {
        return this._username;
    }
    get avatar() {
        return this._avatar;
    }
    get wordsPerDay() {
        return this._wordsPerDay;
    }
    get level() {
        return this._level;
    }

    set motherTongue(motherTongue) {
        this._motherTongue = motherTongue;
    }
    set username(username) {
        this._username = username;
    }
    set avatar(avatar) {
        this._avatar = avatar;
    }
    set wordsPerDay(wordsPerDay) {
        this._wordsPerDay = wordsPerDay;
    }
    set level(level) {
        this._level = level;
    }
}

export default UserModel;