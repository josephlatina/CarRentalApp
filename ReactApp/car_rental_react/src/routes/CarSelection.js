import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReserveSummary from "../components/ReserveSummary";
import CarCard from "../components/CarCard";
import axios from "axios";
import "../css/style.css";
import { CardSubtitle, DropdownToggle } from "reactstrap";

const CarSelection = () => {
    const location = useLocation();
    const pickupdate = "2022-10-25";
    const returndate= "2022-10-28";
    const [cars, setCars] = useState([{
        car_id: 6,
        car_type: 3,
        manufacturer: "Dodge",
        model: "Caravan",
        fuel_type: "Gasoline"
    }]);
    const [ manufacturers, setManufacturers ] = useState([]);
    const [ fueltype, setFuelType ] = useState([]);
    const [ cartype, setCarType ] = useState([]);
    const [ filters, setFilters ] = useState({
        cards: [],
        manufacturers: new Set(),
        fueltype: new Set(),
        cartype: new Set(),
    })
    // const manufacturers = ["Nissan", "Toyota", "Honda", "Lexus", "Dodge"];
    // const fueltype = ["Gasoline", "Electric", "Hybrid"];
    // const cartype = ["Economy", "Compact", "SUV", "Van"];

    // handle retrieval of cars from query here
    const queryCars = async () => {
        // parameters here

        // handle query here
        try {
            axios
                .get("/api/cars")
                .then((res) => {
                    setFilters({...filters, cards: res.data});
                    setCars(res.data)})
                .catch((err) => console.log(err));
        } catch (error) {
            throw new Error(error);
        }

        let car_manufacturers = [];
        let car_fueltype = [];

        for (let car of cars) {
            car_manufacturers.push(car.manufacturer);
            car_fueltype.push(car.fuel_type);
        }
        setManufacturers(Array.from(new Set(car_manufacturers)));
        setFuelType(Array.from(new Set(car_fueltype)));
    };

    // handle retrieval of car types from query here
    const queryCarTypes = async () => {
        // handle query here
        try {
            axios
                .get("/api/cartypes")
                .then((res) => setCarType(res.data))
                .catch((err) => console.log(err));
        } catch (error) {
            throw new Error(error);
        }
    };

    const handleManufacturerFilterChange = useCallback(event => {
        setFilters(prevFilter => {
            let manufacturers = new Set(prevFilter.manufacturers)
            let fueltype = new Set(prevFilter.fueltype)
            let cartype = new Set(prevFilter.cartype)
            let cards = cars

            if (event.target.checked) {
                manufacturers.add(event.target.value)
            } else {
                manufacturers.delete(event.target.value)
            }

            if (manufacturers.size) {
                cards = cards.filter(card => {
                    return manufacturers.has(card.manufacturer)
                })
            }
            if (fueltype.size) {
                cards = cards.filter(card => {
                    return fueltype.has(card.fuel_type)
                })
            }
            if (cartype.size) {
                cards = cards.filter(card => {
                    return cartype.has(card.car_type.toString())
                })
            }

            return {
                manufacturers,
                fueltype,
                cartype,
                cards
            }
        })
    }, [setFilters])

    const handleFuelTypeFilterChange = useCallback(event => {
        setFilters(prevFilter => {
            let manufacturers = new Set(prevFilter.manufacturers)
            let fueltype = new Set(prevFilter.fueltype)
            let cartype = new Set(prevFilter.cartype)
            let cards = cars

            if (event.target.checked) {
                fueltype.add(event.target.value)
            } else {
                fueltype.delete(event.target.value)
            }

            if (fueltype.size) {
                cards = cards.filter(card => {
                    return fueltype.has(card.fuel_type)
                })
            }
            if (cartype.size) {
                cards = cards.filter(card => {
                    return cartype.has(card.car_type.toString())
                })
            }
            if (manufacturers.size) {
                cards = cards.filter(card => {
                    return manufacturers.has(card.manufacturer)
                })
            }

            return {
                manufacturers,
                fueltype,
                cartype,
                cards
            }
        })
    }, [setFilters])

    const handleCarTypeFilterChange = useCallback(event => {
        setFilters(prevFilter => {
            let manufacturers = new Set(prevFilter.manufacturers)
            let fueltype = new Set(prevFilter.fueltype)
            let cartype = new Set(prevFilter.cartype)
            let cards = cars

            if (event.target.checked) {
                cartype.add(event.target.value)
            } else {
                cartype.delete(event.target.value)
            }

            if (cartype.size) {
                cards = cards.filter(card => {
                    return cartype.has(card.car_type.toString())
                })
            }
            if (manufacturers.size) {
                cards = cards.filter(card => {
                    return manufacturers.has(card.manufacturer)
                })
            }
            if (fueltype.size) {
                cards = cards.filter(card => {
                    return fueltype.has(card.fuel_type)
                })
            }

            return {
                manufacturers,
                fueltype,
                cartype,
                cards
            }
        })
    }, [setFilters])

    useEffect(() => {
        // call on this method to retrieve cars
        // queryCars();
        // queryCarTypes();
        (async () => {
            await queryCars();
        })();
        (async () => {
            await queryCarTypes();
        })();
    }, []);

    return (
        <>
            {/* Section 2: Progress */}
            <section className="container">
                {/* Progress Bar */}
                <div className="row" id="progress-bar">
                    <div className="col-4 bottom-line">
                        <h5>1. Rental Details</h5>
                    </div>
                    <div
                        className="col-4 bottom-line"
                        id="selected"
                    >
                        <h5>2. Select Car</h5>
                    </div>
                    <div className="col-4 bottom-line">
                        <h5>3. Reserve</h5>
                    </div>
                </div>
            </section>
            {/* Section 3: Reserve Summary */}
            <section className="container">
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
                        <br/>
                        <h5 id="selected">Manufacturer</h5>
                        {manufacturers?.map((item, index) => {
                            return <div key={index}>
                                <label>
                                    <input key={index} type="checkbox" value={item} onChange={handleManufacturerFilterChange}></input>
                                    &nbsp;&nbsp;{item}
                                </label>
                            </div>;
                            // return <p key={index}>{item}</p>;
                        })}
                        <br/>
                        <h5 id="selected">Fuel Type</h5>
                        {fueltype?.map((item, index) => {
                            return <div key={index}>
                                <label>
                                    <input key={index} type="checkbox" value={item} onChange={handleFuelTypeFilterChange}></input>
                                    &nbsp;&nbsp;{item}
                                </label>
                            </div>;
                        })}
                        <br/>
                        <h5 id="selected">Car Type</h5>
                        {cartype?.map((item, index) => {
                            return <div key={index}>
                                <label>
                                    <input key={index} type="checkbox" value={item.car_type_id} onChange={handleCarTypeFilterChange}></input>
                                    &nbsp;&nbsp;{item.description}
                                </label>
                            </div>;
                            })}
                    </div>
                </div>
                {/* Car Cards #393939*/}
                <div>
                    {filters.cards.map((item, index) => {
                    return <div className="box">
                        <CarCard
                            key={index}
                            manufacturer={item.manufacturer}
                            model={item.model}
                            fueltype={item.fuel_type}
                            cartypeitem={cartype?.filter((cartype) => {
                                return cartype?.car_type_id == item.car_type;
                            })}
                            pickup={pickupdate}
                            return={returndate}
                        />
                    </div>;
                    })}
                </div>
            </section>
        </>
    );
};

export default CarSelection;
