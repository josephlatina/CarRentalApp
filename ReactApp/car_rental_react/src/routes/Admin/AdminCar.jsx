import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";

import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material";

export function loader({ params }) {
    return params.branchId;
}

export function trimString(s) {
    var l = 0,
        r = s.length - 1;
    while (l < s.length && s[l] === " ") l++;
    while (r > l && s[r] === " ") r -= 1;
    return s.substring(l, r + 1);
}

export function compareObjects(o1, o2) {
    var k = "";
    for (k in o1) if (o1[k] !== o2[k]) return false;
    for (k in o2) if (o1[k] !== o2[k]) return false;
    return true;
}

export function itemExists(haystack, needle) {
    for (var i = 0; i < haystack.length; i++)
        if (compareObjects(haystack[i], needle)) return true;
    return false;
}

const theme = createTheme({
    typography: {
        fontFamily: ["Poppins", "sans-serif"].join(","),
    },
});

const columns = [
    { id: "ID", label: "ID", minWidth: 20 },
    { id: "manufacturer", label: "Manufacturer", minWidth: 170 },
    { id: "model", label: "Model", minWidth: 170 },
    { id: "licenseplate", label: "License Plate", minWidth: 170 },
    { id: "fueltype", label: "Fuel Type", minWidth: 170 },
    { id: "status", label: "Status", minWidth: 170 },
];

