import React, { Fragment, useState, useEffect } from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import {  useSelector, useDispatch } from "react-redux";
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Card from "../Card/Card";

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

   
 
    return(
        <Fragment>
            <Grid component="div" className={`${classes.page_bg}`}>
                <Grid container display="flex" className={`${classes.page_heading}`} direction="row" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" >Suggestion Box</Typography>
                    </Grid>
                    <Grid item>
                        <Button type="button" variant="contained" color="primary">Create Suggestion Box</Button>
                    </Grid>
                </Grid>
            <Grid>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange} sx={{ borderBottom: 2, borderColor: 'divider' }} aria-label="lab API tabs" centered>
                                <Tab label="OPEN" value="1" />
                                <Tab label="CLOSED" value="2" />
                                <Tab label="ALL" value="3" />
                            </TabList>
                        </Box>
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
                            { allQuestions.response.data ? allQuestions.response.data.map((item, index) => (
                                <Card key={index} questionTitle={item.question_title} link={item.suggestion_link} status={item.status} id={item.id}/>
                            )
                            ): ''}
                        </TabPanel>
                    </TabContext>
                </Box>
            </Grid>
         </Grid>        
        </Fragment>
    ) ;
} 

export default SuggestionBox;
