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
import ReserveLaptop from './ReserveItem';
import CheckedOutLaptop from './CheckedOutItem';
import LaptopCard from './LaptopCard';


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

  // Grabs data from server
  const loadData = () => {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:4000/laptops/', {method: "GET"}).then((res, err) => {
        if(!res.ok) {
          reject("Failed to load laptops")
          return err("Failed to Fetch Laptops");
        }
        res.json().then(laptops => {
          console.log(laptops);
          return laptops;
        }).then((data) => {
          const initialState = data.map((x) => {
            return <LaptopCard
            key = {x._id}
            item = {x}
            showForm = {x.available ? (<ReserveLaptop queryType='laptops' key = {x._id} item = {x}/>)
                        : <CheckedOutLaptop queryType='laptops' itemType='laptop' key = {x._id} item = {x}/>}
                    />
          });

          if(filter === 'All' && checkBoxState) {
            console.log('1');
            setCards(initialState.filter((item) => {
              console.log(item.props.item.available)
              return item.props.item.available;
            }));
            console.log(cards);
          }
          else if(filter === 'All' && !checkBoxState) {
            console.log('2')
            setCards(initialState);
          }
          else if(checkBoxState){
            setCards((initialState).filter((item) => {
              return item.props.item.brand === filter && item.props.item.available;
            }));
          }
          else {
            setCards((initialState).filter((item) => {
              return item.props.item.brand === filter;
            }));
          }
        })
      });
    })
  }
  const handleChange = (e) => {
    setFilter(e.target.value);
  }
  const handleCheckboxFilter = () => {
    setCheckbox(!checkBoxState);
  }


  useEffect(() => {
    loadData();
  }, [checkBoxState, filter]);


  return (
    <div className={classes.root}>
      <FormControl fullWidth>
        <InputLabel htmlFor="select-item">Laptops</InputLabel>
        <NativeSelect
          value={filter}
          onChange={handleChange}
          input={<BootstrapInput name="item" id="select-item" />}
        >
          <option value={'All'}>All</option >
          <option value={'Apple'}>Apple</option>
          <option value={'Dell'}>Dell</option>
          <option value={'Google'}>Chromebook</option>
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
        >
          Only Show Available
        </FormControlLabel>
      </FormControl>
      <Grid container spacing={3}>
        {cards}
      </Grid>
    </div>
  );
}
