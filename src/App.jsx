import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from .env

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/your-endpoint`)  // Adjust this based on your Django API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Backend Data:</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}

export default App;
