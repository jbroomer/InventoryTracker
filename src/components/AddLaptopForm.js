import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, Select, OutlinedInput, MenuItem, InputLabel} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LaptopModels from '../static/laptop-models';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    flexGrow: 1,
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

export default function AddLaptopForm(props) {
  const classes = useStyles();
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  
  const addLaptop = () => {
      const laptopInfo = {};
      if(brand && model && year) {
        laptopInfo.brand = brand;
        laptopInfo.model = model;
        laptopInfo.year = year;
        laptopInfo.available = true
        
        axios.post('http://localhost:4000/laptops/add' , laptopInfo)
        .then(res => window.location.reload());
      }
  }
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth*1.5);
  }, []);
  //Update when add laptop is true;
  useEffect(() => {
    if(props.addLaptop){
      addLaptop();
    }
  }, [props.addLaptop]);
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

  return (
    <form className={classes.root}>
      <FormControl variant="outlined" className={classes.formControl} name = "brand">
        <InputLabel ref={inputLabel} htmlFor="outlined-brand-simple">
          Brand
        </InputLabel>
        <Select
          value={brand}
          onChange={handleBrandChange}
          input={<OutlinedInput labelWidth={labelWidth} name="brand" id="outlined-brand-simple" />}
        >
          <MenuItem value={'Apple'}>Apple</MenuItem>
          <MenuItem value={'Dell'}>Dell</MenuItem>
          <MenuItem value={'Google'}>Google</MenuItem>
        </Select>
        </FormControl>
      <FormControl variant="outlined" className={classes.formControl} name = "model">
        <InputLabel ref={inputLabel} htmlFor="outlined-model-simple">
          Model
        </InputLabel>
        <Select
          value={model}
          onChange={handleModelChange}
          input={<OutlinedInput labelWidth={labelWidth} name="model" id="outlined-model-simple" />}
        >
          {renderLaptopModels()}
        </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl} name = "year">
        <InputLabel ref={inputLabel} htmlFor="outlined-year-simple">
          Year
        </InputLabel>
        <Select
          value={year}
          onChange={handleYearChange}
          input={<OutlinedInput labelWidth={labelWidth} name="year" id="outlined-year-simple" />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {renderLaptopYears()}
        </Select>
      </FormControl>
    </form>
  );
}