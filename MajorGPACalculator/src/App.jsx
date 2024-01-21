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

  async function callOcrApi(event) {
    event.preventDefault();
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
      console.log('sending file')
      axios.post('http://localhost:3001/extract-text', formData).then(response => {
        console.log(response.data.text);
        setResult(response.data.text);
      })
      console.log('file sent')
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
          Welcome to our page! Feel free to upload your student transcript in pdf format for a quick calculation of your major GPA.
        </p>
        <form className='submitForm' onSubmit={callOcrApi}>
        <input className='fileInput' type='file' onChange={handleFile}/>
        <button className='fileUpload' type='submit'>
          Upload
        </button>
        </form>
      </div>
      <p className='majorGPA'>
        Major GPA: {majorGPA}
      </p>
      <table className='table'>
        <thead>
          <tr>
            <th>Course</th>
            <th>Credits</th>
            <th>GPA</th>
          </tr>
        </thead>
        {/* <tbody>
          <tr><td>CSCI 101</td><td>3.00</td><td>4</td></tr>
          <tr><td>CSCI 102</td><td>3.00</td><td>3.7</td></tr>
          <tr><td>CSCI 103</td><td>3.00</td><td>2</td></tr>
        </tbody>*/}
        <Calculator />
      </table>
      {result ? result : null}
    </>
  )
}

export default App
