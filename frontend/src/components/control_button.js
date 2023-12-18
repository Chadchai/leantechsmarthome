import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import ModalContent from './modal/datamodal'; 
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Devicestatus from './statusitem';
import Grid from '@mui/material/Grid';

const YourComponent = (props) => {
  // State to store the data from the API
  const [data, setData] = useState(null);
  // State to track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);

  const fetchData = async () => {
    try {
      // Make a GET request to your API endpoint
      //console.log('http://localhost:3001/api/data/'+ props.zoneid);
      const response = await axios.get('https://leantechsmarthome-0db22cab28f1.herokuapp.com/api/data/'+ props.zoneid);
      // Set the data in the state
      setData(response.data);
     // console.log(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, ([],selectedData)); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount
 
  // Display loading state while waiting for the data
  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  
  // Display an error message if there was an error
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const controldevice = async (type,code,deviceId,remoteId,id,currentstatus) => {
    setLoading(true);
    //console.log('https://leantechsmarthome-0db22cab28f1.herokuapp.com/smarthome/control/'+deviceId + '/'+ remoteId+ '/' +type +"/" + code+"/" +currentstatus)
    try {
      const response = await axios.post('https://leantechsmarthome-0db22cab28f1.herokuapp.com/smarthome/control/'+deviceId + '/'+ remoteId+ '/' +type +"/" + code+"/" +currentstatus);
    
     
    } catch (error) {
      console.error('Error making POST request:', error.message);
      return 'Error: ' + error.message;
    }  finally {
      // Set loading to false whether the request was successful or not
      
setLoading(false);

      
    }
   
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleChange = async (name,type,code,deviceId,remoteId,id,currentstatus) => {
  setSelectedData(name);
setId(id);
  if (remoteId === null ) {
    remoteId = 'noremote';
  }

 // console.log('http://localhost:3001/smarthome/control/'+deviceId + '/'+ remoteId+ '/' +type +"/" + code+"/" +currentstatus);
try {
  await controldevice(type,code,deviceId,remoteId,id,currentstatus);
  fetchData();
} catch (error) {
  console.error('Error making POST request:', error.message);
  return 'Error: ' + error.message;
}

//handleOpen();
  };
  // Display the data
  return (
    
     
      <FormGroup sx={{border:'solid',margin:'10px',paddingTop:'10px'}}>
      <h3>{props.zonename}</h3>
        {data?.map(item => (
          item.code !== null ?
            <div id={item.id} key={item.id}  style={{height:50}}  onClick={() => handleChange(item.button_name,item.device_type, item.device_status=== "1" ? item.code_value1: item.code_value,item.device_id,item.remote_id,item.id,item.device_status)}>
            {item.device_status === "0" ? 
            <Grid container spacing={2}>
            <Grid item xs={6}  >
            <FormControlLabel control={ <Switch  key={item.id} />} label={id=== item.id && loading?'...กำลังสั่งงาน':item.button_name} />
            </Grid>
             <Grid item xs={6} align="left">
            {item.monitor==='yes'&& <Devicestatus devicetype={item.device_type} devicename={item.button_name} deviceId={item.device_id} />}
            </Grid>
           </Grid>
            :
            <Grid container spacing={2}>
            <Grid item xs={6}   >
            <FormControlLabel control={ <Switch defaultChecked checked={item.device_status === "1"}  />} label={id=== item.id && loading?'...กำลังสั่งงาน':item.button_name} />
            </Grid>
             <Grid item xs={6} align="left">
            {item.monitor==='yes'&& <Devicestatus devicetype={item.device_type} devicename={item.button_name} deviceId={item.device_id} />}
            </Grid>
           </Grid>
          }
            </div>
        :
        <div id={item.id} key={item.id} style={{height:50,marginTop:'20px'}}  >
         
            <Devicestatus devicetype={item.device_type} devicename={item.button_name} deviceId={item.device_id} />
            </div>

        ))}
               <Modal
          open={open}
          onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      
      >
        <ModalContent  data={selectedData} />
      </Modal>
        </FormGroup>
 
  
      

      
   
  );
};

export default YourComponent;
