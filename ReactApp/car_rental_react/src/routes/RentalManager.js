//info
import { useLocation, Link, useLoaderData } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import React from "react";
import axios from "axios";

//styling

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

export function loader({ params }) {
    return params.branchId;
}

export function getList(str) {
    return fetch(str)
      .then(data => data.json())
  }
export function trimString(s) {
    var l=0, r=s.length -1;
    while(l < s.length && s[l] === ' ') l++;
    while(r > l && s[r] === ' ') r-=1;
    return s.substring(l, r+1);
  }
  
export function compareObjects(o1, o2) {
    var k = '';
    for(k in o1) if(o1[k] !== o2[k]) return false;
    for(k in o2) if(o1[k] !== o2[k]) return false;
    return true;
  }
  
export function itemExists(haystack, needle) {
    for(var i=0; i<haystack.length; i++) if(compareObjects(haystack[i], needle)) return true;
    return false;
  }
const columns = [
    { id: "ID", label: "Rental ID", minWidth: 30 },
    { id: "name", label: "Name", minWidth: 100 },
    { id: "car", label: "Car Model", minWidth: 100 },
    { id: "pickup", label: "Pickup Date", minWidth: 100 },
    { id: "expected", label: "Expected Return", minWidth: 100 },
    { id: "returned", label: "Returned", minWidth: 100 },
    { id: "total", label: "Subtotal", minWidth: 100 },
];

function RentalManager(props) {
    const { row } = props;
    const [visible, setVisible] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow onClick={() => setVisible(!visible)} className="tr-row">
                <TableCell>{row.rental_id}</TableCell>
                <TableCell>{row.customer}</TableCell>
                <TableCell>{row.car}</TableCell>
                <TableCell>{row.date_from}</TableCell>
                <TableCell>{row.date_to}</TableCell>
                <TableCell>{row.date_returned}</TableCell>
                <TableCell>{row.total_cost}</TableCell>
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} key={row.ID}>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        backgroundColor: "#444444cc",
                    }}
                    colSpan={8}
                >
                    <Collapse in={visible}>
                        <Box sx={{ margin: 1 }} className="collapsed-box">
                            <h4 align="center">Transaction Details</h4>
                            <h6 align="left">
                                Employee: {row.employee_given_by}
                            </h6>
                            <h6 align="left">
                                Branch From: {row.branch_came_from}
                            </h6>
                            <h6 align="left">
                                Branch To: {row.branch_goes_to}
                            </h6>
                            <h6 align="center">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    process
                                </button>
                            </h6>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    const [search, setSearch] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rentals, setRentals] = useState([]);
    const RENTAL_API = `http://127.0.0.1:8000/api/rentals/`;
    const chosenBranch = useLoaderData();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        let mounted = true;
        getList(RENTAL_API).then((items) => {
            if (mounted) {
                setRentals(items);
            }

          })
          return () => mounted = false;
    }, [])
    function searchFor(toSearch) {
        var results = [];
        toSearch = trimString(toSearch); // trim it
        for(var i=0; i<rentals.length; i++) {
          for(var key in rentals[i]) {
            if(rentals[i][key]?.toString().indexOf(toSearch)!==-1 || '') {
              if(!itemExists(results, rentals[i])) results.push(rentals[i]);
            }
          }
        }
        return results;
      }

    return (
        <>
            <section className="container" id="table-section">
                <section className="container" id="title-contained">
                    <h3>Manage Rentals</h3>
                </section>
                <section className="container" id="search-contained">
                    <div className="searchBar">
                        <input
                            id="searchQueryInput"
                            type="text"
                            name="searchQueryInput"
                            placeholder="Search"
                            onChange={handleChangeSearch}
                            value={search}
                        />
                        <button
                            id="searchQuerySubmit"
                            type="submit"
                            name="searchQuerySubmit"
                        >
                            <svg
                                style={{ width: "24px", height: "24px" }}
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#666666"
                                    d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                                />
                            </svg>
                        </button>
                    </div>
                </section>
                <section className="container" id="table-contained">
                    <Paper
                        sx={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                        }}
                        variant="outlined"
                    >
                        <TableContainer className="Table-Container">
                            <Table
                                stickyHeader
                                aria-label="sticky table"
                                className="Table-Main"
                            >
                                <TableHead className="Table-Head">
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{
                                                    minWidth: column.minWidth,
                                                }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <>
                                        {(() => {
                                            if (search === "") {
                                            return (
                                                rentals
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((item) => (
                                                        <RentalManager key={item.rental_id} row={item} />
                                                    ))
                                            )
                                            } else {
                                            return (
                                                searchFor(search)
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((item) => (

                                                        <RentalManager key={item.rental_id} row={item} />
                                                    ))
                                            )
                                            }
                                        })()}
                                    </>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            className="Table-Footer"
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rentals.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </section>
                <section className="container" id="add-contained">
                    <button type="submit" className="btn btn-primary">
                        +Add
                    </button>
                </section>
            </section>
        </>
    );
}
