import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    isAuthenticated: localStorage.getItem('isAuth') === 'true',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
            localStorage.setItem('isAuth', 'true');
        },
    },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
