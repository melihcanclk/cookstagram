export const postPayload = (post) => {
    return {
        id: post._id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        user: {
            id: post.user._id,
        },
    };
};
