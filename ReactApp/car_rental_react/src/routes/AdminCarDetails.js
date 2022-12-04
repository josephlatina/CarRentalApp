import { Button, Col, Container, Row } from "reactstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../provider/authContext";
import { useState, useEffect } from "react";

const AdminCarDetails = () => {
  const [manufacturer, setManufacturer] = useState("text");
  const [model, setModel] = useState("text");
  const [fuel, setFuel] = useState("text");
  const [colour, setColour] = useState("text");
  const [plate, setPlate] = useState("text");
  const [mileage, setMileage] = useState("text");

  // auth check

  // ensure page not loaded with null location.state

  // get car details CURRENTLY HARDCODED UNTIL CONNECTED TO OTHER PAGE
  useEffect(() => {
    const getCar = async () => {
      const res = await axios.get("/api/cars/14");
      setManufacturer(res.data.manufacturer);
      setModel(res.data.model);
      setFuel(res.data.fuel_type);
      setColour(res.data.colour);
      setPlate(res.data.license_plate);
      setMileage(res.data.mileage);
    };

    getCar();
  }, []);

  // Used to update details of a car
  function updateDetails() {
    // create car details TYPE, BRANCH, STATUS HARDCODED.
    const car_details = {
      car_id: 14,
      car_type: 3,
      branch: 6,
      manufacturer: manufacturer,
      model: model,
      fuel_type: fuel,
      colour: colour,
      license_plate: plate,
      status: "Available",
      mileage: mileage,
    };

    alert(colour);

    // update details
    axios
      .put("/api/cars/14/", car_details)
      .then((response) => console.log(response))
      .catch((err) => console.log(err.response.data));

    alert("Car Details Modified");
  }

  return (
    <>
      <section class="rental-container">
        <h1 className="header-text">BRANCH NAME HERE</h1>
        <div className="car-details">
          <h2 className="header-text">Car Details</h2>
          <Row className="car-info-row">
            <Col>
              <h6 className="car-info-label">Manufacturer</h6>
              <input
                className="car-info-box"
                value={manufacturer}
                onChange={(event) => setManufacturer(event.target.value)}
              ></input>
            </Col>
            <Col>
              <h6 className="car-info-label">Model</h6>
              <input
                className="car-info-box"
                value={model}
                onChange={(event) => setModel(event.target.value)}
              ></input>
            </Col>
          </Row>
          <Row className="car-info-row">
            <Col>
              <h6 className="car-info-label">Fuel Type</h6>
              <input
                className="car-info-box"
                value={fuel}
                onChange={(event) => setFuel(event.target.value)}
              ></input>
            </Col>
            <Col>
              <h6 className="car-info-label">Colour</h6>
              <input
                className="car-info-box"
                value={colour}
                onChange={(event) => setColour(event.target.value)}
              ></input>
            </Col>
          </Row>
          <Row className="car-info-row">
            <Col>
              <h6 className="car-info-label">License Plate</h6>
              <input
                className="car-info-box"
                value={plate}
                onChange={(event) => setPlate(event.target.value)}
              ></input>
            </Col>
            <Col>
              <h6 className="car-info-label">Mileage</h6>
              <input
                className="car-info-box"
                value={mileage}
                onChange={(event) => setMileage(event.target.value)}
              ></input>
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
          <Button onClick={updateDetails}>Update</Button>
        </div>
      </section>
    </>
  );
};

export default AdminCarDetails;
