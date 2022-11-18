import React, { useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import ReserveSummary from "../components/ReserveSummary";
import CarCard from "../components/CarCard";
import axios from "axios";
import '../css/style.css'

const CarSelection = () => {
    const location = useLocation();
    cons [ cars, setCars ] = useState();
    const manufacturers = ["Nissan", "Toyota", "Honda", "Lexus", "Dodge"]
    const fueltype = ["Gasoline", "Electric", "Hybrid"]
    const cartype = ["Economy", "Compact", "SUV", "Van"]

    useEffect(() => {

    }, [])

    return (
        <body class="root-style font-link">
            {/* Section 1: Jumbotron */}
            <section class="container-fluid jumbotron"></section>
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
                    <div class="col-3 bottom-line" id="selected" style={{"border-bottom": "10px solid #0FB877"}}>
                        <h5>3. Select Car</h5>
                    </div>
                    <div class="col-3 bottom-line">
                        <h5>4. Reserve</h5>
                    </div>
                </div>
            </section>
            {/* Section 3: Reserve Summary */}
            <section class="container">
                <ReserveSummary 
                    pickuplocation="Edmonton, AB"
                    returnlocation="Calgary, AB"
                    pickupdate="Aug 18, 2022 8:00am"
                    returndate="Aug 23, 2022 5:00pm"
                />
            </section>
            {/* Section 4: Filter and Car Cards */}
            <section id="car-selection">
                {/* Filter */}
                <div id="filter-box">
                    <div>
                        <h4>Filter By</h4>
                        <h5 id="selected">Manufacturer</h5>
                        {manufacturers.map((item, index) => {
                            return (
                                <p key={index}>{item}</p>
                            )
                        })}
                        <h5 id="selected">Fuel Type</h5>
                        {fueltype.map((item, index) => {
                            return (
                                <p key={index}>{item}</p>
                            )
                        })}
                        <h5 id="selected">Car Type</h5>
                        {cartype.map((item, index) => {
                            return (
                                <p key={index}>{item}</p>
                            )
                        })}
                    </div>
                </div>
                {/* Car Cards #393939*/}
                <div class="box" style={{"background-color": "#393939"}}>
                    <CarCard />
                </div>
            </section>
            </body>
    );
};

export default CarSelection;