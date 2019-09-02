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
import mouse from '../assets/mouse.jpeg';
import keyboard from '../assets/keyboard.jpeg';
import microphone from '../assets/microphone.jpeg';

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

const equipmentImages = {
  Mouse: mouse, Keyboard: keyboard, Microphone: microphone,
}

export default function EquipmentCard({
  item, showForm,
}) {
  const classes = useStyles();

  const cardImgUrl = (type) => {
    switch (type) {
      case("Mouse"):
        return equipmentImages.Mouse;
      case("Keyboard"):
        return equipmentImages.Keyboard;
      case("Microphone"):
        return equipmentImages.Microphone;
      default:
        throw type;
    }
  }

  return (
    <Grid item xs={3}>
      <Card id = {item.id} className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            component = 'img'
            alt = 'EquipmentImg'
            image = {cardImgUrl(item.type)}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {item.type} ({item.id})
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
EquipmentCard.propTypes = propTypes;
