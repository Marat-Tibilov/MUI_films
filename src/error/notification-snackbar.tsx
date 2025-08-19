import { Snackbar, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {hideNotification} from "../store/slice/notification-slice.ts";
import type {RootState} from "../store/store.ts";


const NotificationSnackbar = () => {
    const dispatch = useDispatch();
    const { message, severity, open } = useSelector(
        (state: RootState) => state.notification
    );

    const handleClose = () => {
        dispatch(hideNotification());
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={handleClose} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default NotificationSnackbar;
