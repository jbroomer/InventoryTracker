import React from 'react';
import Navbar from './components/Navbar';
import LoadLaptopData from './components/LoadLaptopData';
import AddLaptop from './components/AddLaptop';

function App() {
  return (
    <div >
      <Navbar />
      <LoadLaptopData />
      <AddLaptop />
    </div>
  );
}

export default App;
