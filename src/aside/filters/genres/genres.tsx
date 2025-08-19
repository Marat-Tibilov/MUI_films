import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import type {SyntheticEvent} from "react";
import type { Genre} from "../filter-types.ts";

interface GenresTagsProps {
    genres: Genre[];
    selectedGenreIds: number[];
    onSelect: (genreId: number, isChecked: boolean) => void;
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function GenresTags({ genres, selectedGenreIds, onSelect }: GenresTagsProps) {
    const selectedValue = genres.filter(genre => selectedGenreIds.includes(genre.id));

    const handleChange = (_: SyntheticEvent<Element | Event>, value: Genre[]) => {
        const selectedIds = value.map(item => item.id);

        genres.forEach((genre) => {
            const isChecked = selectedIds.includes(genre.id);
            const wasChecked = selectedGenreIds.includes(genre.id);

            if (wasChecked !== isChecked) {
                onSelect(genre.id, isChecked);
            }
        });
    };

    return (
        <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={genres}
            disableCloseOnSelect
            value={selectedValue}
            getOptionLabel={(option) => option.name}
            onChange={handleChange}
            renderOption={(props, option, { selected }) => {
                const { key, ...optionProps } = props;
                return (
                    <li key={key} {...optionProps}>
                        <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.name}
                    </li>
                );
            }}
            fullWidth
            style={{ width: "25vh" }}
            renderInput={(params) => (
                <TextField {...params} label="Жанры" />
            )}
        />
    );
}

