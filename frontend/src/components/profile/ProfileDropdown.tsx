import { SignButton } from "../button/Buttons";
import "../../styles/profiledropdown.css"
import AvatarItem from "./AvatarItem";
import { getCookie } from "../../utils/getCookie";

export const handleOpenProfileDropdown = () => {
    const dropdown = document.querySelector(".dropdown-content") as HTMLElement;
    dropdown.classList.toggle("show");
}
const ProfileDropdown = () => {

    const userString = getCookie("user");
    const user = JSON.parse(userString);

    const handleLogout = () => {
        document.cookie = "session=;"
        document.cookie = "user=;"
        window.location.href = '/login';
    }

    return (
        <div className="dropdown">
            <div>
                {user.name} {user.surname}
            </div>
            <button onClick={handleOpenProfileDropdown} className="dropbtn">
                <AvatarItem src={user.picture} />
            </button>
            <div className="dropdown-content">
                <SignButton text="Logout" onClick={handleLogout} />
            </div>
        </div>
    )
}

export default ProfileDropdown