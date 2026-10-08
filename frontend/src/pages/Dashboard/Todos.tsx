import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TodoList from "../../components/Todos/TodoList";
import { UserContext } from "../../context/userContext";
import { getUserTodos } from "../../services/todoService";
import TodoForm from "../../components/Todos/TodoForm";

const Todos = () => {
  const { currentUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchTodos = async () => {
      try {
        const data = await getUserTodos(currentUser.id);
        setTodos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [currentUser]);

  if (!currentUser) {
    return <p>Please select a user first.</p>;
  }
  const handleTodoSaved = (savedTodo) => {
    if (editingTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === savedTodo.id ? savedTodo : todo)),
      );

      setEditingTodo(null);
    } else {
      setTodos((prevTodos) => [...prevTodos, savedTodo]);
    }
  };

  const handleTodoUpdated = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );
  };

  const handleTodoDeleted = (todoId) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  return (
    <>
      <Navbar />

      <main>
        <h1>My Todos</h1>

        {/* {loading ? (
          <p>Loading...</p>
        ) : (
          <TodoList todos={todos} onTodoUpdated={handleTodoUpdated} />
        )} */}
        <TodoForm
          todo={editingTodo}
          userId={currentUser.id}
          onTodoSaved={handleTodoSaved}
          onCancel={() => setEditingTodo(null)}
        />

        {loading ? (
          <p>Loading...</p>
        ) : (
          <TodoList
            todos={todos}
            onTodoUpdated={handleTodoUpdated}
            onTodoDeleted={handleTodoDeleted}
            onEdit={setEditingTodo}
          />
        )}
      </main>
    </>
  );
};

export default Todos;
