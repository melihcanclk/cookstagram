import { ReactComponentElement } from "react";
import { Footer } from "../Footer";
import { Navbar } from "../Navbar";

interface LayoutProps {
    children: ReactComponentElement<any> | ReactComponentElement<any>[];
}

export const Layout = ({ children }: LayoutProps) => {

    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}