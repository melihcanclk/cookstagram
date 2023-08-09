import { Layout } from '../components/layout/Layout'
import '../styles/home.css'
import { CreatePostTextbox } from '../components/post/CreatePostTextbox';

export const Home = () => {


    return (
        <Layout>
            <div className='feed-container'>
                <CreatePostTextbox />
            </div>
        </Layout>
    )
}
