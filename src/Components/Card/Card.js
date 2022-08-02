import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Link } from "@material-ui/core";
import { useNavigate } from "react-router";

const Card = (props) => {
    
   const baseLink = 'http://localhost:3000/response/';

   const responseUrl = baseLink + props.link;

    //React Router Navigate:
    const navigation = useNavigate();


   // navigate to respective Response page
   const navigateToSuggestionsPage = (id) =>{
        navigation("suggestions/"+id);
    }

   const bgColor = props.status === 1  ? '#b2dfdb' : '#ffcdd2';


    return (
        <Grid sx={{width:'90%', padding:2, backgroundColor:`${bgColor}`, borderRadius:'15px', marginX:2, marginY:1}}>
            <Grid display='flex' justifyContent={'center'}>
                <Link underline="hover" onClick={() => {navigateToSuggestionsPage(props.id)}}>
                    <Typography variant="body1" color="#231F20" sx={{cursor:'pointer'}}>{props.questionTitle}</Typography> 
                </Link>
            </Grid>
            <Box>
              <Typography variant="overline" >Response page link: </Typography>
                <Link underline="hover" target='_blank' href={responseUrl} >
                    <Typography variant="caption" style={{ wordWrap: 'break-word'}}>{responseUrl}</Typography> 
                </Link>
            </Box>
        </Grid>
    )
}


export default Card;