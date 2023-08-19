
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { Avatar, Box, Button, Card, CardContent, Divider, Grid, ListItem, ListItemText, Typography } from '@mui/material';
import { CardImageArea } from '../components/card/CardImageArea';
import { ExpandMore } from '../components/card/ExpandMore';
import { getCookie } from '../utils/getCookie';
import { toUpperCase } from '../utils/toUpperCase';
import { getImageOfPost } from '../utils/getImage';

export const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<IndividualPost>();
    const [user, setUser] = useState<UserType>();
    const [image, setImage] = useState('');
    console.log({ recipe })
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
                <CardContent >
                    <Box>
                        <Typography
                            variant='h5'
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
                            sx={{
                                color: 'gray'
                            }}
                        >
                            {new Date(recipe?.createdAt as string).toLocaleDateString()}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                mt: 1
                            }}
                        >

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
                                        <Box>
                                            <ListItem
                                                key={index}
                                            >
                                                <ListItemText primary={`🔔 ${ingredient.name} ${ingredient.quantity} ${ingredient.unit}`} />
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
            </Card>
        </Layout>
    )
}
