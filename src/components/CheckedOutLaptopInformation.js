import React from 'react';

export default function CheckedOutLaptopInformation(props) {
  return (
    <div>
        <p>Staff Member</p>
        <h6>{props.item.lendInfo.staffMemberName}</h6>
        <p>Lend Date</p>
        <h6>{props.item.lendInfo.lendDate}</h6>
        <p>Expected Return</p>
        <h6>{props.item.lendInfo.expectedReturnDate}</h6>
        <p>Tss Employee Name</p>
        <h6>{props.item.lendInfo.tssEmployeeName}</h6>
     </div>
  );
}