import * as SecureStore from 'expo-secure-store';
import StatisticsModel from '../models/StatisticsModel.js';
import { setWordsADay, setWordsInLevel, setWordsAllTime } from '../store/slices/statisticsSlice.js';

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

    async loadLocalData() {
        const date = new Date();
        const savedDate = await SecureStore.getItemAsync('currentDate');
        savedDate == null ? await SecureStore.setItemAsync('currentDate', String(date.getDate())) : await this.checkDate(String(date.getDate()), savedDate);

        const wordsADay = await SecureStore.getItemAsync('wordsADay');
        !isNaN(Number(wordsADay)) ? this.StatisticsModel.wordsADay = +wordsADay : this.StatisticsModel.wordsADay = 0;
        const wordsInLevel = await SecureStore.getItemAsync('wordsInLevel');
        !isNaN(Number(wordsInLevel)) ? this.StatisticsModel.wordsInLevel = +wordsInLevel : this.StatisticsModel.wordsInLevel = 1000;

        const wordsAllTime = await SecureStore.getItemAsync('wordsAllTime');
        !isNaN(Number(wordsAllTime)) ? this.StatisticsModel.wordsAllTime = +wordsAllTime : this.StatisticsModel.wordsAllTime = 0;
        

        await this.saveWordsADay();
        await this.saveWordsInLevel();
        await this.saveWordsAllTime();
    }

    async addWords(words) {
        this.StatisticsModel.wordsADay += +words;
        this.saveWordsADay();
        this.StatisticsModel.wordsInLevel -= +words;
        this.saveWordsInLevel();
        this.StatisticsModel.wordsAllTime += +words;
        this.saveWordsAllTime();
    }

}

export default StatisticsController;