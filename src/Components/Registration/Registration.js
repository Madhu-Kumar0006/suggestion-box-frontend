import React, { Fragment, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
// import CircularProgress from "@mui/material/CircularProgress";
import {
  Stack,
  Paper,
  InputAdornment,
  TextField,
  IconButton,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import backgroundImg from "./../../Assets/images/login-bg.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import { emailErrors, passwordErrors, nameErrors } from "../Common/Constants";
// import AlertModal from "../AlertModal/AlertModal";

//defining styles
const useStyles = makeStyles({
  bgImage: {
    background: `url(${backgroundImg})`,
    minHeight: "100vh",
    width: "100vw",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "scroll",
  },
});

//form validations
const validationSchema = yup.object({
  firstname: yup.string().required(nameErrors.FIRST_NAME),
  lastname: yup.string().required(nameErrors.LAST_NAME),
  email: yup
    .string()
    .email(emailErrors.INVALID_EMAIL)
    .required(emailErrors.EMAIL),
  password: yup.string().required(passwordErrors.PASSWORD),
  confirmPassword: yup.string().required(passwordErrors.CONFIRM_PASSWORD),
});

const Registration = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  // Used to change the routes:
  // const Navigator = useNavigate();

  //managing form state
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values, "are the values");
    },
  });

  //toggle showPassword
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const togglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <Fragment>
      <Grid
        container
        className={`${classes.bgImage}`}
        alignItems={"center"}
        justifyContent={"center"}
        display={"flex"}
        flexDirection="column"
      >
        <Paper
          elevation={10}
          sx={{ width: { xs: "90%", sm: "80%", md: "60%", xl: "40%" }, mt: 3 }}
          // height={"520px"}
          style={{ borderRadius: "10px" }}
        >
          <Stack p={2} direction={"row"} spacing={1} justifyContent={"center"}>
            <Grid
              item
              md={12}
              xs={12}
              // sx={{ height: 'auto' }}
              alignItems={"center"}
            >
              <Stack mt={3} mb={4} direction={"column"} alignItems={"center"}>
                <Typography
                  fontWeight="fontWeightBold"
                  variant="h4"
                  component="h2"
                >
                  Sign Up
                </Typography>
                <Stack direction="row" alignItems="center">
                  <Typography variant="subtitle2" component="div">
                    Already have an account?
                  </Typography>
                  <Typography sx={{ color: "primary.dark", fontWeight: "900" }}>
                    <Link
                      to="/"
                      style={{
                        marginLeft: "10px",
                        fontWeight: "900",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                      className="link"
                    >
                      Sign In
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
              <form onSubmit={formik.handleSubmit}>
                <Stack
                  component="div"
                  sx={{ width: "90%", marginX: "auto" }}
                  spacing={2}
                  direction={"column"}
                >
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      name="firstname"
                      type="text"
                      sx={{ mt: 1, mr: { xs: 0, md: 7 }, width: "100%" }}
                      placeholder="Enter your First Name"
                      label="First Name"
                      variant="standard"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.firstname &&
                        Boolean(formik.errors.firstname)
                      }
                      helperText={
                        formik.touched.firstname &&
                        Boolean(formik.errors.firstname) &&
                        formik.errors.firstname
                      }
                    />
                    <TextField
                      name="lastname"
                      type="text"
                      sx={{ mt: 1, width: "100%" }}
                      id="login-email"
                      placeholder="Enter your Last Name"
                      label="Last Name"
                      variant="standard"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.lastname &&
                        Boolean(formik.errors.lastname)
                      }
                      helperText={
                        formik.touched.lastname &&
                        Boolean(formik.errors.lastname) &&
                        formik.errors.lastname
                      }
                    />
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      name="email"
                      type="email"
                      sx={{ mt: 1, width: "100%" }}
                      placeholder="Enter your email address..."
                      label="Email"
                      variant="standard"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={
                        formik.touched.email &&
                        Boolean(formik.errors.email) &&
                        formik.errors.email
                      }
                    />
                  </Stack>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      name="password"
                      type={showPassword ? "text" : "password"}
                      sx={{ mt: 1, mb: 2, mr: { xs: 0, md: 7 }, width: "100%" }}
                      id="login-password"
                      placeholder="Enter password"
                      label="Password"
                      variant="standard"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePassword}
                              color="primary"
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password &&
                        Boolean(formik.errors.password) &&
                        formik.errors.password
                      }
                    />
                    <TextField
                      name="confirmPassword"
                      type={showPassword2 ? "text" : "password"}
                      sx={{ mt: 1, mb: 2, width: "100%" }}
                      id="login-password"
                      placeholder="Confirm your password"
                      label="Confirm Password"
                      variant="standard"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePassword2}
                              color="primary"
                            >
                              {showPassword ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword)
                      }
                      helperText={
                        formik.touched.confirmPassword &&
                        Boolean(formik.errors.confirmPassword) &&
                        formik.errors.confirmPassword
                      }
                    />
                  </Stack>
                  <Stack style={{ margin: "40px 0px" }} direction="column">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      // disabled={LoginDetails.loading}
                    >
                      Sign Up
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Grid>
          </Stack>
        </Paper>
      </Grid>
    </Fragment>
  );
};

export default Registration;
