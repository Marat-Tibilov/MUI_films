import {
    IconButton,
    List,
    Box,
    ListItem,
    Paper,
    TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import SortDropdown from "./select/select.tsx";
import ReleaseYearSlider from "./years/release-slider.tsx";
import GenresTags from "./genres/genres.tsx";
import PagePagination from "./pagination/pagination.tsx";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {resetFilters, selectedGenre} from "../../store/slice/filters-slice.ts";
import useInInitFilters from "./filters-hooks/use-init-filters.ts";
import useSortedMovies from "./filters-hooks/use-sorted-movies.ts";
import useSearchMovies from "./filters-hooks/use-search-movies.ts";
import {ASIDE_STYLES} from "../../styles/filters-styles/aside-styles.ts";

export default function AsideFilters() {
    const dispatch = useDispatch<AppDispatch>();
    const genres = useSelector((state: RootState) => state.films.genres);
    const filters = useSelector((state: RootState) => state.filters);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");

    useInInitFilters();
    useSortedMovies(page, query);
    useSearchMovies(query);

    const selectGenres = useCallback((genreId: number, isChecked: boolean) => {
        dispatch(selectedGenre({ id: genreId, isChecked }));
    }, [dispatch]);

    const onResetFilters = useCallback(() => {
        dispatch(resetFilters());
        setQuery('');
    }, [dispatch]);

    return (
        <Box sx={{ backgroundColor: 'white' }}>
            <Paper elevation={5} sx={ASIDE_STYLES.PAPER}>
                <Box role="presentation">
                    <Box sx={ ASIDE_STYLES.BOX }>
                        <Typography variant="h6" color="black" component="div">
                            Фильтры
                        </Typography>
                        <IconButton>
                            <CloseIcon onClick={onResetFilters} />
                        </IconButton>
                    </Box>
                    <List sx={ ASIDE_STYLES.LIST }>
                        <ListItem>
                            <TextField
                                label="Название фильма"
                                variant="outlined"
                                fullWidth
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                sx={{ mb: 2 }}
                            />
                        </ListItem>
                        <ListItem>
                            <SortDropdown
                                containerClassName='sort-container'
                                labelText='Сортировать по:'
                                id='sort-dropdown'
                            />
                        </ListItem>
                        <ListItem sx={ ASIDE_STYLES.LIST }>
                            <Typography variant="h6" color="black" component="div">
                                Год релиза:
                            </Typography>
                            <ReleaseYearSlider />
                            <GenresTags
                                genres={genres}
                                selectedGenreIds={filters.genres}
                                onSelect={selectGenres}
                            />
                        </ListItem>
                    </List>
                    <PagePagination
                        page={page}
                        setPage={setPage}
                    />
                </Box>
            </Paper>
        </Box>
    );
}
