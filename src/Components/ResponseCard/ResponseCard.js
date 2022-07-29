import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Link } from "@material-ui/core";

const ResponseCard = (props) => {


    return (
        <Grid sx={{padding: 1, width: '70%', backgroundColor:'#b2dfdb', borderRadius:'12px', marginX:3, marginY:1}}>
            <Typography variant="h6"  sx={{ fontSize: '12px', fontWeight: '700'}} color="#231F20">Anonymous</Typography>   
            <Box style={{ wordWrap: 'break-word', marginLeft: '30px'}}>
              <Typography variant="overline" style={{ wordWrap: 'break-word'}}>
                {Array.isArray(props.response) ? props.response.map((item, index) => (
                <p key={item.id} >{item.responseData}</p>
              ) ): props.response}</Typography>
                <Link underline="hover" target='_blank'  >
                    <Typography variant="caption" style={{ wordWrap: 'break-word'}}></Typography> 
                </Link>
            </Box>
        </Grid>
    )
}


export default ResponseCard;


