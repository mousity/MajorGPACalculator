import { useEffect, useState } from 'react'
import logo from './assets/logo.png'
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
        <img className="logo" src={logo}></img>
        <h1>Major GPA Calculator</h1>
      </div>

      <div className='card'>
        <p className='desc'>
          Welcome to our page! Feel free to upload your student transcript in pdf format for a quick calculation of your major GPA.
        </p>
        <form className='form'>
          <input type='file' onChange={handleFile} />
          <button onClick={callOcrApi}>
            Upload
          </button>
        </form>
      </div>
      <p className='majorGPA'>
        Major GPA:
      </p>
      <table className='table'>
        <thead>
          <tr>
            <th>Course</th>
            <th>Credits</th>
            <th>GPA</th>
          </tr>
        </thead>
        <tbody> {/*dummy data*/}
          <tr> <td>CSCI 101</td> <td>3.00</td> <td>4</td></tr>
          <tr> <td>CSCI 102</td> <td>3.00</td> <td>3.7</td></tr>
          <tr> <td>CSCI 103</td> <td>3.00</td> <td>2</td></tr>
        </tbody>
      </table>


      {result ? result : null}
    </>
  )
}

export default App
