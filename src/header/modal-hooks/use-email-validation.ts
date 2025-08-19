import {type ChangeEvent, useState} from "react";


export const useEmailValidation = () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        if (!value) {
            setEmailError("Email обязателен");
        } else if (!validateEmail(value)) {
            setEmailError("Невалидный email");
        } else {
            setEmailError('');
        }
    };

    return {
        email,
        emailError,
        handleEmailChange,
        setEmailError,
        setEmail
    }

}