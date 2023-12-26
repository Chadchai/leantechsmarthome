import { Fab, Grid, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import DataTable, { createTheme }  from 'react-data-table-component';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AddIcon from '@mui/icons-material/Add';

function Guestlist1() {
    const [guestdata, setGuestdata] = useState(null);
    // State to track loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
          // Make a GET request to your API endpoint
          //console.log('http://localhost:3001/api/data/'+ props.zoneid);
          const response = await axios.get('https://leantechsmarthome-0db22cab28f1.herokuapp.com/api/getguestlist');
          // Set the data in the state
          setGuestdata(response.data);
        // console.log(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {
        fetchData();
      }, ([])); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount
     
      // Display loading state while waiting for the data
      if (loading) {
         return <p>Loading...</p>;
       }
      
      // Display an error message if there was an error
      if (error) {
        return <p>Error: {error.message}</p>;
      }

    const columns = [
        {
            name: 'ID number',
            selector: row => "0000" + row.checkin_id,
            sortable: true,
        },
        {
            name: 'วันที่ Check in',
            selector: row => row.checkin_date,
            sortable: true,
        },
        {
            name: 'วันที่ Checkout',
            selector: row => row.checkout_date,
            sortable: true,
        },
        {
            name: 'ชื่อ',
            selector: row => row.guest_name,
            sortable: true,
        },
        {
            name: 'เบอร์ติดต่อ',
            selector: row => row.guest_phone,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.guest_email,
            sortable: true,
        },
        {
            name: 'รหัสเข้าบ้าน',
            selector: row => row.maindoor_code,
            sortable: true,
        },
        {
            name: 'รหัสปั้มน้ำ',
            selector: row => row.temp_code,
            sortable: true,
        },
        {
            name: '',
            selector: row =>  
            <div><IconButton aria-label="delete">
            <DriveFileRenameOutlineIcon />
            </IconButton>
            <IconButton aria-label="delete">
            <DeleteIcon />
            </IconButton>
            </div>,
            sortable: true,
        },
    ];
    
    const data = [
        {
            id: 1,
            title: '02/01/24',
            year: '1988',
        },
        {
            id: 2,
            title: '02/01/24',
            year: '1984',
        },
    ];

    // createTheme creates a new theme named solarized that overrides the build in dark theme
    const customStyles = {
        rows: {
            style: {
                minHeight: '70px',
                fontSize: '15px',
                
            },
        },
        headCells: {
            style: {
                paddingLeft: '20px',  // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '15px'
            },
        },
        cells: {
            style: {
                paddingLeft: '20px', // override the cell padding for data cells
                paddingRight: '8px',
                fontSize: '15px'
            },
        },
    };

  return (
    
    <Grid sx={{width:'94%',fontSize:'30px',paddingX:'10px'}}>

    <DataTable 
            title="รายชื่อผู้เข้าพัก"
            columns={columns}
            data={guestdata}
            pagination
            Header
            customStyles={customStyles}
        />
        <Fab color="primary" aria-label="add" sx={{position: 'absolute',  bottom: 70,  right: 32,}}>
        <AddIcon />
        </Fab>
    </Grid>
  )
}

export default Guestlist1