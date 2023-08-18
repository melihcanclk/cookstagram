import { getCookie } from "./getCookie";

export const getUser = async (id: string) => {
    const session = getCookie('session');

    const user = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session}`
        }
    })

    const userJson = await user.json();
    return userJson.user as UserType;
}