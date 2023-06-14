import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const getWordsCountByLevel = createAsyncThunk("/statistics/getWordsCountByLevel", async(params) => {
    try {
        const {data, status} = await axios.post('/getWordCountByLevel', params);
        return {data: data, status: status};
    } catch (error) {
        
    }
});

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