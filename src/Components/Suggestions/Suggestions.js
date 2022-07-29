import React, { Fragment, useEffect  } from "react";
import {  useSelector, useDispatch } from "react-redux";
import { Grid, Typography} from "@material-ui/core";
import { Button } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import ResponseCard from "../ResponseCard/ResponseCard";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { getAllResponse } from "../../Redux/Actions/suggestionsAction";


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
    


   // navigate to respective Response page
   const navigateBack = (id) =>{
    navigation("/suggestion-box");
    }


    // UseEffects (start):
    useEffect(() => {
        dispatch(getAllResponse(id));
    },[dispatch]) 
    // UseEffects (end):

const classes = useStyles();

return (
    <Fragment>
        <Grid container component="div" direction="column" spacing={2}  className={`${classes.page_bg}`}>
            <Grid container display="flex" className={`${classes.page_heading}`} direction="row" justifyContent="space-between">
                <Grid item>
                    <Typography variant="subtitle1" component="span">Suggestion Box -  </Typography>
                    <Typography variant="h6" component="span" >Suggestions</Typography>
                </Grid>
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
                {allSuggestions.response.data && allSuggestions.response.data.map((item, index) => (
                    <ResponseCard key={index} response={item.response} />
                ))
                 }
            </Grid>
        </Grid>
    </Fragment>
    )
}

export default Suggestions;