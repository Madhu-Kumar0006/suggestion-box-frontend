import React, { useState } from "react";
import { Grid, Box, Typography, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Link } from "@material-ui/core";
import { useNavigate } from "react-router";


const SuggestionBoxCard = (props) => {

    // const [expanded, setExpanded] = useState(false);
    const [expand, setExpand] = useState('close');
    let dateTime;
    // const baseLink = 'http://localhost:3000/response/';
    const baseLink = 'https://teknotrait-suggestions.herokuapp.com/response/';
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

   const responseUrl = baseLink + props.link;

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

    //React Router Navigate:
    const navigation = useNavigate();


   // navigate to respective Response page
   const navigateToSuggestionsPage = (id) =>{
        navigation("suggestions/"+id);
    }

    // //accordion expand handler
    // const handleChange = (panel) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    // };

    const expandAccordion = () => {
        setExpand(expand === 'open' ? 'close' : 'open')
    }

   const bgColor = props.status === 1  ? '#66bb6a' : '#ef5350';

   return (

    <Box component="div" sx={{marginBottom:'7px', width:{md:"90%"}, marginX:'auto', '&:hover':{transform: 'scale(1.02)'}}}>
        <Accordion sx={{borderLeft:`8px solid ${bgColor}`}} expanded={expand === 'open'}>
            <AccordionSummary
                sx={{
                    pointerEvents: "none",
                    backgroundColor: "#f5f5f5",
                    boxShadow: "0 2px 3px -1px rgba(0, 0, 0, 0.1)",
                    borderBottom: '1px solid grey'
                }}
                expandIcon={<ExpandMoreIcon onClick={() => {expandAccordion()}}
                    sx={{pointerEvents: "auto", backgroundColor: '#e0e0e0'}}
                    />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Box sx={{ width: '50%', flexShrink: 0, pointerEvents: "auto" }}>
                    <Typography variant="body1" onClick={() => {navigateToSuggestionsPage(props.id)}} color="#231F20" sx={{cursor:'pointer', "&:hover": {textDecoration: 'underline'}}}>{props.questionTitle}</Typography>
                    <Typography variant="caption" sx={{ display:{sm:'none', xs:'block'},  color: 'text.secondary' }}>{props.reponsesCount} responses</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>{dateTime}</Typography>
                </Box>
                <Typography variant="caption" sx={{display:{sm:'block', xs:'none'}, width: '30%',flexShrink: 0,  color: 'text.secondary' }}>{props.reponsesCount} responses</Typography> 
                <Grid container display="flex" mr={1} justifyContent={'flex-end'}>
                    <Grid item my='auto' sx={{pointerEvents: "auto"}}>
                        <Tooltip title="Delete">
                            <IconButton>
                                <DeleteIcon color="error"/>
                            </IconButton>
                        </Tooltip> 
                    </Grid>  
                    {props.status === 1 ? (
                        <Grid item my='auto' sx={{pointerEvents: "auto"}}>
                            <Tooltip title="Close">
                                <IconButton onClick={() => props.closeSuggestionBox(props.id)}>
                                    <LockIcon  color="info"/>
                                </IconButton>
                            </Tooltip> 
                        </Grid>
                    ) : (
                        <Grid item my='auto' sx={{pointerEvents: "auto"}}>
                            <Tooltip title="Open">
                                <IconButton onClick={() => props.openSuggestionBox(props.id)}>
                                    <LockOpenIcon color="info"/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    )}    
                </Grid>
            </AccordionSummary>
            <AccordionDetails>
                    <Typography variant="subtitle2" >User Response page link: </Typography>
                    <Link underline="hover" target='_blank' href={responseUrl} >
                        <Typography variant="caption" style={{ wordWrap: 'break-word'}}>{responseUrl}</Typography> 
                    </Link>
            </AccordionDetails>
        </Accordion>
    </Box>
    

   )
}


export default SuggestionBoxCard;