export async function fetchMoviesWithFilters(
    token: string,
    page: number,
    sortBy: string,
    genres: number[],
    sortYears: number[]
) {
    const genreParam = genres.length ? `&with_genres=${genres.join(',')}` : '';
    const yearParam = sortYears.length === 2
        ? `&primary_release_date.gte=${sortYears[0]}-01-01&primary_release_date.lte=${sortYears[1]}-12-31`
        : '';

    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ru-RU&page=${page}&sort_by=${sortBy}${genreParam}${yearParam}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) throw new Error('Не удалось загрузить фильмы с фильтрами');

    return await response.json();
}
