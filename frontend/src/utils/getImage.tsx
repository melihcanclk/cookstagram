
import React from 'react';
interface GetImageProps {
    setImageBase64: React.Dispatch<React.SetStateAction<string>>;
    user: UserType;
}


export const getImage = async ({ setImageBase64, user }: GetImageProps) => {

    const res = await fetch(`http://localhost:3000/uploads/${user.picture.fileName}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${user.token}`
        }
    });
    // convert image file to base64 string
    const blob = await res.blob();

    // convert image file to base64 string using URL    
    const imageUrl = URL.createObjectURL(blob);
    setImageBase64(imageUrl);
}

