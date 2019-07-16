import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, FormLabel, Select, OutlinedInput, MenuItem, TextField, InputLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LaptopModels from '../static/laptop-models';

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
  const renderLaptopModels = () => {
    if(!brand) {
      return null;
    }
    const menuItems = LaptopModels[brand].map((model) => {
      return (<MenuItem key={model} value={model}>{model}</MenuItem>);
    });
    return menuItems;
  }
  const renderLaptopYears = () => {
    const currYear = (new Date()).getFullYear();
    const years = [];
    for(let i = 2010; i<=currYear; ++i) {
      years.push(<MenuItem key={i} value={i}>{i}</MenuItem>);
    }
    return years;
  }

  useEffect(() => {
    console.log('In effect');
  }, []);

  return (
    <div>
      {props.addLaptop}
      <FormControl name = "laptopForm">
        {/* <InputLabel className={classes.label} htmlFor="outlined-brand-simple">Brand</InputLabel> */}
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
        {/* <InputLabel className={classes.label} htmlFor="outlined-model-simple">Model</InputLabel> */}
        <Select
          className={classes.root}
          value={model}
          onChange={handleModelChange}
          input={<OutlinedInput name="model" id="outlined-model-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {renderLaptopModels()}
        </Select>
        <Select
          className={classes.root}
          value={year}
          onChange={handleYearChange}
          input={<OutlinedInput name="year" id="outlined-year-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {renderLaptopYears()}
        </Select>
      </FormControl>
    </div>
  );
}