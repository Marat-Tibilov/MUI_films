export interface Genre {
    id: number;
    name: string;
}

export interface GenresApiResponse {
    genres: Genre[];
}

export interface FilterData {
    sortBy: string;
    sortYears: number[];
    genres: number[];
}

export interface CardProps {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
}

export interface AsideProps{
    setMovies: (movies: CardProps[]) => void;
}

export interface SelectProps extends AsideProps {
    containerClassName: string;
    labelText: string;
    id: string;
}

export interface PaginationProps {
    setPage: (value: number) => void;
    page: number;
}