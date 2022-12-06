import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useMutate } from "../../hooks/axios";

const EditModal = (props) => {
  const [customer, setCustomer] = useState(props.data);
  const [edit, { loading }] = useMutate({
    url: `http://127.0.0.1:8000/api/customers/${customer.id}/`,
    method: "PUT",
    onCompleted: () => {
      props.close();
      props.refetch();
    },
  });
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCustomer((p) => ({ ...p, [name]: value }));
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    console.log("Id = ", customer.id);
    edit({ data: customer });
  };

  return (
    <>
      {/* {loading && <div>LOADING</div>} */}
      <Modal show={props.show} className="darkcolor" onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="customer" onSubmit={SubmitHandler}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="first_name">First Name:</Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="text"
                    id="first_name"
                    name="first_name"
                    placeholder="First Name"
                    value={customer.first_name}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="last_name">Last Name:</Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="DOB"
                    id="last_name"
                    name="last_name"
                    required=""
                    placeholder="Last Name"
                    value={customer.last_name}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="email">Email:</Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="email"
                    required=""
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={customer.email}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="DOB">DOB:</Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="date"
                    required=""
                    id="DOB"
                    name="DOB"
                    placeholder="DOB"
                    value={customer.DOB}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="drivers_license">
                    Driver License
                  </Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="text"
                    required=""
                    id="drivers_license"
                    name="drivers_license"
                    placeholder="Driver License"
                    value={customer.drivers_license}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Label htmlFor="gold_member">Gold Member</Form.Label>
                <div className="form-group select">
                  <select
                    name="gold_member"
                    id="gold_member"
                    className="form-control"
                    value={customer.gold_member}
                    onChange={handleOnChange}
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="city">City</Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="text"
                    required=""
                    id="city"
                    name="city"
                    placeholder="City"
                    value={customer.city}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="province">Province:</Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="text"
                    id="province"
                    name="province"
                    placeholder="Province"
                    value={customer.province}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="street_name">Street Name:</Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="text"
                    id="street_name"
                    name="street_name"
                    placeholder="Street Name"
                    value={customer.street_name}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="street_number">
                    Street Number:
                  </Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="text"
                    id="street_number"
                    name="street_number"
                    required=""
                    placeholder="Street Number"
                    value={customer.street_number}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="postal_code">Postal Code:</Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    placeholder="Postal Code"
                    value={customer.postal_code}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3 darkcolor">
                  <Form.Label htmlFor="unit_number">Unit Number:</Form.Label>
                  <Form.Control
                    className="form-control form-control-sm"
                    type="number"
                    id="unit_number"
                    name="unit_number"
                    required=""
                    placeholder="Unit Number"
                    value={customer.unit_number}
                    onChange={handleOnChange}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="form-group text-center">
              <button className="btn btn-confirm-pear" type="submit">
                Save Changes
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditModal;
