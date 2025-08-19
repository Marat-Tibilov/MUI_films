import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth-slice.ts';
import filtersReducer from "./slice/filters-slice.ts";
import filmsReducer from "./slice/filters-fetch-slice.ts";
import notificationReducer from "./slice/notification-slice.ts";
import detailsReducer from "./slice/details-slice.ts";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        filters: filtersReducer,
        films: filmsReducer,
        notification: notificationReducer,
        details: detailsReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
