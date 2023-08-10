import { useImage } from "../../hooks/useImage";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Box, Avatar } from "@mui/material"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
        margin: '0 auto'
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
    const { post } = props;
    const image = useImage(post.user?.picture);
    const classes = useStyles();

    return (
        <>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                React useContext
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}>
                        <Box className={classes.author}>
                            <Avatar src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                            <Box ml={2}>
                                <Typography variant="subtitle2" component="p">
                                    Guy Clemons
                                </Typography>
                                <Typography variant="subtitle2" color="textSecondary" component="p">
                                    May 14, 2020
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
