import React from 'react';
import axios from 'axios';

export default function ReserveLaptopForm(props) {
  let newName = {
      name: 'Eddy'
  }
  
    const reserveLaptop = () => {
    axios.post('http://localhost:4000/laptops/update/' +props.item._id, newName)
    .then(res => console.log(res.data));
    }
    

  return (
    <div>
        <form onSubmit={reserveLaptop}>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Expected Return:
                <input type="date" name="name" />
            </label>
                <input type="submit" value="Submit" />
        </form>
     </div>
  );
}