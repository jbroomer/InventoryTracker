import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import chromebook from '../assets/chromebook.jpeg';
import dell from '../assets/dell.jpeg';
import apple from '../assets/macbook.jpeg';

const propTypes = {
  item: PropTypes.object.isRequired,
  showForm: PropTypes.object.isRequired,
};

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const laptopImages = {
  Dell: dell, Apple: apple, Chromebook: chromebook,
}

export default function LaptopCard({
  item, showForm,
}) {
  const classes = useStyles();

  const cardImgUrl = (brand) => {
    switch (brand) {
      case("Dell"):
        return laptopImages.Dell;
      case("Apple"):
        return laptopImages.Apple;
      case("Google"):
        return laptopImages.Chromebook;
      default:
        throw brand;
    }
  }

  return (
    <Grid item xs={3}>
      <Card id = {item.id} className={classes.card}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            component = 'img'
            alt = 'LaptopImg'
            image = {cardImgUrl(item.brand)}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {item.brand} ({item.year})
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            {showForm}
        </CardActions>
      </Card>
    </Grid>
  );
}

LaptopCard.propTypes = propTypes;