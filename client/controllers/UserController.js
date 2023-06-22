import UserModel from '../models/UserModel.js';
import {setId, setToken, setWords, createUser, fetchUser, getNewWords, getAllWords, addNewWordsToDB, addWordsLocaly, fetchAllWords, updateWordsLocaly, updateWordsInDB, sendConfirmCode, checkUserCode, genSentence, addWordsToDbByWords } from '../store/slices/userSlice.js';
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
        await this.store.dispatch(addWordsLocaly(this.UserModel.words));
    }

    async getAllWords() {
        return await this.store.dispatch(fetchAllWords());
    }

    async loadLocalData() {
        const token = await SecureStore.getItemAsync('token');
        this.UserModel.token = token;

        const id = await SecureStore.getItemAsync('id');
        this.UserModel.id = id;

        const words = await this.getAllWords();
        this.UserModel.words = words.payload;
        console.log("Got words from file", this.UserModel.words);


        await this.saveId();
        await this.saveToken();
        await this.saveWords();

        return token;
    }

    async createNewUser(data) {
        console.log("Creating user...");
        return await this.store.dispatch(createUser(data));
    }

    async sendCode(email) {
        return await this.store.dispatch(sendConfirmCode({
            id: this.UserModel.id,
            email: email,
        }));
    }

    async checkCode(code) {
        return await this.store.dispatch(checkUserCode({
            userId: this.UserModel.id,
            code: code
        }));
    }

    async fetchUser(data) {
        console.log("Fetching user...");
        return await this.store.dispatch(fetchUser(data));
    }

    async getNewWords(data) {
        console.log("Getting new words...");
        const token = this.UserModel.token;

        return await this.store.dispatch(getNewWords({params: data, token}));
    }

    async addNewWordsToDB(words) {
        const token = this.UserModel.token;

        await this.store.dispatch(addNewWordsToDB({
            data: {
                userId: this.UserModel.id,
                newWords: words,
            },
            token
        }));
    }

    async addWordsToDBByWords(words) {

        return await this.store.dispatch(addWordsToDbByWords({
            data: {
                userId: this.UserModel.id,
                words: words,
            }
        }));
    }

    async addWords(data) {
        console.log("Adding words...");
        if (Object.keys(this.UserModel.words).length != 0) {
            this.UserModel.words = this.UserModel.words.concat(data);
        }
        else {
            this.UserModel.words = data;
        }
        await this.saveWords();
        await this.addNewWordsToDB(data);
    }

    async updateWordsLocaly() {
        await this.store.dispatch(updateWordsLocaly(this.UserModel.words));
    }

    async updateWordsInDB() {
        const newWords = this.UserModel.words;
        const res = await this.store.dispatch(updateWordsInDB({
            userId: this.UserModel.id,
            words: newWords,
        }));
    }


    async generateSentence(data) {
        const token = this.UserModel.token;

        return await this.store.dispatch(genSentence({params: data, token}));
    }
}

export default UserController;