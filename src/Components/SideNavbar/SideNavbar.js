import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import navList from "./navList";
import classes from '../Login/Login.module.css'
import { ExitToApp } from "@mui/icons-material";


const drawerWidth = 270;

function SideNavbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ backgroundColor: "#2AAA8A", height: "100vh", display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
      {/* <Toolbar  /> */}
      <Box>
        <Link to="/home" className={classes.link}>
          <Typography
            variant="h1"
            noWrap={true}
            gutterBottom
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: "#ffffff",
              margin: "20px",
              marginLeft: "20px",
            }}
          >
            Suggestion Box
          </Typography>
        </Link>
        <Divider sx={{ margin: 2, marginLeft: 2, borderColor: "#ffffff" }} />
        <List>
          {navList.map((item, index) => (
            <ListItem key={index} disablePadding>
              <Link to={item.link} className={classes.link}>
                <ListItemButton
                  sx={{
                    margin: "10px",
                    width: "220px",
                    marginLeft: "5px",
                    padding: "10px",
                    borderRadius: "8px",
                    color: "#ffffff",
                    fontSize: "25px",
                    "&:hover": {
                      backgroundColor: "#355E3B",
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: "#ffffff" }}>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ fontSize: "25px" }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{marginBottom:2}}>
        <Divider
          sx={{
            margin: 2,
            marginLeft: 2,
            marginTop: 19,
            borderColor: "#ffffff",
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: "400",
              marginLeft: "20px",
              fontSize: "18px",
              marginRight: 7,
            }}
          >
            Srinivas Akella
          </Typography>
          <ExitToApp sx={{ color: "#ffffff" }} />
        </Box>
      </Box>
    </Box>
  );

  //   const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default SideNavbar;
