import React, { useEffect } from 'react';
import useInfoContext from "./useInfoContext";

export default function Calculator() {
  const { setMajorGPA, result } = useInfoContext();
  useEffect(() => {
    let sum = 0;
    let credits = 0;
    if (result) {
    result.map((course) => {
      sum += parseInt(course.grade) * parseInt(course.credits);
      credits += parseInt(course.credits);
    })
    setMajorGPA((sum / credits).toFixed(2));
    }
  }, [result]);

  return (
    <table className='table'>
      <thead>
        <tr id='tableHeader'>
          <th>Course</th>
          <th>Credits</th>
          <th>GPA</th>
        </tr>
      </thead>
      <tbody>
        {result.map((course) => {
          return (
            <tr id={course.id} key={course.code}>
              <td>{course.code}</td>
              <td>{course.credits}</td>
              <td>{course.grade}</td>
            </tr>
          )
        })
        }
      </tbody>
    </table>
  )
}