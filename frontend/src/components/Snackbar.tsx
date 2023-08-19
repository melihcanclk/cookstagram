import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';

interface SnackbarieProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    autoHideDuration?: number;
    message?: string;
    severity?: 'success' | 'info' | 'warning' | 'error' | undefined;
}

export default function Snackbarie(props: SnackbarieProps) {
    const { open, setOpen, autoHideDuration, message, severity } = props;

    const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={autoHideDuration || 6000}
                onClose={handleClose}
                message={message || ''}
                action={action}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>

            </Snackbar>
        </div>
    );
}