import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useMediaQuery } from 'react-responsive';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import CameraIndoorIcon from '@mui/icons-material/CameraIndoor';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleChange = (event) => {
    setAuth(true);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
            
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {isMobile ? <h4>LTMS</h4> : <h2>LEANTECH SMART GUESTHOUSE SYSTEMS</h2>}
            
          </Typography>
          {auth && (
            <div>
        
            <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            >
            <Badge badgeContent={17} color="error">
                <NotificationsIcon />
            </Badge>
            </IconButton>
       
     
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
           
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                 <MenuItem onClick={handleClose}>บัญชีของฉัน</MenuItem>
                <MenuItem onClick={handleClose}>ออกจากระบบ</MenuItem>
              </Menu>
              
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor:'#3081D0',
            color:'white',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          Leantech Smart System
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {['เช็คอิน/เช็คเอ้าท์', 'ดูสถานะบ้าน', 'การแจ้งเตือน'].map((text, index) => ( */}
            <ListItem key='เช็คอิน/เช็คเอ้าท์' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <HomeWorkIcon />
                </ListItemIcon>
                <ListItemText primary='เช็คอิน/เช็คเอ้าท์' />
              </ListItemButton>
            </ListItem>
            <ListItem key='ดูสถานะบ้าน' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <CameraIndoorIcon/>
                </ListItemIcon>
                <ListItemText primary='ดูสถานะบ้าน' />
              </ListItemButton>
            </ListItem>
            <ListItem key='การแจ้งเตือน' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <NotificationsActiveIcon/>
                </ListItemIcon>
                <ListItemText primary='การแจ้งเตือน' />
              </ListItemButton>
            </ListItem>
            <ListItem key='ความพึงพอใจ' disablePadding>
              <ListItemButton>
                <ListItemIcon>
                <SentimentSatisfiedAltIcon/>
                </ListItemIcon>
                <ListItemText primary='ความพึงพอใจ' />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
     
      </Drawer>
      
    </Box>
  );
}