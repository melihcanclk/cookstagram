import { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout'
import { IndividualPost } from '../components/post/IndividualPost'
import { getCookie } from '../utils/getCookie';
import '../styles/home.css'

export const Home = () => {

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
                    {
                        posts &&
                        posts.map((post, key) => (
                            <IndividualPost post={post} key={key} />
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}
