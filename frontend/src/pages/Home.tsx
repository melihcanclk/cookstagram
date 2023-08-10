import { useState, useRef } from 'react'
import { Layout } from '../components/layout/Layout'
import '../styles/home.css'
import { Box } from '@mui/material';
import { PurpleButton } from '../components/button/Buttons';
import { Modal, Typography } from '@mui/material';
import { style } from '../styles/modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';
import { StyledTextarea } from '../styles/textarea';

import { TextField } from '@mui/material';
import { useSession } from '../hooks/useSession';
import { getCookie } from '../utils/getCookie';
import { json } from 'react-router-dom';

export const Home = () => {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');


    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const handlePost = async () => {
        const user = getCookie('user');
        const userJson = JSON.parse(user);
        const session = getCookie('session');

        const headers = new Headers();
        headers.append('authorization', `Bearer ${session}`);
        headers.append('Content-Type', 'application/json');

        try {
            const res = await fetch("http://localhost:3000/create-post",
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(
                        {
                            title: title,
                            content: content,
                            username: userJson.username,
                        }
                    )
                }
            )

            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Layout>
            <Box
                sx={{
                    width: '50%',
                    margin: 'auto',
                }}
            >
                <PurpleButton
                    variant='contained'
                    width='100%'
                    text='Create Post'
                    margin='10px 0px 10px 0px'
                    onClick={handleOpen}
                />
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box display="flex" alignItems="center" mb={2}>
                        <Box flexGrow={1} >
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                Create Post
                            </Typography>
                        </Box>
                        <Box>
                            <IconButton onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Grid container spacing={1}>
                        <Grid item xs={12}  >
                            <TextField
                                key={1}
                                defaultValue=""
                                variant="outlined"
                                fullWidth
                                placeholder='Title'
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <StyledTextarea
                                maxRows={4}
                                aria-label={"maximum height"}
                                placeholder={"Content"}
                                onChange={(e) => { setContent(e.target.value) }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <PurpleButton
                                variant='contained'
                                width='100%'
                                text='Create Post'
                                margin='10px 0px 10px 0px'
                                onClick={handlePost}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Modal>

        </Layout>
    )
}
