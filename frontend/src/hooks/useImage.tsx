import { useEffect, useState } from 'react'

export const useImage = (
    picture: string | undefined
) => {
    const [image, setImage] = useState<string>();

    useEffect(() => {
        // get image from backend
        fetch(`http://localhost:3000/uploads/${picture}`)
            .then(res => res.blob())
            .then(blob => {
                const img = URL.createObjectURL(blob);
                setImage(img);
            })

    }, [])

    return image;
}
