import { useEffect, useState } from "react";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch("todo-app-u6pm.onrender.com/api/todos/fetch")  // Replace with your actual backend URL
            .then(response => response.json())
            .then(data => setTodos(data))
            .catch(error => console.error("Error fetching todos:", error));
    }, []);

    return (
        <div>
            <h1>Todo List</h1>
            <ul>cd 
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.title} {todo.completed ? "✅" : "❌"}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
