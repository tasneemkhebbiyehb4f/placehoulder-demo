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

export const updateStatusTodo = async (todoId, completed) => {
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
export const createTodo = async (todo) => {
    const response = await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });

    if (!response.ok) {
        throw new Error("Failed to create todo");
    }

    return response.json();
};

export const updateTodo = async (todoId, updatedTodo) => {
    const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
        throw new Error("Failed to update todo");
    }

    return response.json();
};

export const deleteTodo = async (todoId) => {
    const response = await fetch(`${API_URL}/todos/${todoId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete todo");
    }
};