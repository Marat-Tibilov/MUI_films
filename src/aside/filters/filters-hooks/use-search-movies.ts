import {useDispatch} from "react-redux";
import type {AppDispatch} from "../../../store/store.ts";
import {useEffect} from "react";
import {searchMoviesThunk} from "../../../store/slice/filters-fetch-slice.ts";
import {SEARCH_DELAY} from "../default-value.ts";

export default function useSearchMovies(query: string) {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.trim()) {
                dispatch(searchMoviesThunk(query));
            }
        }, SEARCH_DELAY);

        return () => clearTimeout(delay);
    }, [query, dispatch]);
}