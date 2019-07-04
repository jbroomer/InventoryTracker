import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Checkbox from '@material-ui/core/Checkbox';
import InputBase from '@material-ui/core/InputBase';

import LaptopCard from './LaptopCard';

const laptopData = [
    {
        id: 1,
        make: 'Dell',
        status: 'Available'
    },
    {
        id: 2,
        make: 'Apple',
        status: 'Out'
    },
    {
        id: 3,
        make: 'Chromebook',
        status: 'Available'
    },
    {
      id: 4,
      make: 'Dell',
      status: 'Out'
  },
  {
    id: 5,
    make: 'Apple',
    status: 'Available'
},
{
    id: 6,
    make: 'Apple',
    status: 'Available'
},
{
    id: 7,
    make: 'Dell',
    status: 'Available'
},
{
  id: 8,
  make: 'Chromebook',
  status: 'Out'
}
];

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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [filter, setFilter] = useState('All');
  const [checkBoxState, setCheckbox] = useState(false);

  const setInitialCardState = () => {
    setCards(laptopData.map((x) => {
      return <LaptopCard key = {x.id} item = {x} />
    }));
    console.log(cards);
  }

  const handleChange = (e) => {
    setFilter(e.target.value);
  }
  const handleCheckboxFilter = () => {
    setCheckbox(!checkBoxState);
  }

  useEffect(() => {
    if(filter === 'All' && checkBoxState) {
      setCards(laptopData.map((x) => {
        return <LaptopCard key = {x.id} item = {x} />
      }).filter((item) => {
        return item.props.item.status === 'Available';
      }));
    }
    else if(filter === 'All' && !checkBoxState) {
      setInitialCardState();
    }
    else if(checkBoxState){
      setCards(laptopData.map((x) => {
        return <LaptopCard key = {x.id} item = {x} />
      }).filter((item) => {
        return item.props.item.make === filter && item.props.item.status === 'Available';
      }));
    }
    else {
      setCards(laptopData.map((x) => {
        return <LaptopCard key = {x.id} item = {x} />
      }).filter((item) => {
        return item.props.item.make === filter;
      }));
    }
    console.log(filter);
    console.log(checkBoxState);
  }, [checkBoxState, filter]);
  

  return (
    <div className={classes.root}>
      <FormControl fullWidth >
        <InputLabel htmlFor="select-item">Laptop</InputLabel>
        <NativeSelect
          value={filter}
          onChange={handleChange}
          input={<BootstrapInput name="item" id="select-item" />}
        >
          <option value={'All'}>All</option >
          <option value={'Apple'}>Apple</option>
          <option value={'Dell'}>Dell</option>
          <option value={'Chromebook'}>Chromebook</option>
        </NativeSelect>
        <FormControlLabel
          control = {
            <Checkbox
              checked={checkBoxState}
              onChange={handleCheckboxFilter}
              value="checkedA"
            />
            
          }
          label = 'Only Show Available'
        >Only Show Available</FormControlLabel>
        
      </FormControl>
      <Grid container spacing={3}>
        {cards}
      </Grid>
    </div>
  );
}