import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import colorLogo from "./../../Assets/images/logo-color.png";
import { Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { getQuestionWithToken, submitResponse } from "../../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

const TextTypography = withStyles({
  root: {
    color: "#000000",
    fontSize: 20,
  },
})(Typography);

const User = () => {
  let { token } = useParams();
  //UseState Hooks:
  const [data, setData] = useState({});
  const [textInput, setTextInput] = useState("");
  const [radio, setRadio] = useState("");
  const [checkbox, setCheckbox] = useState("");

  //UseDispatch:
  const dispatch = useDispatch();

  //UseSelector:
  const questionData = useSelector((state) => state.user);

  //UseEffect Start:
  useEffect(() => {
    // console.log(`${token}`);
    dispatch(getQuestionWithToken(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (questionData) {
      setData(questionData.data);
    }
  }, [questionData]);
  //UseEffect End:

  // Handlers Start:
  const handleTextInputChange = (event) => {
    setTextInput(event.target.value);
  };

  const handleRadioChange = (event) => {
    setRadio(event.target.value);
  };

  const handleCheckBox = (item) => {
    console.log(item)
  }

  const handleSubmit = () => {
    const id  = data.id;
    console.log(textInput);
    console.log(radio);
    if(data.answer_type === 1){
      dispatch(submitResponse(id,textInput))
    } else if(data.answer_type === 2){
      dispatch(submitResponse(id,radio))
    }
  };
  // Handlers End:

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#fff",
            height: "60px",
          }}
        >
          <Toolbar>
            <Box>
              <img width={"200px"} src={colorLogo} alt="logo" />
            </Box>
          </Toolbar>
          <Box
            sx={{
              backgroundColor: "#D8FAE9",
              minHeight: "100vh",
            }}
          >
            <Box
              sx={{
                backgroundColor: "#ffffff",
                margin: "40px",
                minHeight: "78vh",
                paddingTop: "20px",
                borderRadius:"12px"
              }}
            >
              {/* question */}
              <Box sx={{ marginLeft: "40px" }}>
                {data ? (
                  <TextTypography>{data.question_title}</TextTypography>
                ) : (
                  ""
                )}
              </Box>
              <Box
                sx={{
                  backgroundColor: "#dedede",
                  minHeight: "60vh",
                  marginLeft: "40px",
                  marginRight: "40px",
                  // marginBottom: "40px",
                  padding: "20px",
                  borderRadius:"12px"
                }}
              >
                {/* text field */}
                {data && data.answer_type === 1 ? (
                  <Box>
                    <TextareaAutosize
                      aria-label="minimum height"
                      minRows={10}
                      placeholder="Enter your response here"
                      style={{ width: "100%", border: "#cecece" }}
                      value={textInput}
                      onChange={handleTextInputChange}
                    />
                  </Box>
                ) : data && data.answer_type === 2 ? (
                  // radio button
                  <Box>
                    <span style={{ color: "black" }}>
                      Please select any one:
                    </span>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      {data &&
                        data.options &&
                        data.options.map((item, i) => {
                          return (
                            <>
                              <FormGroup
                                style={{
                                  marginTop: "10px",
                                  marginLeft: "10px",
                                  color: "black",
                                }}
                                key={i}
                              >
                                <FormControlLabel
                                  key={i}
                                  value={item.option_name}
                                  control={
                                    <Radio
                                      value={item.option_name}
                                      onChange={handleRadioChange}
                                    />
                                  }
                                  label={item.option_name}
                                />
                              </FormGroup>
                            </>
                          );
                        })}
                    </RadioGroup>
                  </Box>
                ) : (
                  //checkbox

                  <Box>
                    <span style={{ color: "black" }}>
                      Please select more than one:
                    </span>

                    {data &&
                      data.options &&
                      data.options.map((item, i) => {
                        return (
                          <>
                            <FormGroup
                              style={{
                                marginTop: "10px",
                                marginLeft: "10px",
                                color: "black",
                              }}
                              key={i}
                            >
                              <FormControlLabel
                                key={i}
                                control={<Checkbox checked={checkbox[item.option_name]} onClick={handleCheckBox(item.option_name)} />}
                                label={item.option_name}
                              />
                            </FormGroup>
                          </>
                        );
                      })}
                  </Box>
                )}

                {/* submit */}
                <Box sx={{ textAlign: "end", marginTop: "40px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "#399689", color: "#ffffff" }}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </AppBar>
      </Box>
    </>
  );
};

export default User;
