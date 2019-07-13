import React from 'react';
import axios from 'axios';
import { useState } from 'react'
import { Button, TextField, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function ReserveLaptopForm(props) {
  const [lendDate, setLendDate] = useState();
  const [returnDate, setReturnDate] = useState();
  let reservationInfo = {
      staffMemberName: '',
      lendDate: null,
      expectedReturnDate: '',
      tssEmployeeName: ''
  }
    const reserveLaptop = () => {
        let form = document.forms.laptopForm;

        reservationInfo.staffMemberName = form.staffMemberName.value;
        reservationInfo.lendDate = form.lendDate.value
        reservationInfo.expectedReturnDate = form.expectedReturn.value
        reservationInfo.tssEmployeeName = form.tssEmployeeName.value

        axios.post('http://localhost:4000/laptops/update/' + props.item._id, reservationInfo)
        .then(res => props.onClose());
    }

    const _handleLendDateChange = (date) => {
      console.log(date);
      setLendDate(date);
      console.log(new Date(reservationInfo.lendDate));
    }
    const _handleReturnDateChange = (date) => {
      setReturnDate(date);
    }

    const onSubmit = () => {
      reserveLaptop();
      //props.onClose();
    }

  return (
    <div>
      <DialogTitle>Lending Info</DialogTitle>
        <DialogContent>
          <form name = "laptopForm">
          <TextField
            id="outlined-simple-start-adornment"
            style={{ marginRight: '10px' }}
            variant="outlined"
            label="Faculty Member Name"
            name = "staffMemberName"
          />
          <TextField
            id="outlined-simple-start-adornment"
            //className={clsx(classes.margin, classes.textField)}
            variant="outlined"
            label="Employee Name"
            name = "tssEmployeeName"
          />

           <br/>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="mui-pickers-date"
                label="Lending Date"
                name = "lendDate"
                style = {{ marginRight: '10px' }}
                value={lendDate}
                onChange={_handleLendDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin="normal"
                id="mui-pickers-date"
                label="Expected Return Date"
                name = "expectedReturn"
                value={returnDate}
                onChange={_handleReturnDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
              variant = 'contained'
              color = 'primary'
              onClick = {onSubmit}
          >
                Submit
          </Button>
          <Button
            variant = 'contained'
            color = 'primary'
            onClick = {props.onCancel}
          >
            Cancel
          </Button>
        </DialogActions>
    </div>
  );
}
