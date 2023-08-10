import { useImage } from "../../hooks/useImage";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Box, Avatar } from "@mui/material"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    card: {
        minWidth: 300,
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
    const { post }: IndividualPostProps = props;
    const image = useImage(post.user?.picture);
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12} sm={6} md={6}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {post.title}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {post.content}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}>
                        <Box className={classes.author}>
                            <Avatar src={image} />
                            <Box ml={1}>
                                <Typography variant="subtitle2" component="p">
                                    {post.user?.username}
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" component="p">
                                    {new Date(post.createdAt).toDateString()}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <BookmarkBorderIcon />
                        </Box>
                    </CardActions>
                </Card>
            </Grid>
        </>
    )
}
