import React, { Fragment, useState } from 'react';
import { makeStyles } from "@material-ui/core";
import { Grid, Typography, Breadcrumbs, Button, Box, Paper, IconButton} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { teamMembersData } from './TMData';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import TeamMemberModal from '../TeamMemberModal/TeamMemberModal';


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
  
  const classes = useStyles();

  const [tableData, setTableData] = useState(teamMembersData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showAddTeamMemberModal, setShowAddTeamMemberModal] = useState({show: false, data: {...initialModalValues}});
  const [showEditTeamMemberModal, setShowEditTeamMemberModal] = useState({show: false, data: {...initialModalValues}});

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
    {id:'id', label: 'SL No.'},
    {id:'name', label: 'Name'},
    {id:'email', label: 'Email'},
    {id:'status', label: 'Status'},
 ]

 const onDeleteHandler = (data) => {
    console.log(data);
 }
 

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
                <TeamMemberModal addModal={showAddTeamMemberModal} editModal={showEditTeamMemberModal} closeHandler={closeModal}/>
                <Grid>
                    <Box sx={{ width: '100%', typography: 'body1', marginTop:'15px' }}>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 500}}>
                                <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
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
                                    {tableData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, 100]}
                                component="div"
                                count={tableData.length}
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
