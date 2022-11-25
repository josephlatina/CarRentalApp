import { Button } from "reactstrap";
import axios from "axios";

const CarReserve = () => {
  function signIn() {
    alert("Feature not yet implemented!");
  }

  function submitRental() {
    // first create a customer from the details inputted
    const customer_fields = document.getElementsByClassName("rental-input");
    var customer_input = [];
    for (let index = 0; index < customer_fields.length; index++) {
      customer_input.push(customer_fields[index].value);
    }

    const customer_details = {
      first_name: customer_input[0],
      last_name: customer_input[1],
      drivers_license: customer_input[10],
      email: customer_input[2],
      DOB: customer_input[4],
      gold_member: false,
      province: customer_input[7],
      city: customer_input[9],
      postal_code: customer_input[8],
      street_number: customer_input[5],
      street_name: "ST",
      unit_number: customer_input[6],
    };
    axios
      .post("http://127.0.0.1:8000/api/customers/", customer_details)
      .then((response) => {
        console.log("Response", response.data.id);
        // get actual rental details here
        const rental_details = {
          date_from: "2022-11-01",
          date_to: "2022-11-01",
          date_returned: "2022-11-02",
          total_cost: "30",
          car: 1,
          customer: response.data.id,
          branch_came_from: 1,
          branch_goes_to: 1,
          employee_given_by: 1,
          equested_car_type: 1,
        };
        axios
          .post("http://127.0.0.1:8000/api/rentals/", rental_details)
          .then((response) => console.log(response));
      });
  }

  return (
    <>
      {/* Section 2: Progress */}
      <section class="container">
        {/* Progress Bar */}
        <div class="row" id="progress-bar">
          <div class="col-3 bottom-line">
            <h5>1. Rental Details</h5>
          </div>
          <div class="col-3 bottom-line">
            <h5>2. Select Branch</h5>
          </div>
          <div class="col-3 bottom-line">
            <h5>3. Select Car</h5>
          </div>
          <div
            class="col-3 bottom-line"
            id="selected"
            style={{ "border-bottom": "10px solid #0FB877" }}
          >
            <h5>4. Reserve</h5>
          </div>
        </div>
      </section>
      <section class="rental-container">
        <div className="rental-details">
          <h3 className="header-text">Rental Details</h3>
          <h2>Filler Info</h2>
        </div>
        <div className="member-box">
          <h3 className="header-text">Member?</h3>
          <h5 className="sub-text">
            Sign in to skip the contact form and go straight to reserve.
          </h5>
          <h5 className="sub-text">
            Gold member? You could be eligible for discounted pricing.
          </h5>
          <Button className="wide-car-btn" onClick={signIn}>
            Sign In
          </Button>
        </div>
        <div className="personal-details">
          <h3 className="header-text">Personal Details</h3>
          <input
            className="rental-input"
            placeholder="First Name"
            id="fname"
          ></input>
          <input
            className="rental-input"
            placeholder="Last Name"
            id="lname"
          ></input>
          <input
            className="rental-input"
            placeholder="Email Address"
            id="email"
          ></input>
          <input
            className="rental-input"
            placeholder="Phone Number"
            id="phoneno"
          ></input>
          <input
            className="rental-input"
            placeholder="Date of Birth"
            id="bday"
            type="date"
          ></input>
          <h3 className="header-text">Address</h3>
          <input
            className="rental-input"
            placeholder="Street Address"
            id="address"
          ></input>
          <input
            className="rental-input"
            placeholder="Unit Number"
            id="unitno"
          ></input>
          <input
            className="rental-input"
            placeholder="Province"
            id="province"
          ></input>
          <input
            className="rental-input"
            placeholder="Postal Code"
            id="postalcode"
          ></input>
          <input className="rental-input" placeholder="City" id="city"></input>
          <h3 className="header-text">Drivers License</h3>
          <input
            className="rental-input"
            placeholder="Drivers License Number"
            id="driversno"
          ></input>
          <Button className="wide-car-btn" onClick={submitRental}>
            Reserve
          </Button>
        </div>
      </section>
    </>
  );
};

export default CarReserve;