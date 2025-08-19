import type {GenresApiResponse} from "../aside/filters/filter-types.ts";

export async function GenresRequest(token: string): Promise<GenresApiResponse> {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=ru';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
    };


    const response = await fetch(url, options);
    const json: GenresApiResponse = await response.json();
    return json;
}