import React from "react";
import { Grid, Typography } from "@mui/material";
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';

const ResponseCard = (props) => {

    let dateTime;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    const createdDate = new Date(props.createdAt);
    const currentDate = new Date();
 
     if(currentDate.getDate() === createdDate.getDate()) {
         const intervals = [
             { label: 'hour', seconds: 3600 },
             { label: 'minute', seconds: 60 },
             { label: 'second', seconds: 1 }
           ];
 
           function timeSince(date) {
             const seconds = Math.floor((currentDate - date.getTime()) / 1000);
             const interval = intervals.find(i => i.seconds < seconds);
             const count = Math.floor(seconds / interval.seconds);
             return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
           }
 
           dateTime = timeSince(createdDate);
           
     } else {
         dateTime = createdDate.getDate() +"-"+ months[createdDate.getMonth()]+"-"+ createdDate.getFullYear();
     }
 

    
    return (
        <Grid display='flex' justifyContent={'flex-start'} flexDirection={'row'} sx={{padding: 1, width: '100%', marginY:1}}>
            <Grid container display="flex" direction ="column" sx={{ width: 'auto', marginRight:'8px'}} >
                <Grid item>
                    <Typography variant="caption" color="#231F20" noWrap sx={{fontSize:{xs:"12px", sm:"14px"}}}>{dateTime}</Typography>  
                </Grid>
                <Grid item container display="flex" justifyContent={'center'}>
                    <AccountCircleTwoToneIcon fontSize="large"/>
                </Grid>
            </Grid>
            <Grid item sx={{marginY:'auto'}}>
                <Typography variant="subtitle1"  sx={{ fontSize: '12px', fontWeight: '700'}} color="#231F20">Anonymous</Typography>   
                <Typography variant="subtitle2" style={{ wordWrap: 'break-word',  backgroundColor:'#b2dfdb', padding:'10px 20px', borderRadius:'8px'}}>
                    {Array.isArray(props.response) ? props.response.map((item, index) => (
                    <p key={index} >{item.responseData}</p>
                ) ): props.response}
                </Typography> 
            </Grid>
        </Grid>
    )
}


export default ResponseCard;


