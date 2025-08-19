import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

type Severity = 'success' | 'error' | 'info' | 'warning';

interface NotificationState {
    message: string | null;
    severity: Severity;
    open: boolean;
}

const initialState: NotificationState = {
    message: null,
    severity: 'info',
    open: false,
};

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (
            state,
            action: PayloadAction<{ message: string; severity?: Severity }>
        ) => {
            state.message = action.payload.message;
            state.severity = action.payload.severity || 'info';
            state.open = true;
        },
        hideNotification: (state) => {
            state.open = false;
            state.message = null;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
