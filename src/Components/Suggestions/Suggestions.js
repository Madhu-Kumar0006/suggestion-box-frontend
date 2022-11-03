import React, { Fragment, useEffect  } from "react";
import {  useSelector, useDispatch,  } from "react-redux";
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
   let questionDescription;
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
        questionDescription = questionDetails.response.data[0].description;
        const createdDateRes = questionDetails.response.data[0].created_at;

        const createdDate = new Date(createdDateRes);

        const time = (((createdDate.getHours() + 11) % 12 + 1) > 9 ? '': 0).toString()+((createdDate.getHours() + 11) % 12 + 1)+":"+ (createdDate.getMinutes() > 9 ? '': 0)+(createdDate.getMinutes()) + " " + (createdDate.getHours() >= 12 ? "PM":"AM")

        createdOn = createdDate.getDate() +"-"+ months[createdDate.getMonth()] +"-"+ createdDate.getFullYear() + " " + time;
    } else {
        questionTitle = '';
        questionDescription = '';
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
        <Grid component='div' backgroundColor='primary.bg' sx={{p:{xs:'8px', sm:'12px'}}} width='100%'>
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
                    <Grid container direction="column" sx={{ width: '96%', height:'auto', padding:'12px', backgroundColor: 'primary.light', display:'flex', alignItems:'center', justifyContent:'center'}}>
                       <Grid item sx={{ width: {sm:'80%', xs: "100%"}, display:'flex', marginBottom:'10px', justifyContent:'space-between'}}> 
                            <Typography variant='caption'>{!questionDetails.loading && createdOn}</Typography> 
                            <Typography variant='caption'>{!questionDetails.loading && (responsesCount + " Responses")}</Typography> 
                        </Grid> 
                        <Typography variant='body1'>{questionDetails.loading && "Loading..."}</Typography>
                        <Typography variant='h6'>{!questionDetails.loading && questionTitle}</Typography>
                        <Typography variant='body2' mt={1}>{!questionDetails.loading && questionDescription}</Typography>
                    </Grid>
                </Grid>
                <Grid sx={{width:{sm:'85%', xs: "100%"}, marginX:'auto', marginTop:'30px'}}>
                    {
                       !allSuggestions.loading && responsesCount === 0 && 
                       <Typography variant="h6" display="flex" justifyContent={'center'}>No Suggestions</Typography>
                    }
                    { allSuggestions.loading ? 
                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                        <CircularProgress color="primary" />
                    </Stack> :
                     suggestionsPaginatedData.currentData().map((item, index) => (
                        <ResponseCard key={item.uuid} response={item.response} createdAt={item.created_at} questionId={item.question_id} />
                    ))
                    }
                    { !allSuggestions.loading && responsesCount > 0 &&
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