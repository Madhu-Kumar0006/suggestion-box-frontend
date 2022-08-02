import React, { Fragment, useState, useEffect } from "react";
import { Button, Typography, Box, Grid, Breadcrumbs  } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import {  useSelector, useDispatch } from "react-redux";
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Card from "../Card/Card";
import SuggestionModal from "../SuggestionModal/SuggestionModal";

import { getQuestion } from "../../Redux/Actions/suggestionBoxAction";

const useStyles = makeStyles({
    page_bg: {
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "12px"
    },
    page_heading: {
        padding: "10px 20px"
    }
})


const SuggestionBox = () => {

    const classes = useStyles();
    let openedSuggestionBox;
    let closedSuggestionBox;
    const [value, setValue] = useState('1');

    //Redux State:
    const allQuestions = useSelector((state) => state.suggestionBoxReducer);

    if(allQuestions.response.data) {
        openedSuggestionBox = allQuestions.response.data.filter(item => item.status === 1);
        closedSuggestionBox = allQuestions.response.data.filter(item => item.status === 2);
    } else {
        openedSuggestionBox = [];
        closedSuggestionBox = [];
    }
   

    //Redux Dispatch:
    const dispatch = useDispatch();


    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      // UseEffects (start):
        useEffect(() => {
            dispatch(getQuestion())
        },[dispatch])
        
     // UseEffects (end):

     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
   
     const openModal = () =>{
        handleOpen();
     }
    return(
        <Fragment>
          <Grid component='div' backgroundColor='primary.bg' p={2} width='100%'>
            <Breadcrumbs mb={1} aria-label="breadcrumb">
                <Typography color="text.primary" variant='h6'>Suggestion Box</Typography>
            </Breadcrumbs>
            <Grid component="div" className={`${classes.page_bg}`}>
                <Grid container display="flex" className={`${classes.page_heading}`} direction="row" justifyContent="space-between">
                    <Grid item>
                        <Button type="button" variant="contained" color="primary" onClick={openModal}>Create Suggestion Box</Button>
                    </Grid>
                </Grid>
                <Grid>
                {open === true ? <SuggestionModal show={open} close={handleClose} /> : " "}
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <TabList onChange={handleChange} sx={{ borderBottom: 2, borderColor: 'divider'}} aria-label="lab API tabs" centered>
                            <Tab label="OPEN" value="1" />
                            <Tab label="CLOSED" value="2" />
                            <Tab label="ALL" value="3" />
                        </TabList>
                

                        {/* open */}
                        <TabPanel value="1">
                            {openedSuggestionBox.map((item, index) => (
                                <Card key={index} questionTitle={item.question_title} link={item.suggestion_link} status={item.status} id={item.id}/>
                            ))}
                            
                        </TabPanel>

                        {/* close */}
                        <TabPanel value="2">
                            {closedSuggestionBox.map((item, index) => (
                                <Card key={index} questionTitle={item.question_title} link={item.suggestion_link} status={item.status} id={item.id}/>
                            ))}
                        </TabPanel>

                        {/* All */}
                        <TabPanel value="3">
                            {allQuestions.response.data ? allQuestions.response.data.map((item, index) => (
                                <Card key={index} questionTitle={item.question_title} link={item.suggestion_link} status={item.status} id={item.id}/>
                            )
                            ): ''}
                        </TabPanel>
                    </TabContext>
                </Box>
                </Grid>
            </Grid>
          </Grid>     
        </Fragment>
    ) ;
} 

export default SuggestionBox;
