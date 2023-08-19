import { useCallback, useEffect, useRef, useState } from "react";
import "../../styles/navbar.css";
import { getCookie } from "../../utils/getCookie";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import { deleteCookie } from "../../utils/deleteCookie";
import { useUser } from "../../hooks/useUser";
import { getImageOfUser } from "../../utils/getImage";
import { SearchBar } from "../SearchBar";

interface NavbarProps {
    icon: React.ReactNode;
    handleThemeChange: (current: React.Dispatch<React.SetStateAction<"light" | "dark">>) => void;
}

export const Navbar = (props: NavbarProps) => {
    const { icon, handleThemeChange } = props;

    const session = getCookie('session');
    const navigate = useNavigate();
    const { user } = useUser();
    const [imageBase64, setImageBase64] = useState<string>("");

    useEffect(() => {
        if (user) {
            getImageOfUser({ setImageBase64, user });
        }

    }, [user])

    const handleLogout = () => {
        deleteCookie('session');
        deleteCookie('user');
        navigate('/login');
    }

    const settings = [
        {
            name: 'Profile',
            function: () => navigate('/profile/' + user?.id),
        },
        {
            name: 'Settings',
            function: () => navigate('/settings'),
        },
        {
            name: 'Logout',
            function: handleLogout,
        },

    ];

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (link: string) => {
        navigate(link);
        handleCloseNavMenu();
    }

    return (
        <AppBar
            position="sticky"

        >
            <Container
                maxWidth={false}
            >
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Box
                            component="img"
                            alt="logo"
                            src="/src/assets/logo.png"
                        />

                    </Typography>

                    {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Typography
                                        textAlign="center"
                                        variant="h6"
                                        component="a"
                                        href={`/${page.toLowerCase()}`}
                                        sx={{
                                            color: 'inherit',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {page}
                                    </Typography>

                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
                    <Box
                        component="a"
                        href="/"
                    >
                        <Box
                            component="img"
                            sx={{
                                display: { xs: 'flex', md: 'none' },
                                borderRadius: '50%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                            alt="avatar"
                            src="/src/assets/_logo.png"
                        />
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: "flex-end" }}>
                        <SearchBar />
                    </Box>

                    <Box
                        sx={{
                            ml: 1,
                        }}
                    >
                        <IconButton onClick={
                            () => handleThemeChange((current) => current === 'light' ? 'dark' : 'light')
                        } >
                            {icon}
                        </IconButton>
                    </Box>
                    <Box>
                        {
                            session && (
                                <Typography
                                    textAlign="center"
                                    variant="h6"
                                    sx={{
                                        color: 'inherit',
                                        textDecoration: 'none',
                                        mx: 1,
                                    }}
                                >
                                    {user?.username}
                                </Typography>

                            )
                        }
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        {session ? (
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {imageBase64 ? (
                                    <Box
                                        component="img"
                                        sx={{
                                            height: '50px',
                                            width: '50px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                        }}
                                        alt="avatar"
                                        src={imageBase64}
                                    />

                                ) :
                                    (
                                        <Avatar alt="user_picture" src="/src/assets/_logo.png" />
                                    )
                                }
                            </IconButton>
                        )
                            :
                            (
                                <Button
                                    onClick={() => navigate('/login')}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    Login
                                </Button>

                            )
                        }
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={setting.function}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
