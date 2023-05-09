import {createSlice} from '@reduxjs/toolkit';


export const statisticsSlice = createSlice({
    name: 'statistics',
    initialState: {
        status: 'loading',
        wordsADay: 0,
        wordsAllTime: 0,
        wordsInLevel: 0,
    },
    reducers: {
        setWordsADay: (state, data) => {
            state.wordsADay = data.payload;
        },
        setWordsAllTime: (state, data) => {
            state.wordsAllTime = data.payload;
        },
        setWordsInLevel: (state, data) => {
            state.wordsInLevel = data.payload;
        }
    },
});

export const { setWordsADay, setWordsAllTime, setWordsInLevel } = statisticsSlice.actions;
export default statisticsReducer = statisticsSlice.reducer;