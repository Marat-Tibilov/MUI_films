import { token } from "./api-const.ts";

export async function searchMoviesByTitle(query: string) {
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=ru`;

    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        return json.results || [];
    } catch (error) {
        console.error("Ошибка при поиске фильмов:", error);
        return [];
    }
}
