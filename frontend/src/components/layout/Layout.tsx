import { ReactComponentElement } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

interface LayoutProps {
    children: ReactComponentElement<any>;
}

export const Layout = ({ children }: LayoutProps) => {

    return (
        <div className="container">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}