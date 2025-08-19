import {initialState} from "../../aside/filters/default-value.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";


const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        sortBy(state, action: PayloadAction<string>) {
            state.sortBy = action.payload;
        },
        sortYears(state, action: PayloadAction<number[]>) {
            state.sortYears = action.payload;
        },
        selectedGenre(state, action: PayloadAction<{ id: number; isChecked: boolean }>) {
            const { id, isChecked } = action.payload;
            if (isChecked) {
                state.genres.push(id);
            } else {
                state.genres = state.genres.filter((genreId) => genreId !== id);
            }
        },
        resetFilters(state) {
            state.sortBy = initialState.sortBy;
            state.sortYears = initialState.sortYears;
            state.genres = initialState.genres;
        },
    },
});

export const { sortBy, sortYears, selectedGenre, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;