import React from "react";
import "../../css/customer.css";
import TableList from "./Table"
import { Link, Outlet } from "react-router-dom";
import { FaLessThan } from "react-icons/fa";

function CustomerList() {
  return (
    <>
      <div className="container-fluid p-md-5" style={{ paddingTop: "10px" }}>
        <Link to="/admin" className="poppins-normal-pear-20px">
          <FaLessThan style={{ fontSize: "15px" }} /> ADMIN HOME
        </Link>
        <TableList />
      </div>
      <Outlet />
    </>
  );
}

export default CustomerList;
