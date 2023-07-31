import { ReactComponentElement } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { getCookie } from "../../utils/getCookie";

interface LayoutProps {
    children: ReactComponentElement<any> | ReactComponentElement<any>[];
}

export const Layout = ({ children }: LayoutProps) => {

    const session = getCookie('session');

    if (!session) {
        window.location.href = '/login';
    }
    
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