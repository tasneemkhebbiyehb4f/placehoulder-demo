import { useState } from "react";
import { deleteTodo, updateTodo } from "../../services/todoService";

const TodoItem = ({ todo, onTodoUpdated, onTodoDeleted, onEdit }) => {
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        try {
            setLoading(true);

            const updatedTodo = await updateTodo(todo.id, {
                completed: !todo.completed,
            });

            onTodoUpdated(updatedTodo);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id);
            onTodoDeleted(todo.id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleCheck}
                disabled={loading}
            />

            <span>{todo.title}</span>

            <span>
                {todo.completed ? "Completed" : "Pending"}
            </span>

            <button onClick={() => onEdit(todo)}>
                Edit
            </button>

            <button onClick={handleDelete}>
                Delete
            </button>
        </li>
    );
};

export default TodoItem;