import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout'
import { getCookie } from '../utils/getCookie';
import { IndividualPost } from '../components/post/IndividualPost';

import { Grid, Typography, Box } from '@mui/material';

export const Profile = () => {
    const [posts, setPosts] = useState<IndividualPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const user = getCookie('user');
            const userJson = JSON.parse(user);
            const session = getCookie('session');
            const res = await fetch(`http://localhost:3000/posts/user/${userJson.username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Content-Type': 'application/json'
                },

            });
            const data = await res.json();
            setPosts(data.posts);
        }
        fetchPosts();
    }, []);

    return (
        <Layout>
            <div className='home-container'>
                <div className="home">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            my: 2
                        }}
                    >
                        <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Your Posts</Typography>

                    </Box>
                    <Grid container spacing={1}>
                        {
                            posts &&
                            posts.map((post, key) => (
                                <IndividualPost post={post} key={key} />
                            ))
                        }
                    </Grid>
                </div>
            </div>
        </Layout>
    )
}
