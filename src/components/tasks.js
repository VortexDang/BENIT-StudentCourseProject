import Task from './task.js'
const Tasks = ({ tasks }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task}/>
      ))}
    </>
  )
}

export default Tasks
