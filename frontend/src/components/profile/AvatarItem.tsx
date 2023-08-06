import '../../styles/avataritem.css'

type AvatarItemProps = {
    src: string,
    alt?: string,
}

const AvatarItem = (props: AvatarItemProps) => {
    const { src } = props;
    return (
        <img src={`/uploads/${src}`} alt="Avatar" className="avatar" />
    )
}

export default AvatarItem