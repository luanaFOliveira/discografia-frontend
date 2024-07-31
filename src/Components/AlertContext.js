import React, { createContext, useContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState({
        open: false,
        type: 'success',
        message: '',
    });

    const showAlert = (message, type = 'success') => {
        setAlert({
            open: true,
            type,
            message,
        });
    };

    const handleClose = () => {
        setAlert(prev => ({ ...prev, open: false }));
        window.location.reload();
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Snackbar
                open={alert.open}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }} variant="filled">
                    {alert.message}
                </Alert>
            </Snackbar>
        </AlertContext.Provider>
    );
};
