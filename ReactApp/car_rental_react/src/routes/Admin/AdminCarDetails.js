import { Button, Col, Container, Row } from "reactstrap";
import axios from "axios";
import { useLocation } from "react-router-dom"; // used later
import { useState, useEffect } from "react";

const AdminCarDetails = () => {
  const [manufacturer, setManufacturer] = useState("text");
  const [model, setModel] = useState("text");
  const [fuel, setFuel] = useState("text");
  const [colour, setColour] = useState("text");
  const [plate, setPlate] = useState("text");
  const [mileage, setMileage] = useState("text");
  const [options, setOptions] = useState([]);
  const [status, setStatus] = useState([]);
  const [availability, setAvailability] = useState("text");
  const [type, setType] = useState(0);
  const [branch, setBranch] = useState(0);

  const location = useLocation();

  // auth check

  // ensure page not loaded with null location.state

  // get car details CAR ID CURRENTLY HARDCODED UNTIL CONNECTED TO OTHER PAGE
  useEffect(() => {
    //variables needed for logic
    //variables needed for logic
    let current_type;
    let current_description;
    let current_status;
    //set states and get current type and status
    const getCar = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/cars/${location.state?.carid}`
      );
      setManufacturer(res.data.manufacturer);
      setModel(res.data.model);
      setFuel(res.data.fuel_type);
      setColour(res.data.colour);
      setPlate(res.data.license_plate);
      setMileage(res.data.mileage);
      setType(res.data.car_type);
      setAvailability(res.data.status);
      current_type = res.data.car_type;
      current_status = res.data.status;

      const res_type = await axios.get("http://127.0.0.1:8000/api/cartypes/");
      const results = [];
      // Store results in the results array
      res_type.data.forEach((value) => {
        if (value.car_type_id === current_type) {
          current_description = value.description;
        }
        results.push({
          key: value.description,
          value: value.car_type_id,
        });
      });

      if (current_status === "Available") {
        setStatus([
          { key: current_status, value: current_status },
          { key: "Not Available", value: "Not Available" },
        ]);
      } else {
        setStatus([
          { key: current_status, value: current_status },
          { key: "Available", value: "Available" },
        ]);
      }
      // Update the options state
      setOptions([
        { key: current_description, value: current_type },
        ...results,
      ]);
    };

    {
      location.state?.carid && getCar();
    }

    setBranch(location.state?.branchid);
  }, []);

  // Used to update details of a car
  function updateDetails() {
    // create car details TYPE, BRANCH, STATUS HARDCODED.
    const car_details = {
      car_type: type,
      branch: location.state?.branchid,
      manufacturer: manufacturer,
      model: model,
      fuel_type: fuel,
      colour: colour,
      license_plate: plate,
      status: availability,
      mileage: mileage,
    };

    // update details
    axios
      .put(
        `http://127.0.0.1:8000/api/cars/${location.state?.carid}/`,
        car_details
      )
      .then((response) => console.log(response))
      .catch((err) => console.log(err.response.data));

    alert("Car Details Modified");
  }

  const handleAdd = async () => {
    const car_details = {
      car_type: type,
      branch: location.state?.branchid,
      manufacturer: manufacturer,
      model: model,
      fuel_type: fuel,
      colour: colour,
      license_plate: plate,
      status: availability,
      mileage: mileage,
    };

    try {
      await axios.post("http://127.0.0.1:8000/api/cars/", car_details);
    } catch (error) {
      throw new Error(error);
    }

    alert("Car Added");
  };

  return (
    <>
      <section class="rental-container">
        <h1 className="header-text">Branch ID No. {branch}</h1>
        <div className="car-details" id="details-box">
          <h2 className="header-text">Car Details</h2>
          <Row className="car-info-row">
            <Col>
              <h6 className="car-info-label">Manufacturer</h6>
              <input
                id="detail-box"
                className="car-info-box"
                value={manufacturer}
                onChange={(event) => setManufacturer(event.target.value)}
              ></input>
            </Col>
            <Col>
              <h6 className="car-info-label">Model</h6>
              <input
                id="detail-box"
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
                id="detail-box"
                className="car-info-box"
                value={fuel}
                onChange={(event) => setFuel(event.target.value)}
              ></input>
            </Col>
            <Col>
              <h6 className="car-info-label">Colour</h6>
              <input
                id="detail-box"
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
                id="detail-box"
                className="car-info-box"
                value={plate}
                onChange={(event) => setPlate(event.target.value)}
              ></input>
            </Col>
            <Col>
              <h6 className="car-info-label">Mileage</h6>
              <input
                id="detail-box"
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
            onChange={(e) => setType(e.target.value)}
          >
            {options.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.key}
                </option>
              );
            })}
          </select>
          <h2 className="header-text">Status</h2>
          <select
            className="car-detail-dropdown"
            id="status"
            name="status"
            onChange={(e) => setAvailability(e.target.value)}
          >
            {status.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.key}
                </option>
              );
            })}
          </select>
          {location.state?.addflag === 0 ? (
            <Button onClick={updateDetails} id="update-button">
              Update
            </Button>
          ) : (
            <Button id="update-button" onClick={handleAdd}>
              Add
            </Button>
          )}
        </div>
      </section>
    </>
  );
};

export default AdminCarDetails;
