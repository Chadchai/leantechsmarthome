import React, { useState, useEffect } from 'react';
import '../App.css';

import Appbar from '../components/appbar1';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Footer from '../components/Footer';
import Homebutton from '../components/Homebutton';
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
    //  console.log('http://localhost:3001/zonelist');
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

  const icon1 ='<SentimentSatisfiedAlt fontSize="large" color="success"/>'

  return (
    <div className="App" style={{justifyContent:'right'}}>
         <Appbar onDataFromChild={handleChildData}/>
      <header className="App-header" >
      <Grid container spacing={2}  
       sx={{color:'white',
        '--Grid-borderWidth': '1px',
        borderTop: 'var(--Grid-borderWidth) solid',
        borderLeft: 'var(--Grid-borderWidth) solid',
        borderColor: 'divider',
        '& > div': {
          borderRight: 'var(--Grid-borderWidth) solid',
          borderBottom: 'var(--Grid-borderWidth) solid',
          borderColor: 'divider',
        },
      }}
      >
        <Grid item xs={12} sm={6} md={3} style={{marginLeft:'20px',marginTop: isMobile?'100px':'0px'}}>
        <Link to="/checkin">
        <Homebutton icon='1' name='เช็คอิน/เช็คเอ้าท์'/>
        </Link>
        </Grid>
       
        <Grid item xs={12} sm={6} md={3} style={{marginLeft:'20px'}}>
        <Link to="/status">
        <Homebutton icon = '2' name='ดูสถานะบ้าน' />
        </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3} style={{marginLeft:'20px'}}>
        <Link to="/status">
        <Homebutton icon='4' name='การแจ้งเตือนต่างๆ'/>
        </Link>
        </Grid>

        <Grid item xs={12} sm={6} md={3} style={{marginLeft:'20px'}}>
        <Homebutton icon='3' name='ความพึงพอใจ'/>
        </Grid>
       
      </Grid>
    

      </header>
      <Footer/>
   
    </div>
  );
}

export default Mainpage;
