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
import AddIcon from '@mui/icons-material/Add';

import { TextField } from '@mui/material';
import { getCookie } from '../utils/getCookie';
import { useFieldArray, useForm } from 'react-hook-form';
import { FormFieldError } from '../components/error/FormFieldErrors';
import { IndividualPost } from '../components/post/IndividualPost';
import { useGetFeed } from '../hooks/useGetFeed';
import { handleDelete } from '../utils/handleDeletePost';
import { purple } from '../styles/colors';
import Dropzone from '../components/Dropzone';
import { Ingredient } from '../components/Ingredient';

export const Home = () => {
    const [open, setOpen] = useState(false);

    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    })
    const { feed, setFeed } = useGetFeed();
    const [file, setFile] = useState<any>(null);
    const [idCounter, setIdCounter] = useState<number>(0);

    const handleClose = () => {
        setOpen(false)
        setFile(null)
        // clear form
        setValue('title', '')
        setValue('prepTimeInMins', '')
        setValue('cookTimeInMins', '')
        setValue('servings', '')
        setValue('directions', '')
        setValue('ingredients', [])
        setIdCounter(0)
    };
    const handleOpen = () => setOpen(true);

    const onSubmit = (data: any) => {
        // clear ingredient array if name, quantity, or unit is empty
        const ingredients = data.ingredients.filter((ingredient: any) => {
            return ingredient.name !== '' && ingredient.quantity !== '' && ingredient.unit !== ''
        })
        data.ingredients = ingredients;

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('prepTimeInMins', data.prepTimeInMins);
        formData.append('cookTimeInMins', data.cookTimeInMins);
        formData.append('servings', data.servings);
        formData.append('directions', data.directions);
        if (file) {
            formData.append('picture', file);
        } else {
            formData.append('picture', '');
        }
        data.ingredients.map((ingredient: any, index: number) => {
            formData.append(`ingredients[${index}][name]`, ingredient.name);
            formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
            formData.append(`ingredients[${index}][unit]`, ingredient.unit);
        })

        const user = getCookie('user');
        const userJson = JSON.parse(user);
        formData.append('user_id', userJson.id);
        const session = getCookie('session');

        const postRecipe = async () => {
            try {
                const res = await fetch("http://localhost:3000/create-post",
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${session}`
                        },
                        body: formData
                    }
                )
                const data = await res.json();
                if (data) {
                    const responseUserid = data.post.user.id;
                    // fetch user by id
                    const getUserById = async () => {
                        try {
                            const res = await fetch(`http://localhost:3000/users/${responseUserid}`, {
                                method: 'GET',
                                headers: {
                                    'Authorization': `Bearer ${session}`
                                }
                            })
                            const user = await res.json();
                            if (user) {
                                const updatedFeed = [{
                                    ...data.post,
                                    user: {
                                        ...user.user,
                                        posts: undefined
                                    }
                                }, ...feed]
                                setFeed(updatedFeed)
                            }

                        } catch (error) {
                            console.log({ error })
                        }
                    }
                    getUserById();

                }
            } catch (error) {
                console.log({ error })
            }
            handleClose();
        };
        postRecipe();
    }

    return (
        <Layout>
            <Box
                component="div"
                sx={{
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
                        children={
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                Create Recipe
                                <AddIcon />
                            </Box>
                        }
                        margin='10px 0px 10px 0px'
                        type='button'
                        onClick={handleOpen}
                        backgroundColor={purple[800]}
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
                                    Create New Recipe
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
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        key={1}
                                        id='title'
                                        defaultValue=""
                                        variant="outlined"
                                        fullWidth
                                        placeholder='Title'
                                        {...register("title", { required: true })}
                                    />
                                    {FormFieldError({ errors, fieldname: 'title', placeholder: 'Title' })}
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        key={1}
                                        id='prepTimeInMins'
                                        defaultValue=""
                                        variant="outlined"
                                        fullWidth
                                        type='number'
                                        placeholder='Prep Time in Minutes'
                                        {...register("prepTimeInMins", { required: true, min: 0 })}
                                    />
                                    {FormFieldError({ errors, fieldname: 'prepTimeInMins', placeholder: 'Prep Time', min: 0 })}
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        key={1}
                                        id='cookTimeInMins'
                                        defaultValue=""
                                        variant="outlined"
                                        fullWidth
                                        type='number'
                                        placeholder='Cook Time in Minutes'
                                        {...register("cookTimeInMins", { required: true, min: 0 })}
                                    />
                                    {FormFieldError({ errors, fieldname: 'cookTimeInMins', placeholder: 'Cook Time in Seconds', min: 0 })}
                                </Grid>
                                <Grid item xs={12} md={6} >
                                    <TextField
                                        key={1}
                                        id='servings'
                                        defaultValue=""
                                        variant="outlined"
                                        fullWidth
                                        type='number'
                                        placeholder='Servings'
                                        {...register("servings", { required: true, min: 0 })}
                                    />
                                    {FormFieldError({ errors, fieldname: 'servings', placeholder: 'Servings', min: 0 })}
                                </Grid>
                                <Grid item xs={12}
                                    sx={{
                                        // scrollable
                                        maxHeight: '200px',
                                        overflowY: 'scroll',
                                        '&::-webkit-scrollbar': {
                                            width: '0.4em'
                                        },
                                        '&::-webkit-scrollbar-track': {
                                            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                                            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                                        },
                                        '&::-webkit-scrollbar-thumb': {
                                            backgroundColor: 'rgba(0,0,0,.1)',
                                            outline: '1px solid slategrey'
                                        },
                                    }}
                                >
                                    {
                                        fields.map((ingredient: any, index: number) => {
                                            return (
                                                <Grid item xs={12} key={ingredient.id}>
                                                    <Ingredient
                                                        key={index}
                                                        register={register}
                                                        errors={errors}
                                                        id={index}
                                                        min={0}
                                                        remove={remove}
                                                    />

                                                </Grid>
                                            )
                                        })

                                    }

                                </Grid>
                                <Box
                                    sx={{
                                        mt: 1,
                                        width: '100%',
                                    }}
                                >
                                    <PurpleButton
                                        variant='contained'
                                        width='100%'
                                        height='50px'
                                        children={
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                Add Ingredient
                                                <AddIcon />
                                            </Box>
                                        }
                                        type='button'
                                        onClick={() => {
                                            // add ingredient
                                            setIdCounter(idCounter + 1);
                                            append({
                                                name: '',
                                                quantity: '',
                                                unit: '',
                                            })
                                        }}
                                        backgroundColor={purple[800]}
                                    />
                                </Box>

                                <Grid item xs={12}>
                                    <StyledTextarea
                                        id='directions'
                                        maxRows={4}
                                        aria-label={"maximum height"}
                                        placeholder={"Directions"}
                                        defaultValue={""}
                                        {...register("directions", { required: true })}
                                    />
                                    {FormFieldError({ errors, fieldname: 'directions', placeholder: 'Directions' })}
                                </Grid>
                                <Grid item xs={12}>
                                    <Dropzone
                                        file={file}
                                        setFile={setFile}
                                    />
                                    {FormFieldError({ errors, fieldname: 'content', placeholder: 'Content' })}
                                </Grid>

                                <Grid item xs={12}>
                                    <PurpleButton
                                        variant='contained'
                                        width='100%'
                                        children={
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                Create Recipe
                                                <AddIcon />
                                            </Box>
                                        }
                                        margin='10px 0px 10px 0px'
                                        type='submit'
                                        backgroundColor={purple[700]} />
                                </Grid>
                            </Grid>
                        </form>
                    </Box>
                </Modal>

                <Grid container spacing={1}>
                    {feed?.map((post: IndividualPost, key: number) => {
                        return (
                            <IndividualPost
                                key={key}
                                post={post}
                                handleDelete={() => {
                                    handleDelete(post.id, setFeed)
                                }}
                                user={feed[key].user}
                            />
                        )
                    })}
                </Grid>
            </Box>

        </Layout>
    )
}
