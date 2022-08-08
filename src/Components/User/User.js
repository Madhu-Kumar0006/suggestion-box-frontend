import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import colorLogo from "./../../Assets/images/logo-color.png";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { getQuestionWithToken, submitResponse } from "../../Redux/Actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { Typography, Button, Stack } from "@mui/material";
import { userSuggestionErrors } from "../Common/Constants";
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelIcon from '@mui/icons-material/Cancel';


const User = () => {
  let { token } = useParams();
  //UseState Hooks:
  const [data, setData] = useState({});
  const [textInput, setTextInput] = useState("");
  const [radio, setRadio] = useState("");
  const [checkbox, setCheckbox] = useState([]);
  const [errors, setErrors] = useState({textInput:false, radio:false, checkbox: false});
  const [page, setPage] = useState({responsePage:true, thankYouPage:false, closedPage:false});

  //UseDispatch:
  const dispatch = useDispatch();

  //UseSelector:
  const userQuestionData = useSelector((state) => state.user);
  // console.log(userQuestionData.response)

  //UseEffect Start:
  useEffect(() => {
    // console.log(`${token}`);
    dispatch(getQuestionWithToken(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (userQuestionData.response) {
      setData(userQuestionData.response.data);
    }
  }, [userQuestionData]);

  useEffect(() => {
    if(userQuestionData.response) {
      if (userQuestionData.response.msg === "Added response successfully") {
        setPage({thankYouPage:true,responsePage:false, closedPage:false})
      }
      else if(userQuestionData.response.data) {
        if(userQuestionData.response.data.status === 2)
        setPage({thankYouPage:false,responsePage:false, closedPage:true})
      } else {
        setPage({thankYouPage:false,responsePage:true, closedPage:false})
      }
    }   
  }, [userQuestionData]);
  //UseEffect End:

  // Handlers Start:
  const handleTextInputChange = (event) => {
    setErrors((pre) => {
      return {...pre, textInput:false}
    })
    setTextInput(event.target.value);
  };

  const handleRadioChange = (event) => {
    setErrors((pre) => {
      return {...pre, radio:false}
    })
    setRadio(event.target.value);
  };

  const handleCheckBoxChange = (event) => {
    setErrors((pre) => {
      return {...pre, checkbox:false}
    })
    if(event.target.checked === true) {
      setCheckbox((pre) => {
        return [...pre, event.target.value]
      }) 
    } else if(event.target.checked === false) {
      setCheckbox((pre) => {
        return pre.filter(item => item !== event.target.value)
      })
    }
  }
 

  const handleSubmit = () => {
    const id  = data.id;
    if(data.answer_type === 1){
      if(textInput === '') {
        setErrors((pre) => {
          return {...pre, textInput:true}
        })
      } else {
        dispatch(submitResponse(id,textInput))
      }
    } else if(data.answer_type === 2){
      if(radio === '') {
        setErrors((pre) => {
          return {...pre, radio:true}
        })
      } else {
        dispatch(submitResponse(id,radio))
      } 
    } else if(data.answer_type === 3){
      console.log(checkbox);
      if(checkbox.length === 0) {
        console.log("check error")
        setErrors((pre) => {
          return {...pre, checkbox:true}
        })
      } else {
        dispatch(submitResponse(id,checkbox))
      }
    }
  };
  // Handlers End:

  return (
    <>
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
        </AppBar>
          <Box
            sx={{
              backgroundColor: "primary.bg",
              display: 'flex',
              justifyContent: 'center',
              // alignItems: 'center',
              paddingY: '100px',
              minHeight: "80vh",
              flexGrow: 1
            }}
          >
            { page.responsePage && <Box
              sx={{
                backgroundColor: '#fff',
                width: {sm:'80%', xs:'98%'},
                borderRadius:"12px"
              }}
            >
              {/* question */}
              <Box
                sx={{
                  marginX:"20px",
                  // marginBottom: "40px",
                  padding: "20px",
                  borderRadius:"12px",
                }}
              >
                <Box>
                  <Box  sx={{ display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <Typography variant='caption' color='#757575'>Please provide your suggestion below and Submit</Typography>
                  </Box>
                  <Box sx={{marginBottom:'30px', paddingX:"20px", paddingY:"30px", borderRadius:"10px", backgroundColor:'primary.light'}}>
                    {data ? (
                      <Typography color="#000" variant='body1'>{data.question_title}</Typography>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
                {/* text field */}
                {data && data.answer_type === 1 ? (
                  <Box>
                    <Box sx={{width: {sm:'90%', xs:'98%'}, display:'flex', justifyContent:'center', alignItems:'center', marginX:'auto'}}>
                      <TextareaAutosize
                        aria-label="minimum height"
                        minRows={5}
                        placeholder="Enter your suggestion here"
                        style={{ width: "90%",borderRadius:'5px', borderColor: `${errors.textInput ? "red" : ""}`, border: '2px solid grey',fontSize:'16px'}}
                        value={textInput}
                        onChange={handleTextInputChange}
                      />
                    </Box>
                    { errors.textInput &&
                      <Box sx={{width: {sm:'90%', xs:'98%'}, display:'flex', justifyContent:'center', marginTop:'20px' ,marginX:'auto'}}>
                        <Typography variant="body2" color="error">
                          {userSuggestionErrors.TEXT_SUGGESTION_REQUIRED}
                        </Typography>
                      </Box>
                      }
                  </Box>
                ) : data && data.answer_type === 2 ? (
                  // radio button
                  <Box>
                    <Box sx={{width: {sm:'90%', xs:'98%'}, marginX:'auto'}}>
                      <Typography variant="body1">
                        Please select any one option:
                      </Typography>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                      >
                        {data &&
                          data.options &&
                          data.options.map((item, index) => {
                            return (
                                <FormGroup
                                  style={{
                                    marginTop: "10px",
                                    marginLeft: "10px",
                                    color: "black",
                                  }}
                                  key={index}
                                >
                                  <FormControlLabel
                                    key={index}
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
                            );
                          })}
                      </RadioGroup>
                    </Box>
                    { errors.radio &&
                      <Box sx={{width: {sm:'90%', xs:'98%'}, marginX:'auto',display:'flex', justifyContent:'center', marginTop:'20px'}}>
                        <Typography variant="body2" color="error">
                          {userSuggestionErrors.RADIO_SUGGESTION_REQUIRED}
                        </Typography>
                      </Box>
                      }

                  </Box>
 
                ) : (

                  //checkbox
                  <Box>
                    <Box sx={{width: {sm:'90%', xs:'98%'}, marginX:'auto'}}>
                      <span style={{ color: "black" }}>
                        Please select one or more options:
                      </span>

                      {data &&
                        data.options &&
                        data.options.map((item, index) => {
                          return (
                              <FormGroup
                                style={{
                                  marginTop: "10px",
                                  marginLeft: "10px",
                                  color: "black",
                                }}
                                key={index}
                              >
                                <FormControlLabel
                                  key={index}
                                  control={<Checkbox value={item.option_name} checked={checkbox[item.option_name]} onClick={handleCheckBoxChange} />}
                                  label={item.option_name}
                                />
                              </FormGroup>
                          );
                        })}
                    </Box>
                    {errors.checkbox &&
                      <Box sx={{width: {sm:'90%', xs:'98%'}, display:'flex', justifyContent:'center', marginX:'auto', marginTop:'20px'}}>
                        <Typography variant="body2" color="error">
                          {userSuggestionErrors.CHECKBOX_SUGGESTION_REQUIRED}
                        </Typography>
                      </Box>
                      }
                  </Box>
                )}

                {/* submit */}
                <Box sx={{ textAlign: "center", marginTop: "40px" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    style={{ backgroundColor: "primary"}}
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>}

            {/* Thank you page */}

            { !page.responsePage && <Box
              sx={{
                backgroundColor: '#fff',
                width: {sm:'80%', xs:'98%'},
                borderRadius:"12px"
              }}
              display="flex"
              justifyContent={'center'}
              alignItems={'center'}
            > 
            { page.thankYouPage &&
               <Stack direction={'column'} spacing={2}>
                <Stack display="flex" justifyContent={'center'} alignItems={'center'}>
                  <CheckCircleSharpIcon color='primary' sx={{fontSize:'90px'}}/>  
                </Stack>
                <Stack display="flex" justifyContent={'center'} alignItems={'center'}>
                  <Typography variant="h4" color="primary" sx={{fontWeight:'700'}}> Thank you! </Typography>
                </Stack>
                <Stack display="flex" justifyContent={'center'} alignItems={'center'}>
                  <Typography variant="body1">{userQuestionData.response.msg}</Typography>
                </Stack>
              </Stack>
            }

            { page.closedPage &&
               <Stack direction={'column'} spacing={2}>
                <Stack display="flex" justifyContent={'center'} alignItems={'center'}>
                <CancelIcon color='error' sx={{fontSize:'90px'}}/> 
                </Stack>
                <Stack display="flex" justifyContent={'center'} alignItems={'center'}>
                  <Typography variant="h4" color="#ff3d00" sx={{fontWeight:'700'}}> Link is Expired! </Typography>
                </Stack>
                <Stack display="flex" justifyContent={'center'} alignItems={'center'}>
                  <Typography variant="body1">{userSuggestionErrors.SUGGESTION_BOX_CLOSED}</Typography>
                </Stack>
              </Stack>
            }
           
            </Box>
              }
          </Box>
    </>
  );
};

export default User;
