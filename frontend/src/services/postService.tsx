import{API_URL}from "../config/api";

export const getPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
        throw new Error("Failed to fetch posts");
    }

    return response.json();
};

export const getUserPosts = async (userId) => {
    const response = await fetch(
       `${API_URL}/posts?userId=${userId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch user posts");
    }

    return response.json();
};

export const updatePost = async (postId, updatedPost) => {
    const response = await fetch(
        `${API_URL}/posts/${postId},
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPost),
        }`
    );

    if (!response.ok) {
        throw new Error("Failed to update post");
    }

    return response.json();
};

export const deletePost = async (postId) => {
    const response = await fetch(
        `${API_URL}/posts/${postId},
        {
            method: "DELETE",
        }`
    );

    if (!response.ok) {
        throw new Error("Failed to delete post");
    }
};