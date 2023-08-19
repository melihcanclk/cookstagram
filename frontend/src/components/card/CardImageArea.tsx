import { Box, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { convertSeconds } from '../../utils/convertSeconds'

export const CardImageArea = (props: CardImageAreaProps) => {
    const { post, height, image, clickable }: CardImageAreaProps = props;

    return (
        <Box
            component={clickable ? 'a' : 'div'}
            href={clickable ? `/recipe/${post?.id}` : ''}
            sx={{
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                    textDecoration: 'none',
                    color: 'inherit',
                },
                cursor: clickable ? 'pointer' : 'default'
            }}

        >
            <CardActionArea>
                <CardMedia
                    sx={{
                        height: height ? height : 240,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-end',
                    }}
                    image={
                        image ? image : ''
                    }
                    title="Image Not Found"
                >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {post?.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Preperation Time:
                            {
                                convertSeconds(post?.prepTimeInMins)
                            }

                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Cook Time:
                            {
                                convertSeconds(post?.cookTimeInMins)
                            }
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Servings:
                            {
                                post?.servings
                            }
                        </Typography>
                    </CardContent>
                </CardMedia>
            </CardActionArea>
        </Box>
    )
}
