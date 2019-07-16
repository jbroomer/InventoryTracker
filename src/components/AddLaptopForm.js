import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, FormLabel, Select, OutlinedInput, MenuItem, TextField, InputLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  label: {
    flexGrow: 1,
    marginLeft: theme.spacing(2),
  },
}));

export default function AddLaptopForm(props) {
  const classes = useStyles();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  
  const addLaptop = () => {
      console.log("In laptop form")
      const laptopInfo = {};
      laptopInfo.brand = brand;
      laptopInfo.model = model;
      laptopInfo.year = year;
      laptopInfo.available = true
      console.log(laptopInfo);
      // axios.post('http://localhost:4000/laptops/add' , laptopInfo)
      // .then(res => console.log(res.data));
  }

  const handleBrandChange = (e) => {
    setBrand(e.target.value);
  }
  const handleModelChange = (e) => {
    setModel(e.target.value);
  }
  const handleYearChange = (e) => {
    setYear(e.target.value);
  }

  useEffect(() => {
    if(props.addLaptop){
      addLaptop();
    }
  }, [props.addLaptop]);

  return (
    <div>
      {props.addLaptop}
      <FormControl name = "laptopForm">
        <InputLabel className={classes.label} htmlFor="outlined-brand-simple">Brand</InputLabel>
        <Select
          className={classes.root}
          value={brand}
          onChange={handleBrandChange}
          input={<OutlinedInput name="brand" id="outlined-brand-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'Apple'}>Apple</MenuItem>
          <MenuItem value={'Dell'}>Dell</MenuItem>
          <MenuItem value={'Google'}>Google</MenuItem>
        </Select>
          <TextField
              required
              id="outlined-simple-start-adornment"
              className={classes.root}
              variant="outlined"
              label="Model"
              name = "model"
              onChange={handleModelChange}
            />
          <TextField
              required
              id="outlined-simple-start-adornment"
              className={classes.root}
              variant="outlined"
              label="Year"
              name = "year"
              onChange={handleYearChange}
            />
      </FormControl>
    </div>
  );
}