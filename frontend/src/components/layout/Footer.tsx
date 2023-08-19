import '../../styles/footer.css';
import { socialMediaAccounts } from "../../assets/socialMediaAccounts";
import { purple } from '../../styles/colors';
import { Box, Link, ThemeProvider, Typography, createTheme } from '@mui/material';

// const FooterItem = ({ href, text }: FooterItemProps) => {
//     return (
//         <li className="list-inline-item"><a href={href}>{text}</a></li>
//     );
// }

const SocialIcon = ({ href, children }: SocialIconProps) => {
    const themeColor = localStorage.getItem('theme');

    const theme = createTheme({
        components: {
            MuiLink: {
                styleOverrides: {
                    root: {
                        border: themeColor === 'dark' ? '1px solid white' : '1px solid black',
                        color: themeColor === 'dark' ? 'white' : 'black',
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Link
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                }}
                href={href}
            >
                <div className="social-icon-container">
                    {children}
                </div>
            </Link>
        </ThemeProvider>
    );
}

export const Footer = () => {
    const themeColor = localStorage.getItem('theme');

    return (
        <footer>
            <Box
                sx={{
                    backgroundColor: themeColor === 'light' ? purple[300] : purple[800],
                    p: 2,
                }}

            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        textAlign: 'center',
                        mb: 2,
                        gap: 1
                    }}
                >
                    {
                        socialMediaAccounts.map((account) => (
                            <SocialIcon href={account.link} key={account.name}>
                                {account.icon}
                            </SocialIcon>
                        ))
                    }
                </Box>
                <Typography
                    variant="body2"
                    align="center"
                    mt={2}
                >
                    Melihcan Çilek - Cookstagram © 2023
                </Typography>

            </Box>
        </footer>
    );
}