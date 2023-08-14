import { useState } from 'react'
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
import { getCookie } from '../utils/getCookie';
import { useForm } from 'react-hook-form';
import { FormFieldError } from '../components/error/FormFieldErrors';
import { IndividualPost } from '../components/post/IndividualPost';
import { useGetFeed } from '../hooks/useGetFeed';
import { handleDelete } from '../utils/handleDeletePost';

export const Home = () => {
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { feed, setFeed } = useGetFeed();

    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const onSubmit = (data: any) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        const user = getCookie('user');
        const userJson = JSON.parse(user);
        formData.append('username', userJson.username);
        const session = getCookie('session');

        fetch("http://localhost:3000/create-post",
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session}`
                },
                body: formData
            }
        ).then(response => response.json())
            .then(data => {
                // add data to feed
                setFeed((prev) => {
                    const dataPayload = {
                        ...data.post,
                        id: data.post._id,
                        user: {
                            username: data.user.username,
                            name: data.user.name,
                            surname: data.user.surname,
                            picture: {
                                ...data.user.picture
                            }
                        }
                    }
                    return [dataPayload, ...prev];
                })

                handleClose();
            })

    };

    return (
        <Layout>
            <Box
                component="div"
                sx={{
                    width: '75%',
                    margin: 'auto',
                    my: 2
                }}
            >
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
                        <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                            <Grid container spacing={1}>
                                <Grid item xs={12}  >
                                    <TextField
                                        key={1}
                                        id='title'
                                        defaultValue=""
                                        variant="outlined"
                                        fullWidth
                                        placeholder='Title'
                                        {...register("title", { required: true })}
                                    />
                                </Grid>
                                {FormFieldError({ errors, fieldname: 'title', placeholder: 'Title' })}
                                <Grid item xs={12}>
                                    <StyledTextarea
                                        id='content'
                                        maxRows={4}
                                        aria-label={"maximum height"}
                                        placeholder={"Content"}
                                        defaultValue={""}
                                        {...register("content", { required: true })}
                                    />
                                </Grid>
                                {FormFieldError({ errors, fieldname: 'content', placeholder: 'Content' })}
                                <Grid item xs={12}>
                                    <PurpleButton
                                        variant='contained'
                                        width='100%'
                                        text='Create Post'
                                        margin='10px 0px 10px 0px'
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Modal>

                <Box>
                    {feed?.map((post: IndividualPost, key: number) => {
                        console.log({ post })
                        return (
                            <IndividualPost
                                key={key}
                                post={post}
                                handleDelete={() => {
                                    handleDelete(post.id, setFeed)
                                }}
                            />
                        )
                    })}
                </Box>
            </Box>

        </Layout>
    )
}
