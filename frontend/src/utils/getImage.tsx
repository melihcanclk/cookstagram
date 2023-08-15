

export const getImage = async ({ setImageBase64, user }: GetImageProps) => {

    if (!user.picture || !user.picture.fileName) return;

    try {
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

    } catch (error) {
        console.log(error);
    }


}

