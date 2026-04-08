import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  const handleSave = () => {
    if (!editText.trim()) return;
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
      className={`todo-item ${todo.completed ? "completed" : ""}`}
    >
      {isEditing ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <motion.button whileHover={{ scale: 1.1 }} onClick={handleSave}>
            Save
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => setIsEditing(false)}>
            Cancel
          </motion.button>
        </>
      ) : (
        <>
          <span onClick={() => toggleTodo(todo.id)}>
            {todo.text}
          </span>
          <div className="actions">
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => setIsEditing(true)}>
              Edit
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} onClick={() => deleteTodo(todo.id)}>
              Delete
            </motion.button>
          </div>
        </>
      )}
    </motion.div>
  );
}