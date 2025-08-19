import {type ChangeEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {testToken, token} from "../../api/api-const.ts";
import {accountRequest} from "../../api/account-request.ts";
import type {AppDispatch} from "../../store/store.ts";
import {login} from "../../store/slice/auth-slice.ts";



export const useTokenValidation = () => {
    const [userToken, setToken] = useState('');
    const [tokenError, setTokenError] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    const handleTokenChange = (e: ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value);
        setTokenError('');
    };

    const handleCheckToken = () => {
        if (userToken === testToken) {
            setToken('');
            setTokenError('');
            dispatch(login());
            accountRequest(token);
        } else {
            setTokenError('Неверный токен');
        }
    };

    return{
        userToken,
        tokenError,
        handleTokenChange,
        handleCheckToken,
    }
}