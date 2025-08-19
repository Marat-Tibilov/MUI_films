import {
    Card, CardActionArea, CardContent, CardMedia, Box, IconButton,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import type { CardProps } from "../../aside/filters/filter-types";
import { BASE_IMG_URL } from "../../aside/filters/default-value";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import {toggleFavoriteThunk} from "../../store/slice/filters-fetch-slice.ts";
import {FILMS_CARD_STYLES} from "../../styles/card-styles/films-card-styles.ts";

const FilmsCard = ({ id, title, vote_average, poster_path }: CardProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const accountId = localStorage.getItem("account")
        ? Number(localStorage.getItem("account"))
        : null;

    const isFavorite = useSelector((state: RootState) =>
        state.films.favoriteIds.includes(id)
    );

    const handleToggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!accountId) return;
        dispatch(toggleFavoriteThunk({ accountId, movieId: id, isFavorite }));
    };

    return (
        <Card
            onClick={() => navigate(`/films/${id}`)}
            sx={ FILMS_CARD_STYLES.CARD }
        >
            <CardActionArea component="div">
                <CardMedia
                    component="img"
                    height="230"
                    image={BASE_IMG_URL + poster_path}
                    alt={title}
                    sx={ FILMS_CARD_STYLES.CARD_MEDIA }
                />
                <CardContent
                    sx={ FILMS_CARD_STYLES.CARD_CONTENT }
                >
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6" component="div">
                            {title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={ FILMS_CARD_STYLES.TYPOGRAPHY }
                        >
                            Рейтинг: {vote_average}
                        </Typography>
                    </Box>
                    <IconButton onClick={handleToggleFavorite}>
                        <StarIcon color={isFavorite ? "warning" : "disabled"} fontSize="small" />
                    </IconButton>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default FilmsCard;
