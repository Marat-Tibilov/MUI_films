import { Button, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import type {FC} from "react";
import {useEmailValidation} from "./modal-hooks/use-email-validation.ts";
import {useTokenValidation} from "./modal-hooks/use-token-validation.ts";
import {AUTH_MODAL_STYLES} from "../styles/modal-styles/auth-modal-styles.ts";


interface ModalProps {
    open: boolean;
    handleClose: () => void;
    activeModal: string | null;
    onAuth: () => void;
    setActiveModal: (value: string | null) => void;
}

const AuthModal: FC<ModalProps> = ({open, handleClose, activeModal,  setActiveModal,}: ModalProps) => {
    const {email, emailError, handleEmailChange, setEmailError, setEmail} = useEmailValidation();
    const {userToken, tokenError, handleTokenChange, handleCheckToken} = useTokenValidation()


    const handleRequestToken = () => {
        if (!emailError && email) {
            setEmail('');
            setEmailError('');
            setActiveModal('token');
        }
    };


    return (
        <Modal open={open} onClose={handleClose}>
            <Paper
                sx={ AUTH_MODAL_STYLES.PAPER }
            >
                {activeModal === 'email' && (
                    <>
                        <Typography variant="h5">Запросить токен</Typography>
                        <TextField
                            label="Email"
                            fullWidth
                            variant="outlined"
                            value={email}
                            onChange={handleEmailChange}
                            error={!!emailError}
                            helperText={emailError}
                        />
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button onClick={handleClose}>Отмена</Button>
                            <Button
                                variant="text"
                                onClick={handleRequestToken}
                                disabled={!email || !!emailError}
                            >
                                Запросить
                            </Button>
                        </Stack>
                    </>
                )}

                {activeModal === 'token' && (
                    <>
                        <Typography variant="h5">Введите токен</Typography>
                        <TextField
                            label="Token"
                            fullWidth
                            variant="outlined"
                            value={userToken}
                            onChange={handleTokenChange}
                            error={!!tokenError}
                            helperText={tokenError}
                        />
                        <Stack direction="row" spacing={2} justifyContent="flex-end">
                            <Button onClick={handleClose}>Отменить</Button>
                            <Button variant="text" onClick={handleCheckToken}>Ок</Button>
                        </Stack>
                    </>
                )}
            </Paper>
        </Modal>
    );
};

export default AuthModal;
