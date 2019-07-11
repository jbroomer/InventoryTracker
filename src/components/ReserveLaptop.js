import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import ReserveLaptopForm from './ReserveLaptopForm'

class ReserveLaptop extends Component {
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
          <DialogTitle>Lending Info</DialogTitle>
          <DialogContent>
            <ReserveLaptopForm item = {this.props.item} onClose = {this._handleClose}/>
          </DialogContent>
        </Dialog>
        <Button size="small" color="primary" onClick={this._handleOpen}> 
          Reserve
        </Button>
      </div>
    )
  }
}



export default ReserveLaptop;