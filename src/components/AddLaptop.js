import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';
import AddLaptopForm from './AddLaptopForm'

class AddLaptop extends Component {
  constructor(props) {
		super();
    //this.toggleLaptopInformation = this.toggleLaptopInformation.bind(this);
    this.addLaptop = this.addLaptop.bind(this);
  }

  addLaptop(){
    axios.post('http://localhost:4000/laptops/return/' + this.props.item._id)
    .then(window.location.reload());
    console.log("here");
  }


  render(){
    return(
      <div>
        <Grid>
          <AddLaptopForm />
        </Grid>
      </div>
    )
  }
}



export default AddLaptop;