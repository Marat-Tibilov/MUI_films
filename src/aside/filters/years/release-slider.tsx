import { Box, Slider } from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import type {RootState} from "../../../store/store.ts";
import {sortYears} from "../../../store/slice/filters-slice.ts";
import {RELEASE_STYLES} from "../../../styles/filters-styles/release-styles.ts";

export default function ReleaseYearSlider() {
    const dispatch = useDispatch();
    const selectedValue = useSelector((state: RootState) => state.filters.sortYears);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            dispatch(sortYears(newValue));
        }
    };

    if (!selectedValue) return null;

    return (
        <Box sx={{ px: 2, width: '100%' }}>
            <Slider
                value={selectedValue}
                onChange={handleChange}
                valueLabelDisplay="on"
                min={1950}
                max={2025}
                step={1}
                disableSwap
                sx={ RELEASE_STYLES }
            />
        </Box>
    );
}
