import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import '../css/style.css';
import compactImg from "../assets/Compact.png";
import suvImg from "../assets/SUV.png";

const CarCard = (props) => {
    const {
        manufacturer,
        model,
        fueltype,
        cartypeitem,
        requestedcartype,
        pickupdate,
        returndate,
        car,
        branchfrom,
        branchto
    } = props;
    const [ total, setTotal ] = useState(0);

    const images = [
        {
            title: "SUV",
            imageUrl: suvImg
        },
        {
            title: "Compact",
            imageUrl: compactImg
        }
    ]

    const navigate = useNavigate();

    const handleCalculation = () => {
        const returnDate = returndate;
        const pickupDate = pickupdate;
        let estimatedCost = 0;

        if (returnDate >= pickupDate) {
            const diff = returnDate - pickupDate;
            const diffDays = diff/(1000 * 60 * 60 * 24) + 1;

            if (diffDays < 7) {
                estimatedCost = diffDays * cartypeitem[0]?.daily_cost;
            }
            if (diffDays >= 7 && diffDays < 30) {
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
            requestedcartype: (requestedcartype == 0) ? cartypeitem[0]?.car_type_id : requestedcartype,
            estimatedcost: total
        }});

    }

    useEffect(() => {
        handleCalculation();
    }, [cartypeitem]);

    return (
        <div className="row" id="car-box">
            {/* Car Image */}
            <div className="col-sm-12 col-lg-4 car-info">
                {/* <p>Image here</p> */}
                <img src={images.filter((img) => {return img.title === "SUV"})[0]?.imageUrl} width={350} height={300} alt="Image here"/>
                {/* <img src={images[0].imageUrl} width={350} height={300} alt="Image here"/> */}
            </div>
            {/* Car Info */}
            <div className="col-sm-12 col-lg-4 car-info">
                <h3>{manufacturer} {model}</h3>
                <h5>Car Type: {cartypeitem[0]?.description}</h5>
                <h5>Fuel Type: {fueltype}</h5>
                <p>Daily Cost: ${cartypeitem[0]?.daily_cost} </p>
                <p>Weekly Cost: ${cartypeitem[0]?.weekly_cost}</p>
                <p>Monthly Cost: ${cartypeitem[0]?.monthly_cost}</p>
            </div>
            {/* Car Price */}
            <div className="col-sm-12 col-lg-4 car-info">
                <div className="car-price">
                    <p>CAD</p>
                    <h4>{total.toFixed(2)}</h4>
                    <p>Total</p>
                </div>
                {/* Button */}
                <Button className="col-10 car-btn" size="lg" onClick={handleSubmit}>Select</Button>
            </div>
        </div>

    )
}

export default CarCard;