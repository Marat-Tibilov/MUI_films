import {token} from "./api-const.ts";

const fetchMovieDetails = async (id: string) => {
    const URL = `https://api.themoviedb.org/3/movie/${id}?language=ru-RU`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(URL, options);
    const data = await response.json();
    return data;
};

const fetchActorDetails = async (id: string) => {
    const URL = `https://api.themoviedb.org/3/movie/${id}/credits?language=ru-RU`

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await fetch(URL, options);
    const data = await response.json();
    return data.cast;

}

export { fetchMovieDetails, fetchActorDetails };