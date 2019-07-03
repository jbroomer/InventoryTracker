import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function CenteredGrid() {
  const classes = useStyles();
  const [cards, setCards] = useState([]);

  const setCardState = () => {
    setCards(laptopData.map((x) => {
      return <LaptopCard key = {x.id} item = {x} />
    }));
    console.log(cards);
  }

  useEffect(() => {
    setCardState();
  }, cards.length);

  const showLaptopHeader = () => {
    const header = cards.length > 0 ? (<h1>Laptops</h1>) : null;
    return header;
  }

  return (
    <div className={classes.root}>
      {showLaptopHeader()}
      <Grid container spacing={3}>
        {cards}
      </Grid>
    </div>
  );
}