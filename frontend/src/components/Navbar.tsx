import { useRef, type MutableRefObject, ReactNode } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";

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
    const session = true;
    
    const navRef = useRef() as MutableRefObject<HTMLElement>;

    const showNavbar = () => {
        navRef.current.classList.toggle(
            "responsive_nav"
        );
    };

    return (
        <header>
            <a href="/#">
                <img src="src/assets/Strawberry-PNG-Picture.png" alt="logo" />
            </a>
            <div>
                <nav ref={navRef}>
                    <NavbarItem href="/#">Home</NavbarItem>
                    <NavbarItem href="/#">Services</NavbarItem>
                    <NavbarItem href="/#">About</NavbarItem>

                    {session ? (
                        <SignButton text="login" />
                    )
                    : (
                        <SignButton text="register" />
                    )}

                    <button
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
        </header>
    );
}
