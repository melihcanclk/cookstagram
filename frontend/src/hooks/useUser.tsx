import { useEffect, useState } from "react";
import { getCookie } from "../utils/getCookie";

export const useUser = () => {
    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        // get user from cookie
        const userCookie = getCookie('user');

        if (userCookie) {
            const userJson = JSON.parse(userCookie);
            const session = getCookie('session');

            fetch("http://localhost:3000/users/" + userJson.username, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${session}`,
                    'Content-Type': 'application/json'
                },
            }).then(response => response.json())
                .then(data => {
                    setUser(data.user);
                })
        }
    }, []);


    return [user];
}