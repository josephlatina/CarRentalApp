import { Button } from "reactstrap";

const CarReserve = () => {
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
          <Button className="wide-car-btn">Sign In</Button>
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
          <Button className="wide-car-btn">Reserve</Button>
        </div>
      </section>
    </>
  );
};

export default CarReserve;
