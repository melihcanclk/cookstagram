import { Dispatch, SetStateAction } from "react";
import { getUser } from "./getUser";
import { getCookie } from "./getCookie";

export const getUserLoggedIn = (setUser: Dispatch<SetStateAction<any>>) => {
    const user = getCookie("user");
    if (!user) return null;

    const username = JSON.parse(user).username;

    getUser(username).then((res) => {
        setUser(res);
    });
}