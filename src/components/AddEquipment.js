import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core'
import axios from 'axios';
import AddEquipmentForm from './AddEquipmentForm'

class AddEquipment extends Component {
  constructor(props) {
		super();
		this.state = {
			open: false
		};
    this.AddEquipment = this.AddEquipment.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }
  
  _handleClick() {
    this.setState({ open: true });
  }

  _handleClose() {
    this.setState({ open: false });
  }


  AddEquipment(){
    axios.post('http://localhost:4000/equipment/return/' + this.props.item._id)
    .then(window.location.reload());
    console.log("here");
  }


  render(){
    return(
      <div>
        <Dialog fullWidth open = {this.state.open}>
          <DialogTitle>
            Add Equipment
          </DialogTitle>
          <DialogContent>
            <AddEquipmentForm/>
          </DialogContent>
          <DialogActions>
            <Button onClick = {this._handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
        <Button size="small" color="primary" onClick={this._handleClick}> 
          Add Equipment
        </Button>

      </div>
    )
  }
}



export default AddEquipment;