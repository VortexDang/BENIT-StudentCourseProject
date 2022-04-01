import Button from './button.js'
const AddButton = ({ title, onAdd, showAdd }) => {

  return (
    <header className='header'style={{width:"30%", margin:"auto"}}>
      <h1>{title}</h1>
        <Button
          color={showAdd ? 'red' : 'green'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
    </header>
  )
}


// CSS in JS
// const headingStyle = {
//   color: 'red',
//   backgroundColor: 'black',
// }

export default AddButton
