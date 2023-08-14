import { Autocomplete } from "@mui/material";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { getCookie } from "../utils/getCookie";
import { useNavigate } from "react-router-dom";


export const SearchBar = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<SearchBarOptionsType[]>([]);
    const [value, setValue] = useState<string>('');
    const navigate = useNavigate();

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
                                value: user.username
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
                    width: '300px'
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
                        return option.value
                    })
                }
                isOptionEqualToValue={(option, value) => option.value === value.value}
                loading={loading}
                getOptionLabel={(option) => option.label}
                // when user selects an option
                onChange={(event, value) => {
                    // navigate to user profile
                    if (value)
                        navigate(`/profile/${value.value}`);
                }}

                renderInput={(params) => <TextField {...params} label="Search..." />}
            />

        </div>
    )
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

