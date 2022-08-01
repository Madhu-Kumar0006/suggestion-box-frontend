import React, { Fragment } from 'react';
import { makeStyles } from "@material-ui/core";
import { Typography, Grid } from '@material-ui/core';


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


const Dashboard = () => {

  const classes = useStyles();

  return (
    <Fragment>
          <Grid component="div" className={`${classes.page_bg}`}>
                 <Grid container display="flex" className={`${classes.page_heading}`} direction="row" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h6" >Dashboard</Typography>
                    </Grid>
                    
               </Grid>
            </Grid>
    </Fragment>
  )
}

export default Dashboard
