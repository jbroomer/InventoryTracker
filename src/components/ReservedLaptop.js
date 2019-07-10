import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import ReserveLaptopForm from './ReserveLaptopForm'

class ReserveLaptop extends Component {
  constructor(props) {
		super();
		this.state = {
			clicked: 'Reserved'
		};
		this.toggleForm = this.toggleForm.bind(this);
	}

toggleForm() {
this.setState({clicked:<ReserveLaptopForm item = {this.props.item} />})
}

render(){
return(
            <div>
            <Button size="small" color="primary" onClick={this.toggleForm}> 
            {this.state.clicked}
            </Button>
            </div>
)
}
}



export default ReserveLaptop;