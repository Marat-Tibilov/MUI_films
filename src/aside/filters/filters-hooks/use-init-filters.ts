import {useEffect} from "react";
import {fetchFavoritesThunk, fetchGenresThunk} from "../../../store/slice/filters-fetch-slice.ts";
import {showNotification} from "../../../store/slice/notification-slice.ts";
import type {AppDispatch} from "../../../store/store.ts";
import {useDispatch} from "react-redux";


export default function useInInitFilters() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchGenresThunk())
            .unwrap()
            .catch(() => {
                dispatch(showNotification({
                    message: "Не удалось загрузить жанры.",
                    severity: "error"
                }))
            })

        const accountId = localStorage.getItem("account")
            ? Number(localStorage.getItem("account"))
            : null;

        if (accountId) {
            dispatch(fetchFavoritesThunk(accountId))
                .unwrap()
                .catch(() => {
                    dispatch(showNotification({
                        message: "Не удалось загрузить избранные фильмы.",
                        severity: "error"
                    }));
                });
        }
    }, [dispatch]);
}