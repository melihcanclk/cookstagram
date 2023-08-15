export const userPayload = (user) => (
    {
        id: user._id,
        name: user.name,
        surname: user.surname,
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
        }),
        followers: user.followers?.map((follower) => {
            return {
                id: follower._id,
            }
        }),
        following: user.following?.map((following) => {
            return {
                id: following._id,
            }
        }),

    }
)
