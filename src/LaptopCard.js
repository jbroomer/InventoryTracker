import Grid from '@material-ui/core/Grid';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import chromebook from './assets/chromebook.jpeg';
import dell from './assets/dell.jpeg';
import apple from './assets/macbook.jpeg';


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

export default function MediaCard(props) {
  const classes = useStyles();

  const cardImgUrl = (make) => {
    switch (make) {
      case("Dell"):
        return laptopImages.Dell;
      case("Apple"):
        return laptopImages.Apple;
      case("Chromebook"):
        return laptopImages.Chromebook;
      default:
        throw make;
    }
  }

  const reserveOrUnavailable = () => {
    const showStatus = props.item.status === 'Available' ? ("Reserve") : ("Checked-Out");
    return showStatus;
  }

  return (
    <Grid item xs={3}>
      <Card id = {props.item.id} className={classes.card}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            component = 'img'
            alt = 'LaptopImg'
            
            image = {cardImgUrl(props.item.make)}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.item.make}
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
            {reserveOrUnavailable()}
            </Button>
            <Button size="small" color="primary">
            Learn More
            </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}