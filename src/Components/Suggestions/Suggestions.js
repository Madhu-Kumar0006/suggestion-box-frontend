import React, { Fragment, useEffect  } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { Button, Stack, Breadcrumbs, Typography, Grid, Link } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import ResponseCard from "../ResponseCard/ResponseCard";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { getAllResponse } from "../../Redux/Actions/suggestionsAction";
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles({
    page_bg: {
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: "12px"
      },
      page_heading: {
          padding: "10px 20px"
      },
      heading: {
        borderBottom: '1px solid #000',
      }
})


const Suggestions = () => {

   const { id } = useParams();

   //React Router Navigate:
   const navigation = useNavigate();

    //Redux Dispatch:
    const dispatch = useDispatch();

    //Redux State:
    const allSuggestions = useSelector((state) => state.suggestionsReducers);
    console.log(allSuggestions);
    


   // navigate to respective Response page
   const navigateBack = (id) =>{
    navigation("/suggestion-box");
    }


    // UseEffects (start):
    useEffect(() => {
        dispatch(getAllResponse(id));
    }, [dispatch]) 
    // UseEffects (end):

const classes = useStyles();

return (
    <Fragment>
        <Grid component='div' backgroundColor='primary.bg' p={2} width='100%'>
            <Breadcrumbs mb={1} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" onClick={navigateBack} style={{cursor:'pointer'}}>
                    Suggestion Box
                </Link>
                <Typography color="text.primary" variant='h6'>Suggestions</Typography>
            </Breadcrumbs>
            <Grid component="div" className={`${classes.page_bg}`}>
                <Grid container display="flex" className={`${classes.page_heading}`} direction="row" justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={navigateBack} type="button" variant="contained" color="primary">Back</Button>
                    </Grid>  
                </Grid>
                <Grid container className={`${classes.heading}`}  display='flex' direction='row' justifyContent="center">
                    <Grid item >
                        <Typography variant='h6'>Quesiton name</Typography>
                    </Grid>  
                </Grid>
                <Grid>
                    <Typography variant="h6" style={{marginLeft:'25px'}}>Responses:</Typography>
                    { allSuggestions.loading === true ? 
                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                        <CircularProgress color="primary" />
                    </Stack> :
                    allSuggestions.response.data && allSuggestions.response.data.map((item, index) => (
                        <ResponseCard key={index} response={item.response} />
                    ))
                    }
                </Grid>
            </Grid>
        </Grid>
    </Fragment>
    )
}

export default Suggestions;