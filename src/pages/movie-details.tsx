import { useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableRow,
    CircularProgress,
    IconButton,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {BASE_IMG_URL} from "../aside/filters/default-value.ts";
import type {AppDispatch, RootState} from "../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {fetchDetailsThunk} from "../store/slice/details-slice.ts";
import {showNotification} from "../store/slice/notification-slice.ts";
import {FILM_DETAILS_STYLES} from "../styles/details-styles/movie-details-styles.ts";

const hours = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const min = minutes % 60;
    return `${hours}:${min}`;
}

const FilmDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { movie, actors, loading } = useSelector((state: RootState) => state.details);

    useEffect(() => {
        if (id) {
            dispatch(fetchDetailsThunk(id))
                .unwrap()
                .catch(() => {
                    dispatch(showNotification({
                        message: "Ошибка при загрузке деталей фильма",
                        severity: "error"
                    }))
                })
        }
    }, [id, dispatch]);

    if (loading) return <CircularProgress />;
    if (!movie) return <Typography>Фильм не найден</Typography>;

    return (
        <Box
            sx={ FILM_DETAILS_STYLES.MAIN_BOX }
        >
            <Box>
                {movie.poster_path && (
                    <Box
                        component="img"
                        src={`${BASE_IMG_URL}${movie.poster_path}`}
                        alt={movie.title}
                        sx={ FILM_DETAILS_STYLES.POSTER_BOX }
                    />
                )}
            </Box>

            <Box sx={{ flex: 1 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    {movie.title} ({movie.release_date.slice(0, 4)})
                </Typography>

                <IconButton
                    onClick={() => navigate("/")}
                    sx={{
                        width: "35px",
                        height: "60px",
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                <Box sx={ FILM_DETAILS_STYLES.ACTOR_BOX }>
                    {actors.map(actor => (
                        <Typography key={actor.id} variant="h5">
                            {actor.name}
                        </Typography>
                    ))}
                </Box>

                <Typography variant="h4" component="h2" gutterBottom>
                    Детали
                </Typography>

                <Table size="medium" sx={{ maxWidth: 500 }}>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ border: 'none' }}>Страна</TableCell>
                            <TableCell sx={{ border: 'none' }}>{movie.production_countries[0]?.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: 'none' }}>Год</TableCell>
                            <TableCell sx={{ border: 'none' }}>{movie.release_date.slice(0, 4)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: 'none' }}>Жанр</TableCell>
                            <TableCell sx={{ border: 'none' }}>{movie.genres.map(g => g.name).join(', ')}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: 'none' }}>Бюджет</TableCell>
                            <TableCell sx={{ border: 'none' }}>{movie.budget}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: 'none' }}>Зрители</TableCell>
                            <TableCell sx={{ border: 'none' }}>{movie.vote_count}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ border: 'none' }}>Время</TableCell>
                            <TableCell sx={{ border: 'none' }}>{movie.runtime} мин / {hours(movie.runtime)} </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        </Box>
    );
};

export default FilmDetails;