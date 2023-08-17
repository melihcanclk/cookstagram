import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Box, Avatar } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from "react";
import { getImageOfPost, getImageOfUser } from "../../utils/getImage";
import { getCookie } from "../../utils/getCookie";
import { getUser } from "../../utils/getUser";
import { convertSeconds } from "../../utils/convertSeconds";


const useStyles = makeStyles({
    card: {
        minWidth: 150,
        margin: '0 10px 10px 10px'
    },
    media: {
        height: 140,
    },
    cardActions: {
        display: 'flex',
        margin: '0 10px',
        justifyContent: 'space-between'
    },
    author: {
        display: 'flex'
    }

});

export const IndividualPost = (props: IndividualPostProps) => {
    const { post, handleDelete }: IndividualPostProps = props;
    const [image, setImage] = useState<any>(null);
    const [postImage, setPostImage] = useState<any>(null);
    const userLoggedIn = getCookie('user') ? JSON.parse(getCookie('user')).username : null;
    useEffect(() => {
        const getPost = async () => {
            if (post) {
                // if post has property user by checking type guard
                try {
                    const user = await getUser(post.user.username);
                    getImageOfUser({
                        setImageBase64: setImage,
                        user: user
                    })
                    const res = await getImageOfPost({ setImageBase64: setPostImage, post: post })
                    if (!res) {
                        const token = getCookie('session');
                        const defaultImage = await fetch(`http://localhost:3000/uploads/default_food.jpg`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });
                        setPostImage(defaultImage.url)
                    }
                } catch (error) {
                    console.log(error);
                }

            }
        }
        getPost();
    }, [post])

    const classes = useStyles();


    return (
        <Grid item xs={12} sm={6} >
            <Card className={classes.card}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={
                            postImage ? postImage : ''
                        }
                        component="img"
                        title="Image Not Found"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Preperation Time:
                            {
                                convertSeconds(post.prepTimeInMins)
                            }

                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Cook Time:
                            {
                                convertSeconds(post.cookTimeInMins)
                            }
                        </Typography>

                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Box className={classes.author}>
                        <Avatar src={
                            image
                        } />
                        <Box ml={1}>
                            <Typography variant="subtitle2" component="p">
                                {
                                    // if post has property user by checking type guard
                                    'user' in post ? post.user.username : ''
                                }
                            </Typography>
                            <Typography variant="subtitle2" color="textSecondary" component="p">
                                {new Date(post.createdAt).toDateString()}
                            </Typography>
                        </Box>
                    </Box>
                    {
                        userLoggedIn && userLoggedIn === post.user.username && (
                            <Box>
                                <IconButton onClick={
                                    () => handleDelete(post.id)
                                }>
                                    <DeleteIcon
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'red'
                                        }}
                                    />
                                </IconButton>

                            </Box>
                        )
                    }
                </CardActions>
            </Card>
        </Grid>
    )
}
