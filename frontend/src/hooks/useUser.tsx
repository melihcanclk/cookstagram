import { useEffect, useState } from 'react'
import { getCookie } from '../utils/getCookie';

export const useUser = () => {
    const [user, setUser] = useState<UserType | undefined>(undefined);

    const getUser = async () => {
        const userCookie = getCookie('user');
        const userJson = JSON.parse(userCookie);
        const session = getCookie('session');

        fetch('http://localhost:3000/users/' + userJson.username, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setUser({
                    name: data.user.name,
                    surname: data.user.surname,
                    username: data.user.username,
                    email: data.user.email,
                    picture: {
                        fileName: data.user.picture.fileName,
                    },
                    createdAt: data.user.createdAt,
                    token: session
                });
            })
    }

    useEffect(() => {
        getUser();
    }, [])

    return [user];

}
