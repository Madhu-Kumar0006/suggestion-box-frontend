import React from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const SubscriptionCard = (props) => {

   console.log(props);

   return (
    <Paper elevation={8}  sx={{backgroundColor:'primary.light', height:"auto",textAlign:"center", display:"flex", flexDirection:"column", borderRadius:"15px", width:{md:"30%", sm:"80%", xs:"80%", xl:"20%"}, margin:"30px 05px"}} >
      <Box sx={{padding: "10px", textAlign:"center"}}>
         <Typography variant="h5" fontWeight={700} sx={{marginBottom:"10px"}}>{props.packageName}</Typography>
         <Box component="div" sx={{marginY:"5px"}}>
            <Typography variant="body2" sx={{textAlign:"center"}} color="#616161">{props.description}</Typography>
         </Box>
      </Box>
       <Box component="div" sx={{marginY:"5px", paddingY:"10px", backgroundColor:"#e0e0e0", display:"flex", justifyContent:"center", alignItems:"center"}}>
         <Typography variant="h4" sx={{textAlign:"center"}}>${props.Price}/</Typography>
         <Typography variant="subtitle1" sx={{textAlign:"center"}}>{props.validity} days</Typography>
       </Box>
       <Box component="div" sx={{marginY:"5px", padding:"10px", display:"flex", justifyContent:"center"}}>
         <List>
            {props.properties.map((item) => {
               return  <ListItem disablePadding={true}>
                           <ListItemText primary={item.propertyValue ? `${item.propertyName}-${item.propertyValue}` :  `${item.propertyName}` }/>
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