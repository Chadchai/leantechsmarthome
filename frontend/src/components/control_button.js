import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '@mui/material/Modal';
import ModalContent from './modal/datamodal'; 
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const YourComponent = () => {
  // State to store the data from the API
  const [data, setData] = useState(null);
  // State to track loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = useState(false);
  const [switchState, setSwitchState] = useState(false);
  const [buttonID, setButtonID] = useState(null);
  const fetchData = async () => {
    try {
      // Make a GET request to your API endpoint
      const response = await axios.get('http://localhost:3001/api/data');
      // Set the data in the state
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, ([],open)); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount
 
  // Display loading state while waiting for the data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Display an error message if there was an error
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const controldevice = async (type,code,deviceId,remoteId,id,currentstatus) => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/smarthome/control/'+deviceId + '/'+ remoteId+ '/' +type +"/" + code+"/" +currentstatus);
      if (response.status === 200) {
        // The request was successful
        console.log('Post request successful!');
        console.log('Response data:', response.data);
        return 'Success: ' + response.data; // Adjust the return value as needed
      } else {
        console.error('Post request failed with status:', response.status);
        return 'Error: Request failed with status ' + response.status;
      }
    } catch (error) {
      console.error('Error making POST request:', error.message);
      return 'Error: ' + error.message;
    }  finally {
      // Set loading to false whether the request was successful or not
  
setLoading(false);
fetchData();
      
    }
   
  }
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleChange = (name,type,code,deviceId,remoteId,id,currentstatus) => {
  setSelectedData(name);

  if (remoteId === null ) {
    remoteId = 'noremote';
  }
  console.log('http://localhost:3001/smarthome/control/'+deviceId + '/'+ remoteId+ '/' +type +"/" + code+"/" +currentstatus);

controldevice(type,code,deviceId,remoteId,id,currentstatus);
//handleOpen();
  };
  // Display the data
  return (
    <div className='col-md-10'>
      <div className=" row">
      <div >
      <FormGroup>
        {data?.map(item => (
        
            <div key={item.id} className="col-md-2" style={{height:50}}  onClick={() => handleChange(item.button_name,item.device_type, item.device_status=== "1" ? item.code_value1: item.code_value,item.device_id,item.remote_id,item.id,item.device_status)}>
          {  item.device_status === "0"? 
           
            <FormControlLabel control={ <Switch  key={item.id} />} label={item.button_name} />
            :
            <FormControlLabel control={ <Switch defaultChecked key={item.id}  />} label={item.button_name} />
          }
            </div>

        ))}
        </FormGroup>
      </div>
      </div>
       {/* Modal component */}
       <Modal
          open={open}
          onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      
      >
        <ModalContent  data={selectedData} />
      </Modal>
      
    </div>
  );
};

export default YourComponent;
