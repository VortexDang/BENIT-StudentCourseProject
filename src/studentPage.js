import React from "react";
import AddStudent from "./components/addStudent"; 
import { useParams } from "react-router-dom";

export default function StudentPage(){
    const [student,setstudent]=React.useState([]);
    let {id}=useParams();
    React.useEffect(() => {
        const getTasks = async () => {
          const tasksFromServer = await fetchStudent()
          setstudent(tasksFromServer)
        }
    
        getTasks()
 
      })
    const fetchStudent = async () => {
       
        const res = await fetch(`http://localhost:5000/student-page/${id}`)
        const data = await res.json()
    
        return data
      } 
      //Update course
      const updateCourse = async (courseNew) => {
        // console.log(JSON.stringify({"id" : id}));
       console.log(courseNew);
         const res = await fetch(`http://localhost:5000/student-page/${id}`, {
           method: 'PUT',
        
           headers: {
             'Content-type': 'application/json',
           },
           body: JSON.stringify(courseNew),
         })  
       }
    
    return(
      
        <div container="paper">
        
        
            <div style={{width:"50%", margin:"auto"}}>
              <h1>Student name :{student.name}</h1>
              <h1>Age :{student.age}</h1>
              <h1>Course :{student.course}</h1>
            </div>
          
       
            
               
                   
                
            
           <AddStudent index={id} onAdd={updateCourse}/>
        </div>
    )
}