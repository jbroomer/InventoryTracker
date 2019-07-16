import React, { useState, useEffect } from 'react';
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Select,
  Divider,
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl,
  Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'; 
import axios from 'axios';
import AddLaptopForm from './AddLaptopForm';
import AddEquipmentForm from './AddEquipmentForm';

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


const AddLaptop = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [itemToAdd, setItemToAdd] = useState('laptop');
  const [addLaptop, setAddLaptop] = useState(false);
  const [addEquipment, setAddEquipment] = useState(false);

  const handleAddItem = () => {
    if(itemToAdd === 'laptop') {
      setAddLaptop(true);
    }
    else {
      setAddEquipment(true);
    }
    setOpen(false);
  }
  const handleChange = (e) => {
    setItemToAdd(e.target.value);
  }
  const handleClose = () => {
    setOpen(false);
  }
  const handleOnClick = () => {
    setOpen(true);
  }

  const renderForm = () => {
    if(itemToAdd === 'laptop'){
      return <AddLaptopForm addLaptop={addLaptop} />;
    }
    return <AddEquipmentForm addEquipment={addEquipment} />;
  }

    return(
      <div>
        <Button 
          style={{color:'white'}}
          onClick={handleOnClick}
        >
          Add
        </Button>
        <Dialog open={open} onBackdropClick={handleClose}>
          <DialogTitle style={{textAlign:'center'}}>
            Add to Inventory
          </DialogTitle>
          <Divider />
          <DialogContent>
           <FormControl>
          <Select
            className={classes.root}
            value={itemToAdd}
            onChange={handleChange}
            //input={<OutlinedInput name="addItem" id="add-item" />}
          >
            <MenuItem value={'laptop'}>Add Laptop</MenuItem>
            <MenuItem value={'other'}>Add Other</MenuItem>
          </Select>

            {renderForm()}
          </FormControl>
          </DialogContent>
          <DialogActions>
            <Button 
              variant="contained"
              color="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddItem}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
};



export default AddLaptop;