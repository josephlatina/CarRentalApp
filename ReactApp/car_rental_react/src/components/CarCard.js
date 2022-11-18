import React from "react";
import { Button } from "reactstrap";
import '../css/style.css';

const CarCard = (props) => {

    return (
        <div class="row box" id="car-box">
            {/* Car Image */}
            <div class="col-4 car-info">
                <p>Image here</p>
            </div>
            {/* Car Info */}
            <div class="col-4 car-info">
                <h3>Compact</h3>
                <p>Nissan Versa or similar</p>
                <p>5</p>
                <p>2</p>
                <p>Automatic</p>
                <p>4 Door</p>
            </div>
            {/* Car Price */}
            <div class="col-4 car-info">
                <div class="car-price">
                    <p>CAD</p>
                    <h3>239.99</h3>
                    <p>Total</p>
                </div>
                {/* Button */}
                <Button className="col-10 car-btn" size="lg">Select</Button>
            </div>
        </div>

    )
}

export default CarCard;