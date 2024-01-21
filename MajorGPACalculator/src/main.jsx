import React from 'react'
import ReactDOM from 'react-dom/client'
import InfoProvider from "./components/InfoProvider";
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <InfoProvider >
      <App />
    </InfoProvider>
  </React.StrictMode>,
)
