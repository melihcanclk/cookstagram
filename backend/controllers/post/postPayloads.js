export const postPayload = (post) => {
    return {
        id: post._id,
        title: post.title,
        prepTimeInMins: post.prepTimeInMins,
        cookTimeInMins: post.cookTimeInMins,
        servings: post.servings,
        ingredients: post.ingredients,
        directions: post.directions,
        picture: post.picture,
        createdAt: post.createdAt,
        user: {
            id: post.user._id,
        }
    };
};
