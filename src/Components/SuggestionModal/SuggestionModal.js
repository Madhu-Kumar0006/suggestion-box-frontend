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
import CloseIcon from "@mui/icons-material/Close";
import { FieldArray, useFormik, FormikProvider } from "formik";
import { addQuestion } from "../../Redux/Actions/addQuestionAction";
import { useDispatch } from "react-redux";
import * as yup from 'yup';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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

const validationSchema = yup.object().shape({
  question: yup
    .string()
    .required('Quesion is required !'),
  suggestionType: yup
    .string()
    .required('Suggestion Type is required !'),
  answerType: yup
    .string()
    .required('Answer Type is required !'),
  // inputs: yup.array()
  //   .of(yup.object().shape({
  //     name: yup.string().min(1, "Min 1 character")
  //   }))
});

const SuggestionModal = (props) => {
  const { show, close } = props;
  const classes = useStyles();

  const dispatch = useDispatch();


  const [singleSelect, setSingleSelect] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);

  const formik = useFormik({
    initialValues: {
      question: '',
      suggestionType: '',
      answerType: '',
      inputs: [''],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      submitSuccess(values)
    }
  });


  const submitSuccess = (values) => {
    const body = {
      question_title: values.question,
      suggestion_type: values.suggestionType,
      answer_type: Number(values.answerType),
      options: values.inputs,
      user_id: Number(localStorage.getItem('user_id')),
    }
    // console.log(body)
    dispatch(addQuestion(body));
    close();
  }

  const showSingleSelect = () => {
    setSingleSelect(true);
    setMultiSelect(false);
  };

  const showMultiSelect = () => {
    setMultiSelect(true);
    setSingleSelect(false);
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
    // disableScrollLock={false}
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            marginBottom: '25px'
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            sx={{ color: "primary.main", fontWeight: '700' }}
            component="h2"
          >
            Create Suggestion Box
          </Typography>
          {/* <Button onClick={close}>
            <CloseIcon sx={{ color: 'black', mr:'-400px' }} />
          </Button> */}
        </Box>
        {/* <Divider /> */}

        {/* question */}
        <Box sx={{ overflowY: 'scroll', height: '60vh' }}>
          <FormikProvider value={formik}>
            <form onSubmit={formik.handleSubmit}>
              <Box>
                <TextField
                  className={classes.root}
                  value={formik.values.question}
                  name='question'
                  onChange={formik.handleChange}
                  type="text"
                  sx={{ mt: 10 }}
                  id="question"
                  placeholder="Enter Question here"
                  label="Enter Question"
                  variant="standard"
                  fullWidth
                  style={{ width: "100", marginTop: 20, marginBottom: 8 }}
                  error={formik.touched.question && Boolean(formik.errors.question)}
                />
              </Box>
              {/* suggestion type */}
              <Box style={{ marginTop: "30px" }}>
                <FormControl error={formik.touched.suggestionType && Boolean(formik.errors.suggestionType)}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Suggestion Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={formik.values.suggestionType}
                    name='suggestionType'
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value='anonymous'
                      control={<Radio />}
                      label="Anonymous"
                      sx={{ mr: 6 }}
                    />
                    <FormControlLabel
                      value='specify name'
                      control={<Radio />}
                      label="Specify name"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* answer type */}
              <Box style={{ marginTop: "30px" }}>
                <FormControl error={formik.touched.answerType && Boolean(formik.errors.answerType)}>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Answer Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={formik.values.answerType}
                    name='answerType'
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value='1'
                      control={<Radio />}
                      label="Text field"
                      onClick={hideSingleAndMulti}
                      sx={{ mr: 6 }}
                    />
                    <FormControlLabel
                      value='2'
                      control={<Radio />}
                      label="Single select"
                      onClick={showSingleSelect}
                      sx={{ mr: 6 }}
                    />
                    <FormControlLabel
                      value='3'
                      control={<Radio />}
                      label="Multi select"
                      onClick={showMultiSelect}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {(singleSelect || multiSelect) && (
                <FieldArray name='inputs'>
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
                            sx={{ display: "flex", alignItems: "center", mb: 2 }}
                            key={`inputs-${idx}`}
                          >
                            <Typography sx={{ fontWeight: '500', fontSize: '22px', marginRight: '10px', ml: 2, color: 'primary.main' }}>
                              {idx + 1}.
                            </Typography>
                            <Box>
                              <TextField
                                name={`inputs[${idx}]`}
                                value={formik.values.inputs[idx]}
                                onChange={formik.handleChange}
                                label='Option'
                                variant="outlined"
                                sx={{ width: '400px', height: 0.2 }}
                                size='small'
                              />
                            </Box>
                            {idx === 0 ? (
                              <Button
                                sx={{ fontSize: '15px', fontWeight: '600', ml: 2 }}
                                onClick={() => push("")}>
                                <AddCircleOutlineIcon sx={{ color: 'primary.main' }} />
                              </Button>
                            ) : (
                              <Button sx={{ ml: 2 }} onClick={() => remove(idx)}>
                                <CloseIcon sx={{ color: 'red' }} />
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
                  marginRight: '40px'
                }}
              >
                <Button onClick={close} variant="outlined">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "primary.main",
                    color: "#ffffff",
                    marginLeft: "15px",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </form>
          </FormikProvider>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuggestionModal;