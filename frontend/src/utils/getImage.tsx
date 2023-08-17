import { getCookie } from "./getCookie";

interface GetImageThisProps {
    parameter: string;
    token: string;
    setImage: React.Dispatch<React.SetStateAction<string>>;
}
const getImage = async (props: GetImageThisProps) => {
    const { parameter, token, setImage } = props;

    try {
        const res = await fetch(`http://localhost:3000/uploads/${parameter}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        // convert image file to base64 string
        const blob = await res.blob();
        // convert image file to base64 string using URL    
        const imageUrl = URL.createObjectURL(blob);
        setImage(imageUrl);
        return imageUrl;

    } catch (error) {
        console.log(error);
    }
}

export const getImageOfUser = async (props: ImageProps) => {
    const { setImageBase64, user }: UserImageProps = props as UserImageProps;

    if (!user.picture || !user.picture.fileName) return;

    const token = getCookie('session');
    const parameter = user.picture.fileName;
    getImage({ parameter, token, setImage: setImageBase64 });

}

export const getImageOfPost = async (props: ImageProps) => {
    const { setImageBase64, post }: PostImageProps = props as PostImageProps;

    if (!post.user || !post.picture) return;

    const token = getCookie('session');

    const parameter = post.picture;
    return getImage({ parameter, token, setImage: setImageBase64 });
}

