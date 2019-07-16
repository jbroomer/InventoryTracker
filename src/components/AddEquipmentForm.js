import React from 'react';
import axios from 'axios';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { FormControl, TextField, InputBase } from '@material-ui/core';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
      color: 'white',
  },
}));

const AddEquipmentForm = (props) => {
  const classes = useStyles();
  let equipmentInfo = {
      type: '',
      id: '',
      available: '',
  }
  
    const addEquipment = () => {
        let form = document.forms.equipmentForm;

        equipmentInfo.type = form.type.value;
        equipmentInfo.id = form.id.value
        equipmentInfo.available = true
        console.log(equipmentInfo);
        // axios.post('http://localhost:4000/equipment/add' , equipmentInfo)
        // .then(res => console.log(res.data));
    }

  return (
    <div>
      <form name="laptopForm">
      <FormControl name = "equipmentForm">
          <TextField
              required
              id="outlined-simple-start-adornment"
              className={classes.root}
              variant="outlined"
              label="Type"
              name = "type"
            />
          <TextField
              required
              id="outlined-simple-start-adornment"
              className={classes.root}
              variant="outlined"
              label="Id"
              name = "id"
            />
      </FormControl>
      </form>
    </div>
  );
}
export default AddEquipmentForm;