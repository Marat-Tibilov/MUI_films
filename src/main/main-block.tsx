import Box from "@mui/material/Box";
import AsideFilters from "../aside/filters/filters.tsx";
import FilmsCard from "../films/card/card.tsx";
import type {RootState} from "../store/store.ts";
import {useSelector} from "react-redux";
import {MAIN_BLOCK_STYLES} from "../styles/main-block-styles/main-block-styles.ts";


export default function MainBlock() {
    const movies = useSelector((state: RootState) => state.films.movies);

    return(
        <Box sx={ MAIN_BLOCK_STYLES.FIRST_BOX }>
            <Box sx={ MAIN_BLOCK_STYLES.SECOND_BOX }>
                <AsideFilters />
            </Box>
            <Box sx={ MAIN_BLOCK_STYLES.THIRD_BOX }>
                {movies.map(movie => (
                    <FilmsCard
                        key={movie.id}
                        id={movie.id}
                        title={movie.title}
                        vote_average={movie.vote_average}
                        poster_path={movie.poster_path}
                    />
                ))}
            </Box>
        </Box>
    )
}