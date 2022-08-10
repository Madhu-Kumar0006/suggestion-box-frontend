import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {sm:'400px', xs: '280px'},
    bgcolor: '#FAF9F6',
    borderRadius: '10px',
    boxShadow: 10,
    p: 2,
  };

const ConfirmationModal = (props) => {
    
    const { show, content, close, confirm } = props;

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    return (
        <Modal
            open={show}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} display={'flex'} justifyContent={'center'} alignItems={'center'} flexDirection={'column'}>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                            <Grid item id="modal-modal-title" >
                                <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: '25px', fontWeight:'500', textAlign:'center'}} variant="h6" >
                                        {content.heading}
                                </Typography> 
                            </Grid> 
                            <Grid item>
                                <Typography id="modal-modal-description" sx={{ mt: 1, textAlign: 'center'}} variant="body2" >
                                    {content.description}
                                </Typography>  
                            </Grid>   
                            <Grid item marginTop={4}>
                                <Button sx={{marginRight:'15px'}} variant="outlined" color="error" onClick={close}>
                                    No
                                </Button>
                                <Button variant="contained" onClick={confirm}>
                                    Yes
                                </Button> 
                            </Grid>   
                     </Grid>      
                </Box>
        </Modal>
    )
}

export default ConfirmationModal;