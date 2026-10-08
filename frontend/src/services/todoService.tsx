import { API_URL } from "../config/api";

export const getUserTodos = async (userId) => {
    const response = await fetch(
        `${API_URL}/todos?userId=${userId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch todos");
    }

    return response.json();
};

export const updateTodo = async (todoId, completed) => {
    const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            completed,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to update todo");
    }

    return response.json();
};