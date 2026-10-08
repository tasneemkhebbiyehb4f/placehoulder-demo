import { useEffect, useState } from "react";
import { createTodo, updateTodo } from "../../services/todoService";

const TodoForm = ({ todo, userId, onTodoSaved, onCancel }) => {
    const [title, setTitle] = useState("");

    useEffect(() => {
        setTitle(todo ? todo.title : "");
    }, [todo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) return;

        try {
            if (todo) {
                const updatedTodo = await updateTodo(todo.id, {
                    title: title.trim(),
                });

                onTodoSaved(updatedTodo);
            } else {
                const newTodo = await createTodo({
                    userId,
                    title: title.trim(),
                    completed: false,
                });

                onTodoSaved(newTodo);
            }

            setTitle("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Todo title..."
            />

            <button type="submit">
                {todo ? "Update" : "Add"}
            </button>

            {todo && (
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            )}
        </form>
    );
};

export default TodoForm;
