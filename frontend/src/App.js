import React, { useState, useEffect } from 'react';
import './App.css';
import Buton from './components/control_button';
import Appbar from './components/appbar1';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Footer from './components/Footer';
function App() {
  const [zonelist, setZonelist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="App">
         <Appbar/>
      <header className="App-header">
    
      <Grid container spacing={2} sx={{minHeight:'500px',marginY:'20px'}}>
      {zonelist?.map(item => (
          
          <Grid  key={item.zone_id} item xs={12} sm={6} md={4} >
        <Buton zoneid ={item.zone_id} zonename={item.zone_name}/>
        </Grid>
      ))}
     </Grid>
   
      </header>
      <Footer/>
   
    </div>
  );
}

export default App;
