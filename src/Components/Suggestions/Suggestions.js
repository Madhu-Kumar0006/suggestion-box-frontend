import React, { Fragment, useEffect  } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { Button, Stack, Breadcrumbs, Typography, Grid, Link, Pagination } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import ResponseCard from "../ResponseCard/ResponseCard";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { getAllResponse } from "../../Redux/Actions/suggestionsAction";
import CircularProgress from '@mui/material/CircularProgress';
import { getQuestion } from "../../Redux/Actions/getQuestionDetailsAction";
import usePagination from "../Common/Pagination";


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


const Suggestions = () => {

   const { id } = useParams();
   const classes = useStyles();
   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
   let questionTitle;
   let createdOn;
   let responsesCount = 0;
   let suggestionsData = [];
   const PER_PAGE = 20;
   

   //React Router Navigate:
   const navigation = useNavigate();

    //Redux Dispatch:
    const dispatch = useDispatch();

    //Redux State:
    const allSuggestions = useSelector((state) => state.suggestionsReducer);
    const questionDetails = useSelector((state) => state.getQuestionDetailsReducer);


    //catching responses
    if(questionDetails.response) {
        questionTitle = questionDetails.response.data[0].question_title;
        const createdDateRes = questionDetails.response.data[0].created_at;

        const createdDate = new Date(createdDateRes);

        const time = ((createdDate.getHours() + 11) % 12 + 1)+":"+ createdDate.getMinutes() + " " + (createdDate.getHours() >= 12 ? "PM":"AM")

        createdOn = createdDate.getDate() +"-"+ months[createdDate.getMonth()] +"-"+ createdDate.getFullYear() + " " + time;
    } else {
        questionTitle = '';
        createdOn = '';
    }

    if(Array.isArray(allSuggestions.response.data)) {
        responsesCount =  allSuggestions.response.data.length;
        suggestionsData = allSuggestions.response.data;
    } else {
        responsesCount = 0;
        suggestionsData = [];
    }

    //pagination data sorting
    const suggestionsPaginatedData = usePagination(suggestionsData, PER_PAGE);

    const paginationHandler = (event, value) => {
        suggestionsPaginatedData.jump(value);
      };
    

   // navigate to respective Response page
   const navigateBack = (id) =>{
    navigation("/suggestion-box");
    }


    // UseEffects (start):
    useEffect(() => {
        dispatch(getAllResponse(id));
        dispatch(getQuestion(id));
    }, [dispatch, id]) 
    // UseEffects (end):

return (
    <Fragment>
        <Grid component='div' backgroundColor='primary.bg' sx={{p:{xs:'8px', sm:'16px'}}} width='100%'>
            <Breadcrumbs mb={1} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" onClick={navigateBack} style={{cursor:'pointer'}}>
                    Suggestion Box
                </Link>
                <Typography color="text.primary" variant='h6'>Suggestions</Typography>
            </Breadcrumbs>
            <Grid component="div" pt={2} pb={5} className={`${classes.page_bg}`}>
                <Grid container mb ={2}  display="flex" className={`${classes.page_heading}`} direction="row" justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={navigateBack} type="button" variant="contained" color="primary">Back</Button>
                    </Grid>  
                </Grid>
                <Grid container display='flex' justifyContent="center" alignItems={'center'}>
                    <Grid container direction="column" sx={{ width: '96%', minHeight:'100px', padding:'20px', backgroundColor: 'primary.light', display:'flex', alignItems:'center', justifyContent:'center'}}>
                       <Typography variant='h6'>{!questionDetails.loading && questionTitle}</Typography>
                       <Grid item sx={{ width: {sm:'70%', xs: "100%"}, display:'flex', marginTop:'20px', justifyContent:'space-between'}}>
                            <Typography variant='subtitle2'>{!questionDetails.loading && createdOn}</Typography> 
                            <Typography variant='subtitle2'>{!questionDetails.loading && (responsesCount + `${" Responses"}`)}</Typography> 
                        </Grid> 
                    </Grid>
                </Grid>
                <Grid sx={{width:{sm:'85%', xs: "100%"}, marginX:'auto', marginTop:'30px'}}>
                    {
                       !allSuggestions.loading && responsesCount === 0 && 
                       <Typography variant="h5" display="flex" justifyContent={'center'}>No Suggestions</Typography>
                    }
                    { allSuggestions.loading ? 
                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                        <CircularProgress color="primary" />
                    </Stack> :
                     suggestionsPaginatedData.currentData().map((item, index) => (
                        <ResponseCard key={item.id} response={item.response} createdAt={item.created_at} questionId={item.question_id} />
                    ))
                    }
                    { !allSuggestions.loading && 
                            <Stack sx={{width:'100%', marginTop:'30px', display:'flex', justifyContent:'center', alignItems: 'center'}}>
                                <Pagination count={suggestionsPaginatedData.maxPage} page={suggestionsPaginatedData.currentPage} color="primary" shape="circular" variant="outlined" default={suggestionsPaginatedData.currentPage} 
                                onChange={paginationHandler} />
                            </Stack>}
                </Grid>
            </Grid>
        </Grid>
    </Fragment>
    )
}

export default Suggestions;