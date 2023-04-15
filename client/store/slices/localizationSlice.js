import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchLocale = createAsyncThunk("localization/fetchLocale", async (loc) => {
    const response = await fetch(`http://192.168.0.12:3000/localization/${loc}`, { method: "GET" });
    const data = await response.json();
    return data;
});

export const localizationSlice = createSlice({
    name: 'localization',
    initialState: {
        locale: 'en',
        data: {},
        status: "loading",
    },
    reducers: {
        setLocale: (state, action) => {
            state.locale = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchLocale.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchLocale.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchLocale.rejected, (state, action) => {
                state.status = 'failed';
            })
    },
});

export const { setLocale } = localizationSlice.actions;

export default localizationReducer = localizationSlice.reducer;