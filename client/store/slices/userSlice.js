import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios.js';

export const createUser = createAsyncThunk("user/createUser", async (params) => {
    try {
        const { data, status } = await axios.post('/auth/register', params);
        return {userData: data, status: status};
    } catch (error) {
        return {userData: error.response.data.message, status: error.response.status}
    }
});

export const fetchUser = createAsyncThunk("user/fetchUser", async (params) => {
    try {
        const { data, status } = await axios.post('/auth/login', params);
        return {userData: data, status: status};
    } catch (error) {
        return {userData: error.response.data.message, status: error.response.status}
    }
});

export const addWords = createAsyncThunk("user/addWords", async (params) => {
    try {
        const {res, status } = await axios.post('/addWords', params);
        return {data: res, status: status};
    } catch (error) {
        return {data: error.response.data.message, status: error.response.status};
    }
})

export const getNewWords = createAsyncThunk("getNewWords", async (params) => {
    try {
        const {data, status} = await axios.post('/getWordsToLearn', params);
        console.log("Data from slice", data);
        return {data: data, status: status};
    }
    catch (error) {
        console.log(error);
        return {data: error.response.data.message, status: error.response.status};
    }
});

export const getAllWords = createAsyncThunk("getAllWords", async (params) => {
    try {
        const {data, status} = await axios.get("getAllWords", params);
        return {data: data, status: status};
    } catch (error) {
        console.log(error);
        return {data: error.response.data.message, status: error.response.status};
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'loading',
        userData: {
            personalData: {
                id: '',
                token: '',
            },
            words: {}
        }
    },
    reducers: {
        setId: (state, data) => {
            state.userData.personalData.id = data.payload;
        },
        setToken: (state, data) => {
            state.userData.personalData.token = data.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.status = 'loading';
                state.userData.personalData = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData.personalData = action.payload;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.userData.personalData = null;
            })
            .addCase(getNewWords.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload.data);
                state.userData.words = action.payload.data;
            })
    },
});

export const { setId, setToken } = userSlice.actions;
export default userReducer = userSlice.reducer;