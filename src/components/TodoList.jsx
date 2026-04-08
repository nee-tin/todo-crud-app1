import React from "react";
import TodoItem from "./TodoItem.jsx";
import { AnimatePresence } from "framer-motion";

export default function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  if (todos.length === 0) return <p>No todos yet!</p>;

  return (
    <div className="todo-list">
      <AnimatePresence>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}