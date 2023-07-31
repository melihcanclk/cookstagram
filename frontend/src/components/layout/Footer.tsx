import "../../styles/footer.css";
import { socialMediaAccounts } from "../../assets/socialMediaAccounts";

interface FooterItemProps {
    href: string;
    text: string;
}

interface SocialIconProps {
    href: string;
    children: React.ReactNode;
}

const FooterItem = ({ href, text }: FooterItemProps) => {
    return (
        <li className="list-inline-item"><a href={href}>{text}</a></li>
    );
}

const SocialIcon = ({ href, children }: SocialIconProps) => {
    return (
        <a href={href}>
            <div className="social-icon-container">
                {children}
            </div>
        </a>
    );
}

export const Footer = () => {

    return (
        <footer>
            <div className="footer-basic">

                <div className="social">
                    {
                        socialMediaAccounts.map((account) => (
                            <SocialIcon href={account.link} key={account.name}>
                                {account.icon}
                            </SocialIcon>
                        ))
                    }
                </div>
                <ul className="list-inline">
                    <FooterItem href="#" text="Home" />
                    <FooterItem href="#" text="Services" />
                    <FooterItem href="#" text="About" />
                    <FooterItem href="#" text="Terms" />
                    <FooterItem href="#" text="Privacy Policy" />
                </ul>
                <p className="copyright">Melihcan Çilek - Cookstagram © 2023</p>
            </div>
        </footer>
    );
}