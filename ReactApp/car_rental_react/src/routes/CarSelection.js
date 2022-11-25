import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReserveSummary from "../components/ReserveSummary";
import CarCard from "../components/CarCard";
import axios from "axios";
import "../css/style.css";
import CarFilter from "../components/CarFilter";

const CarSelection = () => {
  const location = useLocation();
  const pickuplocation = "1";
  const returnlocation = "1";
  const pickupdate = new Date("2022-10-27");
  const returndate = new Date("2022-10-30");
  const [cars, setCars] = useState([]);
  const [filteredcars, setFilteredCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [fueltype, setFuelType] = useState([]);
  const [cartype, setCarType] = useState([]);
  const [filters, setFilters] = useState({
    cards: [],
    filteredmanufacturers: new Set(),
    filteredfueltype: new Set(),
    filteredcartype: new Set(),
  });
  const [filterby, setFilterby] = useState(false);

  // handle retrieval of cars from query here
  const queryCars = async () => {
    // parameters here

    // retrieve cars and filter by branch selected
    try {
      axios
        .get("api/cars/")
        .then((res) => {
          setCars(
            res.data.filter((car) => {
              return car.branch === parseInt(pickuplocation);
            })
          );
        })
        .catch((err) => console.log(err));
    } catch (error) {
      throw new Error(error);
    }
  };

  // handle retrieval of car types from query here
  const queryCarTypes = async () => {
    // handle query here
    try {
      axios
        .get("/api/cartypes/")
        .then((res) => setCarType(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      throw new Error(error);
    }
  };

  const queryRentals = async () => {
    try {
      axios
        .get("/api/rentals")
        .then((res) => setRentals(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      throw new Error(error);
    }
  };

  // handle fetching of data here
  useEffect(() => {
    (async () => {
      await queryRentals();
    })();
    (async () => {
      await queryCars();
    })();
    (async () => {
      await queryCarTypes();
    })();
  }, []);

  // handle the filtering of cars based on parameters chosen by user
  useEffect(() => {
    let rentedCars = new Set();

    // cars must not overlap with cars currently being rented within date range
    rentals
      .filter((rental) => {
        return (
          pickupdate.getTime() < new Date(rental.date_from).getTime() &&
          new Date(rental.date_from).getTime() < returndate.getTime()
        );
      })
      .map((filteredrental) => {
        return rentedCars.add(filteredrental.car);
      });
    rentals
      .filter((rental) => {
        return (
          pickupdate.getTime() < new Date(rental.date_to).getTime() &&
          new Date(rental.date_to).getTime() < returndate.getTime()
        );
      })
      .map((filteredrental) => {
        return rentedCars.add(filteredrental.car);
      });

    if (rentedCars.size == 0) {
      setFilteredCars(cars);
    } else {
      const finalcars = cars.filter((car) => {
        return !rentedCars.has(car.car_id);
      });
      setFilteredCars(finalcars);
    }
  }, [rentals, cars]);

  // set the list of manufacturers and fueltypes here for the filter box
  useEffect(() => {
    let car_manufacturers = [];
    let car_fueltype = [];

    if (filteredcars) {
      for (let car of filteredcars) {
        car_manufacturers.push(car.manufacturer);
        car_fueltype.push(car.fuel_type);
      }
      setManufacturers(Array.from(new Set(car_manufacturers)));
      setFuelType(Array.from(new Set(car_fueltype)));
      setFilters({ ...filters, cards: filteredcars });
    }
  }, [filteredcars, cartype, rentals]);

  // handles the manufacturer filters in filter box
  const handleManufacturerFilterChange = useCallback(
    (event) => {
      setFilters((prevFilter) => {
        let filteredmanufacturers = new Set(prevFilter.filteredmanufacturers);
        let filteredfueltype = new Set(prevFilter.filteredfueltype);
        let filteredcartype = new Set(prevFilter.filteredcartype);
        let cards = filteredcars;

        if (event.target.checked) {
          filteredmanufacturers.add(event.target.value);
        } else {
          filteredmanufacturers.delete(event.target.value);
        }

        if (filteredmanufacturers.size > 0) {
          cards = cards.filter((card) => {
            return filteredmanufacturers.has(card.manufacturer);
          });
        }
        if (filteredfueltype.size) {
          cards = cards.filter((card) => {
            return filteredfueltype.has(card.fuel_type);
          });
        }
        if (filteredcartype.size) {
          cards = cards.filter((card) => {
            return filteredcartype.has(card.car_type.toString());
          });
        }

        return {
          filteredmanufacturers,
          filteredfueltype,
          filteredcartype,
          cards,
        };
      });
    },
    [setFilters, filteredcars]
  );

  // handles the fuel type filters in the filter box
  const handleFuelTypeFilterChange = useCallback(
    (event) => {
      setFilters((prevFilter) => {
        let filteredmanufacturers = new Set(prevFilter.filteredmanufacturers);
        let filteredfueltype = new Set(prevFilter.filteredfueltype);
        let filteredcartype = new Set(prevFilter.filteredcartype);
        let cards = filteredcars;

        if (event.target.checked) {
          filteredfueltype.add(event.target.value);
        } else {
          filteredfueltype.delete(event.target.value);
        }

        if (filteredmanufacturers.size) {
          cards = cards.filter((card) => {
            return filteredmanufacturers.has(card.manufacturer);
          });
        }
        if (filteredfueltype.size) {
          cards = cards.filter((card) => {
            return filteredfueltype.has(card.fuel_type);
          });
        }
        if (filteredcartype.size) {
          cards = cards.filter((card) => {
            return filteredcartype.has(card.car_type.toString());
          });
        }

        return {
          filteredmanufacturers,
          filteredfueltype,
          filteredcartype,
          cards,
        };
      });
    },
    [setFilters, filteredcars]
  );

  // handles the car type filters in filter box
  const handleCarTypeFilterChange = useCallback(
    (event) => {
      setFilters((prevFilter) => {
        let filteredmanufacturers = new Set(prevFilter.filteredmanufacturers);
        let filteredfueltype = new Set(prevFilter.filteredfueltype);
        let filteredcartype = new Set(prevFilter.filteredcartype);
        let cards = filteredcars;

        if (event.target.checked) {
          filteredcartype.add(event.target.value);
        } else {
          filteredcartype.delete(event.target.value);
        }

        if (filteredmanufacturers.size) {
          cards = cards.filter((card) => {
            return filteredmanufacturers.has(card.manufacturer);
          });
        }
        if (filteredfueltype.size) {
          cards = cards.filter((card) => {
            return filteredfueltype.has(card.fuel_type);
          });
        }
        if (filteredcartype.size) {
          cards = cards.filter((card) => {
            return filteredcartype.has(card.car_type.toString());
          });
        }

        return {
          filteredmanufacturers,
          filteredfueltype,
          filteredcartype,
          cards,
        };
      });
    },
    [setFilters, filteredcars]
  );

  // toggle function for the modal component
  const toggle = () => {
    setFilterby(!filterby);
  };

  // clears past filters when entering the modal
  const clearFilter = () => {
    toggle();
    setFilters(
      {
        ...filters,
        filteredmanufacturers: new Set(),
        filteredfueltype: new Set(),
        filteredcartype: new Set(),
        cards: filteredcars,
      },
      [setFilters, filteredcars]
    );
  };

  return (
    <>
      {/* Section 2: Progress */}
      <section className="container">
        {/* Progress Bar */}
        <div className="row" id="progress-bar">
          <div className="col-sm-12 col-lg-4 bottom-line">
            <h5>1. Rental Details</h5>
          </div>
          <div className="col-sm-12 col-lg-4 bottom-line" id="selected">
            <h5>2. Select Car</h5>
          </div>
          <div className="col-sm-12 col-lg-4 bottom-line">
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
      <div id="filter-button">
        <Button className="col-10 car-btn" size="lg" onClick={clearFilter}>
          Filter By
        </Button>
      </div>
      {filterby && (
        <Modal isOpen={filterby} toggle={toggle} contentClassName="modal">
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            <CarFilter
              manufacturerfilter={manufacturers}
              fueltypefilter={fueltype}
              cartypefilter={cartype}
              manufacturerfilterchange={handleManufacturerFilterChange}
              fueltypefilterchange={handleFuelTypeFilterChange}
              cartypefilterchange={handleCarTypeFilterChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button className="col-10 car-btn" size="lg" onClick={toggle}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      )}
      <section id="car-selection">
        {/* Filter */}
        <div id="filter-box">
          <CarFilter
            manufacturerfilter={manufacturers}
            fueltypefilter={fueltype}
            cartypefilter={cartype}
            manufacturerfilterchange={handleManufacturerFilterChange}
            fueltypefilterchange={handleFuelTypeFilterChange}
            cartypefilterchange={handleCarTypeFilterChange}
          />
        </div>
        {/* Car Cards */}
        <div>
          {filters?.cards.map((item, index) => {
            return (
              <div className="box">
                <CarCard
                  key={index}
                  manufacturer={item.manufacturer}
                  model={item.model}
                  fueltype={item.fuel_type}
                  cartypeitem={cartype?.filter((cartype) => {
                    return cartype?.car_type_id === item.car_type;
                  })}
                  pickupdate={pickupdate}
                  returndate={returndate}
                  car={item.car_id}
                  branchfrom={pickuplocation}
                  branchto={returnlocation}
                />
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CarSelection;
