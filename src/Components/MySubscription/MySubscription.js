import React, { Fragment, useEffect } from 'react';
import {  useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import { Grid, Typography, Breadcrumbs, Stack, Box  } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';
import { getPackages } from '../../Redux/Actions/mySubscriptionAction';
import AlertModal from '../AlertModal/AlertModal';
import packageExpiryDate from '../Common/ExpiryDate';

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


const MySubscription = () =>  {

  let packages = [];
  const classes = useStyles();

   //Redux Dispatch:
   const dispatch = useDispatch();

   //Redux State:
   const packageResponse = useSelector((state) => state.mySubscriptionReducer);
   const alert = useSelector((state) => state.alert);

  if(packageResponse.response.data && Array.isArray(packageResponse.response.data)) {
    packages = packageResponse.response.data;
  } else {
    packages = []
  }



 // UseEffects (start):
      //api call to get all packages
      useEffect(() => {
        dispatch(getPackages());
    },[dispatch])
  // UseEffects (end):


  return (
      <Fragment>
        <Grid component='div' backgroundColor='primary.bg'  sx={{p:{xs:'8px', sm:'12px'}}}>
          <Breadcrumbs mb={1} aria-label="breadcrumb">
              <Typography variant='h6' color="text.primary">My Subscription</Typography>
          </Breadcrumbs>
          <Grid component="div" className={`${classes.page_bg}`} sx={{pt:1}}>

              {alert.message && <AlertModal show={true} />}
            <Box component="div" sx={{mx:2}}>
            { packageExpiryDate() < 0 && <Typography fontWeight={700} variant="overline" color="red">No Package is Active, Buy one to un-lock features</Typography>}
            { (packageExpiryDate() >= 0 && packageExpiryDate() < 15) && <Typography fontWeight={700} variant="overline" color="red">{packageExpiryDate()} days are remaining for package Expiry!</Typography>}
            </Box>
              <Grid container display="flex" direction="row" justifyContent="space-around">
                  {packages.map((item, index) => {
                    return <SubscriptionCard key={index} {...item} />
                  })}
              </Grid>
              { packageResponse.getPackagesLoading ? (
                                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                                        <CircularProgress color="primary" />
                                    </Stack>
                                ) : ( packages.length === 0 ? (
                                    <Typography variant="body1" textAlign={'center'} my={5}>No Packages are available!</Typography>
                                ) : null)
              }
          </Grid>
        </Grid>
    </Fragment>
  )
}

export default MySubscription;