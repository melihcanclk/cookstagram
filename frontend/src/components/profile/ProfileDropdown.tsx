import { getCookie } from "../../utils/getCookie";
import { deleteCookie } from "../../utils/deleteCookie";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { getImage } from "../../utils/getImage";

export const handleOpenProfileDropdown = () => {
    const dropdown = document.querySelector(".dropdown-content") as HTMLElement;
    dropdown.classList.toggle("show");
}

const ProfileDropdown = () => {

    const userString = getCookie("user");
    const user = JSON.parse(userString);
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        if (user) {
            getImage({
                setImageBase64: setImage,
                user: user
            })
        }
    }, [user])

    const navigate = useNavigate();

    const handleLogout = () => {
        deleteCookie("session");
        deleteCookie("user");
        // redirect to login page
        window.location.href = '/login';
    }

    const handleSettings = () => {
        navigate("/settings");
    }

    const handleProfile = () => {
        navigate("/profile");
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                <Typography sx={{ minWidth: 100 }}>Profile</Typography>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 48, height: 48 }}>
                        {
                            image ?
                                <img src={image}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    alt="profile" />
                                :
                                <Typography sx={{ fontSize: 24 }}>{user.username[0].toUpperCase()}</Typography>
                        }
                    </Avatar>
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleProfile}>
                    <Avatar /> Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSettings}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </>
    )
}

export default ProfileDropdown