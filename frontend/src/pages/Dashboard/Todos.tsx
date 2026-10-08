import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import TodoList from "../../components/Todos/TodoList";
import { UserContext } from "../../context/userContext";
import { getUserTodos } from "../../services/todoService";

const Todos = () => {
  const { currentUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

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
  const handleTodoUpdated = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo,
      ),
    );
  };

  return (
    <>
      <Navbar />

      <main>
        <h1>My Todos</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <TodoList todos={todos} onTodoUpdated={handleTodoUpdated} />
        )}
      </main>
    </>
  );
};

export default Todos;
