import React from 'react'
import { useState } from 'react'

const AddCourse = ({ onAdd,id }) => {
  const [name, setName] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!name) {
      alert('Please add a task')
      return
    }

    onAdd({id, name })
    setName('')
  }


  
  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Name</label>
        <input
          type='text'
          placeholder='Add Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}
export default AddCourse


