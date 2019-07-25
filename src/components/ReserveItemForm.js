import React from 'react';
import axios from 'axios';
import { useState } from 'react'
import { Button, TextField, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function ReserveLaptopForm(props) {
  const [lendDate, setLendDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [staffEmptyError, setStaffEmptyError] = useState(false);
  const [tssEmptyError, setTssEmptyError] = useState(false);
  let reservationInfo = {
      staffMemberName: '',
      lendDate: null,
      expectedReturnDate: '',
      tssEmployeeName: '',
  }
    const reserveLaptop = () => {
      let form = document.forms.laptopForm;
      reservationInfo.staffMemberName = form.staffMemberName.value;
      reservationInfo.tssEmployeeName = form.tssEmployeeName.value;

      reservationInfo.lendDate = {
        displayDate: form.lendDate.value + `, ${lendDate.getFullYear()}`,
        fullDate: lendDate,
      };
      reservationInfo.expectedReturnDate = {
        displayDate: form.expectedReturn.value + `, ${returnDate.getFullYear()}`,
        fullDate: returnDate,
      };

      const staffError = reservationInfo.staffMemberName.length >= 1 ? false : true;
      const tssError = reservationInfo.tssEmployeeName.length >= 1 ? false : true;
      setStaffEmptyError(staffError);
      setTssEmptyError(tssError);
      
      if(!staffError && !tssError) {
        axios.post(`http://localhost:4000/${props.query}/update/` + props.item._id, reservationInfo)
        .then(res => props.onClose());
      }
    }

    const _handleLendDateChange = (date) => {
      if((date-returnDate) < (3600*1000)){
        setLendDate(date);
      }
      else{
        window.alert('The lend date cannot be later than the return date');
      }
    }

    const _handleReturnDateChange = (date) => {
      if((date-lendDate) > (-3600*1000)){
        setReturnDate(date);
      }else{
        window.alert('The return date cannot be earlier than the lend date');
      }
    }

    const onSubmit = () => {
      reserveLaptop();
    }

  return (
    <div>
      <DialogTitle>Lending Info</DialogTitle>
        <DialogContent>
          <form name = "laptopForm">
          <TextField
            required
            error = {staffEmptyError}
            id="outlined-simple-start-adornment"
            style={{ marginRight: '10px' }}
            variant="outlined"
            label="Faculty Member Name"
            name = "staffMemberName"
          />
          <TextField
            required
            id="outlined-simple-start-adornment"
            error = {tssEmptyError}
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
