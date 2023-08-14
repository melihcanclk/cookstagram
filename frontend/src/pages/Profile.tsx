import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout'
import { getCookie } from '../utils/getCookie';
import { IndividualPost } from '../components/post/IndividualPost';

import { Grid, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';


const getUser = async (username: string) => {
    const session = getCookie('session');

    const user = await fetch(`http://localhost:3000/users/${username}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
        }
    })

    const userJson = await user.json();
    return userJson.user as UserType;
}

export const Profile = () => {
    const { username } = useParams();

    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            if (username) {
                const user = await getUser(username);
                setUser(user);
            }
        }
        fetchUser();
    }, [username]);


    const [posts, setPosts] = useState<IndividualPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const session = getCookie('session');
            const res = await fetch(`http://localhost:3000/posts/user/${user?.username}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Content-Type': 'application/json'
                },

            });
            const data = await res.json();
            setPosts(data.posts);
        }
        if (user) fetchPosts();
    }, [user]);

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
                        {/* <Typography variant='h4' sx={{ fontWeight: 'bold' }}>Your Posts</Typography> */}

                    </Box>
                    <Grid container spacing={1}>
                        {
                            posts &&
                            posts.map((post, key) => (
                                <IndividualPost
                                    post={post}
                                    key={key}
                                />
                            ))
                        }
                    </Grid>
                </div>
            </div>
        </Layout>
    )
}
