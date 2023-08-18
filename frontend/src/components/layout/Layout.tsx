import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { getCookie } from '../../utils/getCookie';
import '../../styles/layout.css'
import { useEffect } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from "../../styles/colors";
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { themeSelector } from "../../utils/themeSelector";

export const Layout = ({ children }: LayoutProps) => {
    const [themeMode, setThemeMode] = useState<'light' | 'dark'>('dark');

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

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            setThemeMode(currentTheme as 'light' | 'dark');
        }
    }, []);



    const theme = createTheme({
        palette: {
            mode: themeMode,
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    colorPrimary: {
                        backgroundColor: themeMode === 'light' ? purple[300] : purple[800],
                    }
                }
            },
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
                        }
                    },
                }
            },
            MuiAccordion: {
                styleOverrides: {
                    root: {
                        '&.MuiAccordion-root': {
                            background: 'transparent',

                            '&.MuiPaper-elevation1': {
                                boxShadow: 'none',
                                border: '1px solid' + purple[900],
                                borderRadius: '12px 12px 0px 12px',
                                '&.Mui-expanded': {
                                    margin: '0px',
                                },
                                ':hover': {
                                    border: '1px solid' + purple[700],
                                },
                            }

                        },

                    },
                }
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        '&.MuiTypography-root': {
                            color: themeMode === 'light' ? 'black' : 'white',
                        },
                    },
                }
            },
            MuiIcon: {
                styleOverrides: {
                    root: {
                        '&.MuiIcon-root': {
                            color: themeMode === 'light' ? 'black' : 'white',
                        },
                    },
                }
            }

        }
    });

    const session = getCookie('session');

    if (!session) {
        window.location.href = '/login';
    }
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Navbar icon={themeSelector[themeMode]} handleThemeChange={handleThemeChange} />
                <main>
                    {children}
                </main>
                <Footer />
            </ThemeProvider>
        </>
    );
}