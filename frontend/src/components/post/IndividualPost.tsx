export const IndividualPost = (props: IndividualPostProps) => {
    const { post } = props;

    return (
        <div className="card-body">
            {
                <>
                    <img src={
                        `uploads/${post.user?.picture}`
                    } style={{ width: "50px", height: "50px", borderRadius: "50px" }} />
                    <p>{post.title}</p>
                    <h5>{post.user?.name} - {
                        new Date(post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })
                    }</h5>
                    <p>{post.content}</p>
                </>
            }
        </div>
    )
}
