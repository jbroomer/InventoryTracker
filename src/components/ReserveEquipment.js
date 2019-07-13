import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import ReserveEquipmentForm from './ReserveEquipmentForm'

class ReserveEquipment extends Component {
  constructor(props) {
		super();
		this.state = {
			open: false,
    };
    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleCancel = this._handleCancel.bind(this);
	}

  _handleOpen() {
    this.setState({ open: true });
  }

  _handleClose() {
    this.setState({ open: false})
    window.location.reload();
  }

  _handleCancel() {
    this.setState({ open: false})
  }

  
  render() {
    return (
      <div>
        <Dialog fullWidth open = {this.state.open} onBackdropClick = {this._handleCancel}>
          <ReserveEquipmentForm item = {this.props.item} onClose = {this._handleClose} onCancel = {this._handleCancel} />
        </Dialog>
        <Button size="small" color="primary" onClick={this._handleOpen}> 
          Reserve
        </Button>
      </div>
    )
  }
}



export default ReserveEquipment;