import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CheckedOutInformation from './CheckedOutInformation';
import { Dialog, DialogTitle, DialogActions, DialogContent } from '@material-ui/core'
import axios from 'axios';

class CheckedOutLaptop extends Component {
  constructor(props) {
		super();
		this.state = {
			open: false
		};
    this.returnItem = this.returnItem.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this.checkOverdue = this.checkOverdue.bind(this);
  }

  _handleClick() {
    this.setState({ open: true });
  }

  _handleClose() {
    this.setState({ open: false });
  }

  returnItem(){
    axios.post(`http://localhost:4000/${this.props.queryType}/return/` + this.props.item._id)
    .then(window.location.reload());
  }

  checkOverdue = () => {
    const fullDate = new Date(this.props.item.lendInfo.expectedReturnDate.fullDate);
    const currDate = new Date();

    if((currDate - fullDate) > 0 && (currDate - fullDate) < (86400*1000)) {
      return 'Checked Out (Due Today)' 
    } else if((currDate - fullDate) > (48200*1000)) {
      return 'Checked Out (OVERDUE)' 
    }
    return 'Checked Out';
  }

  render(){
    return(
      <div>
        <Dialog fullWidth open = {this.state.open}>
          <DialogTitle>
            Checkout Info
          </DialogTitle>
          <DialogContent>
            <CheckedOutInformation item = {this.props.item} />
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick = {this._handleClose}>Close</Button>
            <Button size="small" color="secondary" onClick={this.returnItem}>
              Return {this.props.itemType}
            </Button>
          </DialogActions>
        </Dialog>
        <Button size="small" color = "secondary" onClick={this._handleClick}>
          {this.checkOverdue()}
        </Button>
      </div>
    )
  }
}
export default CheckedOutLaptop;
