import type {FilterData} from "./filter-types.ts";

const DEFAULT_YEARS_BY_SORT = [1950, 2025];

const SEARCH_DELAY = 500;


const initialState: FilterData = {
    sortBy: 'popularity',
    sortYears: DEFAULT_YEARS_BY_SORT,
    genres: [],
}

const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w500';

export { initialState, BASE_IMG_URL, SEARCH_DELAY, DEFAULT_YEARS_BY_SORT};