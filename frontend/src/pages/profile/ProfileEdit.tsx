import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout'
import { Box, Button, Grid, TextField, } from '@mui/material'
import { getUserLoggedIn } from '../../utils/getUserLoggedIn';
import { PurpleButton } from '../../components/button/Buttons';
import { getCookie } from '../../utils/getCookie';

export const ProfileEdit = () => {

    const [user, setUser] = useState<UserType>();
    const [name, setName] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirm, setPasswordConfirm] = useState<string>('');

    const handleSubmit = () => {
        const editUser = async () => {

            const session = getCookie('session')
            try {
                if (password !== passwordConfirm) {
                    throw new Error('Passwords do not match')
                }
            } catch (error) {
                console.log(error)
            }

            if (session) {

                const res = await fetch('http://localhost:3000/users/' + user?.username, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session}`
                    },
                    body: JSON.stringify({
                        name: name,
                        surname: surname,
                        username: username,
                        email: email,
                        password: password
                    })
                })
                const data = await res.json()
                console.log(data)
            }
        }
        editUser()
    }

    const handleReset = () => {
        setName(user?.name || '')
        setUsername(user?.username || '')
        setSurname(user?.surname || '')
        setEmail(user?.email || '')
        setPassword('')
        setPasswordConfirm('')
    }


    useEffect(() => {
        getUserLoggedIn(setUser);
    }, [])

    useEffect(() => {
        if (user) {
            setName(user.name)
            setSurname(user.surname)
            setUsername(user.username)
            setEmail(user.email)
        }
    }, [user])

    return (
        <Layout>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <h1>Edit your profile</h1>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            fullWidth
                            value={name}
                            onChange={(e: any) => {
                                setName(e.target.value)
                            }}
                            id="name"
                            variant="outlined"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            fullWidth
                            value={surname}
                            onChange={(e: any) => {
                                setSurname(e.target.value)
                            }}
                            id="surname"
                            placeholder='Surname'
                            variant="outlined"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} >
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            fullWidth
                            id="username"
                            value={username}
                            onChange={(e: any) => {
                                setUsername(e.target.value)
                            }}
                            placeholder='Username'
                            variant="outlined"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            fullWidth
                            id="email"
                            value={email}
                            onChange={(e: any) => {
                                setEmail(e.target.value)
                            }}
                            placeholder='Email'
                            variant="outlined"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            fullWidth
                            id="password"
                            value={password}
                            onChange={(e: any) => {
                                setPassword(e.target.value)
                            }}
                            placeholder='Password'
                            variant="outlined"
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            fullWidth
                            id="password_confirm"
                            value={passwordConfirm}
                            onChange={(e: any) => {
                                setPasswordConfirm(e.target.value)
                            }}
                            placeholder='Password Confirm'
                            variant="outlined"
                        />
                    </Box>
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
                        />
                        <PurpleButton
                            variant='contained'
                            width='75%'
                            text='Submit'
                            type='submit'
                            margin='10px 0px 10px 0px'
                            onSubmit={handleSubmit}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Layout >
    )
}
