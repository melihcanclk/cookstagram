import { Box, CssBaseline, IconButton, ThemeProvider, Typography, createTheme } from '@mui/material'
import { purple } from '@mui/material/colors';
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { themeSelector } from '../../utils/themeSelector';

export const LoginLayout = (props: LoginLayoutProps) => {
    const { children, themeStorage, setThemeStorage, maxHeight, title } = props;

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            setThemeStorage(theme as 'light' | 'dark');
        }
    }, []);

    const theme = createTheme({
        palette: {
            mode: themeStorage,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& label.Mui-focused': {
                            color: 'white',
                        },
                        '& .MuiOutlinedInput-root': {
                            fontSize: '0.875rem',
                            borderRadius: '12px 12px 0px 12px',
                            '& fieldset': {
                                borderColor: purple[900],
                            },
                            '&:hover fieldset': {
                                borderColor: purple[700],
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: purple[400],
                                boxShadow: '0 0 0 3px' + purple[200],
                                border: '1px solid' + purple[400],
                            },
                        },
                        '& input:-webkit-autofill': {
                            // when autofill textfield, change background color to white from blue which is default attribute of mui
                            WebkitBoxShadow: themeStorage === 'dark' ? '0 0 0 1000px #121212 inset' : '0 0 0 1000px #ffffff inset',
                            WebkitTextFillColor: themeStorage === 'dark' ? 'white' : 'black',
                        }
                    },
                }
            },
        }
    });

    const handleThemeChange = (theme: string) => {
        localStorage.setItem('theme', theme);
        setThemeStorage(theme as 'light' | 'dark');
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    right: '0',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <IconButton onClick={
                    () => (themeStorage === 'dark' ? handleThemeChange('light') : handleThemeChange('dark'))
                } >
                    {themeSelector[themeStorage]}
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    width: '100vw',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                        maxWidth: '400px',
                        maxHeight: { maxHeight },
                        padding: '20px',
                        borderRadius: '12px',
                        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                        backgroundColor: themeStorage === 'dark' ? '#121212' : '#ffffff',
                    }}

                >
                    <Box>
                        <Typography
                            variant='h4'
                            sx={{
                                color: themeStorage === 'dark' ? 'white' : 'black',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                mb: 5,
                            }}
                        >
                            {title}
                        </Typography>
                    </Box>
                    {children}
                </Box>
            </Box>
        </ThemeProvider>

    )
}
