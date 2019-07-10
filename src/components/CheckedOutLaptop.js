import React from 'react';
import Button from '@material-ui/core/Button';





export default function ReserveLaptopForm(props) {
  const reserveLaptop = () => {
    console.log(props.item.available);    
  }

  return (
            <Button size="small" color="primary" onClick={reserveLaptop}>
            Checked Out
            </Button>
  );
}