function RentalManager(props) {
    const { row, onClick, carTypeInfo, branches, onRefresh, chosenBranch } =
        props;
    const [visible, setVisible] = React.useState(false);
    const [branch, setBranch] = React.useState([]);

    const navigate = useNavigate();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setBranch(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    const handleTransfer = async (e, car, branchid) => {
        e.preventDefault();

        try {
            await axios.put(`http://127.0.0.1:8000/api/cars/${car.car_id}/`, {
                car_type: car.car_type,
                branch: branchid,
                manufacturer: car.manufacturer,
                model: car.model,
                fuel_type: car.fuel_type,
                colour: car.colour,
                license_plate: car.license_plate,
                status: car.status,
                mileage: car.mileage,
            });
        } catch (error) {
            // throw new Error(error);
            const errorMessage = Object.keys(error.response.data).map(
                (k) => k + ": " + error.response.data[k] + "\n"
            );
            console.log(errorMessage);
        }

        setVisible(!visible);
        setBranch([]);
        await onRefresh();
    };

    const handleUpdate = () => {
        navigate("/admincardetails", {
            state: {
                carid: row.car_id,
                branchid: chosenBranch,
                addflag: 0,
            },
        });
    };

    return (
        <React.Fragment>
            <TableRow
                onClick={() => {
                    setVisible(!visible);
                    onClick();
                }}
                className="tr-row"
            >
                <TableCell>{row.car_id}</TableCell>
                <TableCell>{row.manufacturer}</TableCell>
                <TableCell>{row.model}</TableCell>
                <TableCell>{row.license_plate}</TableCell>
                <TableCell>{row.fuel_type}</TableCell>
                <TableCell>{row.status}</TableCell>
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} key={row.car_id}>
                <TableCell
                    style={{
                        paddingBottom: 0,
                        paddingTop: 0,
                        backgroundColor: "#393939",
                    }}
                    colSpan={8}
                >
                    <Collapse in={visible}>
                        <Box sx={{ margin: 1 }} className="collapsed-box">
                            <div className="row">
                                <div className="col-4" align="left">
                                    <div className="row table-box-info">
                                        <h6
                                            className="col-6"
                                            align="right"
                                            style={{ textAlign: "right" }}
                                        >
                                            Car Type:{" "}
                                        </h6>
                                        <h6
                                            className="col-6"
                                            id="table-box-info-value"
                                            align="center"
                                            style={{ textAlign: "left" }}
                                        >
                                            {carTypeInfo[0]?.description}
                                        </h6>
                                    </div>
                                    <div className="row table-box-info">
                                        <h6
                                            className="col-6"
                                            align="right"
                                            style={{ textAlign: "right" }}
                                        >
                                            Daily Price:{" "}
                                        </h6>
                                        <h6
                                            className="col-6"
                                            id="table-box-info-value"
                                            align="center"
                                            style={{ textAlign: "left" }}
                                        >
                                            ${carTypeInfo[0]?.daily_cost}
                                        </h6>
                                    </div>
                                    <div className="row table-box-info">
                                        <h6
                                            className="col-6"
                                            align="right"
                                            style={{ textAlign: "right" }}
                                        >
                                            Weekly Price:{" "}
                                        </h6>
                                        <h6
                                            className="col-6"
                                            id="table-box-info-value"
                                            align="center"
                                            style={{ textAlign: "left" }}
                                        >
                                            ${carTypeInfo[0]?.weekly_cost}
                                        </h6>
                                    </div>
                                    <div className="row table-box-info">
                                        <h6
                                            className="col-6"
                                            align="right"
                                            style={{ textAlign: "right" }}
                                        >
                                            Monthly Price:{" "}
                                        </h6>
                                        <h6
                                            className="col-6"
                                            id="table-box-info-value"
                                            align="center"
                                            style={{ textAlign: "left" }}
                                        >
                                            ${carTypeInfo[0]?.monthly_cost}
                                        </h6>
                                    </div>
                                    <div className="row table-box-info">
                                        <h6
                                            className="col-6"
                                            align="right"
                                            style={{ textAlign: "right" }}
                                        >
                                            Late Fee:{" "}
                                        </h6>
                                        <h6
                                            className="col-6"
                                            id="table-box-info-value"
                                            align="center"
                                            style={{ textAlign: "left" }}
                                        >
                                            ${carTypeInfo[0]?.late_fee}
                                        </h6>
                                    </div>
                                    <div className="row table-box-info">
                                        <h6
                                            className="col-6"
                                            align="right"
                                            style={{ textAlign: "right" }}
                                        >
                                            Change Branch Fee:{" "}
                                        </h6>
                                        <h6
                                            className="col-6"
                                            id="table-box-info-value"
                                            align="center"
                                            style={{ textAlign: "left" }}
                                        >
                                            ${carTypeInfo[0]?.change_branch_fee}
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-4" align="center">
                                    <div className="row table-box-info">
                                        <h6
                                            className="col-6"
                                            align="right"
                                            style={{ textAlign: "right" }}
                                        >
                                            Colour:{" "}
                                        </h6>
                                        <h6
                                            className="col-6"
                                            id="table-box-info-value"
                                            align="center"
                                            style={{ textAlign: "left" }}
                                        >
                                            {row.colour}
                                        </h6>
                                    </div>
                                    <div className="row table-box-info">
                                        <h6
                                            className="col-6"
                                            align="right"
                                            style={{ textAlign: "right" }}
                                        >
                                            Mileage:{" "}
                                        </h6>
                                        <h6
                                            className="col-6"
                                            id="table-box-info-value"
                                            align="center"
                                            style={{ textAlign: "left" }}
                                        >
                                            {row.mileage}
                                        </h6>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="row">
                                        <h6 className="col-6">
                                            Transfer to Branch:
                                        </h6>
                                        <div className="col-6">
                                            <Select
                                                className="dropdown"
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={branch}
                                                label="Branch"
                                                multiple
                                                onChange={handleChange}
                                            >
                                                {branches?.map((branch) => {
                                                    return (
                                                        <MenuItem
                                                            key={branch.id}
                                                            value={branch.id}
                                                        >
                                                            {
                                                                branch?.street_number
                                                            }{" "}
                                                            {
                                                                branch?.street_name
                                                            }{" "}
                                                            {branch?.city}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <h6 align="right">
                                            <button
                                                type="submit"
                                                onClick={(event) =>
                                                    handleTransfer(
                                                        event,
                                                        row,
                                                        branch[0]
                                                    )
                                                }
                                                className="btn btn-primary"
                                            >
                                                Transfer
                                            </button>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <h6 align="center">
                                    <button
                                        type="submit"
                                        onClick={handleUpdate}
                                        className="btn btn-primary"
                                    >
                                        Update
                                    </button>
                                </h6>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const AdminCar = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [cars, setCars] = useState([]);
    const [carTypes, setCarTypes] = useState([]);
    const [carTypeInfo, setCarTypeInfo] = useState([]);
    const [branches, setBranches] = useState([]);
    const chosenBranch = useLoaderData();

    const navigate = useNavigate();

    const refreshCars = async () => {
        // retrieve cars and filter by branch selected
        try {
            axios
                .get("http://127.0.0.1:8000/api/cars")
                .then((res) =>
                    setCars(
                        res.data.filter((car) => {
                            return car.branch === parseInt(chosenBranch);
                        })
                    )
                )
                .catch((err) => console.log(err));
        } catch (error) {
            throw new Error(error);
        }
    };

    // handle retrieval of car types from query here
    const queryCarTypes = async () => {
        // handle query here
        try {
            axios
                .get("http://127.0.0.1:8000/api/cartypes")
                .then((res) => setCarTypes(res.data))
                .catch((err) => console.log(err));
        } catch (error) {
            throw new Error(error);
        }
    };

    // handle retrieval of branches from query here
    const queryBranches = async () => {
        // handle query here
        try {
            axios
                .get("http://127.0.0.1:8000/api/branches")
                .then((res) => setBranches(res.data))
                .catch((err) => console.log(err));
        } catch (error) {
            throw new Error(error);
        }
    };

    // handle checking the car type for specific car
    const getCarTypeInfo = (cartypeid, event) => {
        setCarTypeInfo(
            carTypes.filter((type) => {
                return cartypeid === type.car_type_id;
            })
        );
    };

    // handle adding another car
    const handleAdd = () => {
        navigate("/admincardetails", {
            state: {
                branchid: chosenBranch,
                addflag: 1,
            },
        });
    };

    function searchFor(toSearch) {
        var results = [];
        toSearch = trimString(toSearch); // trim it
        for (var i = 0; i < cars.length; i++) {
            for (var key in cars[i]) {
                console.log(cars[i][key]);
                if (
                    cars[i][key]?.toString().toLowerCase().indexOf(toSearch.toLowerCase()) !== -1 ||
                    ""
                ) {
                    if (!itemExists(results, cars[i])) {
                        results.push(cars[i]);
                    }
                }
            }
        }
        return results;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeSearch = (event) => {
        setSearch(event.target.value);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // handle fetching of data here
    useEffect(() => {
        (async () => {
            await refreshCars();
        })();
        (async () => {
            await queryCarTypes();
        })();
        (async () => {
            await queryBranches();
        })();
    }, []);

    useEffect(() => {
        console.log(cars);
    }, [cars]);

    return (
        <section className="container" id="table-section">
            <h1 className="header-text" align="center">
                Branch ID No. {chosenBranch}
            </h1>
            {/* Title */}
            <div id="title-contained">
                <h3>Car List</h3>
            </div>
            {/* Search Bar */}
            <div className="row" id="search-contained">
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
                                style={{width:"24px",height:"24px"}} 
                                viewBox="0 0 24 24">
                                    <path 
                                        fill="#666666"
                                        d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                        </button>
                </div>
            </div>
            {/* Table */}
            <section className="container" id="table-contained">
                <Paper
                    sx={{
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        backgroundColor: "#242424",
                        borderColor: "white",
                    }}
                    variant="outlined"
                >
                    <TableContainer
                        className="Table-Container"
                        style={{ minHeight: "60vh" }}
                    >
                        <Table
                            stickyHeader
                            aria-label="sticky table"
                            className="Table-Main"
                        >
                            <ThemeProvider theme={theme}>
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
                                            if (search == "") {
                                                return cars
                                                    .slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage + rowsPerPage
                                                    )
                                                    .map((car, index) => (
                                                        <RentalManager
                                                            key={index}
                                                            row={car}
                                                            onClick={(event) =>
                                                                getCarTypeInfo(
                                                                    car.car_type,
                                                                    event
                                                                )
                                                            }
                                                            onRefresh={refreshCars}
                                                            carTypeInfo={carTypeInfo}
                                                            branches={branches}
                                                            chosenBranch={chosenBranch}
                                                        />
                                                    ))
                                            } else {
                                                console.log("hello");
                                                return searchFor(search)
                                                    .slice(
                                                        page * rowsPerPage,
                                                        page * rowsPerPage + rowsPerPage
                                                    )
                                                    .map((car, index) => (
                                                        <RentalManager
                                                            key={index}
                                                            row={car}
                                                            onClick={(event) =>
                                                                getCarTypeInfo(
                                                                    car.car_type,
                                                                    event
                                                                )
                                                            }
                                                            onRefresh={refreshCars}
                                                            carTypeInfo={carTypeInfo}
                                                            branches={branches}
                                                            chosenBranch={chosenBranch}
                                                        />
                                                    ))
                                            }
                                        })()}
                                    </>

                                </TableBody>
                            </ThemeProvider>
                        </Table>
                    </TableContainer>
                    <TablePagination 
                            className="Table-Footer"
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={cars.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                </Paper>
            </section>
            <section className="container" id="add-contained">
                <button
                    type="submit"
                    onClick={handleAdd}
                    className="btn btn-primary"
                >
                    +Add
                </button>
            </section>
        </section>
    );
};

export default AdminCar;
