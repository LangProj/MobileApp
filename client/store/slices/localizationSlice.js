import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from '../../axios.js';
import * as FileSystem from 'expo-file-system';
import defaultLang from "../../assets/lang/defaultLang.json";


export const fetchLocale = createAsyncThunk("localization/fetchLocale", async (loc) => {
    // 1 - проверить есть ли файл с нужной локалью
    // 2 - если нет то попробовать загрузить с сервера
    // 3 - если не вышло то загрузить стандартную локаль, которая хранится на устр пользователя и создается при загрузке приложения через установочный пакет приложения

    const path = `${FileSystem.documentDirectory}/lang/${loc}.json`;
    await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}/lang/`, { intermediates: true });

    try {
        console.log("Fetching from client files...");
        let res = await FileSystem.readAsStringAsync(path, {
            encoding: FileSystem.EncodingType.UTF8
        })
        .then((data) => {
            console.log("Loaded from locale file", data);
            return JSON.parse(data);
        })
        .catch(async (error) => {
            console.log("Fetching from server...");
            const {data, status} = await axios.get(`/localization/${loc}`, {
                validateStatus: function (status) {
                    return status >= 200 && status < 300;
                },
                timeout: 3000
            })
                .then(async (response) => {
                    const dataStr = JSON.stringify(response.data);
                    await FileSystem.writeAsStringAsync(path, dataStr, {
                        encoding: FileSystem.EncodingType.UTF8
                    })
                        .then(() => console.log("Created new locale file"))
                        .catch((err) => console.log("Failed to create new locale file:", err));
                    return response;
                })
                .catch(async (error) => {
                    console.log("Fetching default locale...");
                    console.log(defaultLang);
                    // const defaultPath = `${FileSystem.documentDirectory}/lang/default.json`;
                    // const data = await FileSystem.readAsStringAsync(defaultPath, {
                    //     encoding: FileSystem.EncodingType.UTF8
                    // })
                    //     .then(res => {
                    //         console.log("Successfully loaded default file", res);
                    //         return res;
                    //     })
                    //     .catch(err => {
                    //         console.log("Error while loading default file", err);
                    //     })
                    return {data: defaultLang};
                });
            return data;
        });
        return res;
    } catch (error) {
        console.log("Unknown error", error);
    }
});

export const localizationSlice = createSlice({
    name: 'localization',
    initialState: {
        locale: 'en_US',
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