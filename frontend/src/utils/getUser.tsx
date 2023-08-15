import { getCookie } from "./getCookie";

export const getUser = async (username: string) => {
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