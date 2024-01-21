import React, { useEffect } from 'react';
import useInfoContext from "./useInfoContext";

export default function Calculator() {
  const { setMajorGPA, majorGPA } = useInfoContext();
  const sample = [
    { 'courseName': 'csci101', 'credits': '3.00', 'grade': '4' },
    { 'courseName': 'csci102', 'credits': '3.00', 'grade': '3' },
    { 'courseName': 'csci103', 'credits': '3.00', 'grade': '3.7' }
  ]

  useEffect(() => {
    let sum = 0;
    let credits = 0;
    sample.forEach((course) => {
      sum += parseInt(course.grade) * parseInt(course.credits);
      credits += parseInt(course.credits);
    })
    setMajorGPA((sum / credits).toFixed(2));
  }, []);



  return (
    <tbody>
      {sample.map((course) => {
        return (
          <tr id={course.courseName}>
            <td>{course.courseName}</td>
            <td>{course.credits}</td>
            <td>{course.grade}</td>
          </tr>
        )
      })}
    </tbody>
  )
}