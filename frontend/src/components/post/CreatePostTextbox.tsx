import { useState } from 'react'
import '../../styles/posttextarea.css'

export const CreatePostTextbox = () => {
    const [content, setContent] = useState('');

    const addPost = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(content);
    }

    return (
        <main className="input">
            <form onSubmit={addPost} autoComplete="off">
                <textarea value={content} onChange={(e) => setContent(e.target.value)} className="form-control" rows={5} placeholder="What do you meow?"></textarea>
                <div className="controls">
                    <button type="submit" className="btn btn-secondary" style={{ float: "right" }}>Share</button>
                </div>
            </form>
        </main>
    )
}
