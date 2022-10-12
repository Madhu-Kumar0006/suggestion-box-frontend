import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Stack,
  Paper,
  InputAdornment,
  TextField,
  IconButton,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import loginBanner from "./../../Assets/images/banner.jpg";
import backgroundImg from "./../../Assets/images/login-bg.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import { emailErrors, passwordErrors } from "../Common/Constants";
import { login } from "../../Redux/Actions/loginAction";
import AlertModal from "../AlertModal/AlertModal";
import colorLogo from "./../../Assets/images/logo-color.png";

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

  loginBanner: {
    width: "100%",
    height: "426px",
    borderRadius: "10px",
  },
});

//form validations
const validationSchema = yup.object({
  email: yup
    .string()
    .email(emailErrors.INVALID_EMAIL)
    .required(emailErrors.EMAIL),
  password: yup.string().required(passwordErrors.PASSWORD),
});

const Login = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);

  // Redux State:
  const LoginDetails = useSelector((state) => state.auth);
  const alert = useSelector((state) => state.alert);

  // Used to change the routes:
  const Navigator = useNavigate();

  //Redux Dispatch
  const dispatch = useDispatch();

  //managing form state
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(login(values));
      // resetForm();
    },
  });

  // UseEffects (start):
  useEffect(() => {
    if (LoginDetails.isAuthenticated && LoginDetails.role_id === 2) {
      return Navigator("/dashboard");
    }
  }, [LoginDetails.isAuthenticated, LoginDetails.role_id, Navigator]);
  // UseEffects (end):

  //toggle showPassword
  const togglePassword = () => {
    setShowPassword(!showPassword);
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
        <Box my={2} sx={{ display: { xs: "block", sm: "none" } }}>
          <img width={"200px"} src={colorLogo} alt="logo" />
        </Box>
        <Paper
          elevation={10}
          sx={{ width: { xs: "90%", sm: "80%", md: "60%", xl: "40%" } }}
          height={"auto"}
          style={{ borderRadius: "10px" }}
        >
          {alert.message && <AlertModal show={true} />}
          <Stack
            p={2}
            direction={"row"}
            spacing={1}
            justifyContent={"space-between"}
          >
            <Grid item md={6} xs={12} display={{ xs: "none", sm: "block" }}>
              <img
                className={`${classes.loginBanner}`}
                src={loginBanner}
                alt="logo"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
              sx={{ height: { xs: 460, sm: 425 } }}
              alignItems={"center"}
            >
              <Stack mt={3} direction={"column"} alignItems={"center"}>
                <Typography
                  fontWeight="fontWeightBold"
                  variant="h4"
                  component="h2"
                >
                  Sign In
                </Typography>
                <Stack direction="row" alignItems="center">
                  <Typography variant="subtitle2" component="div">
                    Do not have an account?
                  </Typography>
                  <Typography sx={{ color: "primary.dark", fontWeight: "900" }}>
                    <Link
                      to="/register"
                      style={{
                        marginLeft: "10px",
                        fontWeight: "900",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                      className="link"
                    >
                      Sign Up
                    </Link>
                  </Typography>
                </Stack>
              </Stack>
              <form onSubmit={formik.handleSubmit}>
                <Stack
                  component="div"
                  id="loginForm"
                  sx={{ width: "85%", marginX: "auto" }}
                  spacing={3}
                  direction={"column"}
                >
                  <TextField
                    name="email"
                    type="text"
                    sx={{ mt: 3 }}
                    id="login-email"
                    placeholder="Enter email address"
                    label="Email"
                    variant="standard"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={
                      formik.touched.email &&
                      Boolean(formik.errors.email) &&
                      formik.errors.email
                    }
                  />
                  <TextField
                    name="password"
                    type={showPassword ? "text" : "password"}
                    sx={{ mb: 4 }}
                    id="login-password"
                    placeholder="Enter password"
                    label="Password"
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={togglePassword} color="primary">
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
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password &&
                      Boolean(formik.errors.password) &&
                      formik.errors.password
                    }
                  />
                  <Stack style={{ marginTop: "60px" }} direction="column">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={LoginDetails.loading}
                    >
                      Sign In
                      {LoginDetails.loading && (
                        <CircularProgress
                          sx={{ color: "primary.dark", marginLeft: "10px" }}
                          size={20}
                        />
                      )}
                    </Button>
                    <Typography
                      sx={{ color: "primary.dark", fontWeight: "900", mt: 1 }}
                    >
                      <Link
                        to="/"
                        style={{
                          fontWeight: "900",
                          color: "inherit",
                          textDecoration: "none",
                        }}
                        className="link"
                      >
                        forgot password?
                      </Link>
                    </Typography>
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

export default Login;
