import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core'
import axios from 'axios';
import AddLaptopForm from './AddLaptopForm'

class AddLaptop extends Component {
  constructor(props) {
		super();
		this.state = {
			open: false
		};
    //this.toggleLaptopInformation = this.toggleLaptopInformation.bind(this);
    this.addLaptop = this.addLaptop.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }
  
  _handleClick() {
    this.setState({ open: true });
  }

  _handleClose() {
    this.setState({ open: false });
  }
  // toggleLaptopInformation() {
  //   this.setState({ clicked:  })
  // }

  addLaptop(){
    axios.post('http://localhost:4000/laptops/return/' + this.props.item._id)
    .then(window.location.reload());
    console.log("here");
  }


  render(){
    return(
      <div>
        <Dialog fullWidth open = {this.state.open}>
          <DialogTitle>
            Add Laptop
          </DialogTitle>
          <DialogContent>
            <AddLaptopForm/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {this._handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Button size="small" color="primary" onClick={this._handleClick}> 
          Add Laptop
        </Button>

      </div>
    )
  }
}



export default AddLaptop;