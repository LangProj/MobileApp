import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const updateSettings = createAsyncThunk("user/updateSettings", async (params) => {
    try {
        const { settings, status } = await axios.post('/updateSettings', params);
        return {data: settings, status: status};
    } catch (error) {
        return {data: error.response.data.message, status: error.response.status};
    }
});

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        status: 'loading',
        settings: {
            username: '',
            avatar: '',
            wordsPerDay: 10,
            level: 'A1',
            appLanguage: '',
        },
    },
    reducers: {
        setUsername: (state, data) => {
            state.settings.username = data.payload;
        },
        setAvatar: (state, data) => {
            state.settings.avatar = data.payload;
        },
        setWordsPerDay: (state, data) => {
            console.log("Words per date from set in slice", data.payload);
            state.settings.wordsPerDay = data.payload;
        },
        setLevel: (state, data) => {
            state.settings.level = data.payload;
        },
        setMotherTongue: (state, data) => {
            state.settings.appLanguage = data.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(updateSettings.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(updateSettings.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.settings = action.payload;
        })
        .addCase(updateSettings.rejected, (state, action) => {
            state.status = 'failed';
        })
    },
});

export const { setUsername, setAvatar, setWordsPerDay, setLevel, setMotherTongue } = settingsSlice.actions;
export default settingsReducer = settingsSlice.reducer;