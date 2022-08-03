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
import { addQuestion } from "../../Redux/Actions/addQuestionAction";
import { useDispatch, useSelector } from "react-redux";
import AlertModal from "../AlertModal/AlertModal";

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
  overflow:'scroll'
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

  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alert);

  const [singleSelect, setSingleSelect] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);

  const [initialValues, setInitialValues] = useState({
    inputs: [''],
    question: '',
    anonymous: '',
    specify: '',
    textField: '',
    singleSelect: '',
    multiSelect: '',
  });

  const submitSuccess = (values) => {
    const body = {
      question_title: values.question,
      suggestion_type: values.anonymous,
      answer_type: values.textField ? 1 : values.singleSelect ? 2 : 3,
      options: values.inputs,
      user_id: localStorage.getItem('user_id')
    }
    dispatch(addQuestion(body));
  }

  const showSingleSelect = () => {
    setSingleSelect(true);
    setMultiSelect(false);
    setInitialValues({
      inputs: [],
    });
  };

  const showMultiSelect = () => {
    setMultiSelect(true);
    setSingleSelect(false);
    setInitialValues({
      inputs: []
    })
  };

  const hideSingleAndMulti = () => {
    setSingleSelect(false);
    setMultiSelect(false);
  };

  return (
    <Modal
      open={show}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // disableScrollLock={true}
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
        {alert.message && <AlertModal show={true} />}
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => submitSuccess(values)}
        >
          <Form>
            <Box>
              <TextField
                className={classes.root}
                name="question"
                type="text"
                sx={{ mt: 10 }}
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
                    value="textField"
                    control={<Radio />}
                    label="Text field"
                    onClick={hideSingleAndMulti}
                    sx={{ mr: 6 }}
                  />
                  <FormControlLabel
                    value="singleSelect"
                    control={<Radio />}
                    label="Single select"
                    onClick={showSingleSelect}
                    sx={{ mr: 6 }}
                  />
                  <FormControlLabel
                    value="multiSelect"
                    control={<Radio />}
                    label="Multi select"
                    onClick={showMultiSelect}
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {(singleSelect) && (
              <FieldArray name="inputs">
                {(fieldArrayProps) => {
                  // console.log(fieldArrayProps, "fap");
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { inputs } = values;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: 'column',
                        alignItems: "center",
                        mt: 8
                      }}
                    >
                      {inputs.map((input, idx) => (
                        <Box
                          key={idx}
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Typography sx={{ fontWeight: '500', fontSize: '22px', marginRight: '10px', ml: 2, color: 'primary.main' }}>
                            {idx + 1}.
                          </Typography>
                          <TextField
                            label='Option'
                            variant="outlined"
                            name={`inputs[${idx}]`}
                            sx={{ width: '400px', height: 0.2 }}
                            size='small'
                          />
                          {idx === 0 ? (
                            <Button
                              variant='contained'
                              sx={{ backgroundColor: 'primary.main', color: 'white', fontSize: '15px', fontWeight: '600', '&:hover': { backgroundColor: 'primary.main' }, ml: 2}}
                              onClick={() => push("")}>+</Button>
                          ) : (
                            <Button sx={{ ml: 2 }} variant='outlined' onClick={() => remove(idx)}>
                              <CloseIcon sx={{ color: 'primary.main' }} />
                            </Button>
                          )}
                        </Box>
                      ))}
                    </Box>
                  );
                }}
              </FieldArray>
            )}

            {(multiSelect) && (
              <FieldArray name="inputs">
                {(fieldArrayProps) => {
                  // console.log(fieldArrayProps, "fap");
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { inputs } = values;
                  return (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mt: 8
                      }}
                    >
                      {inputs.map((input, idx) => (
                        <Box
                          key={idx}
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Typography sx={{ fontWeight: '500', fontSize: '22px', marginRight: '10px', color: 'primary.main' }}>
                            {idx + 1}.
                          </Typography>
                          <TextField
                            label='Option'
                            variant="outlined"
                            name={`inputs[${idx}]`}
                            sx={{ height: 0.5, width: '400px' }}
                            size='small'
                          />
                          {idx === 0 ? (
                            <Button
                              variant='contained'
                              sx={{ backgroundColor: 'primary.main', color: 'white', '&:hover': { backgroundColor: 'primary.main' }, ml: 2 }}
                              onClick={() => push("")}>+</Button>
                          ) : (
                            <Button sx={{ ml: 2 }} variant='outlined' onClick={() => remove(idx)}>
                              <CloseIcon sx={{ color: 'primary.main' }} />
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
