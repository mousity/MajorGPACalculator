import { useEffect, useState } from 'react'
import logo from './assets/logo.png'
import axios from 'axios'
import Calculator from './components/Calculator.jsx'
import useInfoContext from "./components/useInfoContext.jsx";
import './App.css'

function App() {
  const {majorGPA, setMajorGPA} = useInfoContext();
  const {result, setResult} = useInfoContext();
  const [error, setError] = useState(null);

  const formData = new FormData();
  formData.append('file', null);

  function handleFile(event) {
    event.preventDefault();
    formData.set('file', event.target.files[0]);
    console.log('file set')
  }

  async function uploadPDF(event) {
    event.preventDefault();
    try {
      axios.post('http://localhost:3001/extract-text', formData).then(response => {
        setResult(response.data.array);
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
        <img className="logo" src={logo}></img>
        <h1>Major GPA Calculator</h1>
      </div>

      <div className='card'>
        <p className='desc'>
          Welcome to our page! Feel free to upload your John Jay student transcript in pdf format for a quick calculation of your major GPA.
        </p>
        <form className='submitForm' onSubmit={uploadPDF}>
        <input className='fileInput' type='file' onChange={handleFile}/><br></br>
        <button className='fileUpload' type='submit'>
          Upload
        </button>
        </form>
      </div>
      <p className='majorGPA'>
        Major GPA: {isNaN(majorGPA) || majorGPA == 0 ? 'N/A' : majorGPA}
      </p>
        <Calculator />
    </>
  )
}

export default App
