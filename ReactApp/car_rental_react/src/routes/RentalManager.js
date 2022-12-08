//info
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import React from 'react';
import { format } from 'date-fns'

//styling
import rentalStyling from "../css/rentalmanager.css";
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
export function loader({ params }) {
    return params.branchId;
}
export function formattedDateToday(){
  const dateToday = new Date();
  dateToday.setDate(dateToday.getDate())
  return format(dateToday, 'yyyy-MM-dd');
}
export function dateCostChecker(returnDate, dateRelevant, car_type_object){
  let estimatedCost = 0;
  const diff = new Date(returnDate) - new Date(dateRelevant);
  const diffDays = diff/(1000 * 60 * 60 * 24);
  if (diffDays >= 7 && diffDays < 30) {
      const weeks = diffDays / 7;
      const leftDays = diffDays - (weeks * 7);
      estimatedCost = (weeks * car_type_object.weekly_cost) + (leftDays * car_type_object.daily_cost);
  }
  if (diffDays >= 30) {
      const months = diffDays / 30;
      let leftDays = diffDays - (months * 30);
      let weeks = 0;
      if (leftDays > 7) {
          weeks = leftDays / 7;
          leftDays = leftDays - (weeks * 7);
      }
      estimatedCost = (months * car_type_object.monthly_cost) + (weeks * car_type_object.weekly_cost) + (leftDays * car_type_object.daily_cost);
  }
  else{
    estimatedCost = (car_type_object.daily_cost * diffDays);
  }
  return estimatedCost;
}

const columns = [
    { id: 'ID', label: 'Rental ID', minWidth: 30 },
    { id: 'name', label: 'Name', minWidth: 100 },
    { id: 'car', label: 'Car Model', minWidth: 100 },
    { id: 'pickup', label: 'Pickup Date', minWidth: 100 },
    { id: 'expected', label: 'Expected Return', minWidth: 100 },
    { id: 'returned', label: 'Returned', minWidth: 100 },
    { id: 'total', label: 'Subtotal', minWidth: 100 },

  ];
    
