import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CheckedOutEquipmentInformation from './CheckedOutEquipmentInformation';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core'
import axios from 'axios';


class CheckedOutEquipment extends Component {
  constructor(props) {
		super();
		this.state = {
			open: false
		};
    this.returnEquipment = this.returnEquipment.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }


  _handleClick() {
    this.setState({ open: true });
  }

  _handleClose() {
    this.setState({ open: false });
  }


  returnEquipment(){
    axios.post('http://localhost:4000/equipment/return/' + this.props.item._id)
    .then(window.location.reload());
    console.log("here");
  }


  render(){
    return(
      <div>
        <Dialog fullWidth open = {this.state.open}>
          <DialogTitle>
            Checkout Info
          </DialogTitle>
          <DialogContent>
            <CheckedOutEquipmentInformation item = {this.props.item} />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick = {this._handleClose}>Close</Button>
            <Button size="small" color="secondary" onClick={this.returnEquipment}> 
              Return Equipment
            </Button>
          </DialogActions>
        </Dialog>
        <Button size="small" color = "secondary" onClick={this._handleClick}> 
          Checked Out
        </Button>
      </div>
    )
  }
}



export default CheckedOutEquipment;