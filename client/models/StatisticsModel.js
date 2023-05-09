
class StatisticsModel {
    constructor() {
        this.wordsADay = 0;
        this.wordsAllTime = 0;
        this.wordsInLevel = 0;
    }
    
    get wordsADay() {
        return this._wordsAday;
    }
    get wordsAllTime() {
        return this._wordsAllTime;
    }
    get wordsInLevel() {
        return this._wordsInLevel;
    }

    set wordsADay(wordsAmount) {
        this._wordsAday = wordsAmount;
    }
    set wordsAllTime(wordsAmount) {
        this._wordsAllTime = wordsAmount;
    }
    set wordsInLevel(wordsAmount) {
        this._wordsInLevel = wordsAmount;
    }
}

export default StatisticsModel;