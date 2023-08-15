import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Avatar, Card, CardContent, Divider, Hidden } from '@mui/material';
import { GearIcon } from '../svg/GearIcon';
import { getImage } from '../../utils/getImage';
import { Person } from '@mui/icons-material';
import { getCookie } from '../../utils/getCookie';


export const ProfileBanner = (props: ProfileBannerProps) => {
    const { user, setUser, posts }: ProfileBannerProps = props;
    console.log({ user })

    // get userLoggedIn from api
    const [userLoggedIn, setUserLoggedIn] = useState<UserType | null>(null);
    const userCookie = getCookie('user');
    const fetchUserLoggedIn = async () => {
        const session = getCookie('session');
        const res = await fetch('http://localhost:3000/users/' + JSON.parse(userCookie).username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session}`
            },
        })
        const data = await res.json();
        setUserLoggedIn(data.user);
    }


    useEffect(() => {
        fetchUserLoggedIn();
    }, [userCookie]);


    const [image, setImage] = useState<string>('');

    const handleOptionsMenuClick = () => {
        console.log('options menu clicked');
    }

    const handleFollow = () => {
        // TODO: connect to backend
        const follow = async () => {
            const session = getCookie('session');
            const res = await fetch(`http://localhost:3000/follow/${user?.username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session}`
                },
            })
            const data = await res.json();
            //TODO: Followed popup
            fetchUserLoggedIn();
        }
        if (user) {
            follow();
        }

    }

    const handleUnfollow = () => {
        // TODO: connect to backend
        console.log('unfollow clicked');
        const unfollow = async () => {
            const session = getCookie('session');
            const res = await fetch(`http://localhost:3000/unfollow/${user?.username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session}`
                },
            })
            const data = await res.json();
            const users = data.users;
            setUserLoggedIn(users);
            console.log({ userLoggedIn })
        }
        if (user) {
            unfollow();
        }
    }

    useEffect(() => {
        const fetchImage = async () => {
            if (user) {
                await getImage({ setImageBase64: setImage, user: user })
            }
        }

        fetchImage();
    }, [user]);

    return (
        <div>
            <Hidden xsDown>
                <Card >
                    <CardContent >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    mb: 1
                                }}
                            >
                                {
                                    user?.picture?.fileName ?
                                        <img
                                            src={image}
                                            alt="profile"
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        :
                                        <Person
                                            sx={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                        />

                                }
                            </Avatar>

                            <Typography
                                variant='h5'
                                sx={{
                                    fontWeight: 'bold'
                                }}
                            >
                                {user?.name} {user?.surname}
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{
                                    color: 'gray'
                                }}
                            >
                                {user?.username}
                            </Typography>
                            <Typography
                                variant='body1'
                                sx={{
                                    color: 'gray'
                                }}
                            >
                                {user?.email}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    mt: 1
                                }}
                            >
                                {
                                    userLoggedIn && userLoggedIn !== undefined && userLoggedIn.username === user?.username ?
                                        <>
                                            <Button
                                                variant='outlined'
                                                sx={{
                                                    mr: 1
                                                }}
                                            >
                                                <Link
                                                    to={`/profile/${user?.username}/edit`}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'inherit'
                                                    }}
                                                >
                                                    Edit Profile
                                                </Link>
                                            </Button>
                                            <Button
                                                variant='outlined'
                                                onClick={handleOptionsMenuClick}
                                            >
                                                <GearIcon />
                                            </Button>
                                        </>
                                        :
                                        userLoggedIn && userLoggedIn !== undefined && userLoggedIn.following.some((userIdObject: Followers) => (userIdObject.id === user?.id)) ?
                                            <Button
                                                variant='outlined'
                                                onClick={handleUnfollow}
                                            >
                                                Unfollow

                                            </Button>
                                            :
                                            <Button

                                                variant='outlined'
                                                onClick={handleFollow}
                                            >
                                                Follow
                                            </Button>


                                }

                            </Box>
                        </Box>
                    </CardContent>

                    <Divider />

                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px'
                            }}

                        >
                            <Typography
                                fontSize={18}
                                sx={{
                                    textAlign: { xs: 'center', sm: 'left' }
                                }}
                            >
                                {posts.length} Posts
                            </Typography>
                            <Typography
                                fontSize={18}
                                sx={{
                                    textAlign: { xs: 'center', sm: 'left' }
                                }}
                            >
                                {user?.followers?.length} Followers
                            </Typography>
                            <Typography
                                fontSize={18}
                                sx={{
                                    textAlign: { xs: 'center', sm: 'left' }
                                }}
                            >
                                {user?.following?.length} Following
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Hidden>
        </div >
    )
}
