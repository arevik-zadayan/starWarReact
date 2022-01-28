import {combineReducers, configureStore} from "@reduxjs/toolkit";
import charactersReducer from "./reducers/CharactersSlice";
import characterReducer from "./reducers/CharacterSlice";

const rootReducer = combineReducers({
    charactersReducer,
    characterReducer
})

export const setupStore = () => {
    return configureStore({
            reducer: rootReducer
        }
    )
}



export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']