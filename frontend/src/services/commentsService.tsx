import{API_URL}from "../config/api";
export const getPostComments = async (postId) => {
    const response = await fetch(
        `${API_URL}/comments?postId=${postId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch comments");
    }

    return response.json();
};

export const createComment = async (comment) => {
    const response = await fetch(
        `${API_URL}/comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create comment");
    }

    return response.json();
};

export const updateComment = async (commentId, body) => {
    const response = await fetch(
        `${API_URL}/comments/${commentId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update comment");
    }

    return response.json();
};

export const deleteComment = async (commentId) => {
    const response = await fetch(
        `${API_URL}/comments/${commentId}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to delete comment");
    }
};