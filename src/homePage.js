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
import { Link } from 'react-router-dom';
import AddButton from './components/addButton';
import Header from './components/header';
import AddStudent from './components/addStudent';
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';

export default function StudentTable() {

  const [users, setUsers] = useState([])
  const [showAddTask, setShowAddTask] = useState(false)

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setUsers(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/students')
    const data = await res.json()

    return data
  }

  const addTask = async (user) => {
    setUsers([...users, user])
    console.log(user);
    const res = await fetch('http://localhost:5000/students', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const userFromServer = await fetchTasks();
    setUsers(userFromServer);
  }

  //Delete Tasks
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/students/${id}`, {
      method: 'DELETE',
    })
    //We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? setUsers(users.filter((user) => user.id !== id))
      : alert('Error Deleting This Task')
  }


  
  return (
    <div>
    <Header/>
    <AddButton
    title="Add Student"
    onAdd={() => setShowAddTask(!showAddTask)}
    showAdd={showAddTask}
    />   
    {showAddTask && <AddStudent onAdd={addTask} />}


    <TableContainer style={{margin:"auto",width:"90%"}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell align="left">Student Age</TableCell>
            <TableCell align="left">Courses</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            

              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              
              <TableCell align="left">{user.age}</TableCell>
              <TableCell align="left">{user.course}</TableCell>
              <TableCell align="right">
              <Link to={`/student-page/${user.id}`}>
                <IconButton>
                  <CreateIcon/>
                </IconButton>
              </Link>
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => deleteTask(user.id)}>  
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
