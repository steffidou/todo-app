import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import TodoApp from './TodoApp';  // Corrected import
import '@fontsource/press-start-2p';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <TodoApp />  {/* Use TodoApp here */}
    </div>
  );
}

export default App;
