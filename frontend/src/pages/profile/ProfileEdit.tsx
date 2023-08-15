import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout'
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, IconButton, TextField, Typography } from '@mui/material'
import { getUserLoggedIn } from '../../utils/getUserLoggedIn';
import { PurpleButton } from '../../components/button/Buttons';
import { getCookie } from '../../utils/getCookie';
import { getImage } from '../../utils/getImage';
import { purple } from '@mui/material/colors';
import { useForm } from 'react-hook-form';
import { FormFieldError } from '../../components/error/FormFieldErrors';
import { EditImage } from './EditImage';
import Snackbarie from '../../components/Snackbar';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export const ProfileEdit = () => {

    const [user, setUser] = useState<UserType>();
    const [file, setFile] = useState<any>();
    const [image, setImage] = useState<string>('');
    const [openSuccess, setOpensuccess] = useState<boolean>(false);
    const [openError, setOpenerror] = useState<boolean>(false);
    const [openPasswordError, setOpenPasswordError] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordConfirm = () => {
        setShowPasswordConfirm(!showPasswordConfirm);
    };


    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

    const onSubmit = (data: any) => {
        const { name, surname, username, email, password, password_confirm } = data;
        const editUser = async () => {
            const session = getCookie('session')
            try {
                if (password !== password_confirm) {
                    throw new Error('Passwords do not match')
                }
            } catch (error) {
                setOpenerror(true)
            }

            if (session) {
                const formData = new FormData();
                formData.append('name', name);
                formData.append('surname', surname);
                formData.append('username', username);
                formData.append('email', email);
                formData.append('password', password);
                if (file) {
                    formData.append('picture', file);
                }

                try {
                    const res = await fetch('http://localhost:3000/users/' + user?.username, {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${session}`
                        },
                        body: formData
                    })
                    const data = await res.json()
                    if (file) {
                        window.location.reload()
                    } else {
                        setFile(null)
                        setValue('password', '')
                        setValue('password_confirm', '')
                        setOpensuccess(true)
                    }

                } catch (error) {
                    setOpenerror(true)
                }
            }
        }
        if (user)
            editUser()
    }

    const handleReset = () => {
        setValue('name', user?.name)
        setValue('surname', user?.surname)
        setValue('username', user?.username)
        setValue('email', user?.email)
        setValue('password', '')
        setValue('password_confirm', '')
        setFile(null)

    }


    useEffect(() => {
        getUserLoggedIn(setUser);
    }, [])

    const fetchImage = async () => {
        if (user) {
            await getImage({ setImageBase64: setImage, user: user })
        }
    }

    useEffect(() => {
        fetchImage();
    }, [user]);

    useEffect(() => {
        if (user) {
            setValue('name', user.name)
            setValue('surname', user.surname)
            setValue('username', user.username)
            setValue('email', user.email)
        }
    }, [user])



    return (
        <Layout>
            <Box sx={{ display: 'flex', justifyContent: 'center', height: '100px' }}>
                <h1>Edit your profile</h1>
            </Box>

            <EditImage file={file} setFile={setFile} image={image} user={user} />
            <Box
                component="form"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} >

                        <TextField
                            fullWidth
                            {...register('name', { required: true })}
                            id="name"
                            variant="outlined"
                        />
                        {FormFieldError({ errors, fieldname: 'name', placeholder: 'Name' })}
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <TextField
                            fullWidth
                            {...register('surname', { required: true })}
                            id="surname"
                            placeholder='Surname'
                            variant="outlined"
                        />
                        {FormFieldError({ errors, fieldname: 'surname', placeholder: 'Surname' })}

                    </Grid>
                    <Grid item xs={12} sm={6} >

                        <TextField
                            fullWidth
                            id="username"
                            {...register('username', { required: true })}
                            placeholder='Username'
                            variant="outlined"
                        />
                        {FormFieldError({ errors, fieldname: 'username', placeholder: 'Username' })}

                    </Grid>
                    <Grid item xs={12} sm={6}>

                        <TextField
                            fullWidth
                            id="email"
                            {...register("email", {
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                    message: "Invalid email pattern"
                                },
                                required: true
                            })}
                            placeholder='Email'
                            variant="outlined"
                        />
                        {FormFieldError({ errors, fieldname: 'email', placeholder: 'Email' })}

                    </Grid>

                    <Grid item xs={12} sm={12}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Password</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="password"
                                                {...register("password", { minLength: 6 })}
                                                placeholder='Password'
                                                variant="outlined"
                                                type={showPassword ? 'text' : 'password'}
                                                // show endAdornment
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    )
                                                }}

                                            />
                                            {FormFieldError({ errors, fieldname: 'password', placeholder: 'Password', min: 6 })}

                                        </Grid>
                                        <Grid item xs={12} sm={6}>

                                            <TextField
                                                fullWidth
                                                id="password_confirm"
                                                {...register("password_confirm", {
                                                    minLength: 6,
                                                    validate: (value) => value === watch('password')
                                                })}
                                                type={showPasswordConfirm ? 'text' : 'password'}
                                                // show endAdornment
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPasswordConfirm}
                                                        >
                                                            {showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    )
                                                }}
                                                placeholder='Password Confirm'
                                                variant="outlined"
                                            />
                                            {FormFieldError({ errors, fieldname: 'password_confirm', placeholder: 'Confirm Password', min: 6, validate: true })}

                                        </Grid>
                                    </Grid>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                    </Grid>


                    <Grid item xs={12} sm={12}>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                width: '100%'
                            }}
                            gap={3}
                        >
                            <PurpleButton
                                variant='contained'
                                width='75%'
                                text='Reset'
                                margin='10px 0px 10px 0px'
                                onClick={handleReset}
                                backgroundColor={purple[800]}

                            />
                            <PurpleButton
                                variant='contained'
                                width='75%'
                                text='Submit'
                                type='submit'
                                margin='10px 0px 10px 0px'
                                backgroundColor={purple[800]}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Snackbarie
                open={openSuccess}
                setOpen={setOpensuccess}
                message='Profile updated successfully'
                severity='success'
            />
            <Snackbarie
                open={openError}
                setOpen={setOpenerror}
                message='Error updating profile'
                severity='error'
            />
            <Snackbarie
                open={openPasswordError}
                setOpen={setOpenPasswordError}
                message='Passwords do not match'
                severity='error'
            />
        </Layout >
    )
}
