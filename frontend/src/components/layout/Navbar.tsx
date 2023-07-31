import { useRef, type MutableRefObject, ReactNode } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../../styles/navbar.css";
import { getCookie } from "../../utils/getCookie";

interface NavbarItemProps {
    href: string;
    children: ReactNode;
}
interface SignButtonProps {
    text: string;
}

const NavbarItem = ({ href, children }: NavbarItemProps) => (
    <a href={href}>{children}</a>
);

const SignButton = ({ text }: SignButtonProps) => (
    <div className="sign-button-wrapper">
        <button className="sign-button">
            {text}
        </button>
    </div>
);

export const Navbar = () => {
    const session = getCookie('session');
    const navRef = useRef() as MutableRefObject<HTMLElement>;

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
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
                        <SignButton text="Logout" />
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
