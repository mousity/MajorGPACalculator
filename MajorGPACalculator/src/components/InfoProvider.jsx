import React, { useState} from "react";
import InfoContext from "./InfoContext";

export default function InfoProvider({children}) {
  const [majorGPA, setMajorGPA] = useState(0);
  const [result, setResult] = useState('');

  return(
    <InfoContext.Provider value={{
      majorGPA, 
      setMajorGPA,
      result, 
      setResult,
    }}>
      {children}
    </InfoContext.Provider>
  )
}