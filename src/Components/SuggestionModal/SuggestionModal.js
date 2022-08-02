import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Divider from "@mui/material/Divider";
import CloseIcon from '@mui/icons-material/Close';

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
  borderRadius:"12px"
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
  }

  const showMultiSelect = () => {
    setMultiSelect(true);
    setSingleSelect(false);
  }

  return (
    <Modal
      open={show}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Create Suggestion Box
        </Typography>
         <Button onClick={close}>
          <CloseIcon sx={{color:'#080808'}} />
         </Button>
        </Box>
        <Divider />

        {/* question */}
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
            style={{ width: "100", marginTop: 20 }}
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
              />
              <FormControlLabel
                value="single-select"
                control={<Radio />}
                label="Single select"
                onClick={showSingleSelect}
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

        {singleSelect && (
          <Box>Single</Box>
        )}
        {multiSelect && (
          <Box>Multi</Box>
        )}

        {/* submit */}
        <Box sx={{ display:'flex', justifyContent:'flex-end', marginTop: "40px" }}>
          <Button onClick={close}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "#399689", color: "#ffffff", marginLeft:'15px' }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SuggestionModal;
