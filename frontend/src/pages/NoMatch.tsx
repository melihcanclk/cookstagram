import '../styles/notmatch.css';
import CssBaseline from '@mui/material/CssBaseline';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export const NoMatch = () => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>();
    const handleThemeChange = () => {
        // get current theme from local storage
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            if (currentTheme === 'light') {
                localStorage.setItem('theme', 'dark');
                setThemeMode('dark');
            } else {
                localStorage.setItem('theme', 'light');
                setThemeMode('light');
            }
        } else {
            localStorage.setItem('theme', 'dark');
            setThemeMode('dark');
        }
    }

    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
    });

    useEffect(() => {
        handleThemeChange();
    }, []);


    return (
        <ThemeProvider theme={theme}>
            <div id="notfound">
                <CssBaseline />
                <div className="notfound">
                    <div className="notfound-404">
                        <Typography
                            variant="h5"
                            component="div"

                            sx={{ flexGrow: 1 }}
                        >
                            Oops! Page not found
                        </Typography>
                        <h1><span>4</span><span>0</span><span>4</span></h1>
                    </div>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                        we are sorry, but the page you requested was not found
                    </Typography>
                </div>
            </div>
        </ThemeProvider>
    )
}