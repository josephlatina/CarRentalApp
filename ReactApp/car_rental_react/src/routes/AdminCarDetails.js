import { Button, Col, Container, Row } from "reactstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../provider/authContext";
import { useState } from "react";

const AdminCarDetails = () => {
  // auth check

  // ensure page not loaded with null location.state

  // get car details
  return (
    <>
      <section class="rental-container">
        <h1 className="header-text">BRANCH NAME HERE</h1>
        <div className="car-details">
          <h2 className="header-text">Car Details</h2>
          <Row className="car-info-row">
            <Col>
              <div className="car-info-box">
                <h6 className="car-info-label">Manufacturer</h6>
              </div>
            </Col>
            <Col>
              <div className="car-info-box">
                <h6 className="car-info-label">Model</h6>
              </div>
            </Col>
          </Row>
          <Row className="car-info-row">
            <Col>
              <div className="car-info-box">
                <h6 className="car-info-label">Fuel Type</h6>
              </div>
            </Col>
            <Col>
              <div className="car-info-box">
                <h6 className="car-info-label">Colour</h6>
              </div>
            </Col>
          </Row>
          <Row className="car-info-row">
            <Col>
              <div className="car-info-box">
                <h6 className="car-info-label">License Plate</h6>
              </div>
            </Col>
            <Col>
              <div className="car-info-box">
                <h6 className="car-info-label">Mileage</h6>
              </div>
            </Col>
          </Row>
          <h2 className="header-text">Car Type</h2>
          <select
            className="car-detail-dropdown"
            id="car-types"
            name="car-types"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
            <option value="audi">Audi</option>
          </select>
          <h2 className="header-text">Status</h2>
          <select className="car-detail-dropdown" id="status" name="status">
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
          <Button>Update</Button>
        </div>
      </section>
    </>
  );
};

export default AdminCarDetails;
