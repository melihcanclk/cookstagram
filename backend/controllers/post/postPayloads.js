export const postPayload = (post) => {
    return {
        id: post._id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
    };
};
