import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import SentimentSatisfiedAlt from '@mui/icons-material/SentimentSatisfiedAlt';
import HomeWork from '@mui/icons-material/HomeWork';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
export default function Homebutton(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea sx={{paddingY:'30px'}}>
        {props.icon === '1'?<AssignmentTurnedInIcon fontSize='large'/>:props.icon === '2'?<HomeWork fontSize='large'/>:props.icon === '4'?<NotificationsActiveIcon fontSize='large'/>:<SentimentSatisfiedAlt fontSize='large'/> }
        
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
         
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
