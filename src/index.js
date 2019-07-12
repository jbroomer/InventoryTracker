import React from 'react';
import ReactDOM from 'react-dom';
import  { Redirect, Route, Link, BrowserRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import './index.css';
import * as serviceWorker from './serviceWorker';
import LoadLaptopData from './components/LoadLaptopData';
import AddLaptop from './components/AddLaptop';
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
    //backgroundColor: theme.palette.background.paper,
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
            </Typography>
            <Typography className = {classes.navbar}>
            <Link style = {{ textDecoration: 'none', marginLeft: '10px', color: 'white'}} to = '/checkoutOther'>Checkout Other</Link>
            </Typography>
            <Typography className = {classes.navbar}>
            <Link style = {{ textDecoration: 'none', marginLeft: '10px', color: 'white'}} to = '/addLaptops'>Add Laptops</Link>
            </Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
}

// const TestApp = (props) => (
//   <div>
//     <Navbar buttonLink = { <Link to = '/checkout'>Checkout</Link>}/>
//     <div className="contents">
//       {props.children}
//     </div>
//   </div >
// );

// For safety, we specify that the prop types received by the
// App component must require a "children" property. If we do
// not include this it will not compile.
// TestApp.propTypes = {
//   children: React.PropTypes.object.isRequired,
// };
const RoutedApp = () => (
  <BrowserRouter >
    <Route path="/" component={NavBar} />
    <Redirect exact from="/" to="/checkoutLaptops" />
    <Route path = "/checkoutLaptops" component = {LoadLaptopData} />
    <Route path="/checkoutOther" component={NoMatch} />
    <Route path = "/addLaptops" component = {AddLaptop} />
  </BrowserRouter>
  );

ReactDOM.render(<RoutedApp />, contentNode);