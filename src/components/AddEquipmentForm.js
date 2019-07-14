import React from 'react';
import axios from 'axios';

export default function AddEquipmentForm(props) {
  let equipmentInfo = {
      staffMemberName: '',
      lendDate: '',
      expectedReturnDate: '',
      tssEmployeeName: ''
  }
  
    const addEquipment = () => {
        let form = document.forms.equipmentForm;

        equipmentInfo.type = form.type.value;
        equipmentInfo.id = form.id.value
        equipmentInfo.available = true

        axios.post('http://localhost:4000/equipment/add' , equipmentInfo)
        .then(res => console.log(res.data));
    }
    

  return (
    <div>
      <form onSubmit={() => {
        addEquipment();
        this.props.onClose();
      }} name = "equipmentForm">
        <label>
            Type:
            <input type="text" name="type"/>
        </label><br/>
        <label>
            Id:
            <input type="number" name="id" step="1" />
        </label><br/>         

            <input type="submit" value="Submit" />
      </form>
    </div>
  );
}