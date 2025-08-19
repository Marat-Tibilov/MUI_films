import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../../store/store.ts";
import {fetchSortedMoviesThunk} from "../../../store/slice/filters-fetch-slice.ts";
import {useEffect} from "react";


export default function useSortedMovies(page: number, query: string) {
    const dispatch = useDispatch<AppDispatch>();
    const filters = useSelector((state: RootState) => state.filters);

    useEffect(() => {
        if (query.trim() === "") {
            dispatch(fetchSortedMoviesThunk({ sortBy: filters.sortBy, page }));
        }
    }, [dispatch, filters.sortBy, filters.sortYears, filters.genres, page, query]);
}