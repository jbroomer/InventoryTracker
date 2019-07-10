import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import CheckedOutLaptopInformation from './CheckedOutLaptopInformation'
import axios from 'axios';


class CheckedOutLaptop extends Component {
  constructor(props) {
		super();
		this.state = {
			clicked: 'Checked Out'
		};
    this.toggleLaptopInformation = this.toggleLaptopInformation.bind(this);
    this.returnLaptop = this.returnLaptop.bind(this);
	}

toggleLaptopInformation() {
    this.setState({clicked:<CheckedOutLaptopInformation item = {this.props.item} />})
}

returnLaptop(){
      axios.post('http://localhost:4000/laptops/return/' + this.props.item._id)
        .then(window.location.reload());
    }


render(){
return(
  <div>
    <Button size="small" color="primary" onClick={this.toggleLaptopInformation}> 
      {this.state.clicked}
    </Button>
    <Button size="small" color="primary" onClick={this.returnLaptop}> 
      Return Laptop
    </Button>
  </div>
)
}
}



export default CheckedOutLaptop;