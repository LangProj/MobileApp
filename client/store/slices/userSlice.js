import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios.js';
import * as FileSystem from 'expo-file-system';

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

export const addWordsLocaly = createAsyncThunk("user/addWords", async (data) => {
    try {
        if (data != null) {
            const path = `${FileSystem.documentDirectory}/words/words.json`;
            await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/words/`, { intermediates: true });

            const dataStr = JSON.stringify(data);
            await FileSystem.writeAsStringAsync(path, dataStr, {
                encoding: FileSystem.EncodingType.UTF8
            })
                .then(() => console.log("Created file with all words"))
                .catch((err) => console.log("Failed to create file with all words:", err));
        }
        //const {res, status } = await axios.post('/addWords', params);
    } catch (error) {
        //return {data: error.response.data.message, status: error.response.status};
    }
});

export const addNewWordsToDB = createAsyncThunk("user/addNewWordsToDB", async ({data, token}) => {
    try {
        const {res, status} = await axios.patch('/addNewWords', data, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        console.log(res);
        return {data: res, status: status};
    } catch (error) {
        console.log("Error", error);
        return {data: error.response.data.message, status: error.response.status};
    }
});

// Returns words from file on user`s device
export const fetchAllWords = createAsyncThunk("user/fetchAllWords", async() => {
    const path = `${FileSystem.documentDirectory}/words/words.json`;
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/words/`, { intermediates: true });

    let res = await FileSystem.readAsStringAsync(path, {
        encoding: FileSystem.EncodingType.UTF8
    })
    .then(async (data) => {
        return await JSON.parse(data);
    })
    .catch(async (err) => {
        console.log(err);
        return {};
    });
    return res;
});

export const getNewWords = createAsyncThunk("getNewWords", async ({params, token}) => {
    try {
        const {data, status} = await axios.post('/getWordsToLearn', params, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });
        return {data: data, status: status};
    }
    catch (error) {
        console.log(error);
        return {data: error.response.data.message, status: error.response.status};
    }
});
// currently is not used
export const getAllWords = createAsyncThunk("getAllWords", async (params) => {
    try {
        const {data, status} = await axios.get("getAllWords", params);
        return {data: data, status: status};
    } catch (error) {
        console.log(error);
        return {data: error.response.data.message, status: error.response.status};
    }
});

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'loading',
        userData: {
            personalData: {
                id: '',
                token: '',
            },
            words: []
        }
    },
    reducers: {
        setId: (state, data) => {
            state.userData.personalData.id = data.payload;
        },
        setToken: (state, data) => {
            state.userData.personalData.token = data.payload;
        },
        setWords: (state, data) => {
            state.userData.words = data.payload;
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
            .addCase(getNewWords.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(getNewWords.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData.words = action.payload.data;
            })
            .addCase(getNewWords.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addWordsLocaly.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addWordsLocaly.fulfilled, (state, action) => {
                state.status = 'success';
            })
            .addCase(addWordsLocaly.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(addNewWordsToDB.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addNewWordsToDB.fulfilled, (state, action) => {
                state.status = 'success';
                state.words = action.payload.data;
            })
            .addCase(addNewWordsToDB.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(fetchAllWords.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchAllWords.fulfilled, (state, action) => {
                state.status = 'success';
                state.userData.words = action.payload;
            })
            .addCase(fetchAllWords.rejected, (state, action) => {
                state.status = 'failed';
            })
    },
});

export const { setId, setToken, setWords } = userSlice.actions;
export default userReducer = userSlice.reducer;