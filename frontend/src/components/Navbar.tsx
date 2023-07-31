import { useRef, type MutableRefObject } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";

export const Navbar = () => {
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
                    <a href="/#">Home</a>
                    <a href="/#">My work</a>
                    <a href="/#">Blog</a>
                    <a href="/#">About me</a>
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
