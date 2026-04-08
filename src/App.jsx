import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm.jsx";
import TodoList from "./components/TodoList.jsx";
import "./styles/App.css";

function App() {
 const [todos, setTodos] = useState([]);

useEffect(() => {
  try {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  } catch (err) {
    console.error(err);
  }
}, []);

 useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
}, [todos]);

  // ➕ Add Todo
  const addTodo = (text) => {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false }
    ]);
  };

  // ✅ Toggle Todo
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // ❌ Delete Todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // ✏️ Edit Todo
  const editTodo = (id, newText) => {
    if (!newText.trim()) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <h1>Pro Todo App</h1>

      <TodoForm addTodo={addTodo} />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;