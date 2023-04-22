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

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        status: 'creating',
        userData: null,
    },
    extraReducers(builder) {
        builder
            .addCase(createUser.pending, (state, action) => {
                state.status = 'loading';
                state.userData = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userData = action.payload.userData;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.status = 'failed';
                state.userData = null;
            })
    },
});

export default userReducer = userSlice.reducer;