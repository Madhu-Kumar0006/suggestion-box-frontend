import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Form, FieldArray } from "formik";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
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

const SuggestionModal = (props) => {
  const { show, close } = props;
  const classes = useStyles();

  const [singleSelect, setSingleSelect] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);

  const showSingleSelect = () => {
    setSingleSelect(true);
    setMultiSelect(false);
  };

  const showMultiSelect = () => {
    setMultiSelect(true);
    setSingleSelect(false);
    setInitialValues({
      inputs:['']
    })
  };

  const hideSingleAndMulti = () => {
    setSingleSelect(false);
    setMultiSelect(false);
    setInitialValues({
      inputs: [""],
    });
  };

  const [initialValues, setInitialValues] = useState({
    inputs:['']
  })

  return (
    <Modal
      open={show}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // BackdropComponent="static"
    >
      <Box sx={style}>
        <Box
          sx={{
            position: "-moz-initial",
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "primary.main",
            padding: 2,
            width: "100%",
            borderRadius: "12px",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            sx={{ color: "white" }}
            component="h2"
          >
            Create Suggestion Box
          </Typography>
          <Button onClick={close}>
            <CloseIcon sx={{ color: "white" }} />
          </Button>
        </Box>
        <Divider />

        {/* question */}
        <Formik initialValues={initialValues}>
          <Form>
            <Box>
              <TextField
                className={classes.root}
                name="question"
                type="text"
                sx={{ mt: 3 }}
                id="question"
                placeholder="Enter Question here"
                label="Enter Question"
                variant="standard"
                fullWidth
                style={{ width: "100", marginTop: 20, marginBottom: 8 }}
              />
            </Box>
            {/* suggestion type */}
            <Box style={{ marginTop: "30px" }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Suggestion Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  //   defaultValue="anonymous"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="anonymous"
                    control={<Radio />}
                    label="Anonymous"
                    sx={{ mr: 6 }}
                  />
                  <FormControlLabel
                    value="Specify name"
                    control={<Radio />}
                    label="Specify name"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* answer type */}
            <Box style={{ marginTop: "30px" }}>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                  Answer Type
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-radio-buttons-group-label"
                  //   defaultValue="text-field"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="text-field"
                    control={<Radio />}
                    label="Text field"
                    onClick={hideSingleAndMulti}
                    sx={{ mr: 6 }}
                  />
                  <FormControlLabel
                    value="single-select"
                    control={<Radio />}
                    label="Single select"
                    onClick={showSingleSelect}
                    sx={{ mr: 6 }}
                  />
                  <FormControlLabel
                    value="multi-select"
                    control={<Radio />}
                    label="Multi select"
                    onClick={showMultiSelect}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {(singleSelect || multiSelect) && (
              <FieldArray name="inputs">
                {(fieldArrayProps) => {
                  console.log(fieldArrayProps, "fap");
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { inputs } = values;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt:8
                      }}
                    >
                      {inputs.map((input, idx) => (
                        <Box
                          key={idx}
                          sx={{ display: "flex", alignItems: "center", mb:6 }}
                        >
                            <TextField
                              label="Option"
                              variant="outlined"
                              name={`inputs[${idx}]`}
                              sx={{height: 0.5, width:'500px'}}
                            />
                          {idx === 0 ? (
                            <Button
                               variant='contained'
                               sx={{backgroundColor:'primary.main', color:'white', '&:hover':{backgroundColor:'primary.main'}, ml:2}}
                               onClick={() => push("")}>+</Button>
                          ) : (
                            <Button sx={{ml:2}} variant='outlined' onClick={() => remove(idx)}>
                              <CloseIcon sx={{color:'primary.main'}} />
                            </Button>
                          )}
                        </Box>
                      ))}
                    </Box>
                  );
                }}
              </FieldArray>
            )}

            {/* submit */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "40px",
              }}
            >
              <Button onClick={close} variant="outlined">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "#399689",
                  color: "#ffffff",
                  marginLeft: "15px",
                }}
              >
                Submit
              </Button>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default SuggestionModal;
