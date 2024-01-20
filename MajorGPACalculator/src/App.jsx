import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  const formData = new FormData();
  formData.append('file', null);

  function handleFile(event) {
    formData.set('file', event.target.files[0]);
  }

  async function callOcrApi() {
    try {
      // const imageUrl = 'C:/Users/Summer/OneDrive/Pictures/pictotextcrop.PNG';
      // const response = await fetch('http://localhost:3001/perform-ocr', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ imageUrl }),
      // });
  
      // if (!response.ok) {
      //   throw new Error('OCR failed');
      // }
      axios.post('http://localhost:3001/extract-text', formData).then(response => {
        console.log(response.data.text);
        setResult(response.data.text);
      })
    } catch (err) {
      setError(err.message);
    }
  };
  
  
  useEffect(() => {
    
  }, [])
  return (
    <>
      <div className='heading'>
        
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input type="file" onChange={handleFile} />
        <button onClick={callOcrApi}>
          Upload
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
