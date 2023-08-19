import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSession } from '../hooks/useSession';
import { LeftArrow } from '../components/svg/LeftArrow';
import { Box, TextField, Typography } from '@mui/material';
import { purple } from '../styles/colors';
import { PurpleButton } from '../components/button/Buttons';
import { LoginLayout } from '../components/layout/LoginLayout';


export const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [session] = useSession();
    const [themeStorage, setThemeStorage] = useState<ThemeTypes>('dark');

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

    return (
        <LoginLayout themeStorage={themeStorage} setThemeStorage={setThemeStorage} maxHeight='400px' title='Login'>


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
                            sx={{

                            }}
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
                        children={
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                Login
                            </Box>
                        }
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
        </LoginLayout>
    );
}
