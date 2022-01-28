import {createAsyncThunk} from "@reduxjs/toolkit";
import {ICharacter, IResult} from "../../models/ICharacter";
import axios from "axios";


export const fetchCharacters = createAsyncThunk(
    'character/fetchAll',
    async (value: number, thunkAPI) => {
        try {
            const response = await axios.get<IResult[]>(`https://swapi.dev/api/people/?page=${value}`)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить персонажей")
        }
    }
)

export const fetchCharacter = createAsyncThunk(
    'character/fetchCharacter',
    async (url: string, thunkAPI) => {
        try {
            const response = await axios.get<ICharacter[]>(`${url}`)
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue("Не удалось загрузить персонажей")
        }
    }
)