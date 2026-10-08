import TodoItem from "./TodoItem";

const TodoList = ({ todos,onTodoUpdated}) => {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onTodoUpdated={onTodoUpdated}/>
      ))}
    </ul>
  );
};

export default TodoList;
