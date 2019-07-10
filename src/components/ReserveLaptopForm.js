import React from 'react';
import axios from 'axios';
export default function ReserveLaptopForm(props) {
  let reservationInfo = {
      staffMemberName: '',
      lendDate: '',
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
        .then(res => console.log(res.data));
    }
    

  return (
    <div>
      <form onSubmit={() => {
        reserveLaptop();
        this.props.onClose();
      }} name = "laptopForm">
        <label>
            Staff Member Name:
            <input type="text" name="staffMemberName"/>
        </label><br/>
        <label>
            Lending Date:
            <input type="date" name="lendDate" />
        </label><br/>
        <label>
            Expected Return:
            <input type="date" name="expectedReturn" />
        </label><br/>         
        <label>
            Tss Employee Name:
            <input type="text" name="tssEmployeeName" />
        </label> <br/>
            <input type="submit" value="Submit" />
      </form>
    </div>
  );
}