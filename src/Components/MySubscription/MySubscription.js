import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core";
import { Grid, Typography, Breadcrumbs  } from '@mui/material';
import SubscriptionCard from '../SubscriptionCard/SubscriptionCard';

import { subscriptionData } from './subscriptionData';

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

  const classes = useStyles();

  return (
      <Fragment>
        <Grid component='div' backgroundColor='primary.bg'  sx={{p:{xs:'8px', sm:'12px'}}}>
          <Breadcrumbs mb={1} aria-label="breadcrumb">
              <Typography variant='h6' color="text.primary">My Subscription</Typography>
          </Breadcrumbs>
          <Grid component="div" className={`${classes.page_bg}`}>
              <Grid container display="flex" direction="row" justifyContent="space-around">
                  {subscriptionData.map((item, index) => {
                    return <SubscriptionCard key={index} {...item} />
                  })}
              </Grid>
          </Grid>
        </Grid>
    </Fragment>
  )
}

export default MySubscription;