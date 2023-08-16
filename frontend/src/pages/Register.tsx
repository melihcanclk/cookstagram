import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LeftArrow } from '../components/svg/LeftArrow';
import { FormFieldError } from '../components/error/FormFieldErrors';
import Dropzone from '../components/Dropzone';
import { purple } from '../styles/colors';
import { Box, CssBaseline, IconButton, TextField, ThemeProvider, Typography, createTheme } from '@mui/material';
import { themeSelector } from '../utils/themeSelector';
import { PurpleButton } from '../components/button/Buttons';
import Snackbarie from '../components/Snackbar';

export const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const [file, setFile] = useState<any>(null);
    const [themeStorage, setThemeStorage] = useState<'light' | 'dark'>('dark');
    const [openSuccess, setOpenSuccess] = useState(false);

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
        // create FormData object
        const formData = new FormData();
        // append data to FormData object
        formData.append('name', data.name);
        formData.append('surname', data.surname);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('picture', file);

        // send FormData object to server
        fetch('http://localhost:3000/register', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.user) {
                    setOpenSuccess(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            })
            .catch(error => {
                console.error(error);
            })

    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box
                    sx={{
                        height: '100vh',
                        width: '100vw',
                    }}

                >
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
                            height: 'inherit',
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
                                maxHeight: '800px',
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
                                        width: '100%',
                                        gap: 1
                                    }}
                                >
                                    <div className="container-form-userName container-form-input">
                                        <TextField
                                            id="name"
                                            placeholder="Name"
                                            fullWidth
                                            variant="outlined"
                                            {...register("name", { required: true })}
                                        />
                                    </div>
                                    {FormFieldError({ errors, fieldname: 'name', placeholder: 'Name' })}

                                    <div className="container-form-userName container-form-input">
                                        <TextField
                                            id="surname"
                                            placeholder="Surname"
                                            fullWidth
                                            variant="outlined"
                                            {...register("surname", { required: true })}
                                        />
                                    </div>
                                    {FormFieldError({ errors, fieldname: 'surname', placeholder: 'Surname' })}
                                    <div className="container-form-userName container-form-input">
                                        <TextField
                                            id="username"
                                            placeholder="Username"
                                            fullWidth
                                            variant="outlined"
                                            {...register("username", { required: true })}
                                        />
                                    </div>
                                    {FormFieldError({ errors, fieldname: 'username', placeholder: 'Username' })}
                                    <div className="container-form-userName container-form-input">
                                        <TextField
                                            id="email"
                                            placeholder="Email"
                                            fullWidth
                                            variant="outlined"
                                            {...register("email", {
                                                pattern: {
                                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                                    message: "Invalid email pattern"
                                                },
                                                required: true
                                            })}
                                        />
                                    </div>
                                    {FormFieldError({ errors, fieldname: 'email', placeholder: 'Email' })}
                                    <div className="container-form-userPassword container-form-input">
                                        <TextField
                                            id="password"
                                            placeholder="Password"
                                            fullWidth
                                            variant="outlined"
                                            type="password"
                                            {...register("password", { required: true, minLength: 6 })}
                                        />
                                    </div>
                                    {FormFieldError({ errors, fieldname: 'password', placeholder: 'Password', min: 6 })}
                                    <div className="container-form-userPassword container-form-input">
                                        <TextField
                                            id="confirm_password"
                                            placeholder="Confirm Password"
                                            fullWidth
                                            variant="outlined"
                                            type="password"
                                            {...register("confirm_password", {
                                                required: true,
                                                minLength: 6,
                                                validate: (value) => value === watch('password')
                                            })}
                                        />
                                    </div>

                                    {FormFieldError({ errors, fieldname: 'confirm_password', placeholder: 'Confirm Password', min: 6, validate: true })}
                                    <Dropzone setFile={setFile} file={file} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}

                                >
                                    <PurpleButton
                                        variant='contained'
                                        width='75%'
                                        color='white'
                                        text='Register'
                                        type='submit'
                                        margin='10px 0px 10px 0px'
                                        backgroundColor={purple[800]}
                                    />
                                </Box>
                            </form>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '10px',
                                    left: '10px',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}
                            >
                                <IconButton
                                    sx={{
                                        height: '50px',
                                        width: '50px',
                                        borderRadius: '50%',
                                    }}
                                    onClick={() => navigate('/login')}>
                                    <LeftArrow
                                        fill={themeStorage === 'dark' ? 'white' : 'black'}
                                    />
                                </IconButton>
                                <Typography
                                    sx={{
                                        color: themeStorage === 'dark' ? 'white' : 'black',
                                        fontSize: '0.875rem',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                    }}
                                >
                                    Login
                                </Typography>

                            </Box>
                        </Box>
                        <Snackbarie
                            open={openSuccess}
                            setOpen={setOpenSuccess}
                            message='User created successfully, redirecting to login page...'
                            severity='success'
                            autoHideDuration={2000}
                        />

                    </Box>
                </Box>
            </ThemeProvider >

        </>
    )
}
