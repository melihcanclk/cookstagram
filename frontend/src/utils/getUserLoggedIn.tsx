import { Dispatch, SetStateAction } from "react";
import { getUser } from "./getUser";
import { getCookie } from "./getCookie";

export const getUserLoggedIn = (setUser: Dispatch<SetStateAction<any>>) => {
    const user = getCookie("user");
    if (!user) return null;

    const user_id = JSON.parse(user).id;

    getUser(user_id).then((res) => {
        setUser(res);
    });
}