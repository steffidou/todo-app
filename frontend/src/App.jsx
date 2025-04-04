import React, { useEffect, useState } from 'react';

function App() {
  const [todo, setTodo] = useState(null); // State to hold the fetched todo
  const [error, setError] = useState(null); // State to handle any errors
  const [loading, setLoading] = useState(true); // State for loading state

  useEffect(() => {
    // Fetch data when the component mounts
    const fetchTodo = async () => {
      try {
        const response = await fetch('https://todo-app-u6pm.onrender.com/api/todos/1');
        
        // Check if the response is ok (status 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json(); // Parse the JSON response
        setTodo(data); // Set the fetched data to state
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError(error.message); // Handle any errors
        setLoading(false); // Set loading to false even if an error occurred
      }
    };

    fetchTodo();
  }, []); // Empty array means this effect runs only once after the component mounts

  // Display loading message or error if needed
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // If todo data is fetched successfully, render it
  return (
    <div>
      <h1>Todo Details</h1>
      <h2>{todo.title}</h2> {/* Assuming your todo has a "title" field */}
      <p>{todo.description}</p> {/* Assuming your todo has a "description" field */}
      {/* Render other todo details */}
    </div>
  );
}

export default App;
