import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core";
import { Grid, Typography, Breadcrumbs  } from '@mui/material';

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


const Settings = () =>  {

  const classes = useStyles();

  return (
      <Fragment>
        <Grid component='div' backgroundColor='primary.bg' p={2}>
          <Breadcrumbs mb={1} aria-label="breadcrumb">
              <Typography variant='h6' color="text.primary">Settings</Typography>
          </Breadcrumbs>
          <Grid component="div" className={`${classes.page_bg}`}>
              <Grid container display="flex" pt={3} pl={3} direction="row" justifyContent="space-between">
                  <Typography variant="body1"> Welcome to Settings</Typography>
              </Grid>
          </Grid>
        </Grid>
    </Fragment>
  )
}

export default Settings
