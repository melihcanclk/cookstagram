import { useImage } from '../../hooks/useImage';
import '../../styles/avataritem.css'


const AvatarItem = (props: AvatarItemProps) => {
    const { src } = props;

    const image = useImage(src);
    
    return (
        <img src={image} alt="Avatar" className="avatar" />
    )
}

export default AvatarItem