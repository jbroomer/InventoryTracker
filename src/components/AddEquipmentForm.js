import React, {useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField } from '@material-ui/core';

const propTypes = {
  addEquipment: PropTypes.bool.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const AddEquipmentForm = (props) => {
  const [typeError, setTypeError]=useState(false);
  const [idError, setIdError]=useState(false);
  const classes = useStyles();
  const addEquipment = () => {
      let form = document.forms.equipmentForm;
      const equipmentInfo = {};
      equipmentInfo.type = form.type.value;
      equipmentInfo.id = form.id.value;
      equipmentInfo.available = true;
      
      if(!equipmentInfo.type){
        setTypeError(true);
      }
      if(!equipmentInfo.id){
        setIdError(true);
      }
      if(equipmentInfo.type && equipmentInfo.id){
      axios.post('http://localhost:4000/equipment/add' , equipmentInfo)
      .then(res => window.location.reload());
      }
  }

  useEffect(() => {
    if(props.addEquipment){
      addEquipment();
    }
  }, [props.addEquipment]);

  return (
    <div>
      <form name="equipmentForm">
      <FormControl name = "equipmentForm">
          <TextField
              required
              error={typeError}
              id="outlined-simple-start-adornment"
              className={classes.root}
              variant="outlined"
              label="Type"
              name = "type"
            />
          <TextField
              required
              error={idError}
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
AddEquipmentForm.propTypes = propTypes;
export default AddEquipmentForm;
