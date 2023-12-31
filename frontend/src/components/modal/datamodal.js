// ModalContent.js
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalContent = (props) => {
  
  return (
    <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      {props.data}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    
    </Typography>
  </Box>
  );
};

export default ModalContent;