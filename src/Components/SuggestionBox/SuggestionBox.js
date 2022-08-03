import React, { Fragment, useState, useEffect } from "react";
import { Button, Typography, Box, Grid, Breadcrumbs, Stack } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import {  useSelector, useDispatch } from "react-redux";
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import SuggestionBoxCard from "../SuggestionBoxCard/SuggestionBoxCard";
import SuggestionModal from "../SuggestionModal/SuggestionModal";
import CircularProgress from '@mui/material/CircularProgress';
import ConfirmationModal from "../../ConfirmationModal/ConfirmationModal";
import { getQuestion, updateSuggestionBoxStatus } from "../../Redux/Actions/suggestionBoxAction";
import AlertModal from "../AlertModal/AlertModal";

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
    const [selectedSuggestionBox, setSelectedSugggestionBox] = useState(null);
    const [value, setValue] = useState('1');
    const [showCloseConfirmationModal, setShowCloseConfirmationModal] = useState(false);
    const [showOpenConfirmationModal, setShowOpenConfirmationModal] = useState(false);

    //Redux Dispatch:
    const dispatch = useDispatch();

     //Redux State:
     const allQuestions = useSelector((state) => state.suggestionBoxReducer);
     const alert = useSelector((state) => state.alert);
     console.log(alert);
     console.log(allQuestions)


    const closeConfirmationModalContent = {
        heading: "Close",
        description: "Are you sure? do you want to close suggestion box",
      };

    const openConfirmationModalContent = {
        heading: "Open",
        description: "Are you sure? do you want to open suggestion box",
      };

    const suggestionBoxCloseHandler = (id) => {
        setSelectedSugggestionBox(id)
        setShowCloseConfirmationModal(true); 
    }

    const suggestionBoxOpenHandler = (id) => {
        setSelectedSugggestionBox(id)
        setShowOpenConfirmationModal(true);
    }

    const closeModal = () => {
        setShowCloseConfirmationModal(false);
        setShowOpenConfirmationModal(false);
        setSelectedSugggestionBox(null);
    }

    const closeConfirmationHandler = () => {
        const closeStatus = { status: 2 }
        if(selectedSuggestionBox !== null && selectedSuggestionBox !== undefined) {
            dispatch(updateSuggestionBoxStatus(selectedSuggestionBox, closeStatus));
        }
        closeModal();
    }

    const openConfirmationHandler = () => {
        const openStatus = { status: 1 }
        if(selectedSuggestionBox !== null && selectedSuggestionBox !== undefined) {
            dispatch(updateSuggestionBoxStatus(selectedSuggestionBox, openStatus));
        }
        closeModal();   
    }


    if(allQuestions.response.data) {
        openedSuggestionBox = allQuestions.response.data.filter(item => item.status === 1);
        closedSuggestionBox = allQuestions.response.data.filter(item => item.status === 2);
    } else {
        openedSuggestionBox = [];
        closedSuggestionBox = [];
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

      // UseEffects (start):
      //api call to get all suggestion boxes
        useEffect(() => {
            dispatch(getQuestion())
        },[dispatch])

        //api call after updating suggestion box status
        useEffect(() => {
            if (alert.type === "success") {
                dispatch(getQuestion())
            }
          }, [alert, dispatch]);
          // UseEffects (end):
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
                {alert.message && <AlertModal show={true} />}
                <ConfirmationModal 
                    show={showCloseConfirmationModal}
                    content={closeConfirmationModalContent}
                    close={closeModal}
                    confirm={closeConfirmationHandler}
                    />
                <ConfirmationModal 
                    show={showOpenConfirmationModal}
                    content={openConfirmationModalContent}
                    close={closeModal}
                    confirm={openConfirmationHandler}
                    />
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={value}>
                        <TabList onChange={handleChange} sx={{ borderBottom: 2, borderColor: 'divider'}} aria-label="lab API tabs" centered>
                            <Tab label="OPEN" value="1" />
                            <Tab label="CLOSED" value="2" />
                            <Tab label="ALL" value="3" />
                        </TabList>
                

                        {/* open */}
                        <TabPanel value="1">
                                { allQuestions.loading === true ? (
                                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                                        <CircularProgress color="primary" />
                                    </Stack>
                                ) : (
                                    openedSuggestionBox.map((item, index) => (
                                        <SuggestionBoxCard key={index} 
                                        questionTitle={item.question_title} 
                                        link={item.suggestion_link} 
                                        status={item.status} 
                                        id={item.id} 
                                        reponsesCount={item.count} 
                                        closeSuggestionBox={suggestionBoxCloseHandler}
                                        />    
                                ) 
                                )) }     
                        </TabPanel>

                        {/* close */}
                        <TabPanel value="2">
                        { allQuestions.loading === true ? (
                                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                                        <CircularProgress color="primary" />
                                    </Stack>
                                ) : (
                                    closedSuggestionBox.map((item, index) => (
                                        <SuggestionBoxCard 
                                        key={index} 
                                        questionTitle={item.question_title} 
                                        link={item.suggestion_link} 
                                        status={item.status} 
                                        id={item.id} 
                                        reponsesCount={item.count}
                                        openSuggestionBox={suggestionBoxOpenHandler}
                                        />    
                                ) 
                                )) } 
                        </TabPanel>

                        {/* All */}
                        <TabPanel value="3">
                            { allQuestions.loading === true ? (
                                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                                        <CircularProgress color="primary" />
                                    </Stack>
                                ) : ( allQuestions.response.data && allQuestions.response.data.map((item, index) => (
                                <SuggestionBoxCard 
                                key={index} 
                                questionTitle={item.question_title} 
                                link={item.suggestion_link} 
                                status={item.status} 
                                id={item.id} 
                                reponsesCount={item.count}
                                openSuggestionBox={suggestionBoxOpenHandler}
                                closeSuggestionBox={suggestionBoxCloseHandler}
                                />
                            )
                            ))}
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
