import '../../styles/footer.css';
import { socialMediaAccounts } from "../../assets/socialMediaAccounts";
import { purple } from '../../styles/colors';
import { Typography } from '@mui/material';

// const FooterItem = ({ href, text }: FooterItemProps) => {
//     return (
//         <li className="list-inline-item"><a href={href}>{text}</a></li>
//     );
// }

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
            <div
                style={{
                    backgroundColor: purple[700]
                }}
                className="footer-basic">
                <div className="social">
                    {
                        socialMediaAccounts.map((account) => (
                            <SocialIcon href={account.link} key={account.name}>
                                {account.icon}
                            </SocialIcon>
                        ))
                    }
                </div>
                {/* <ul className="list-inline">
                    <FooterItem href="#" text="Home" />
                    <FooterItem href="#" text="Services" />
                    <FooterItem href="#" text="About" />
                    <FooterItem href="#" text="Terms" />
                    <FooterItem href="#" text="Privacy Policy" />
                </ul> */}
                <Typography
                    variant="body2"
                    color="textSecondary"
                    align="center"
                    mt={2}
                >
                    Melihcan Çilek - Cookstagram © 2023
                </Typography>

            </div>
        </footer>
    );
}