import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Box, Avatar, Link } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from "@mui/material";
import { makeStyles } from '@mui/styles'
import { useEffect, useState } from "react";
import { getImageOfPost, getImageOfUser } from "../../utils/getImage";
import { CardImageArea } from "../card/CardImageArea";


const useStyles = makeStyles({
    card: {
        minWidth: 150,
        margin: '0 10px 10px 10px'
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
    const { post, handleDelete, user }: IndividualPostProps = props;
    const [image, setImage] = useState<any>(null);
    const [postImage, setPostImage] = useState<any>(null);

    useEffect(() => {
        const getPost = async () => {
            if (post) {
                // if post has property user by checking type guard
                try {
                    getImageOfUser({
                        setImageBase64: setImage,
                        user: user
                    })
                    getImageOfPost({ setImageBase64: setPostImage, post: post })
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
                <CardImageArea clickable post={post} image={postImage} />
                <CardActions className={classes.cardActions}>
                    <Box className={classes.author}>
                        <Link href={`/profile/${post.user.id}`}>
                            <Avatar src={
                                image
                            } />
                        </Link>
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
                        user && user.id === post.user.id && (
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
