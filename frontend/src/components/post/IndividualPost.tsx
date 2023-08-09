import { useImage } from "../../hooks/useImage";

export const IndividualPost = (props: IndividualPostProps) => {
    const { post } = props;
    const image = useImage(post.user?.picture);

    return (
        <div className="card-body" >
            {
                <>
                    <img src={image} alt="profile" />
                    <p>{post.title}</p>
                    <h5>{post.user?.name} - {
                        new Date(post.createdAt).toLocaleDateString('tr-TR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })
                    }</h5>
                    <p>{post.content}</p>
                </>
            }
        </div>
    )
}
