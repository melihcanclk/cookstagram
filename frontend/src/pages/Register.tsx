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
import { LoginLayout } from '../components/layout/LoginLayout';

export const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const [file, setFile] = useState<any>(null);
    const [themeStorage, setThemeStorage] = useState<'light' | 'dark'>('dark');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openErrorMessage, setOpenErrorMessage] = useState<string>('Unknown error');


    const onSubmit = (data: any) => {
        // make all data trim and lowercase
        data.name = data.name && data.name.trim().toLowerCase();
        data.surname = data.surname && data.surname.trim().toLowerCase();
        data.username = data.username && data.username.trim().toLowerCase();
        data.email = data.email && data.email.trim().toLowerCase();
        data.password = data.password && data.password.trim().toLowerCase();
        console.log({ data })
        // create FormData object
        const formData = new FormData();
        // append data to FormData object
        formData.append('name', data.name);
        formData.append('surname', data.surname);
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);
        formData.append('picture', file);

        const postUser = async () => {
            try {
                const res = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    body: formData,
                });
                const userData = await res.json();

                if (userData.user) {
                    setOpenSuccess(true);
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setOpenError(true);
                    setOpenErrorMessage(data.message);
                }
            } catch (error: any) {
                console.log(error)
                setOpenError(true);
                setOpenErrorMessage(error);
            }
        }
        postUser();
    }

    return (
        <LoginLayout themeStorage={themeStorage} setThemeStorage={setThemeStorage} maxHeight='800px' title='Register'>
           
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
                            children={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    Register
                                </Box>
                            }
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
            <Snackbarie
                open={openSuccess}
                setOpen={setOpenSuccess}
                message='User created successfully, redirecting to login page...'
                severity='success'
                autoHideDuration={2000}
            />
            <Snackbarie
                open={openError}
                setOpen={setOpenError}
                message={openErrorMessage}
                severity='error'
                autoHideDuration={2000}
            />
        </LoginLayout>
    )
}
