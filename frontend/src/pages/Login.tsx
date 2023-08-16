import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSession } from '../hooks/useSession';
import { LeftArrow } from '../components/svg/LeftArrow';
import { Box, Button, CssBaseline, IconButton, ScopedCssBaseline, TextField, ThemeProvider, createTheme, darkScrollbar } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { purple } from '../styles/colors';
import { PurpleButton } from '../components/button/Buttons';


export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [session] = useSession();
    const [themeStorage, setThemeStorage] = useState<'light' | 'dark'>('dark');


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
                    },
                }
            },
        }
    });

    const handleThemeChange = (theme: string) => {
        localStorage.setItem('theme', theme);
        setThemeStorage(theme as 'light' | 'dark');
    }



    const onSubmit = (data: any) => {
        // post data to backend
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            mode: 'cors',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then((data: LoginResponse) => {
            // redirect to home page
            // save session in cookie
            document.cookie = `session=${data.token}; path=/`;
            // save user in cookie
            document.cookie = `user=${JSON.stringify(
                {
                    id: data.user.id,
                    name: data.user.name,
                    surname: data.user.surname,
                    username: data.user.username,
                    email: data.user.email,
                    picture: data.user.picture.fileName,
                    createdAt: data.user.createdAt,
                    posts: data.user.posts,
                    following: data.user.following,
                    followers: data.user.followers,
                }
            )}; path=/`;
            navigate('/');
        }
        ).catch((error) => {
            console.log(error);
            setError(true);
        });

    }
    const themeSelector = {
        light: <Brightness7Icon />,
        dark: <Brightness4Icon />
    }

    return (
        <>
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
                            maxHeight: '400px',
                            padding: '20px',
                            borderRadius: '12px',
                            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
                            backgroundColor: themeStorage === 'dark' ? '#121212' : '#ffffff',
                        }}

                    >
                        <form onSubmit={
                            handleSubmit(onSubmit)
                        }
                            id='form'
                        >

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1
                                }}
                            >
                                <div className="container-form-userName container-form-input">
                                    <TextField
                                        id="username"
                                        placeholder="Username"
                                        fullWidth
                                        variant="outlined"
                                        {...register("username", { required: true })}
                                    />
                                </div>
                                {errors.username && <span className="error-msg">This field is required</span>}

                                <div className="container-form-userPassword container-form-input">
                                    <TextField
                                        id="password"
                                        placeholder="Password"
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        {...register("password", { required: true })}
                                    />

                                </div>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 2,
                                    borderRadius: '12px',
                                }}

                            >
                                <PurpleButton
                                    variant='contained'
                                    width='75%'
                                    text='Reset'
                                    color='white'
                                    margin='10px 0px 10px 0px'
                                    onClick={() => {
                                        navigate('/register');
                                    }}
                                    backgroundColor={purple[800]}

                                />
                                <PurpleButton
                                    variant='contained'
                                    width='75%'
                                    color='white'
                                    text='Submit'
                                    type='submit'
                                    margin='10px 0px 10px 0px'
                                    backgroundColor={purple[800]}
                                />
                            </Box>
                            {
                                error && <span className="error-msg">Invalid username or password</span>
                            }

                            <div className="info-msg-container">
                                {
                                    session && <span className="info-msg">
                                        <a href="/"><LeftArrow height='24px' width='24px' /></a>
                                        You are already logged in</span>
                                }
                            </div>
                        </form>


                    </Box>
                </Box>
            </ThemeProvider>
        </>
    );
}
