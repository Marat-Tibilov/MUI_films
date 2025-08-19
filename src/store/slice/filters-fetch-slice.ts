import { createAsyncThunk, createSlice, isRejected } from '@reduxjs/toolkit';
import {fetchMoviesWithFilters} from '../../api/movies-request.ts';
import { searchMoviesByTitle } from '../../api/search-movie.ts';
import { GenresRequest } from '../../api/genres-request.ts';
import { favoriteRequest, getFavoriteMovies } from '../../api/favorite-request.ts';
import { token } from '../../api/api-const.ts';
import type {CardProps, Genre} from "../../aside/filters/filter-types.ts";
import type {RootState} from "../store.ts";


interface FilmState {
    movies: CardProps[];
    genres: Genre[];
    favoriteIds: number[];
    loading: boolean;
    error: string | null;
}

const initialState: FilmState = {
    movies: [],
    genres: [],
    favoriteIds: [],
    loading: false,
    error: null,
};

export const fetchSortedMoviesThunk = createAsyncThunk(
    'films/fetchSorted',
    async ({ sortBy, page }: { sortBy: string; page: number }, { getState }) => {
        const state = getState() as RootState;
        const genres = state.filters.genres;
        const sortYears = state.filters.sortYears;

        const res = await fetchMoviesWithFilters(token, page, sortBy, genres, sortYears);
        return res.results;
    }
);

export const searchMoviesThunk = createAsyncThunk(
    'films/search',
    async (query: string) => {
        const res = await searchMoviesByTitle(query);
        return res;
    }
);

export const fetchGenresThunk = createAsyncThunk(
    'films/genres',
    async () => {
        const res = await GenresRequest(token);
        return res.genres;
    }
);

export const fetchFavoritesThunk = createAsyncThunk(
    'films/fetchFavorites',
    async (accountId: number) => {
        const ids = await getFavoriteMovies(token, accountId);
        return ids;
    }
);

export const toggleFavoriteThunk = createAsyncThunk(
    'films/toggleFavorite',
    async ({ accountId, movieId, isFavorite }: { accountId: number; movieId: number; isFavorite: boolean }) => {
        const res = await favoriteRequest(token, accountId, isFavorite, movieId);
        return { movieId, success: res.success };
    }
);

const filmSlice = createSlice({
    name: 'films',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSortedMoviesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSortedMoviesThunk.fulfilled, (state, action) => {
                state.movies = action.payload;
                state.loading = false;
            })
            .addCase(searchMoviesThunk.fulfilled, (state, action) => {
                state.movies = action.payload;
            })
            .addCase(fetchGenresThunk.fulfilled, (state, action) => {
                state.genres = action.payload;
            })
            .addCase(fetchFavoritesThunk.fulfilled, (state, action) => {
                state.favoriteIds = action.payload;
            })
            .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
                const { movieId, success } = action.payload;
                if (success) {
                    const exists = state.favoriteIds.includes(movieId);
                    state.favoriteIds = exists
                        ? state.favoriteIds.filter((id) => id !== movieId)
                        : [...state.favoriteIds, movieId];
                }
            })
            .addMatcher(isRejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || 'Ошибка запроса';
            });
    },
});

export default filmSlice.reducer;
