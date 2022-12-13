import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik, FormikProvider } from "formik";
import * as yup from "yup";
import { addTeamMemberModalErrors } from '../Common/Constants';
import { useDispatch, useSelector } from "react-redux";
import { addTeamMember } from "../../Redux/Actions/teamMemberAction";
import CircularProgress from "@mui/material/CircularProgress";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm:500, md: 600 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "12px",
};

const useStyles = makeStyles({
  root: {
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#348A7E",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "#348A7E",
    },
  },
});

const validationSchema = yup.object({
  first_name: yup.string().required(addTeamMemberModalErrors.FIRST_NAME),
  last_name: yup.string().required(addTeamMemberModalErrors.LAST_NAME),
  email_id: yup.string()
  .email(addTeamMemberModalErrors.INVALID_EMAIL)
  .required(addTeamMemberModalErrors.EMAIL),
});

const TeamMemberModal = (props) => {

  const { addModal, editModal, closeHandler } = props;
  const classes = useStyles();

  //redux dispatch
  const dispatch = useDispatch();

  //redux selector
  const teamMemberResponse = useSelector((state) => state.teamMemberReducer)
  const alert = useSelector((state) => state.alert);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editModal.show ? {
      first_name: editModal.data.first_name, 
      last_name: editModal.data.last_name,
      email_id: editModal.data.email_id
    } : {
      first_name:"", 
      last_name:"",
      email_id:""
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addModal.show && dispatch(addTeamMember(values));
      editModal.show && console.log(values);
    }
  });

  //useEffect starts
  useEffect(() => {
    if (alert.type === "success") {
      formik.resetForm();
      closeHandler();
    }
  }, [alert]);
  //useEffect end

  return (
    <Modal
      open={addModal.show || editModal.show}
      onClose={closeHandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      hideBackdrop={true}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "primary.main",
            borderTopLeftRadius: "12px",
            borderTopRightRadius: "12px",
            p: 2,
          }}
          component="div"
        >
          <Typography
            id="modal-modal-title"
            sx={{
              color: "white",
              fontWeight: "600",
              fontSize: { xs: "15px", md: "20px" },
            }}
          >
           {addModal.show ? "Add Team Member" : "Edit Team Member"} 
          </Typography>
          <CloseIcon
            onClick={()=> { 
              formik.resetForm(); 
              closeHandler()
            }}
            sx={{
              display: { xs: "none", md: "block" },
              color: "white",
              cursor: "pointer",
            }}
          />
        </Box>
        {/* <Divider /> */}

        {/* question */}
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ overflowY: "scroll", paddingX:{ xs: 2, md:5 }, paddingY:3 }}>
              <Box sx={{ display: "flex", flexDirection:{xs:"column", md:"row"}, justifyContent:"space-between" , marginBottom:2}}>
                <Box>
                  <TextField
                    className={classes.root}
                    value={formik.values.first_name}
                    name="first_name"
                    onChange={formik.handleChange}
                    type="text"
                    id="last_name"
                    placeholder="Enter Team Member's First Name"
                    label="First Name"
                    variant="standard"
                    fullWidth
                    error={
                      formik.touched.first_name && Boolean(formik.errors.first_name)
                    }
                    helperText={
                      formik.touched.first_name &&
                      Boolean(formik.errors.first_name) &&
                      formik.errors.first_name
                    }
                  />
                </Box>
                <Box>
                  <TextField
                    className={classes.root}
                    value={formik.values.last_name}
                    name="last_name"
                    onChange={formik.handleChange}
                    type="text"
                    id="last_name"
                    placeholder="Enter Team Member's Last Name"
                    label="Last Name"
                    variant="standard"
                    fullWidth
                    error={
                      formik.touched.last_name && Boolean(formik.errors.last_name)
                    }
                    helperText={
                      formik.touched.last_name &&
                      Boolean(formik.errors.last_name) &&
                      formik.errors.last_name
                    }
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", marginBottom:2 }}>
                <TextField
                  className={classes.root}
                  value={formik.values.email_id}
                  name="email_id"
                  onChange={formik.handleChange}
                  type="text"
                  id="email_id"
                  placeholder="Enter Team Member's Email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  style={{ marginTop: "10px"}}
                  error={
                    formik.touched.email_id && Boolean(formik.errors.email_id)
                  }
                  helperText={
                    formik.touched.email_id &&
                    Boolean(formik.errors.email_id) &&
                    formik.errors.email_id
                  }
                />
              </Box>
            </Box>
            {/* submit */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: 2,
                marginBottom: 2,
                marginRight:  2
              }}
            >
              <Button
                onClick={()=> { 
                  formik.resetForm(); 
                  closeHandler()
                }}
                variant="outlined"
                sx={{ display: { sm: "block", md: "none" } }}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={teamMemberResponse.loadingAddTeamMember}
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  color: "#ffffff",
                  marginLeft: 2,
                }}
              >
                {teamMemberResponse.loadingAddTeamMember && (
                        <CircularProgress
                          sx={{ color: "primary.dark", marginRight: "10px" }}
                          size={20}
                        />
                      )}
                {addModal.show ? "Invite" : "Update"} 
              </Button>
            </Box>
          </form>
        </FormikProvider>
        {/* </Box> */}
      </Box>
    </Modal>
  );
};

export default TeamMemberModal;
