import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@mui/material';
import type { SelectProps} from "../filter-types.ts";
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store/store.ts";
import {sortBy} from "../../../store/slice/filters-slice.ts";

const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Популярности' },
    { value: 'vote_average.desc', label: 'Рейтингу' },
];


export default function SortDropdown({ containerClassName, labelText, id }: Omit<SelectProps, 'setMovies'>) {
    const dispatch = useDispatch();
    const selectedValue = useSelector((state: RootState) => state.filters.sortBy);

    return (
        <FormControl variant="standard" fullWidth size="small" className={containerClassName}>
            <InputLabel id={`${id}-label`}>{labelText}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                value={selectedValue}
                label={labelText}
                onChange={(event) => dispatch(sortBy(event.target.value))}
            >
                {SORT_OPTIONS.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
