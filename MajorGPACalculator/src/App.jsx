import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const callOcrApi = async () => {
    try {
      const imageUrl = 'C:/Users/Summer/OneDrive/Pictures/pictotextcrop.PNG';
      const response = await fetch('http://localhost:3001/perform-ocr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageUrl }),
      });
  
      if (!response.ok) {
        throw new Error('OCR failed');
      }
  
      const data = await response.json();
      setResult(data.ParsedResults[0].ParsedText);
      console.log(data.ParsedResults[0].ParsedText);
    } catch (err) {
      setError(err.message);
    }
  };
  
  
  useEffect(() => {
    
  }, [])
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={callOcrApi}>
          API
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
       {result ? result:null}
    </>
  )
}

export default App
