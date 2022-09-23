import React, { Fragment, useState} from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
import { Stack, Paper, InputAdornment, TextField, IconButton, Grid, Button, Typography, Box } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import loginBanner from './../../Assets/images/banner.jpg';
import backgroundImg from './../../Assets/images/login-bg.jpg';
import { useFormik } from "formik";
import * as yup from 'yup';
import { passwordErrors } from "../Common/Constants";
import AlertModal from "../AlertModal/AlertModal";
import colorLogo from './../../Assets/images/logo-color.png';


//defining styles
const useStyles = makeStyles({

    bgImage: {
        background: `url(${backgroundImg})`,
        minHeight: '100vh',
        width: '100vw',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        overflow: 'scroll'
      },

      loginBanner: {
        width: "100%",
        height: "426px",
        borderRadius: "10px"
      }

});




//form validations
const validationSchema = yup.object({
    password: yup
      .string()
      .required(passwordErrors.PASSWORD),
    confirmPassword: yup
      .string()
      .required(passwordErrors.CONFIRM_PASSWORD)
      .oneOf([yup.ref('password')], passwordErrors.PASSWORDS_UNMATCHED)
  });



const ResetPassword = () => {

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

     // Redux State:
    //  const alert = useSelector((state) => state.alert);

     // Used to change the routes:
    //  const Navigate = useNavigate();

     //Redux Dispatch
    //  const dispatch = useDispatch();

    //managing form state
    const formik = useFormik({
        initialValues: {
          password: '',
          confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, {resetForm}) => {
          console.log(values);
          // resetForm();
        },
      });


    //toggle showPassword
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

  
    return(
        <Fragment>
            <Grid container className={`${classes.bgImage}`} alignItems={"center"} justifyContent={"center"} display={'flex'} flexDirection="column">
              <Box my={2} sx={{display:{xs:'block', sm:'none'}}}>
                <img width={'200px'} src={colorLogo} alt="logo" />
              </Box>
              <Paper elevation={10} sx={{width:{xs:'90%', sm:'80%', md:'60%', xl:'40%'}, height:'auto'}} style={{ borderRadius: "10px"}} >
                {alert.message && <AlertModal show={true} />}
                <Stack p={2} direction={'row'} spacing={1} justifyContent={'space-between'}>
                  <Grid item md={6} xs={12} display={{xs: 'none', sm: 'block'}}>
                    <img className={`${classes.loginBanner}`} src={loginBanner} alt="logo" />
                  </Grid>
                  <Grid item md={6} xs={12} sx={{height:{xs:460, sm:425}}}  alignItems={"center"}>
                    <Stack mt={3} direction={'column'} alignItems={"center"}>
                      <Typography sx={{fontSize:{xs:'24px', sm:'30px'}}}fontWeight='fontWeightBold' variant="h4" component="h5">Reset Password</Typography>
                    </Stack>
                    <form onSubmit={formik.handleSubmit}>
                      <Stack component="div" id="resetPasswordForm" sx={{width: '85%', marginTop: '35px', marginX:'auto'}} spacing={2} direction={'column'}>
                      <TextField name="password" type={showPassword ? 'text' : 'password'} sx={{ mb: 2 }} id="password" placeholder="Enter password" label="Password" variant="standard"
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
                        <TextField name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" placeholder="Enter confirm password" label="Confirm Password" variant="standard"
                          InputProps={{
                                        endAdornment: <InputAdornment position="end">
                                        <IconButton onClick={toggleConfirmPassword} color="primary">
                                          {showConfirmPassword ? <VisibilityIcon/> : <VisibilityOffIcon/>} 
                                          </IconButton>
                                          </InputAdornment>
                                          }}
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword) && formik.errors.confirmPassword}
                          />
                        <Stack style={{ marginTop: '60px'}} direction='column'>
                          <Button type="submit" variant="contained" color="primary" disabled={false}>Reset Password
                            {false && <CircularProgress sx={{color:"primary.dark", marginLeft:"10px"}} size={20}/>}
                          </Button>
                        </Stack>
                      </Stack>
                    </form>
                  </Grid>
                </Stack>
              </Paper>
            </Grid>
        </Fragment>
    ) ;
} 

export default ResetPassword;
