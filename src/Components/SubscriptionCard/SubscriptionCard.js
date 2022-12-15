import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { packageStatus } from "../Common/Constants";
import packageExpiryDate from "../Common/ExpiryDate";


const SubscriptionCard = (props) => {


   return (
    <Paper elevation={8}  sx={{backgroundColor:'primary.bg', border:(props.status === packageStatus.ACTIVE && packageExpiryDate()>=0 ) ? "2px solid #00796b" : null, height:"auto", textAlign:"center", display:"flex", flexDirection:"column", borderRadius:"15px", width:{md:"30%", sm:"80%", xs:"80%", xl:"20%"}, margin:"30px 05px"}} >
      <Box sx={{padding: "10px"}}>
         <Box sx={{marginBottom:"10px"}}>
         {(props.status === packageStatus.ACTIVE && packageExpiryDate()>=0 ) ? <Typography variant="caption" sx={{display:"flex", justifyContent:"flex-end", color:"red"}} fontWeight={700}>{props.status}</Typography> : null}
            <Typography variant="h5" fontWeight={700}>{props.package.package_name}</Typography>
         </Box>
         <Box component="div" sx={{marginY:"5px"}}>
            <Typography variant="body2" sx={{textAlign:"center"}} color="#616161">{props.package.description}</Typography>
         </Box>
      </Box>
       <Box component="div" sx={{marginY:"5px", paddingY:"10px", backgroundColor:"#e0e0e0", display:"flex", justifyContent:"center", alignItems:"center"}}>
         <Typography variant="h4" sx={{textAlign:"center"}}>${props.package.price}/</Typography>
         <Typography variant="subtitle1" sx={{textAlign:"center"}}>{props.package.validity} days</Typography>
       </Box>
       <Box component="div" sx={{marginY:"5px", padding:"10px", display:"flex", justifyContent:"center"}}>
         <List>
            {props.properties.map((item, index) => {
               return  <ListItem key={index} disablePadding={true}>
                           <ListItemText primary={item.property_value ? `${item.property_name}-${item.property_value}` :  `${item.property_name}` }/>
                        </ListItem>
            })}
         </List>
       </Box>
       <Box sx={{marginBottom:"20px", marginTop:"auto"}}>
         <Button
            type="button"
            variant="contained"
            color="primary"
         >
            Buy
         </Button>
       </Box>
    </Paper>
   )
}


export default SubscriptionCard;