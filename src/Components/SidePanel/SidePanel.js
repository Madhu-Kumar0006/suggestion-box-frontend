import React, { useState } from 'react';
import { NavLink , Outlet, Navigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import { Box, Stack, Grid } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import userImg from './../../Assets/images/admin.png';
import wBLogo from './../../Assets/images/logo-w&b.png';
import jwtDecode from 'jwt-decode';

import { logout } from '../../Redux/Actions/loginAction';


const drawerWidth = 240;


//defining styles
const useStyles = makeStyles(({ palette }) => ({
    menuItems: {
            color: 'white',
        '&:hover' : {
            background: 'linear-gradient(to left, rgba(77,182,172,1) 0%,rgba(255,255,255,0) 98%)',
            borderLeft: '4px solid  #4DB6AC',
            color: 'white'
        }
    },

    activeLink: {
      background: 'linear-gradient(to left, rgba(77,182,172,1) 0%,rgba(255,255,255,0) 98%)',
      borderLeft: '4px solid  #4DB6AC',
      color: 'white'
      
    }
   
}));



const SidePanel = (props) => {

    //styles
  const classes = useStyles();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  //Redux Dispatch
  const dispatch = useDispatch();

  //Redux State:
  const loginDetails= useSelector((state) => state.auth);
  // console.log(loginDetails);

  if (loginDetails.isAuthenticated === false || loginDetails.role_id === null) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(localStorage.getItem("token"));
  const userName = decodedToken.user.first_name + " " + decodedToken.user.last_name;

  const logoutHandler = () => {
    dispatch(logout);
  }


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const drawer = (
    <Box container sx={{ backgroundColor: "black", minHeight: "100vh" }}>
      <Box display="flex" alignItems="center" justifyContent="center" sx={{ width: '100%', minHeight: "60px",  backgroundColor: 'primary.dark' }}>
        <Box>
          <img width={'200px'} src={wBLogo} alt="logo" />
        </Box>   
      </Box>
      <List sx={{ my: 4}}>
        {[{text: 'Dashboard', icon: <DashboardIcon />, link:'/dashboard'},
          {text: 'Team Members', icon: <GroupsOutlinedIcon />, link:'/team-members'},
            {text: 'Suggestion Box', icon:  <QuestionAnswerOutlinedIcon />, link:'/suggestion-box'}, 
            {text: 'Settings', icon: <SettingsOutlinedIcon />, link:'/settings' }].map((item, index) => (
              <ListItem key={item.text} sx={{my:1}}
                disablePadding>
                  <NavLink key={index} to={item.link} 
                    className={({ isActive }) => 
                      (isActive ? `${classes.activeLink}` : `${classes.menuItems}`)}
                      >
                      <ListItemButton sx={{ width:'232px'}}>
                        <ListItemIcon sx={{color:'white'}}>
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={
                          <Typography sx={{letterSpacing: 0.2, fontSize: '16px'}}>{item.text}</Typography>
                        } 
                        />
                      </ListItemButton>
                  </NavLink>
                </ListItem>
        ))}
      </List>
      <Box sx={{alignItems: "center"}}>
            <Divider sx={{borderColor:'white', marginX:2}}/>
            <List sx={{ my: 2}}>
                <ListItem onClick={logoutHandler}
                className={`${classes.menuItems}`}
                disablePadding>
                  <ListItemButton onClick={props.logout}>
                    <ListItemIcon sx={{color:'white'}}>
                      <LogoutOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary={
                      <Typography variant='h6' sx={{letterSpacing: 0.2, fontSize: '16px'}}>Logout</Typography>
                    } 
                    />
                  </ListItemButton>
                </ListItem>
            </List>
      </Box>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar
        position="fixed" 
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'white',
          height: '60px'
        }}
      >
        <Toolbar>
          <Grid container display="flex" sx={{width: '100%', justifyContent:{xs:'space-between', sm:'flex-end'}}}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }}}
            >
              <MenuIcon />
            </IconButton>
            <Stack direction="row" spacing={1}>
              <Stack sx={{width:{sm:'45px', xs:'40px'}, height:{sm:'45px', xs:'40px'}}}>
                <img  src={userImg} alt="logo" />
              </Stack>
              <Stack display="flex" justifyContent={'center'} alignItems={'center'}>
                <Typography variant='body1' color="primary.dark" sx={{fontSize:"16px"}}>{userName}</Typography>
              </Stack>
            </Stack>
          </Grid>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)`, xs:'100%'}}}
      >
        <Toolbar />

      {/* Router Outlet */}
        <Outlet />
        
      </Box>
    </Box>
  );
}

export default SidePanel;
