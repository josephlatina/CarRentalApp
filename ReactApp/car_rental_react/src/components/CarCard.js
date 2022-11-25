import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../css/style.css';

const CarCard = (props) => {
    const {
        manufacturer,
        model,
        fueltype,
        cartypeitem,
        pickupdate,
        returndate,
        car,
        branchfrom,
        branchto
    } = props;
    const [ total, setTotal ] = useState(0);

    const navigate = useNavigate();

    const handleCalculation = () => {
        const returnDate = returndate;
        const pickupDate = pickupdate;
        let estimatedCost = 0;

        if (returnDate >= pickupDate) {
            const diff = returnDate - pickupDate;
            const diffDays = diff/(1000 * 60 * 60 * 24);

            if (diffDays < 7) {
                estimatedCost = diffDays * cartypeitem[0]?.daily_cost;
            }
            if (30 > diffDays >= 7) {
                const weeks = diffDays / 7;
                const leftDays = diffDays - (weeks * 7);
                estimatedCost = (weeks * cartypeitem[0]?.weekly_cost) + (leftDays * cartypeitem[0]?.daily_cost);
            }
            if (diffDays >= 30) {
                const months = diffDays / 30;
                let leftDays = diffDays - (months * 30);
                let weeks = 0;
                if (leftDays > 7) {
                    weeks = leftDays / 7;
                    leftDays = leftDays - (weeks * 7);
                }
                estimatedCost = (months * cartypeitem[0]?.monthly_cost) + (weeks * cartypeitem[0]?.weekly_cost) + (leftDays * cartypeitem[0]?.daily_cost);
            }
        }

        setTotal(estimatedCost);
        
    }

    const handleSubmit = () => {
        navigate('/rent', {state: {
            carid: car, 
            datefrom: pickupdate,
            dateto: returndate,
            branchcamefrom: branchfrom,
            branchgoesto: branchto,
            requestedcartype: cartypeitem[0]?.car_type_id
        }});

    }

    useEffect(() => {
        handleCalculation();
    }, [cartypeitem]);

    return (
        <div className="row box" id="car-box">
            {/* Car Image */}
            <div className="col-sm-12 col-lg-4 car-info">
                <p>Image here</p>
            </div>
            {/* Car Info */}
            <div className="col-sm-12 col-lg-4 car-info">
                <h3>{manufacturer} {model}</h3>
                <p>{cartypeitem[0]?.description}</p>
                <p>{fueltype}</p>
            </div>
            {/* Car Price */}
            <div className="col-sm-12 col-lg-4 car-info">
                <div className="car-price">
                    <p>CAD</p>
                    <h3>{total.toFixed(2)}</h3>
                    <p>Total</p>
                </div>
                {/* Button */}
                <Button className="col-10 car-btn" size="lg" onClick={handleSubmit}>Select</Button>
            </div>
        </div>

    )
}

export default CarCard;