export interface Actor {
    id: number;
    name: string;
}

export interface MovieDetails {
    title: string;
    poster_path: string;
    release_date: string;
    genres: { name: string }[];
    production_countries: { name: string }[];
    runtime: number;
    budget: number;
    vote_average: number;
    overview: string;
    vote_count?: number;
}


export interface Movie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
