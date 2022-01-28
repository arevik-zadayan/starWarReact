import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IResult} from "../../models/ICharacter";
import {fetchCharacters} from "./ActionCreators";

interface CharacterState {
    characters: Array<IResult>;
    isLoading: boolean;
    error: string;
}

const initialState: CharacterState = {
    characters: [],
    isLoading: false,
    error: ""
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchCharacters.fulfilled.type]: (state, action: PayloadAction<IResult>) => {
            state.isLoading = false;
            state.error = ''
            state.characters = action.payload.results;
        },
        [fetchCharacters.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchCharacters.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

export default charactersSlice.reducer;