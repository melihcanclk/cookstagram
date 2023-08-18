import { Autocomplete, Typography } from "@mui/material";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { getCookie } from "../utils/getCookie";


export const SearchBar = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<SearchBarOptionsType[]>([]);
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        // get users with username
        const search = async () => {
            fetch("http://localhost:3000/search/users",
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${getCookie('session')}`
                    },
                    body: JSON.stringify({ username: value })
                }
            ).then(response => response.json())
                .then(data => {
                    if (data && data.users) {
                        const users = data.users;
                        const options = users.map((user: any) => {
                            return {
                                label: user.name + ' ' + user.surname,
                                value: {
                                    id: user.id,
                                    username: user.username,
                                }
                            }
                        })

                        setOptions(options);
                    }
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                })
        }

        if (value.length > 0) {
            setLoading(true);
            search();
        }

    }, [value]);



    return (
        <div className='search-bar-container'>
            <Autocomplete
                id="asynchronous-demo"
                sx={{
                    minWidth: '200px',
                }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                options={options}
                onInputChange={(event, newValue) => {
                    setValue(newValue);
                }}
                filterOptions={
                    (x) => x.filter((option) => {
                        return option.value.username.toLowerCase().includes(value.toLowerCase())
                    })
                }
                clearText="Clear"
                isOptionEqualToValue={(option, value) => option.value.id === value.value.id}
                loading={loading}
                getOptionLabel={(option) => option.label}
                // when user selects an option
                onChange={(event, value) => {
                    if (value) {
                        // if we are not on the profile page
                        if (window.location.pathname !== `/profile/${value.value.id}`) {
                            // navigate to the profile page
                            window.location.href = `/profile/${value.value.id}`;
                        } else {
                            // reload the page
                            window.location.reload();
                        }
                    }
                }}
                noOptionsText="No users found"
                renderOption={(props, option) => {
                   
                    return (
                        <li {...props}>
                            <div>
                                <Typography sx={{ fontSize: 14 }}>{option.label}</Typography>
                                <Typography sx={{ fontSize: 12 }}>{option.value.username}</Typography>
                            </div>
                        </li>
                    )
                }}

                renderInput={(params) => <TextField {...params} label="Search..."
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}

                />}
            />

        </div>
    )
}
