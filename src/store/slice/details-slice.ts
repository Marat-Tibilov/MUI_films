import { createAsyncThunk, createSlice, isRejected } from '@reduxjs/toolkit';
import { fetchActorDetails, fetchMovieDetails } from '../../api/details-requst';
import type { MovieDetails, Actor } from '../../pages/movie-types';

interface DetailsState {
    movie: MovieDetails | null;
    actors: Actor[];
    loading: boolean;
    error: string | null;
}

const initialState: DetailsState = {
    movie: null,
    actors: [],
    loading: false,
    error: null,
};

export const fetchDetailsThunk = createAsyncThunk(
    'details/fetch',
    async (id: string) => {
        const [movie, actors] = await Promise.all([
            fetchMovieDetails(id),
            fetchActorDetails(id),
        ]);
        return { movie, actors };
    }
);

const detailsSlice = createSlice({
    name: 'details',
    initialState,
    reducers: {
        resetDetails: (state) => {
            state.movie = null;
            state.actors = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDetailsThunk.fulfilled, (state, action) => {
                state.movie = action.payload.movie;
                state.actors = action.payload.actors.slice(0, 7);
                state.loading = false;
            })
            .addMatcher(isRejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message || 'Ошибка при загрузке деталей';
            });
    },
});

export const { resetDetails } = detailsSlice.actions;
export default detailsSlice.reducer;
