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

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("https://todo-app-u6pm.onrender.com/api/todos/fetch");
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (taskInput.trim() !== "") {
      const newTask = { title: taskInput, completed: false };
      const response = await fetch("https://todo-app-u6pm.onrender.com/api/todos/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTask),
      });
      const data = await response.json();
      setTasks([...tasks, data]);
      setTaskInput("");
    }
  };

  const toggleTask = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    const updatedTask = { ...task, completed: !task.completed };

    const response = await fetch(`https://todo-app-u6pm.onrender.com/api/todos/${taskId}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();

    setTasks(tasks.map((task) => (task.id === taskId ? data : task)));
  };

  const deleteTask = async (taskId) => {
    await fetch(`https://todo-app-u6pm.onrender.com/api/todos/${taskId}/delete`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const enableEditing = (taskId, text) => {
    setEditingId(taskId);
    setEditText(text);
  };

  const saveEdit = async (taskId) => {
    const updatedTask = { title: editText, completed: false };
    const response = await fetch(`https://todo-app-u6pm.onrender.com/api/todos/${taskId}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await response.json();

    setTasks(tasks.map((task) => (task.id === taskId ? data : task)));
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
          <button onClick={addTask} className="add-btn">
            Add Task
          </button>
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
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              {editingId === task.id ? (
                <input
                  type="text"
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              ) : (
                <span className={task.completed ? "completed" : ""}>{task.title}</span>
              )}

              <div className="task-actions">
                {editingId === task.id ? (
                  <button onClick={() => saveEdit(task.id)} className="save-btn">
                    💾
                  </button>
                ) : (
                  !task.completed && (
                    <button onClick={() => enableEditing(task.id, task.title)} className="edit-btn">
                      ✏️
                    </button>
                  )
                )}
                <button onClick={() => deleteTask(task.id)} className="delete-btn">
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;