import TodoItem from "./TodoItem";

const TodoList = ({ todos, onTodoUpdated, onTodoDeleted, onEdit }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onTodoUpdated={onTodoUpdated}
          onTodoDeleted={onTodoDeleted}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;