function RentalManager(props) {
    const { row } = props;
    const [visible, setVisible] = React.useState(false);
    const [carTypes, setCarTypes] = useState([]);
    const [cars, setCars] = useState([]); 
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
      const CARTYPES_API = `http://127.0.0.1:8000/api/cartypes/`;
      const  CAR_API = `http://127.0.0.1:8000/api/cars/`;
      const  CUSTOMER_API = `http://127.0.0.1:8000/api/customers/`;
      let mounted = true;
      getList(CAR_API)
        .then(items => {
          if(mounted){
            setCars(items)
          }
        })
      getList(CARTYPES_API)
        .then(items => {
          if(mounted){
            setCarTypes(items)
          }
        })
      getList(CUSTOMER_API)
      .then(items => {
        if(mounted){
          setCustomers(items)
        }
      })
      return () => mounted = false;

    }, [])
    function handleCalculation(goldMember,branch_came_from,branch_goes_to,returnDate, dateFrom,dateTo, car_type){
      let estimatedCost = 0;
      const diff = new Date(returnDate) - new Date(dateTo);
      const diffDays = diff/(1000 * 60 * 60 * 24);
        carTypes.forEach((cartypeitem) => {
          let dailyLateFee = cartypeitem.late_fee;
          let branchChangeFee = cartypeitem.change_branch_fee;
          if(goldMember === true){
            branchChangeFee = 0;
          }
          if(cartypeitem.car_type_id === car_type){
            if(branch_came_from === branch_goes_to){
              if (Date.parse(returnDate) <= Date.parse(dateTo)) {
                estimatedCost = dateCostChecker(returnDate, dateFrom, cartypeitem);
              }
              if(Date.parse(returnDate) > Date.parse(dateTo)){
                estimatedCost = (dateCostChecker(returnDate, dateTo, cartypeitem) + (dailyLateFee));
              }
            }
            if(branch_came_from !== branch_goes_to){
              if (Date.parse(returnDate) <= Date.parse(dateTo)) {
                estimatedCost = ((dateCostChecker(returnDate, dateFrom, cartypeitem)) + (branchChangeFee));
              }
              if(Date.parse(returnDate) > Date.parse(dateTo)){
                estimatedCost = ((dateCostChecker(returnDate, dateTo, cartypeitem)) + (branchChangeFee) + (dailyLateFee));
              }
            }
          }
        })
        return estimatedCost;
    }
    function patchRentals(goldMember,branch_came_from,branch_goes_to, dateFrom,dateTo, car_type){
      fetch(`http://127.0.0.1:8000/api/rentals/${row.rental_id}/`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              date_returned: formattedDateToday(),
              total_cost: handleCalculation(goldMember,branch_came_from,branch_goes_to,formattedDateToday(), dateFrom,dateTo, car_type), 
            }),
          })
          window.location.reload(false);
    }
    const onProcessPress = () => {
      cars.forEach((car) => {
        customers.forEach((customer) => {
          if(row.date_returned === null){
            if(row.car === car.car_id && row.customer === customer.first_name + " " + customer.last_name){
              patchRentals(customer.gold_member,row.branch_came_from,row.branch_goes_to, row.date_from, row.date_to, car.car_type);
            }
          }
        })

      })
    }
    
    return (
        <React.Fragment>
            <TableRow onClick={() => setVisible(!visible)} className="tr-row"> 
                    <TableCell>{row.rental_id}</TableCell>
                    <TableCell>{row.customer}</TableCell>
                    <TableCell>{cars.map((item) => {
                      if(row.car === item.car_id){
                        return item.manufacturer + " " + item.model;
                      }
                    })}</TableCell>
                    <TableCell>{row.date_from}</TableCell>
                    <TableCell>{row.date_to}</TableCell>
                    <TableCell>{row.date_returned}</TableCell>
                    <TableCell>{row.total_cost}</TableCell>
            </TableRow>
            <TableRow role="checkbox" tabIndex={-1} key={row.ID}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#444444cc' }} colSpan={8}>
                    <Collapse in={visible}>
                        <Box sx={{ margin: 1 }} className="collapsed-box">
                            <h4 align="center">Transaction Details</h4>
                            <h6 align="left">Employee: {row.employee_given_by}</h6>
                            <h6 align="left">Branch From: {row.branch_came_from}</h6>
                            <h6 align="left">Branch To: {row.branch_goes_to}</h6>
                            <h6 align="center"><button type="submit" className="btn btn-primary" onClick={onProcessPress}>process</button></h6>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>

    );
}

