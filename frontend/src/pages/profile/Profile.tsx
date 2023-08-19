import { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout'
import { getCookie } from '../../utils/getCookie';
import { IndividualPost } from '../../components/post/IndividualPost';
import { Grid, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { handleDelete } from '../../utils/handleDeletePost';
import { ProfileBanner } from '../../components/profile/ProfileBanner';
import { getUser } from '../../utils/getUser';

export const Profile = () => {
    const { id } = useParams();
    const [user, setUser] = useState<UserType>();
    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                const user = await getUser(id);
                setUser(user);
            }
        }

        fetchUser();
    }, [id]);


    const [posts, setPosts] = useState<IndividualPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const session = getCookie('session');
            const res = await fetch(`http://localhost:3000/posts/user/${user?.id}`, {
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
                        <ProfileBanner
                            user={user!}
                            posts={posts}
                        />

                    </Box>
                    <Grid container spacing={1}>
                        {
                            posts &&
                            posts.map((post, key) => (
                                <IndividualPost
                                    post={post}
                                    key={key}
                                    handleDelete={() => handleDelete(post.id, setPosts)}
                                    user={user}
                                />
                            ))
                        }
                    </Grid>
                </div>
            </div>
        </Layout>
    )
}
