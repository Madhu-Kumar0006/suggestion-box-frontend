import React, { Fragment, useState} from "react";
import { Stack, Paper, InputAdornment, TextField, IconButton, Grid, Button, Typography } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import loginBanner from './../../Assets/images/banner-login.jpg';
import classes from './Login.module.css';
import {useFormik} from "formik";
import * as yup from 'yup';
import { emailErrors, passwordErrors } from "../Common/Constants";


//form validations
const validationSchema = yup.object({
    email: yup
      .string()
      .email(emailErrors.INVALID_EMAIL)
      .required(emailErrors.EMAIL),
    password: yup
      .string()
      .required(passwordErrors.PASSWORD)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
        passwordErrors.PASSWORD_INVALID
      )
  });



const Login = () => {

    const [showPassword, setShowPassword] = useState(false);

    //managing form 
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          console.log(values);
        },
      });


    //toggle showPassword
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

  
    return(
        <Fragment>
            <Grid container className={`${classes.bgImage}`} alignItems={"center"} justifyContent={"center"}>
                <Grid item md={8} xs={10}>
                    <Paper elevation={10} height={'500px'} style={{ borderRadius: "10px"}} >
                        <Stack p={2} direction={'row'} spacing={1} justifyContent={'center'}>
                            <Grid item ms={6} display={{xs: 'none', sm: 'block'}}>
                                <img className={`${classes.loginBanner}`} src={loginBanner} alt="logo" />
                            </Grid>
                            <Grid item md={6} xs={12} sx={{height:{xs:460, sm:425}}}  alignItems={"center"}>
                                <Stack mt={3} direction={'column'} alignItems={"center"}>
                                    <Typography fontWeight='fontWeightBold' variant="h4" component="h2">Sign In</Typography>
                                    <Typography variant="subtitle2" component="div">
                                        Do not have an account?
                                        <Typography ml={1} fontWeight='fontWeightBold' variant="subtitle2" component='a' href="#" color={'primary'}>Sign Up</Typography>
                                    </Typography>
                                </Stack>
                                    <form onSubmit={formik.handleSubmit}>
                                        <Stack component="div" id="loginForm" sx={{width: '85%', marginX: 'auto'}} spacing={4} direction={'column'}>
                                            <TextField  name="email" type="text" sx={{ mt: 4 }} id="login-email" placeholder="Enter email address" label="Email" variant="standard" 
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && Boolean(formik.errors.email)  && formik.errors.email}
                                            />
                                            <TextField name="password" type={showPassword ? 'text' : 'password'} sx={{ mb: 4 }} id="login-password" placeholder="Enter password" label="Password" variant="standard"
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end">
                                                                     <IconButton onClick={togglePassword} color="primary">
                                                                        {showPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>} 
                                                                     </IconButton>
                                                                    </InputAdornment>
                                                                    }}
                                                    value={formik.values.password}
                                                    onChange={formik.handleChange}
                                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                                    helperText={formik.touched.password && Boolean(formik.errors.password) && formik.errors.password}
                                            />
                                            <Stack style={{ marginTop: '60px'}} direction='column'>
                                                <Button type="submit" variant="contained" color="primary">Sign In</Button>
                                                <Typography mt={1} color={'primary'} variant="subtitle2" align={"right"} component='a' href="#">forgot password?</Typography>
                                            </Stack>
                                        </Stack>
                                    </form>
                            </Grid>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    ) ;
} 

export default Login;
