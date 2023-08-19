import { getCookie } from "./getCookie";

export const handleDelete = (id: string, setData: React.Dispatch<React.SetStateAction<IndividualPost[]>>) => {
    // delete post
    const session = getCookie('session');
    fetch("http://localhost:3000/posts/" + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${session}`,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
        .then(_ => {
            setData((prev) => {
                return prev.filter((post) => post.id !== id);
            })
        }).catch(error => {
            console.log(error);
        })
}

export const handleDeleteSinglePost = (id: string, redirect: () => void) => {
    // delete post
    const session = getCookie('session');
    fetch("http://localhost:3000/posts/" + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${session}`,
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
        .then(_ => {
            redirect();
        }).catch(error => {
            console.log(error);
        })
}
