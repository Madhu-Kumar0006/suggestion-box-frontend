import React from "react";
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
  name: yup.string().required(addTeamMemberModalErrors.NAME),
  email: yup.string()
  .email(addTeamMemberModalErrors.INVALID_EMAIL)
  .required(addTeamMemberModalErrors.EMAIL),
});

const TeamMemberModal = (props) => {

  const { addModal, editModal, closeHandler } = props;
  const classes = useStyles();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: editModal.show ? {
      name: editModal.data.name, 
      email: editModal.data.email
    } : {
      name:"", 
      email:""
    },
    validationSchema: validationSchema,
    onSubmit: (values, {resetForm}) => {
      console.log(values);
      resetForm();
    }
  });

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
              <Box sx={{ display: "flex", flexDirection: "column" , marginBottom:2}}>
                <TextField
                  className={classes.root}
                  value={formik.values.name}
                  name="name"
                  onChange={formik.handleChange}
                  type="text"
                  id="name"
                  placeholder="Enter Team Member's Name"
                  label="Name"
                  variant="standard"
                  fullWidth
                  error={
                    formik.touched.name && Boolean(formik.errors.name)
                  }
                  helperText={
                    formik.touched.name &&
                    Boolean(formik.errors.name) &&
                    formik.errors.name
                  }
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", marginBottom:2 }}>
                <TextField
                  className={classes.root}
                  value={formik.values.email}
                  name="email"
                  onChange={formik.handleChange}
                  type="text"
                  id="email"
                  placeholder="Enter Team Member's Email"
                  label="Email"
                  variant="standard"
                  fullWidth
                  style={{ marginTop: "10px"}}
                  error={
                    formik.touched.email && Boolean(formik.errors.email)
                  }
                  helperText={
                    formik.touched.email &&
                    Boolean(formik.errors.email) &&
                    formik.errors.email
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
                variant="contained"
                sx={{
                  backgroundColor: "primary.main",
                  color: "#ffffff",
                  marginLeft: 2,
                }}
              >
                {addModal.show ? "Invite" : "Re-Invite"} 
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
