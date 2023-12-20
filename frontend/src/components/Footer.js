// Footer.js
import React from 'react';
import { styled } from '@mui/system';
import { Typography, Container, Grid, CardMedia } from '@mui/material';

const FooterContainer = styled('footer')({
  padding: '20px',
  marginTop: 'auto',
  backgroundColor: '#282c34',
});

const Footer = () => {
  return (
    <FooterContainer>
      <Container >
      <Grid container spacing={2}>
      
            <Grid item xs={12} sm={3}>
            <CardMedia
               component="img"
               alt="green iguana"
               sx={{ width: 200 }}
                image="./leantechlogo.png"
               
            />
            </Grid>  
            <Grid item xs={12} sm={6}>
            <Typography variant="h6" align="center" color={'white'}>
                    LEANTECH SMART GUESTHOUSE SYSTEMS 
                    </Typography>
            </Grid>
            <Grid item xs={12} sm={3}>
            <Typography variant="้h6" align="center" color={'white'}>
                โทร: 095-438-5862 
             </Typography>
            </Grid> 
        </Grid>
        
      </Container>
    </FooterContainer>
  );
};

export default Footer;