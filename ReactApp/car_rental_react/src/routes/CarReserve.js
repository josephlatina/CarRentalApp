import { Button } from "reactstrap";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authContext";
import { useState } from "react";

const CarReserve = () => {
    const { isSignedIn, customer } = useAuth();
    const location = useLocation();
    const [pickupBranch, setPickupBranch] = useState("text");
    const [returnBranch, setReturnBranch] = useState("text");
    const [carType, setCarType] = useState("text");
    const [estPrice, setEstPrice] = useState("text");
    const [greeting, setGreeting] = useState("text");
    const navigate = useNavigate();

    // error handling: display if user is not signed in
    if (!isSignedIn) {
        return (
            <section className="rental-container">
                <h1 className="header-text">
                    Error, please sign in to continue
                </h1>
            </section>
        );
    }

    // error handling: display if no info passed from car selection
    if (location.state == null) {
        return (
            <section className="rental-container">
                <h1 className="header-text">Error, no car selection made</h1>
            </section>
        );
    }

    //get car information
    let car_model;
    let car_type;
    let car_id;
    axios
        .get("http://127.0.0.1:8000/api/cars/" + location.state.carid + "/")
        .then((res) => {
            // get model of car and update text
            car_model = res.data.manufacturer + " " + res.data.model;
            setCarType("Car Type: " + car_model);

            // get car type and car id
            car_type = res.data.car_type;
            car_id = res.data.car_id;

            // update estimated price and greeting
            setGreeting(
                customer.first_name +
                    " " +
                    customer.last_name +
                    "'s Rental Details"
            );
            setEstPrice(
                "Estimated Price: " +
                    location.state.estimatedcost.toFixed(2) +
                    "$"
            );
        })
        .catch((err) => console.log(err));

    //get return branch information
    let branch_to;
    axios
        .get(
            "http://127.0.0.1:8000/api/branches/" +
                location.state.branchgoesto +
                "/"
        )
        .then((res) => {
            // set return branch name and update summary
            branch_to = res.data.street_number + " " + res.data.street_name;
            setReturnBranch("Return Branch: " + branch_to);
        })
        .catch((err) => console.log(err));

    //get pickup branch information
    let branch_from;
    axios
        .get(
            "http://127.0.0.1:8000/api/branches/" +
                location.state.branchcamefrom +
                "/"
        )
        .then((res) => {
            // set pickup branch name and update summary
            branch_from = res.data.street_number + " " + res.data.street_name;
            setPickupBranch("Pickup Branch: " + branch_from);
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
            customer: customer.id,
            branch_came_from: parseInt(location.state.branchcamefrom),
            branch_goes_to: parseInt(location.state.branchgoesto),
            employee_given_by: null,
            requested_car_type: car_type,
        };

        axios
            .post("http://127.0.0.1:8000/api/rentals/", rental_details)
            .then((response) => console.log(response))
            .catch((err) => console.log(err));

        alert("Rental Created!");
        navigate("/");
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
                    <div
                        className="col-sm-12 col-lg-4 bottom-line"
                        id="selected"
                    >
                        <h5>3. Reserve</h5>
                    </div>
                </div>
            </section>

            <section class="rental-container">
                <div className="rental-details">
                    <h3 className="header-text" id="greeting">
                        {greeting}
                    </h3>
                    <h5 className="sub-text" id="pbranch">
                        {pickupBranch}
                    </h5>
                    <h5 className="sub-text" id="rbranch">
                        {returnBranch}
                    </h5>
                    <h5 className="sub-text">
                        Pickup Date:{" "}
                        {location.state.datefrom.toISOString().split("T")[0]}
                    </h5>
                    <h5 className="sub-text">
                        Return Date:{" "}
                        {location.state.dateto.toISOString().split("T")[0]}
                    </h5>
                    <h5 className="sub-text" id="cartype">
                        {carType}
                    </h5>
                    <h5 className="sub-text" id="price">
                        {estPrice}
                    </h5>
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
