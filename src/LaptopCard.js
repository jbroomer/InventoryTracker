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

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const laptopImages = {
  Dell: 'tss-inventory/assets/dell.jpeg', Apple: 'tss-inventory/assets/apple.jpeg', Chromebook: 'tss-inventory/assets/chromebook.jpeg',
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

  return (
    <Grid item xs={3}>
      <Card id = {props.item.id} className={classes.card}>
        <CardActionArea>
            <CardMedia
            className={classes.media}
            image = {'tss-inventory/assets/dell.jpeg'}
            title= {props.item.make}
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.item.make}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
            </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
            Share
            </Button>
            <Button size="small" color="primary">
            Learn More
            </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}