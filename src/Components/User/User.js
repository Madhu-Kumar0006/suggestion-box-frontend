import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import colorLogo from "./../../Assets/images/logo-color.png";
import { Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const TextTypography = withStyles({
  root: {
    color: "#000000",
  },
})(Typography);

const User = () => {
  let { token } = useParams();

  useEffect(() => {
    console.log(`${token}`);
  }, []);

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
              }}
            >
              {/* question */}
              <Box sx={{ marginLeft: "40px" }}>
                <TextTypography>Question</TextTypography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#dedede",
                  minHeight: "56vh",
                  margin: "40px",
                  padding: "20px",
                }}
              >
                {/* text field */}
                <Box>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={10}
                    placeholder="Enter your response here"
                    style={{ width: "100%" }}
                  />
                </Box>

                {/* submit */}
                <Box sx={{ textAlign: "end", marginTop:"40px" }}>
                  <Button type="submit" variant="contained" style={{backgroundColor:"#399689", color:"#ffffff"}}>
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
