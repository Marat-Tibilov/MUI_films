import type {Movie} from "../pages/movie-types.ts";

export async function favoriteRequest(token: string, account_id: number, isFavorite: boolean, movieId: number,) {
    const url = `https://api.themoviedb.org/3/account/${account_id}/favorite`;
    const options = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            media_type: 'movie',
            media_id: movieId,
            favorite: !isFavorite,
        }),
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (!response.ok) {
            console.error("Ошибка при изменении избранного:", data);
            return { success: false, data };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Ошибка запроса:", error);
        return {success: false, error}
    }
}

export async function getFavoriteMovies(token: string, accountId: number) {
    const url = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        return data.results?.map((movie: Movie) => movie.id) || [];
    } catch (error) {
        console.error("Ошибка при получении избранных фильмов:", error);
        return [];
    }
}
