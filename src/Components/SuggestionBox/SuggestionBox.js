import React, { Fragment, useState, useEffect } from "react";
import { Button, Typography, Box, Grid, Breadcrumbs, Stack, Pagination } from "@mui/material";
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
import { getAllQuestion } from "../../Redux/Actions/suggestionBoxAction";
import { updateSuggestionBoxStatus } from "../../Redux/Actions/updateStatusAction";
import AlertModal from "../AlertModal/AlertModal";
import usePagination from "../Common/Pagination";
import { openSuggestionBoxConfirmMessage, closeSuggestionBoxConfirmMessage } from "../Common/Constants";
// import { getQuestion } from "../../Redux/Actions/suggestionBoxAction";


const useStyles = makeStyles({
    page_bg: {
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "12px"
    },
    page_heading: {
        height: "80px",
        alignItems: "center"
    }
})


const SuggestionBox = () => {

    const classes = useStyles();
    let openedSuggestionBox;
    let closedSuggestionBox;
    let allSuggestionBox;
    const [selectedSuggestionBox, setSelectedSugggestionBox] = useState(null);
    const [value, setValue] = useState('1');
    const [showCloseConfirmationModal, setShowCloseConfirmationModal] = useState(false);
    const [showOpenConfirmationModal, setShowOpenConfirmationModal] = useState(false);
    const PER_PAGE = 10;


    //Redux Dispatch:
    const dispatch = useDispatch();

     //Redux State:
     const allQuestions = useSelector((state) => state.suggestionBoxReducer);
     const alert = useSelector((state) => state.alert);
    //  const updateStatus = useSelector((state) => state.updateStatusReducer);


    const closeConfirmationModalContent = {
        heading: closeSuggestionBoxConfirmMessage.HEADING,
        description: closeSuggestionBoxConfirmMessage.DESCRIPTION,
      };

    const openConfirmationModalContent = {
        heading: openSuggestionBoxConfirmMessage.HEADING,
        description: openSuggestionBoxConfirmMessage.DESCRIPTION,
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
        let sortedData = [...allQuestions.response.data].reverse();
        openedSuggestionBox = sortedData.filter(item => item.status === 1);
        closedSuggestionBox = sortedData.filter(item => item.status === 2);
        allSuggestionBox = sortedData;
    } else {
        openedSuggestionBox = [];
        closedSuggestionBox = [];
        allSuggestionBox = [];
    }


    //pagination code
    const openData = usePagination(openedSuggestionBox, PER_PAGE);
    const closeData = usePagination(closedSuggestionBox, PER_PAGE);
    const allData = usePagination(allSuggestionBox, PER_PAGE);
  

    const openPaginationHandler = (event, value) => {
        openData.jump(value);
      };

    const closePaginationHandler = (event, value) => {
        closeData.jump(value);
    };

    const allPaginationHandler = (event, value) => {
        allData.jump(value);
    };

    //Tab change handler
    const changeTabHandler = (event, newValue) => {
        setValue(newValue);
      };


      // UseEffects (start):
      //api call to get all suggestion boxes
        useEffect(() => {
            dispatch(getAllQuestion())
        },[dispatch])

        //api call after updating suggestion box status
        useEffect(() => {
            if (alert.type === "success") {
                dispatch(getAllQuestion())
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
          <Grid component='div' backgroundColor='primary.bg'  sx={{p:{xs:'8px', sm:'12px'}}} width='100%'>
            <Breadcrumbs mb={1} aria-label="breadcrumb">
                <Typography color="text.primary" variant='h6'>Suggestion Box</Typography>
            </Breadcrumbs>
            <Grid component="div" className={`${classes.page_bg}`}>
                <Grid container display="flex" className={`${classes.page_heading}`} direction="row" justifyContent="space-between">
                    <Grid item sx={{marginLeft:'20px'}}>
                        <Button type="button" variant="contained" color="primary" onClick={openModal}>Create Suggestion Box</Button>
                    </Grid>
                </Grid>
                <Grid>
                {alert.message && <AlertModal show={true} />}
                {open === true ? <SuggestionModal show={open} close={handleClose} /> : null }

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
                        <TabList onChange={changeTabHandler} sx={{ borderBottom: 2, borderColor: 'divider'}} aria-label="lab API tabs" centered>
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
                                    openedSuggestionBox.length === 0 ? 
                                    (
                                        <Typography variant="body1" textAlign={'center'} my={5}>No SuggestionBox available, Create one!</Typography>
                                    ) : (
                                        openData.currentData().map((item, index) => (
                                            <SuggestionBoxCard key={index} 
                                            questionTitle={item.question_title} 
                                            link={item.suggestion_link} 
                                            status={item.status} 
                                            id={item.id} 
                                            reponsesCount={item.count} 
                                            closeSuggestionBox={suggestionBoxCloseHandler}
                                            createdAt={item.created_at}
                                            />    
                                    ))
                                    )
                                    ) 
                                    } 
                            { !allQuestions.loading && <Stack sx={{width:'100%', marginTop:'30px', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                                <Pagination count={openData.maxPage} page={openData.currentPage} color="primary" shape="rounded" variant="outlined" default={openData.currentPage} 
                                onChange={openPaginationHandler} />
                            </Stack>}
                        </TabPanel>

                        {/* close */}
                        <TabPanel value="2">
                        { allQuestions.loading === true ? (
                                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                                        <CircularProgress color="primary" />
                                    </Stack>
                                ) : (  closedSuggestionBox.length === 0 ? (
                                        <Typography variant="body1" textAlign={'center'} my={5}>No SuggestionBox available!</Typography>
                                    ) : (
                                        closeData.currentData().map((item, index) => (
                                            <SuggestionBoxCard 
                                                key={index} 
                                                questionTitle={item.question_title} 
                                                link={item.suggestion_link} 
                                                status={item.status} 
                                                id={item.id} 
                                                reponsesCount={item.count}
                                                openSuggestionBox={suggestionBoxOpenHandler}
                                                createdAt={item.created_at}
                                                />    
                                    ))
                                    )
                                    ) } 
                                { !allQuestions.loading && <Stack sx={{width:'100%', marginTop:'30px', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                                <Pagination count={closeData.maxPage} page={closeData.currentPage} color="primary" shape="rounded" variant="outlined" default={closeData.currentPage} 
                                    onChange={closePaginationHandler} />
                                </Stack>}
                        </TabPanel>

                        {/* All */}
                        <TabPanel value="3">
                            { allQuestions.loading === true ? (
                                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                                        <CircularProgress color="primary" />
                                    </Stack>
                                ) : ( allSuggestionBox.length === 0 ? (
                                    <Typography variant="body1" textAlign={'center'} my={5}>No SuggestionBox available, Create one!</Typography>
                                ) : (
                                    allData.currentData().map((item, index) => (
                                        <SuggestionBoxCard 
                                        key={index} 
                                        questionTitle={item.question_title} 
                                        link={item.suggestion_link} 
                                        status={item.status} 
                                        id={item.id} 
                                        reponsesCount={item.count}
                                        openSuggestionBox={suggestionBoxOpenHandler}
                                        closeSuggestionBox={suggestionBoxCloseHandler}
                                        createdAt={item.created_at}
                                        />
                                    ))
                                )
                            )}
                            { !allQuestions.loading && <Stack sx={{width:'100%', marginTop:'30px', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                                <Pagination count={allData.maxPage} page={allData.currentPage} color="primary" shape="rounded" variant="outlined" default={allData.currentPage} 
                                onChange={allPaginationHandler} />
                            </Stack>}
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
