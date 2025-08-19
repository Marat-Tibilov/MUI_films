import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import type {PaginationProps} from "../filter-types.ts";

export default function PaginationControlled( {page, setPage }: PaginationProps ) {
    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    return (
        <Stack spacing={2}>
            <Pagination color='primary' count={38} page={page} onChange={handleChange} sx={{
                position: 'absolute',
                bottom: 5,
            }}
            />
        </Stack>
    );
}