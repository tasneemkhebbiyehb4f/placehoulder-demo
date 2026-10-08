import { useState } from "react";
import { updateTodo } from "../../services/todoService";

const TodoItem = ({ todo, onTodoUpdated }) => {
    const [loading, setLoading] = useState(false);

    const handleCheck = async () => {
        try {
            setLoading(true);

            const updatedTodo = await updateTodo(
                todo.id,
                !todo.completed
            );

            onTodoUpdated(updatedTodo);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
        </li>
    );
};

export default TodoItem;