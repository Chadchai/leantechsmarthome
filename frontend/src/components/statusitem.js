import React, { useState, useEffect } from 'react';
import axios from 'axios';


import Battery50Icon from '@mui/icons-material/Battery50';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import LightIcon from '@mui/icons-material/Light';
import FaceIcon from '@mui/icons-material/Face';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import Typography from '@mui/material/Typography';
import BoltIcon from '@mui/icons-material/Bolt';

function Statusitem(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const GetStatus = async () => {
        setLoading(true);
       // console.log('http://localhost:3001/getstatus/'+props.deviceId);
        try {
          const response = await axios.get('https://leantechsmarthome-0db22cab28f1.herokuapp.com/getstatus/'+props.deviceId);
            setData(response.data);
        } catch (error) {
          console.error('Error making POST request:', error.message);
          return 'Error: ' + error.message;
        }  finally {
          // Set loading to false whether the request was successful or not 
    setLoading(false); 
        }
      }
      useEffect(() => {
        GetStatus();
      }, ([],data));   

  return (
    data!==null?  
    props.devicetype === 'smoke'?
    <Typography variant="body2"><LocalFireDepartmentIcon/> {props.devicename} : {data[0].value==="normal"? <><EmojiEmotionsIcon sx={{color:'greenYellow'}}/> ปกติ</>  :'พบควันไฟ'}  : <Battery50Icon sx={{color:'greenYellow'}}/> {data[1].value} %</Typography>
    : 
    props.devicetype === 'plug'?
    <Typography variant="body2">{data[0].value===true? <><PowerSettingsNewIcon sx={{color:'greenYellow'}}/> On </>  :<><PowerSettingsNewIcon sx={{color:'gray'}}/> Off </>}  : <BoltIcon sx={{color:'greenYellow'}}/> {data[3].value} mA</Typography>
    :
    props.devicetype === 'breaker'?
    <Typography variant="body2">{data[0].value===true? <><PowerSettingsNewIcon sx={{color:'greenYellow'}}/> On </>  :<><PowerSettingsNewIcon sx={{color:'gray'}}/> Off </>}  <></> </Typography>
    :
    <Typography variant="body2"><FaceIcon/> {props.devicename} : {data[0].value==="presence"? <><DirectionsRunIcon sx={{color:'greenYellow'}}/> พบความเคลื่อนไหว</>  :'ไม่พบความเคลื่อนไหว'}  : <LightIcon sx={{color:'greenYellow'}}/> {data[4].value} lux</Typography>
:

    <div>No data</div> 
  )
}

export default Statusitem