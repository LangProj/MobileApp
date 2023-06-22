import * as SecureStore from 'expo-secure-store';
import StatisticsModel from '../models/StatisticsModel.js';
import { setWordsADay, setWordsInLevel, setWordsAllTime, getWordsCountByLevel, undateStatistics} from '../store/slices/statisticsSlice.js';
import { settingsController, userController } from '../store/store.js';

class StatisticsController {
    constructor(store) {
        this.store = store;
        this.StatisticsModel = new StatisticsModel();
    }

    async saveWordsADay() {
        await this.store.dispatch(setWordsADay(this.StatisticsModel.wordsADay));
        await SecureStore.setItemAsync('wordsADay', String(this.StatisticsModel.wordsADay));
    }

    async saveWordsInLevel() {
        await this.store.dispatch(setWordsInLevel(this.StatisticsModel.wordsInLevel));
        await SecureStore.setItemAsync('wordsInLevel', String(this.StatisticsModel.wordsInLevel));
    }

    async saveWordsAllTime() {
        await this.store.dispatch(setWordsAllTime(this.StatisticsModel.wordsAllTime));
        await SecureStore.setItemAsync('wordsAllTime', String(this.StatisticsModel.wordsAllTime));
    }

    async checkDate(currentDate, savedDate) {
        if(currentDate != savedDate) {
            await SecureStore.setItemAsync('currentDate', currentDate);
            this.StatisticsModel.wordsADay = 0;
            await this.saveWordsADay();
        }
    }

    async createLocaleData() {
        const date = new Date();
        await SecureStore.setItemAsync('currentDate', String(date.getDate()));

        this.StatisticsModel.wordsADay = 0;
        this.StatisticsModel.wordsInLevel = await this.getWordsCount();
        this.StatisticsModel.wordsAllTime = 0;

        await this.saveWordsADay();
        await this.saveWordsInLevel();
        await this.saveWordsAllTime();
    }

    async updateInDB() {
        await this.store.dispatch(undateStatistics({
            id: userController.UserModel.id,
            wordsADay: this.StatisticsModel.wordsADay,
            wordsAllTime: this.StatisticsModel.wordsAllTime,
            wordsInLevel: this.StatisticsModel.wordsInLevel,
        }));
    }

    async loadLocalData() {
        const date = new Date();
        const savedDate = await SecureStore.getItemAsync('currentDate');
        savedDate == null ? await SecureStore.setItemAsync('currentDate', String(date.getDate())) : await this.checkDate(String(date.getDate()), savedDate);

        const wordsADay = await SecureStore.getItemAsync('wordsADay');
        !isNaN(Number(wordsADay)) ? this.StatisticsModel.wordsADay = +wordsADay : this.StatisticsModel.wordsADay = 0;
        
        const wordsInLevel = await SecureStore.getItemAsync('wordsInLevel');
        !isNaN(Number(wordsInLevel)) ? this.StatisticsModel.wordsInLevel = +wordsInLevel : this.StatisticsModel.wordsInLevel = 0;

        const wordsAllTime = await SecureStore.getItemAsync('wordsAllTime');
        !isNaN(Number(wordsAllTime)) ? this.StatisticsModel.wordsAllTime = +wordsAllTime : this.StatisticsModel.wordsAllTime = 0;
        

        await this.saveWordsADay();
        await this.saveWordsInLevel();
        await this.saveWordsAllTime();

        await this.updateInDB();
    }

    async saveStatistics() {
        await this.saveWordsADay();
        await this.saveWordsInLevel();
        await this.saveWordsAllTime();
    }

    async getWordsCount() {
        const res = await this.store.dispatch(getWordsCountByLevel({level: settingsController.SettingsModel.level}));
        console.log("Result words count", res);
        return res.payload.data.wordCount;
    }

    async addWords(words) {
        this.StatisticsModel.wordsADay += +words;
        this.saveWordsADay();
        this.StatisticsModel.wordsInLevel -= +words;
        this.saveWordsInLevel();
        this.StatisticsModel.wordsAllTime += +words;
        this.saveWordsAllTime();

        await this.updateInDB();
    }

}

export default StatisticsController;