import React, { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [taskInput, setTaskInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const addTask = () => {
    if (taskInput.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
      setTaskInput("");
    }
  };

  const toggleTask = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const enableEditing = (taskId, text) => {
    setEditingId(taskId);
    setEditText(text);
  };

  const saveEdit = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, text: editText } : task
      )
    );
    setEditingId(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  return (
    <div className="app-container">
      <h1>React TODO App</h1>

      <div className="todo-container">
        <h2>To-Do List</h2>

        <button className="dark-mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>

        <div className="task-input">
          <input
            type="text"
            placeholder="Add a new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
          <button onClick={addTask} className="add-btn">Add Task</button>
        </div>

        <div className="filter-buttons">
          <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>
            All ({tasks.length})
          </button>
          <button className={filter === "completed" ? "active" : ""} onClick={() => setFilter("completed")}>
            Completed ({tasks.filter((task) => task.completed).length})
          </button>
          <button className={filter === "pending" ? "active" : ""} onClick={() => setFilter("pending")}>
            Pending ({tasks.filter((task) => !task.completed).length})
          </button>
        </div>

        <ul className="task-list">
          {filteredTasks.map((task) => (
            <li key={task.id} className="task-item">
              <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
              {editingId === task.id ? (
                <input type="text" className="edit-input" value={editText} onChange={(e) => setEditText(e.target.value)} />
              ) : (
                <span className={task.completed ? "completed" : ""}>{task.text}</span>
              )}

              <div className="task-actions">
                {editingId === task.id ? (
                  <button onClick={() => saveEdit(task.id)} className="save-btn">💾</button>
                ) : (
                  !task.completed && (
                    <button onClick={() => enableEditing(task.id, task.text)} className="edit-btn">✏️</button>
                  )
                )}
                <button onClick={() => deleteTask(task.id)} className="delete-btn">❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