export default function CollapsibleTable() {
    const[search, setSearch] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rentals, setRentals] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [branches, setBranches] = useState([]); 
    const branchSelection = (window.location.pathname.split('/')[3]);
    
    useEffect(() => {
        const  BRANCHES_API = `http://127.0.0.1:8000/api/branches/`;
        const  EMPLOYEE_API = `http://127.0.0.1:8000/api/employees/`;
        const CUSTOMER_API = `http://127.0.0.1:8000/api/customers/`;
        const RENTAL_API = `http://127.0.0.1:8000/api/rentals/`;
        let mounted = true;
        getList(BRANCHES_API)
          .then(items => {
            if(mounted){
              setBranches(items)
            }
          })
        getList(EMPLOYEE_API)
          .then(items => {
            if(mounted){
              setEmployees(items)
            }
          })
        getList(CUSTOMER_API)
          .then(items => {
            if(mounted){
              setCustomers(items)
            }
          })
        getList(RENTAL_API)
          .then(items => {
            if(mounted){
              setRentals(items)
            }
          })
          return () => mounted = false;
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleChangeSearch = event => {
        setSearch(event.target.value.toLowerCase());
      };

    function searchFor(toSearch) {
        var results = [];
        toSearch = trimString(toSearch); // trim it
        for(var i=0; i<rentals.length; i++) {
          for(var key in rentals[i]) {
            if(rentals[i][key]?.toString().toLowerCase().indexOf(toSearch)!==-1 || "") {
              if(!itemExists(results, rentals[i])) results.push(rentals[i]);
            }
          }
        }
        return results;
      }
      function branchFilter(selectedBranch) {
        var results = [];
        for(var i=0; i<rentals.length; i++) {
          for(var key in rentals[i]) {
            if(key === "branch_goes_to" || key === "branch_came_from"){
              if(rentals[i][key]?.toString() === selectedBranch || ""){
                if(!itemExists(results, rentals[i])) results.push(rentals[i]);
              }
            }
          }
        }
        return results;
      }
      function findReturnOccurences(){
        let rentals2 = [];
          
        rentals.forEach((r1)=>{
           if(rentals2.some((r2)=>{
             return r2["customer"] === r1["customer"] })){
             rentals2.forEach((r3)=>{
               if(r3["customer"] === r1["customer"] && r3["date_returned"] !== null && r1["date_returned"] !== null){ 
                 r3["occurrence"]++
               }
            })
               
           }
           else{
            let a = {}
            a["customer"] = r1["customer"]
            a["occurrence"] = 1
            rentals2.push(a);
           }
        })  
        return rentals2;
      }
    function findGoldEligible(){
      findReturnOccurences().forEach((item) => {
        if(item.occurrence >= '3'){
          if(typeof item.customer == 'number'){
            fetch(`http://127.0.0.1:8000/api/customers/${item.customer}/`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                gold_member: true, 
              }),
            })
          }
        }
      })
    }
    return (
        <>
            {findGoldEligible()}
            <section className="container" id="table-section">
                <section className="container" id="title-contained">
                    <h3 >Manage Rentals</h3>
                </section>
                <section className="container" id="search-contained">
                    <div className="searchBar">
                        <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" onChange={handleChangeSearch} value={search}/>
                        <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
                            <svg style={{width:"24px",height:"24px"}} viewBox="0 0 24 24"><path fill="#666666"
                             d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
                            </svg>
                        </button>
                    </div>
                </section>
                <section className="container" id="table-contained">
                    <Paper sx={{ width: '100%' , height: '100%' , overflow: 'hidden'}} variant="outlined">
                        <TableContainer className="Table-Container">
                            <Table stickyHeader aria-label="sticky table" className="Table-Main">
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
                                    <>
                                        {(() => {
                                            if (search === "") {                                          
                                            return (
                                              branchFilter(branchSelection)
                                                .map((item) => {
                                                    customers.forEach((customer) => {
                                                        if(item.customer === customer.id){                                                        
                                                            item.customer = customer.first_name + " " + customer.last_name;
                                                        }                                                        
                                                                                                                 
                                                    })                          
                                                    employees.forEach((employee) => {
                                                        if(item.employee_given_by === employee.id){
                                                            item.employee_given_by = employee.first_name + " " + employee.last_name;
                                                        }
                                                    })
                                                    branches.forEach((branch) => {
                                                        if(item.branch_goes_to === branch.id){
                                                            item.branch_goes_to = branch.street_number + " " + branch.street_name + " " + branch.city;
                                                        }
                                                        if(item.branch_came_from === branch.id){
                                                            item.branch_came_from = branch.street_number + " " + branch.street_name + " " + branch.city;
                                                        }
                                                    })
                                                  return <RentalManager key={item.rental_id} row={item} />
                                                })
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            )
                                            } else {
                                            return (
                                                searchFor(search)
                                                    .map((item) => {
                                                      return <RentalManager key={item.rental_id} row={item} />
                                                    })
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                            count={branchFilter(branchSelection).length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </section>
                <section className="container" id="add-contained">
                    <button type="submit" className="btn btn-primary">Branch ID: {branchSelection}</button>
                </section>
            </section>
        </>
    );
  }
