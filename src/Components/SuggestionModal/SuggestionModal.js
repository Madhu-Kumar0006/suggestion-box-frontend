import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress, TextareaAutosize, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import CloseIcon from "@mui/icons-material/Close";
import { FieldArray, useFormik, FormikProvider, getIn } from "formik";
import { addQuestion } from "../../Redux/Actions/addQuestionAction";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm:450, md: 800 },
  bgcolor: "background.paper",
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
  question: yup.string().required("Title is required !"),
  suggestionType: yup.string().required("Suggestion Type is required !"),
  answerType: yup.string().required("Answer Type is required !"),
  // description:yup.string().required('')
  // inputs: yup.array()
  //   .of(yup.object().shape({
  //     input: yup.string().min(1, "Min 1 character")
  //   }))
});

const SuggestionModal = (props) => {
  const { show, close } = props;
  const classes = useStyles();

  const addQestion = useSelector((state) => state.addQuestionReducer);
  const alert = useSelector((state) => state.alert);
  // console.log(addQestion)

  const dispatch = useDispatch();

  const [singleSelect, setSingleSelect] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);

  const formik = useFormik({
    initialValues: {
      question: "",
      suggestionType: "",
      answerType: "",
      inputs: [''],
      description:'',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      submitSuccess(values);
    },
  });

  const submitSuccess = (values) => {
    const body = {
      question_title: values.question,
      suggestion_type: values.suggestionType,
      answer_type: Number(values.answerType),
      options: values.inputs,
      description:values.description,
      user_id: Number(localStorage.getItem("user_id")),
    };
    console.log(body)
    // dispatch(addQuestion(body));
    // close();
  };

  useEffect(() => {
    if (alert.type === "success") {
      close();
    }
  }, [alert, close]);
  // console.log(addQestion.loading)

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
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      BackdropComponent="static"
    >
      <Box sx={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: "25px",
            backgroundColor: "#00a693",
            mt: -4,
            ml:-4,
            mr:-4,
            p: 3,
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        >
          <Typography
            id="modal-modal-title"
            sx={{
              color: "white",
              fontWeight: "800",
              fontSize: { xs: "15px", md: "25px" },
            }}
          >
            Create Suggestion Box
          </Typography>
          <CloseIcon
            onClick={close}
            sx={{
              display: { xs: "none", md: "block" },
              mr: "-200px",
              ml: "200px",
              color: "white",
              cursor: "pointer",
            }}
          />
        </Box>
        {/* <Divider /> */}

        {/* question */}
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ overflowY: "scroll", height: "60vh", mt: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  className={classes.root}
                  value={formik.values.question}
                  name="question"
                  onChange={formik.handleChange}
                  type="text"
                  sx={{ width: '80%' }}
                  id="question"
                  placeholder="Enter Title"
                  label="Title"
                  variant="standard"
                  fullWidth
                  style={{ marginTop: "50px", marginBottom: 30 }}
                  error={
                    formik.touched.question && Boolean(formik.errors.question)
                  }
                />
                <TextareaAutosize
                  minRows={5}
                  name="description"
                  placeholder="Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  type="text"
                  variant="outlined"
                  label="Description about the title"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #356859",
                    fontSize: "16px",
                    width: "80%" ,
                  }}
                  className='desc'
                  // error={formik.touched.description && Boolean(formik.errors.description)}
                />
              </Box>
              {/* suggestion type */}
              <Box style={{ marginTop: "30px" }}>
                <FormControl
                  error={
                    formik.touched.suggestionType &&
                    Boolean(formik.errors.suggestionType)
                  }
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    Suggestion Type
                  </FormLabel>
                  <RadioGroup
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={formik.values.suggestionType}
                    name="suggestionType"
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="anonymous"
                      control={<Radio />}
                      label="Anonymous"
                      sx={{ mr: { xs: 3, md: 6 } }}
                    />
                    <FormControlLabel
                      value="specify name"
                      control={<Radio />}
                      label="Specify name"
                      sx={{ mr: { xs: 3, md: 6 } }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* answer type */}
              <Box style={{ marginTop: "30px" }}>
                <FormControl
                  error={
                    formik.touched.answerType &&
                    Boolean(formik.errors.answerType)
                  }
                >
                  <FormLabel id="demo-radio-buttons-group-label">
                    Answer Type
                  </FormLabel>
                  <RadioGroup
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                    }}
                    aria-labelledby="demo-radio-buttons-group-label"
                    value={formik.values.answerType}
                    name="answerType"
                    onChange={formik.handleChange}
                  >
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Text field"
                      onClick={hideSingleAndMulti}
                      sx={{ mr: { xs: 3, md: 6 } }}
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Single select"
                      onClick={showSingleSelect}
                      sx={{ mr: { xs: 3, md: 6 } }}
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="Multi select"
                      onClick={showMultiSelect}
                      sx={{ mr: { xs: 3, md: 6 } }}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              {(singleSelect || multiSelect) && (
                <FieldArray name="inputs">
                  {(fieldArrayProps) => {
                    {/* {console.log(fieldArrayProps, "fap")} */}
                    const { push, remove, form } = fieldArrayProps;
                    const { values, errors } = form;
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          mt: 8,
                        }}
                      >
                        {values.inputs.map((input, idx) => {
                          const name = `inputs[${idx}]`;
                          {/* const errorMessage = getIn(errors, name);
                          console.log('error', errorMessage); */}
                          return (
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                              key={`inputs-${idx}`}
                            >
                              <Typography
                                sx={{
                                  fontWeight: "500",
                                  fontSize: "22px",
                                  marginRight: "10px",
                                  ml: { xs: 1, md: 2 },
                                  color: "primary.main",
                                }}
                              >
                                {idx + 1}.
                              </Typography>
                              <Box>
                                <TextField
                                  name={name}
                                  value={formik.values.inputs[idx]}
                                  onChange={formik.handleChange}
                                  label="Option"
                                  variant="outlined"
                                  sx={{
                                    width: {
                                      xs: "110px",
                                      md: "320px",
                                      lg: "400px",
                                    },
                                    height: 0.2,
                                  }}
                                  size="small"
                                  // error={
                                  //   (singleSelect || multiSelect) &&
                                  //   formik.touched.inputs[idx] &&
                                  //   Boolean(formik.errors.inputs[idx])
                                  // }
                                />
                                {/* {name === '' && <div>option is required</div>} */}
                              </Box>
                              {idx === 0 ? (
                                <Button
                                  sx={{
                                    fontSize: "15px",
                                    fontWeight: "600",
                                    ml: { xs: 0.3, md: 1.6 },
                                  }}
                                  onClick={() => push("")}
                                >
                                  <AddCircleOutlineIcon
                                    sx={{ color: "primary.main" }}
                                  />
                                </Button>
                              ) : (
                                <Button
                                  sx={{ ml: { xs: 0.3, md: 1.6 } }}
                                  onClick={() => remove(idx)}
                                >
                                  <CloseIcon sx={{ color: "red" }} />
                                </Button>
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                    );
                  }}
                </FieldArray>
              )}
            </Box>
            {/* submit */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: 2,
                marginRight: 3,
              }}
            >
              <Button
                onClick={close}
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
                  marginLeft: 5,
                }}
              >
                {addQestion.loading ? (
                  <CircularProgress
                    sx={{ color: "#fff", marginLeft: "10px" }}
                    size={20}
                  />
                ) : (
                  <Box>Submit</Box>
                )}
              </Button>
            </Box>
          </form>
        </FormikProvider>
        {/* </Box> */}
      </Box>
    </Modal>
  );
};

export default SuggestionModal;
