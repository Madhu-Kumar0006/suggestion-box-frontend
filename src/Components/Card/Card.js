import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Link } from "@material-ui/core";

const Card = (props) => {

   const baseLink = 'http://localhost:3000/response/';

   const responseUrl = baseLink + props.link;

   const bgColor = props.status === 1  ? '#b2dfdb' : '#ffcdd2';


    return (
        <Grid sx={{width:'90%', padding:2, backgroundColor:`${bgColor}`, borderRadius:'15px', marginX:2, marginY:1}}>
            <Grid display='flex' justifyContent={'center'}>
                <Link underline="hover">
                    <Typography variant="body1" color="#231F20">{props.questionTitle}</Typography> 
                </Link>
            </Grid>
            <Box style={{ wordWrap: 'break-word'}}>
              <Typography variant="overline" style={{ wordWrap: 'break-word'}}>Response page link: </Typography>
                <Link underline="hover" >
                    <Typography variant="caption" style={{ wordWrap: 'break-word'}}>{responseUrl}</Typography> 
                </Link>
            </Box>
        </Grid>
    )
}


export default Card;