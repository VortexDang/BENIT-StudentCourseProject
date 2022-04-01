
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root:{
    width:"100%",
  },
  link:{
    textDecoration:"none",
    width:"750px",
    margin:"30px 10px"
  },
  
})

export default function Header() {
  const classes = useStyles();

  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
      <div className={classes.root}>
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
    <Link to="/" className={classes.link}>
      <ToggleButton value="homepage" fullWidth color='primary'>
        HomePage
      </ToggleButton>
    </Link>

    <Link to="/courses" className={classes.link}>
      <ToggleButton value="courses" fullWidth color='primary'>
        Courses
      </ToggleButton>
    </Link>
    </ToggleButtonGroup>
    </div>
  );
}
