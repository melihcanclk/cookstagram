import { useRef, type MutableRefObject, ReactNode } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../styles/navbar.css";
import { getCookie } from "../../utils/getCookie";
import ProfileDropdown, { handleOpenProfileDropdown } from "../profile/ProfileDropdown";

interface NavbarItemProps {
    href: string;
    children: ReactNode;
}


const NavbarItem = ({ href, children }: NavbarItemProps) => (
    <a href={href}>{children}</a>
);



export const Navbar = () => {
    const session = getCookie('session');
    const navRef = useRef() as MutableRefObject<HTMLElement>;

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );

        // when the navbar is open, close the profile dropdown if close button clicked
        const profileButton = document.querySelector(".dropdown-content") as HTMLElement;
        profileButton.classList.contains("show") && handleOpenProfileDropdown();
    };

    return (
        <header>
            <a href="/#">
                <div className="logo-wrapper">
                    <img src="/src/assets/logo.png" alt="logo" />
                </div>
            </a>
            <div>
                <nav ref={navRef}>
                    <NavbarItem href="/#">Home</NavbarItem>
                    <NavbarItem href="/#">Services</NavbarItem>
                    <NavbarItem href="/#">About</NavbarItem>


                    {session && (
                        <>

                            <ProfileDropdown />
                        </>
                    )}

                    < button
                        className="nav-btn nav-close-btn"
                        onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                <button
                    className="nav-btn"
                    onClick={showNavbar}>
                    <FaBars />
                </button>
            </div>
        </header >
    );
}
