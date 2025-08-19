import { useEffect, useState } from "react";
import {favoriteRequest, getFavoriteMovies} from "../../../api/favorite-request.ts";
import {token} from "../../../api/api-const.ts";


export const useFavoriteStatus = (movieId: number, accountId: number | null, showError: (msg: string) => void) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const fetchFavorites = async () => {
        if (!accountId) return;
        try {
            const favoriteIds = await getFavoriteMovies(token, accountId);
            setIsFavorite(favoriteIds.includes(movieId));
        } catch (err) {
            showError("Не удалось загрузить избранные фильмы.");
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [accountId, movieId]);

    const toggleFavorite = async () => {
        if (!accountId) return;

        const optimisticValue = !isFavorite;
        setIsFavorite(optimisticValue);

        const result = await favoriteRequest(token, accountId, isFavorite, movieId);

        if (!result.success) {
            setIsFavorite(!optimisticValue);
            showError("Не удалось изменить статус избранного. Попробуйте позже.");
        }
    };

    return { isFavorite, toggleFavorite };
};
