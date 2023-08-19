
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, ListItem, ListItemText, Typography } from '@mui/material';
import { CardImageArea } from '../components/card/CardImageArea';
import { ExpandMore } from '../components/card/ExpandMore';
import { getCookie } from '../utils/getCookie';
import { toUpperCase } from '../utils/toUpperCase';
import { getImageOfPost } from '../utils/getImage';
import { getUserLoggedIn } from '../utils/getUserLoggedIn';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { handleDelete, handleDeleteSinglePost } from '../utils/handleDeletePost';
import Snackbarie from '../components/Snackbar';

export const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<IndividualPost>();
    const [user, setUser] = useState<UserType>();
    const [image, setImage] = useState('');
    const [userLoggedIn, setUserLoggedIn] = useState<UserType>();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            const session = getCookie('session');
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session}`
                },
            });
            const data = await response.json();
            setRecipe(data.post);
            getImageOfPost({
                setImageBase64: setImage,
                post: data.post
            })
            getUserLoggedIn(setUserLoggedIn);
            fetchUser(data.post.user.id);
        }

        const fetchUser = async (userid: string) => {
            const session = getCookie('session');
            const response = await fetch(`http://localhost:3000/users/${userid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session}`
                },
            });
            const data = await response.json();
            setUser(data.user);
        }

        fetchRecipe();
    }, [id]);


    return (
        <Layout>
            <Card
                sx={{
                    my: 3,
                    width: '100%',

                }}
            >
                {recipe && user && userLoggedIn && (
                    <>
                        <CardContent >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Box>
                                    <Box>
                                        <Typography
                                            variant='h5'
                                            component={'span'}
                                            sx={{
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {recipe?.title}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center',
                                            flexDirection: 'row',
                                        }}
                                    >

                                        <Typography
                                            variant='body1'
                                            component={'span'}
                                            sx={{
                                                color: 'gray'
                                            }}
                                        >
                                            by {toUpperCase(user?.name) + ' ' + toUpperCase(user?.surname)}
                                        </Typography>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            &nbsp; | &nbsp;
                                        </Box>

                                        <Typography
                                            variant='body1'
                                            component={'span'}
                                            sx={{
                                                color: 'gray'
                                            }}
                                        >
                                            {new Date(recipe?.createdAt as string).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography
                                        variant='body1'
                                        component={'span'}
                                        sx={{
                                            color: 'gray'
                                        }}
                                    >
                                        {
                                            userLoggedIn?.id === user?.id &&
                                            <Box>
                                                <IconButton onClick={
                                                    () => handleDeleteSinglePost(recipe?.id as string, () => {
                                                        setOpenSnackbar(true);
                                                        setTimeout(() => {
                                                            window.location.href = '/';
                                                        }, 1000);
                                                    })
                                                }>
                                                    <DeleteIcon
                                                        sx={{
                                                            cursor: 'pointer',
                                                            color: 'red'
                                                        }}
                                                    />
                                                </IconButton>

                                            </Box>
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12} md={6}>
                                    <CardImageArea post={recipe!} image={image} />
                                </Grid>
                                <Grid item xs={12} sm={12} md={6}>
                                    <ExpandMore title={'Ingredients of ' + recipe?.title}>
                                        <Divider />
                                        {recipe?.ingredients.map((ingredient, index) => {
                                            return (
                                                <Box
                                                    key={index}
                                                >
                                                    <ListItem
                                                        key={index}
                                                        disablePadding
                                                        sx={{
                                                            display: 'flex',
                                                            justifyContent: 'flex-start',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        <ListItemText primary={`⚫ ${ingredient.quantity} ${ingredient.unit} ${ingredient.name}`} />
                                                    </ListItem>
                                                    {index !== recipe.ingredients.length - 1 && <Divider />}
                                                </Box>
                                            )
                                        })
                                        }
                                        <Divider />
                                    </ExpandMore>
                                    <ExpandMore title={'How To Make ' + recipe?.title}>
                                        {recipe?.directions}
                                    </ExpandMore>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </>
                )}
            </Card>
            <Snackbarie
                open={openSnackbar}
                setOpen={setOpenSnackbar}
                message='Post deleted successfully'
                severity='success'
            />
            <Snackbarie
                open={openErrorSnackbar}
                setOpen={setOpenErrorSnackbar}
                message='Error occured while deleting post'
                severity='error'
            />

        </Layout>
    )
}
