import React, { Fragment, useState, useEffect } from 'react';
import { makeStyles } from "@material-ui/core";
import { Grid, Typography, Breadcrumbs, Button, Box, Paper, IconButton, Stack} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import TeamMemberModal from '../TeamMemberModal/TeamMemberModal';
import AlertModal from "../AlertModal/AlertModal";
import { useDispatch, useSelector } from 'react-redux';
import { getTeamMembers } from '../../Redux/Actions/teamMemberAction';
import CircularProgress from '@mui/material/CircularProgress';


const useStyles = makeStyles({
      page_bg: {
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: "12px"
        },
        page_heading: {
            alignItems: "center",
            height: "80px"
        },

})


const TeamMembers = () => {

    const initialModalValues = {
        name: "",
        email: "",
      }

    let teamMembers = [];
  
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState({show: false, data: {...initialModalValues}});
  const [showEditTeamMemberModal, setShowEditTeamMemberModal] = useState({show: false, data: {...initialModalValues}});

  //redux dispatch
  const dispatch = useDispatch();

  //redux state
  const alert = useSelector((state) => state.alert);
  const teamMemberResponse = useSelector((state) => state.teamMemberReducer)

  if(teamMemberResponse.response.data && Array.isArray(teamMemberResponse.response.data)) {
    teamMembers = teamMemberResponse.response.data;
  } else {
    teamMembers = [];
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const showAddModal = () => {
    setShowAddTeamMemberModal((pre) => {
        return {...pre, show: true}
    })
  }

  const showEditModal = (data) => {
    setShowEditTeamMemberModal((pre) => {
        return {data: {...data}, show: true}
    })
  }

  const closeModal = () => {
    setShowAddTeamMemberModal((pre) => {
        return {...pre, show: false}
    });
    setShowEditTeamMemberModal((pre) => {
        return {...pre, show: false}
    });
  }

  const columns = [
    // {id:'id', label: 'SL No.'},
    {id:'first_name', label: 'First Name'},
    {id:'last_name', label: "Last Name"},
    {id:'email_id', label: 'Email'},
    // {id:'status', label: 'Status'},
 ]

 const onDeleteHandler = (data) => {
    console.log(data);
 }

//useEffect (starts)
    useEffect(() => {
        dispatch(getTeamMembers())
    }, [dispatch]);
 
  useEffect(() => {
    if (alert.type === "success") {
        dispatch(getTeamMembers())
    }
  }, [alert, dispatch]);
// UseEffects (end):
 

  return (
    <Fragment>
        <Grid component='div' backgroundColor='primary.bg'  sx={{p:{xs:'8px', sm:'12px'}}}>
          <Breadcrumbs mb={1} aria-label="breadcrumb">
              <Typography variant='h6' color="text.primary">Team Members</Typography>
          </Breadcrumbs>
          <Grid component="div" className={`${classes.page_bg}`}>
               <Grid container display="flex" className={`${classes.page_heading}`} direction="row" justifyContent="space-between">
                    <Grid item sx={{marginLeft:'20px'}}>
                        <Button type="button" variant="contained" color="primary" onClick={showAddModal} >Add Team Members</Button>
                    </Grid>
                </Grid>
                {alert.message && <AlertModal show={true} />}
                <TeamMemberModal addModal={showAddTeamMemberModal} editModal={showEditTeamMemberModal} closeHandler={closeModal}/>
                <Grid>
                    <Box sx={{ width: '100%', typography: 'body1', marginTop:'15px' }}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 500}}>
                                <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{backgroundColor:'#E0E0E0', fontWeight:'bold', textAlign:'center', fontSize:'16px'}}>
                                            SL No:
                                        </TableCell>
                                    {columns.map((column) => (
                                        <TableCell
                                        key={column.id}
                                        sx={{backgroundColor:'#E0E0E0', fontWeight:'bold', textAlign:'center', fontSize:'16px'}}
                                        >
                                        {column.label}
                                        </TableCell>
                                    ))}
                                    <TableCell sx={{backgroundColor:'#E0E0E0', fontWeight:'bold', textAlign:'center', fontSize:'16px'}}>
                                        Actions
                                    </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {!teamMemberResponse.loadingGetTeamMembers && teamMembers
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <TableCell sx={{textAlign:'center'}}>
                                                {index + 1}
                                            </TableCell>
                                            {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} sx={{textAlign:'center', fontSize:'16px'}}>
                                                {value}
                                                </TableCell>
                                            );
                                            })}
                                            <TableCell sx={{textAlign:'center'}}>
                                                <IconButton color="primary" sx={{marginRight:'05px'}} onClick={()=> {showEditModal(row)}} component="span">
                                                    <BorderColorIcon />
                                                </IconButton>
                                                <IconButton color="error" sx={{marginRight:'05px'}} onClick={()=> {onDeleteHandler(row)}} component="span">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                        );
                                    })}
                                </TableBody>
                                </Table>
                                { teamMemberResponse.loadingGetTeamMembers ? (
                                    <Stack display="flex" mt={10} alignItems={'center'} justifyContent={'center'}>
                                        <CircularProgress color="primary" />
                                    </Stack>
                                ) : ( teamMembers.length === 0 ? (<Typography variant="body1" textAlign={'center'} my={5}>No Team Members avaialble, Add One!</Typography>) : (null) )}
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={teamMembers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Box>
                </Grid>
          </Grid>
        </Grid>
    </Fragment>
  )
}

export default TeamMembers;
