import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react';
import axios from "axios";
import { Button, Col, Container, Row } from "reactstrap";

import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Poppins',
      'sans-serif',
    ].join(','),
  },});

const columns = [
    { id: 'ID', label: 'ID', minWidth: 20 },
    { id: 'manufacturer', label: 'Manufacturer', minWidth: 170 },
    { id: 'model', label: 'Model', minWidth: 170 },
    { id: 'licenseplate', label: 'License Plate', minWidth: 170 },
    { id: 'fueltype', label: 'Fuel Type', minWidth: 170 },
    { id: 'status', label: 'Status', minWidth: 170 },
  ];

function createData(ID, manufacturer, model, licenseplate, fueltype, status) {
return { ID, manufacturer, model, licenseplate, fueltype, status };
}

const rows = [
    createData('1', 'Lamborghini', 'Huracan', 'CLW-2457',' Gasoline', 'Available'),
    createData('2', 'Lamborghini', 'Huracan', 'CLW-2457',' Gasoline', 'Available'),
    createData('3', 'Lamborghini', 'Huracan', 'CLW-2457',' Gasoline', 'Available'),
    createData('4', 'Lamborghini', 'Huracan', 'CLW-2457',' Gasoline', 'Available'),
    createData('5', 'Lamborghini', 'Huracan', 'CLW-2457',' Gasoline', 'Available'),
    createData('6', 'Lamborghini', 'Huracan', 'CLW-2457',' Gasoline', 'Available'),
    createData('7', 'Lamborghini', 'Huracan', 'CLW-2457',' Gasoline', 'Available'),
    createData('8', 'Lamborghini', 'Huracan', 'CLW-2457',' Gasoline', 'Available'),
];

function RentalManager(props) {
    const { row } = props;
    const [visible, setVisible] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow onClick={() => setVisible(!visible)} className="tr-row">  
                    <TableCell>{row.ID}</TableCell>
                    <TableCell>{row.manufacturer}</TableCell>
                    <TableCell>{row.model}</TableCell>
                    <TableCell>{row.licenseplate}</TableCell>
                    <TableCell>{row.fueltype}</TableCell>
                    <TableCell>{row.status}</TableCell>
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} key={row.ID}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#393939' }} colSpan={8}>
                    <Collapse in={visible}>
                        <Box sx={{ margin: 1 }} className="collapsed-box">
                            <div className="row">
                                <div className="col-4" align="left">
                                    <h6 >Car Type: </h6>
                                    <h6 align="left">Daily Price:</h6>
                                    <h6 align="left">Weekly Price:</h6>
                                    <h6 align="left">Monthly Price:</h6>
                                    <h6 align="left">Late Fee:</h6>
                                    <h6 align="left">Change Branch Fee:</h6>
                                </div>
                                <div className="col-4" align="center">
                                    <h6>Colour:</h6>
                                    <h6>Mileage:</h6>
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                        <h6 className="col-6">Transfer to Branch:</h6>
                                        <div className="col-6">
                                            <Select
                                                className="dropdown"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                // value={age}
                                                label="Age"
                                                // onChange={handleChange}
                                            >
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h6 align="right"><button type="submit" className="btn btn-primary">Transfer</button></h6>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>

    );
}

const AdminCar = () => {
    const[search, setSearch] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    return (
        <section className="container" id="table-section">
            {/* Title */}
            <div id="title-contained">
                <h3>Car List</h3>
            </div>
            {/* Search Bar */}
            <div className="row" id="search-contained">
                <div className="searchBar">
                    <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search"/>
                    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                            <svg style={{width:"24px",height:"24px"}} viewBox="0 0 24 24"><path fill="#666666"
                             d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                        </button>
                </div>
            </div>
            {/* Table */}
            <section className="container" id="table-contained">
                    <Paper sx={{ width: '100%' , height: '100%' , overflow: 'hidden', backgroundColor: '#242424', borderColor: 'white'}} variant="outlined">
                        <TableContainer className="Table-Container" style={{minHeight: '60vh'}}>
                            <Table stickyHeader aria-label="sticky table" className="Table-Main">
                                <ThemeProvider theme={theme}>
                                <TableHead className="Table-Head">
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell 
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                            >
                                            {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <RentalManager key={row.ID} row={row} />
                                    ))}
                                </TableBody>
                                </ThemeProvider>
                            </Table>
                        </TableContainer>
                        {/* <TablePagination 
                            className="Table-Footer"
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
                    </Paper>
                </section>
                <section className="container" id="add-contained">
                    <button type="submit" className="btn btn-primary">+Add</button>
                </section>
        </section>
    );
};

export default AdminCar;