export const postPayload = (post) => {
    return {
        id: post._id,
        title: post.title,
        prepTimeInSeconds: post.prepTimeInSeconds,
        cookTimeInSeconds: post.cookTimeInSeconds,
        servings: post.servings,
        ingredients: post.ingredients,
        directions: post.directions,
        picture: post.picture,
        createdAt: post.createdAt,
    };
};
