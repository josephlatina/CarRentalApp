import { Button } from "reactstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAuth } from "../provider/authContext";

const CarReserve = () => {
  //const { isSignedIn, user, logOut } = useAuth();
  //console.log(isSignedIn, user);

  // get info from car selection
  const location = useLocation();
  console.log(location.state);

  //get car information
  var car_model;
  var car_type;
  var car_id;
  axios
    .get("/api/cars/" + location.state.carid + "/")
    .then((res) => {
      // get model of car
      car_model = res.data.manufacturer + " " + res.data.model;
      let element = document.getElementById("cartype");
      element.innerHTML = "Car Type: " + car_model;

      // get car type and car id
      car_type = res.data.car_type;
      car_id = res.data.car_id;

      // update estimated price
      let price_element = document.getElementById("price");
      price_element.innerHTML =
        "Estimated Price: " + location.state.estimatedcost + "$";
    })
    .catch((err) => console.log(err));

  //get return branch information
  var branch_to;
  axios
    .get("/api/branches/" + location.state.branchgoesto + "/")
    .then((res) => {
      // set return branch name and update summary
      branch_to = res.data.street_number + " " + res.data.street_name;
      let element = document.getElementById("rbranch");
      element.innerHTML = "Return Branch: " + branch_to;
    })
    .catch((err) => console.log(err));

  //get pickup branch information
  var branch_from;
  axios
    .get("/api/branches/" + location.state.branchcamefrom + "/")
    .then((res) => {
      // set pickup branch name and update summary
      branch_from = res.data.street_number + " " + res.data.street_name;
      let element = document.getElementById("pbranch");
      element.innerHTML = "Pick-Up Branch: " + branch_from;
    })
    .catch((err) => console.log(err));

  function submitRental() {
    //get car rental details
    const rental_details = {
      date_from: location.state.datefrom.toISOString().split("T")[0],
      date_to: location.state.dateto.toISOString().split("T")[0],
      date_returned: null,
      total_cost: null,
      car: car_id,
      customer: 1,
      branch_came_from: parseInt(location.state.branchcamefrom),
      branch_goes_to: parseInt(location.state.branchgoesto),
      employee_given_by: null,
      requested_car_type: car_type,
    };

    axios
      .post("http://127.0.0.1:8000/api/rentals/", rental_details)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));

    alert("Done!");
  }

  return (
    <>
      <section className="container">
        {/* Progress Bar */}
        <div className="row" id="progress-bar">
          <div className="col-sm-12 col-lg-4 bottom-line">
            <h5>1. Rental Details</h5>
          </div>
          <div className="col-sm-12 col-lg-4 bottom-line">
            <h5>2. Select Car</h5>
          </div>
          <div className="col-sm-12 col-lg-4 bottom-line" id="selected">
            <h5>3. Reserve</h5>
          </div>
        </div>
      </section>

      <section class="rental-container">
        <div className="rental-details">
          <h3 className="header-text">Rental Details</h3>
          <h5 className="sub-text" id="pbranch"></h5>
          <h5 className="sub-text" id="rbranch"></h5>
          <h5 className="sub-text">
            Pickup Date: {location.state.datefrom.toISOString().split("T")[0]}
          </h5>
          <h5 className="sub-text">
            Return Date: {location.state.dateto.toISOString().split("T")[0]}
          </h5>
          <h5 className="sub-text" id="cartype"></h5>
          <h5 className="sub-text" id="price"></h5>
          <Button
            className="wide-car-btn"
            id="reserve-button"
            onClick={submitRental}
          >
            Reserve
          </Button>
        </div>
      </section>
    </>
  );
};

export default CarReserve;
