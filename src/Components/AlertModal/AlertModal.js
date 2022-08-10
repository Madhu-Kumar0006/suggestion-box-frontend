import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from "react-redux";
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import { Grid } from "@material-ui/core";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {sm:'330px', xs: '280px'} ,
    bgcolor: '#FAF9F6',
    borderRadius: '12px',
    border: 'none',
    boxShadow: 24,
    p: 2,
  };

const AlertModal = (props) => {

    //Accessing props   
    const { show } = props;

    //Redux state
    const alert = useSelector((state) => state.alert);
   

    return (
        <>
        {alert.type === "success" ? (
                <Modal
                open={show}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Grid item id="modal-modal-title" >
                                <CheckCircleSharpIcon color='success' sx={{fontSize:'80px'}}/> 
                            </Grid> 
                            <Grid item>
                                <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: '30px'}} variant="h4" >
                                    Success!
                                </Typography>  
                            </Grid>   
                            <Grid item>
                                <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: '18px', fontWeight: '500', textAlign:'center' }} variant="subtitle1" >
                                    {alert.message}
                                </Typography> 
                            </Grid>   
                     </Grid>      
                </Box>
            </Modal> 
            ) : (
            <Modal
                open={show}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Grid item id="modal-modal-title" >
                                <CancelIcon color='error' sx={{fontSize:'80px'}}/> 
                            </Grid> 
                            <Grid item>
                                <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: '30px'}} variant="h4" >
                                    Error!
                                </Typography>  
                            </Grid>   
                            <Grid item>
                                <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: '22px', fontWeight: '500', textAlign:'center' }} variant="subtitle1" >
                                    {alert.message}
                                </Typography> 
                            </Grid>   
                     </Grid>      
                </Box>
            </Modal> 
            )}
        </>
        );
    }
 
export default AlertModal;