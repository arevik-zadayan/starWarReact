import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICharacter} from "../../models/ICharacter";
import {fetchCharacter} from "./ActionCreators";

interface CharacterState {
    character: ICharacter;
    isLoading: boolean;
    error: string;
}

const initialState: CharacterState = {
    character: {
        birth_year: '',
        eye_color: '',
        gender: '',
        hair_color: '',
        height: '',
        mass: '',
        name: '',
        skin_color: '',
    },
    isLoading: false,
    error: ""
}

export const charactersSlice = createSlice({
    name: 'character',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCharacter.fulfilled.type]: (state, action: PayloadAction<ICharacter>) => {
            state.isLoading = false;
            state.error = ''
            state.character = action.payload;
        },
        [fetchCharacter.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchCharacter.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export default charactersSlice.reducer;