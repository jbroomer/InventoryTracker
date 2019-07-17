import React from 'react';
import ReactDOM from 'react-dom';
import  { Redirect, Route, Link, BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './index.css';
import * as serviceWorker from './serviceWorker';
import LoadLaptopData from './components/LoadLaptopData';
import LoadEquipmentData from './components/LoadEquipmentData';
import AddItems from './components/AddToInventory';


//import Dashboard from './components/Dashboard';


//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();



var contentNode = document.getElementById("root");

// A simple component to indicate that a page was not found.
const NoMatch = () => <p>Page Not Found</p>;

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '20px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navbar: {
    ...theme.typography.button,
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

function NavBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
            <Typography className = {classes.navbar} >
              <Link style = {{ textDecoration: 'none', color: 'white' }} to = '/checkoutLaptops'>Checkout Laptops</Link>
              <Link style = {{ textDecoration: 'none', marginLeft: '10px', color: 'white'}} to = '/checkoutEquipment'>Checkout Equipment</Link>            
            </Typography>   
            <AddItems />        
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
}

const RoutedApp = () => (  
  
  <BrowserRouter>
    <Route path="/" component={NavBar} />
    <Route path = "/checkoutLaptops" component = {LoadLaptopData} />
    <Route path="/checkoutEquipment" component={LoadEquipmentData} />
  </BrowserRouter>
  );

ReactDOM.render(<RoutedApp />, contentNode);