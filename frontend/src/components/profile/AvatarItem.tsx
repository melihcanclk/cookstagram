import '../../styles/avataritem.css'


const AvatarItem = (props: AvatarItemProps) => {
    const { src } = props;
    return (
        <img src={`/uploads/${src}`} alt="Avatar" className="avatar" />
    )
}

export default AvatarItem