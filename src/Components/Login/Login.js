import React, { Fragment} from "react";
import { Link } from "react-router-dom";
import { Stack, InputAdornment, TextField, Box, IconButton, Grid, Button } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';

import loginBanner from './../../Assets/images/banner-login.jpg';

import classes from './Login.module.css';

const Login = () => {


    
    return(
        <Fragment>
            <div className={`container-fluid ${classes.image}`}>
                <div className={`${classes.board}`}>
                    <div className='row m-1'>
                        <div className={`col-md-6 ${classes.banner}`}>
                            <img className={`my-3 ${classes.loginBanner}`} src={loginBanner} alt="logo" />
                        </div>
                        <div className='col-md-6'>
                            <div className="mt-3 text-center">
                                <Grid className={classes.loginBox}>
                                    <h2 className="pt-3 fw-bold">Sign In</h2>
                                    <small>Do not have an account?</small>
                                    <span className={`ms-2 ${classes.themeText}`}>Sign up</span>
                                    
                                    <form>
                                        <Stack direction='column' spacing={4} my={3} px={1} >
                                                <TextField type="email" sx={{ mt: 2 }} id="login-email" placeholder="Enter email address" label="Email" variant="standard" />

                                                <TextField type="password" sx={{ my: 1 }} id="login-password" placeholder="Enter password" label="Password" variant="standard"
                                                    InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                                    <IconButton>
                                                                        <VisibilityIcon/>
                                                                    </IconButton>
                                                                </InputAdornment>
                                                    }}/>
                                                <Stack style={{marginTop: "60px"}} direction='column'>
                                                    <Button type="button" variant="contained">Sign In</Button>
                                                    <a className={`ms-auto text text-secondary ${classes.fpLink}`} href="#"><small>forgot password?</small></a>
                                                </Stack>
                                        </Stack>
                                    </form>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>      
            </div>
        </Fragment>
    ) ;
}


export default Login;



{/* <h1>Sign In</h1>
                                <small>Do not have account? </small>
                                    <span>
                                        <Grid
                                            container
                                            spacing={1}
                                            direction="column"
                                            alignItems="center"
                                            justifyContent="center"
                                            >
                                            <Stack direction='column' spacing={2}>
                                                <Box mt={2}>
                                                    <TextField type="email" sx={{ mt: 3 }} id="login-email" label="Email" variant="standard"/>
                                                </Box>
                                                <Box>
                                                    <TextField type="password" sx={{ my: 2 }} id="login-password" label="Password" variant="standard"
                                                    InputProps={{
                                                        endAdornment: <InputAdornment position="end">
                                                                        <IconButton>
                                                                            <VisibilityIcon/>
                                                                        </IconButton>
                                                                    </InputAdornment>
                                                     }}/>
                                                </Box>
                                            </Stack>
                                        </Grid>
                                    </span> */}