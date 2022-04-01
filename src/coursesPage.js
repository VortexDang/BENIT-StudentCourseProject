import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Header from './components/header.js';
import AddButton from './components/addButton.js';
import AddCourse from './components/addCourse.js';
// import { Route, Routes } from 'react-router-dom';




export default function CourseTable() {

  const [courses, setCourses] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setCourses(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/courses')
    const data = await res.json()

    return data
  }

  

  //Add Tasks
  const addTask = async (course) => {
    setCourses([...courses, course])
    const res = await fetch('http://localhost:5000/courses', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(course),
    })
    const courseFromServer = await fetchTasks();
    console.log(courseFromServer);
    setCourses(courseFromServer)

    
  }
  
//Delete Tasks
const deleteTask = async (id) => {
  const res = await fetch(`http://localhost:5000/courses/${id}`, {
    method: 'DELETE',
  })
  //We should control the response status to decide if we will change the state or not.
   res.status === 200
     ? setCourses(courses.filter((course) => course.id !== id))
     : alert('Error Deleting This Task')

}
  
  return (
      <div>
    <Header/>
    <AddButton
    title="Add Course"
    onAdd={() => setShowAddTask(!showAddTask)}
    showAdd={showAddTask}
    />   
    {showAddTask && <AddCourse onAdd={addTask} />}

    <TableContainer style={{margin:"auto",width:"30%", marginTop:"50px"}} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><b>Course Name</b></TableCell>
            <TableCell align='right' ></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map((course) => (
            <TableRow
              key={course.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {course.name}
              </TableCell>
              <TableCell align='right' >
                  <Button onClick={() => deleteTask(course.id)}>  
                      <DeleteIcon style={{cursor:"pointer"}} />   
                </Button>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
