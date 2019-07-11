import React from 'react';
import axios from 'axios';

export default function AddLaptopForm(props) {
  let laptopInfo = {
      staffMemberName: '',
      lendDate: '',
      expectedReturnDate: '',
      tssEmployeeName: ''
  }
  
    const addLaptop = () => {
        let form = document.forms.laptopForm;

        laptopInfo.brand = form.brand.value;
        laptopInfo.model = form.model.value
        laptopInfo.year = form.year.value

        axios.post('http://localhost:4000/laptops/add' , laptopInfo)
        .then(res => console.log(res.data));
    }
    

  return (
    <div>
      <form onSubmit={() => {
        addLaptop();
        this.props.onClose();
      }} name = "laptopForm">
        <label>
            Brand:
            <input type="text" name="brand"/>
        </label><br/>
        <label>
            Model:
            <input type="text" name="model" />
        </label><br/>
        <label>
            Year:
            <input type="number" name="year" min="1900" max="2099" step="1" />
        </label><br/>         

            <input type="submit" value="Submit" />
      </form>
    </div>
  );
}