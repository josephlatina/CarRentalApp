import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Card from "./Card";
import Title from "./Title";
import DeleteModal from "./DeleteModal";
import EditCustomer from "./EditModal";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useGet } from "../../hooks/axios";

const TableList = () => {
  const [search, setSearch] = useState("");
  const [isDelete, setDelete] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState();
  const [visibleIds, setVisibleIds] = useState([]);

  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = () => setShowEdit(true);

  const editHandler = (c) => {
    setEditCustomerData(c);
    handleShowEdit();
  };

  const { data, loading, error, refetch } = useGet("http://127.0.0.1:8000/api/customers");

  if (error) {
    return <div>ERROR</div>;
  }

  return (
    <>
      <Card>
        <Title>Customer List</Title>
        <div className="card-body">
          <div>
            <input
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search..."
              className="poppins-normal-white-17px searchbar"
            ></input>
          </div>
          <div className="mt-5">
            <table className="table table-borderless responsive">
              <thead>
                <tr className="text-center">
                  <th width="10%">Id</th>
                  <th width="10%">First Name</th>
                  <th width="10%">Last Name</th>
                  <th width="10%">Date of Birth</th>
                  <th width="20%" className="text-nowrap">
                    Gold Member
                  </th>
                  <th width="20%">Drivers License</th>
                  <th width="10%"></th>
                  <th width="10%"></th>
                </tr>
              </thead>
              <tbody>
                {/* {loading && <h3 className="mt-5">Loading...</h3>} */}
                {data
                  ?.filter((c) => {
                    const has = ["first_name", "last_name"].some((key) =>
                      c[key]
                        ?.toLowerCase()
                        .includes(search.toLowerCase().trim())
                    );
                    return has
                  })
                  .map((c) => {
                    const isVisible = visibleIds.includes(c.id);
                    return (
                      <React.Fragment key={c.id}>
                        <tr className="text-center whitecolor">
                          <td>{c.id}</td>
                          <td>{c.first_name}</td>
                          <td>{c.last_name}</td>
                          <td>{c.DOB}</td>
                          <td>{c.gold_member?"Yes": "No"}</td>
                          <td>{c.drivers_license}</td>
                          <td>
                            <button
                              id={"btn" + c.id}
                              className={`button-sm${
                                isVisible ? "-click" : ""
                              }`}
                              onClick={() =>
                                setVisibleIds((prev) => {
                                  if (prev.includes(c.id)) {
                                    return prev.filter((id) => id !== c.id);
                                  }
                                  return [...prev, c.id];
                                })
                              }
                            >
                              {isVisible ? "Hide" : "Show"} Details
                            </button>
                          </td>
                          <td>
                            <FaEdit
                              onClick={() => editHandler(c)}
                              style={{ fontSize: "25px", marginRight: "10px" }}
                            />
                            <FaTrash
                              onClick={() => setDelete(c.id)}
                              style={{ fontSize: "20px" }}
                            />
                          </td>
                        </tr>

                        {isVisible && (
                          <tr id={c.id}>
                            <td colSpan={9}>
                              <div className="container">
                                <div className="row p-2">
                                  {/* <div className="col-2"></div> */}
                                  <div className="col-4">
                                    <div className="row p-2">
                                      <div className="col-4 detail-head mob-mar" style={{width: '45%'}}>
                                        <p>Email:</p>
                                        <p>Unit Number:</p>
                                        <p>Address:</p>
                                      </div>
                                      <div className="col-8 left-margin whitecolor" style={{width: '55%'}}>
                                        <p>{c.email}</p>
                                        <p>{c.unit_number ? c.unit_number : "-"}</p>
                                        <p>
                                          {c.street_number} {c.street_name}{""}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-1"></div>
                                  <div className="col-4">
                                    <div className="row p-2">
                                      <div className="col-4 detail-head mob-mar" style={{width: '45%'}}>
                                        <p>City:</p>
                                        <p>Province:</p>
                                        <p>Postal Code:</p>
                                      </div>
                                      <div className="col-8 left-margin whitecolor" style={{width: '55%'}}>
                                        <p>{c.city}</p>
                                        <p>{c.province}</p>
                                        <p>{c.postal_code}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-1"></div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
      
      {showEdit && (
        <EditCustomer
          show={showEdit}
          close={handleCloseEdit}
          refetch={refetch}
          data={editCustomerData}
        /> 
      )}
      {isDelete && (
        <DeleteModal
          show
          refetch={refetch}
          close={()=>setDelete("")}
          customerId={isDelete}
        />
      )}
      <Outlet />
    </>
  );
};
export default TableList;
