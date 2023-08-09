import { SignButton } from "../button/Buttons";
import "../../styles/profiledropdown.css"
import AvatarItem from "./AvatarItem";
import { getCookie } from "../../utils/getCookie";
import { deleteCookie } from "../../utils/deleteCookie";

export const handleOpenProfileDropdown = () => {
    const dropdown = document.querySelector(".dropdown-content") as HTMLElement;
    dropdown.classList.toggle("show");
}
const ProfileDropdown = () => {

    const userString = getCookie("user");
    const user = JSON.parse(userString);

    const handleLogout = () => {
        deleteCookie("session");
        deleteCookie("user");
        // redirect to login page
        window.location.href = '/login';
    }

    return (
        <div className="dropdown">
            <div className="dropbtn-wrapper">
                <p>
                    {user.name} {user.surname}
                </p>
                <button onClick={handleOpenProfileDropdown} className="dropbtn">
                    <AvatarItem src={user.picture} />
                </button>
            </div>
            <div className="dropdown-content">
                <SignButton text="Logout" onClick={handleLogout} />
            </div>
        </div>
    )
}

export default ProfileDropdown