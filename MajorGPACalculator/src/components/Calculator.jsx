import React, { useEffect, useState } from 'react';
import useInfoContext from "./useInfoContext";

export default function Calculator() {
  const { setMajorGPA, result } = useInfoContext();
  const mathCodes = [141, 151, 204, 301, 152, 242, 253, 243, 244, 310, 351, 371, 380, 385];
  const csCodes = [271, 272, 274, 360, 373, 374, 375, 377, 379, 
    411, 412, 275, 358, 362, 376, 380, 385, 404, 421, 400, 401];
  const temp = [];
  const [filteredCourses, setFilteredCourses] = useState([]);
    useEffect(() => {
      let sum = 0;
      let credits = 0;
    
      if (result) {
        result.forEach((course) => {
          const coursePrefix = course.code.substring(0, 4);
          let courseNumber = 0;
          if(coursePrefix == "CSCI"){
            courseNumber = parseInt(course.code.substring(5));
          } else {
            courseNumber = parseInt(course.code.substring(4));
          }
          
          if (!isNaN(courseNumber)) {
            if ((coursePrefix === "CSCI" && csCodes.includes(courseNumber)) || 
                (coursePrefix === "MAT " && mathCodes.includes(courseNumber))) {
                  console.log(course.code)
                  temp.push(course);
              sum += parseInt(course.grade) * parseInt(course.credits);
              credits += parseInt(course.credits);
            }
          }
        });
    
        if (credits > 0) {
          setMajorGPA((sum / credits).toFixed(2));
        }
      }
      setFilteredCourses(temp);
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
        {filteredCourses.map((course) => {
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