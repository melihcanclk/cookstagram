export const userPayload = (user) => (
    {
        username: user.username,
        email: user.email,
        picture: {
            fileName: user.picture,
        },
        createdAt: user.createdAt,
        posts: user.posts?.map((post) => {
            return {
                id: post._id,
            }
        })
    }
)
