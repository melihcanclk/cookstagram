import { SignButton } from "../button/Buttons";
import "../../styles/profiledropdown.css"
import AvatarItem from "./AvatarItem";

export const handleOpenProfileDropdown = () => {
    const dropdown = document.querySelector(".dropdown-content") as HTMLElement;
    dropdown.classList.toggle("show");
}
const ProfileDropdown = () => {

    const handleLogout = () => {
        document.cookie = "session=;"
        window.location.href = '/login';
    }
   
    return (
        <div className="dropdown">
            <button onClick={handleOpenProfileDropdown} className="dropbtn">
                <AvatarItem />
            </button>
            <div className="dropdown-content">
                <SignButton text="Logout" onClick={handleLogout} />
            </div>
        </div>
    )
}

export default ProfileDropdown