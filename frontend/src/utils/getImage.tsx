interface GetImageProps {
    setImageBase64: (base64: string) => void;
    user: UserType | undefined;
}

export const getImage = async (props: GetImageProps) => {
    const { setImageBase64, user } = props;
    fetch(`http://localhost:3000/uploads/${user?.picture?.fileName}`)
        .then(res => res.blob())
        .then(blob => {
            const img = URL.createObjectURL(blob);
            setImageBase64(img);
        })
}