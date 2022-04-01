import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material'
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';


const AddStudent = ({ onAdd }) => {
  const [courses, setCourses] = useState([])
  const [name, setText] = useState('')
  const [age, setDay] = useState('')
  const [course, setCourse] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setCourses(tasksFromServer)
    }

    getTasks()
  }, [])

  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/courses')
    const data = await res.json()

    return data
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      console.log('')
      return
    }

    onAdd({ name, age, course })

    setText('')
    setDay('')
    setCourse([])
  }
  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Name</label>
        <input
          type='text'
          placeholder='Add Name'
          value={name}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Age</label>
        <input
          type='text'
          placeholder='Add Age'
          value={age}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className='form-control form-control-check'>
      <FormControl fullWidth>
        <InputLabel >Course</InputLabel>
        <Select
          value={course}
          onChange={handleChange}
        >
           {courses.map((subject) => (
            <MenuItem value={subject.name}> {subject.name} </MenuItem>
          ))} 
          {/* <option value="math"> Math </option>
          <option value="physics"> Physics </option>
          <option value="chemistry"> Chemistry </option> */}
        </Select>
        </FormControl>
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}
export default AddStudent


