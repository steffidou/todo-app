import { useState, useEffect } from "react";

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("https://todo-app-u6pm.onrender.com/api/todos/fetch/")
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>To-Do List</h1>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} - {todo.completed ? "✅" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
