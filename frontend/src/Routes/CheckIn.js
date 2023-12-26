import React, { useState, useEffect } from 'react';
import '../App.css';

import Appbar from '../components/appbar1';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Footer from '../components/Footer';
import GuestList from '../components/guestlist1';
import { useMediaQuery } from 'react-responsive';

import { Link } from 'react-router-dom';

function Mainpage() {
  const [zonelist, setZonelist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataFromChild, setDataFromChild] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleChildData = (childData) => {
    // Update the state in the parent component with the data from the child
    setDataFromChild(childData);
    console.log(childData);
  };

  const fetchData = async () => {
    try {
      // Make a GET request to your API endpoint
      console.log('http://localhost:3001/zonelist');
      const response = await axios.get('https://leantechsmarthome-0db22cab28f1.herokuapp.com/zonelist');
      // Set the data in the state
      setZonelist(response.data);
      //console.log(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, ([])); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount
  if (loading) {
    return  <Grid container spacing={2} sx={{minHeight:'500px',paddingLeft:'10px'}}>.....กำลังสั่งงาน</Grid>;
  }

  // Display an error message if there was an error
  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div className="App" style={{justifyContent:'right'}}>
         <Appbar onDataFromChild={handleChildData}/>
      <header className="App-header" >
    <GuestList/>
    

      </header>
      <Footer/>
   
    </div>
  );
}

export default Mainpage;
