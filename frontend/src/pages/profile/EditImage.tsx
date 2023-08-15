import { Avatar, Box } from '@mui/material'
import React from 'react'
import Dropzone from '../../components/Dropzone'
import { Person } from '@mui/icons-material'

interface EditImageProps {
    file: File | null
    setFile: React.Dispatch<React.SetStateAction<File | null>>
    image: string
    user: UserType | undefined
}

export const EditImage = (props: EditImageProps) => {
    const { file, setFile, image, user } = props
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Dropzone
                file={file}
                setFile={setFile}
                children={
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

                }
            />
        </Box>
    )
}
