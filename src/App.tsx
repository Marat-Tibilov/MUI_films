import './App.css'
import {CssBaseline} from "@mui/material";
import Header from "./header/header.tsx";
import Box from "@mui/material/Box";
import { Outlet } from 'react-router-dom';
import DefaultPage from "./pages/defaul-page.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "./store/store.ts";
import NotificationSnackbar from "./error/notification-snackbar.tsx";
import {useEffect} from "react";
import {fetchFavoritesThunk} from "./store/slice/filters-fetch-slice.ts";



function App() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const raw = localStorage.getItem("account");
    const accountId = raw ? Number(raw) : null;

    if (isAuth && accountId) {
      dispatch(fetchFavoritesThunk(accountId));
    }
  }, [dispatch, isAuth]);
  return (
    <>
      <CssBaseline/>
        <Header />
        <NotificationSnackbar />
        <Box sx={{ backgroundColor: 'white', minHeight: '100vh', p: 2 }}>
            {isAuth ? <Outlet /> : <DefaultPage />}
        </Box>
    </>
  )
}

export default App
