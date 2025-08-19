import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { IconButton } from "@mui/material";
import { AccountCircle } from '@mui/icons-material';
import AuthModal from "./modal.tsx";
import {useDispatch} from "react-redux";
import { login} from "../store/slice/auth-slice.ts";
import type {AppDispatch} from "../store/store.ts";


export default function Header() {
    const dispatch = useDispatch<AppDispatch>();


    const [open, setOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const handleOpen = () => {
        setActiveModal('email');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setActiveModal(null);
    };

    const handleAuth = () => {
        dispatch(login());
        setOpen(false);
        setActiveModal(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Фильмы
                    </Typography>
                    <IconButton
                        onClick={handleOpen}
                        sx={{ color: 'inherit' }}
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>


            <AuthModal
                open={open}
                handleClose={handleClose}
                activeModal={activeModal}
                onAuth={handleAuth}
                setActiveModal={setActiveModal}
            />
        </Box>
    );
}
