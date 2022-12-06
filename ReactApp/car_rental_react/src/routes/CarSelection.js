import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ReserveSummary from "../components/ReserveSummary";
import CarCard from "../components/CarCard";
import axios from "axios";
import "../css/style.css";
import CarFilter from "../components/CarFilter";
import { useAuth } from "../provider/authContext";

const CarSelection = () => {
  const location = useLocation();
  const pickuplocation = location.state?.pickUpLocation;
  const returnlocation = location.state?.dropOffLocation;
  const pickupdate = new Date(location.state?.pickUpDate);
  const returndate = new Date(location.state?.dropOffDate);
  const [cars, setCars] = useState([]);
  const [filteredcars, setFilteredCars] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [pickUpBranch, setPickUpBranch] = useState([]);
  const [returnBranch, setReturnBranch] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [fueltype, setFuelType] = useState([]);
  const [cartype, setCarType] = useState([]);
  const [filters, setFilters] = useState({
    cards: [],
    filteredmanufacturers: new Set(),
    filteredfueltype: new Set(),
    filteredcartype: new Set(),
  });
  const [textInput,setTextInput] = useState("");
  const [showList,setShowList] = useState(false);
  const [filterby, setFilterby] = useState(false);
  const [upgrades, setUpgrades] = useState(false);
  const { isSignedIn, user, customer } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [isGoldMember, setIsGoldMember] = useState(false);
  const [requestedCarType, setRequestedCarType] = useState(0);

  const navigate = useNavigate();

  // handle retrieval of cars from query here
  const queryCars = async () => {
    // retrieve cars and filter by branch selected
    try {
      axios
        // .get("api/cars/")
        .get("http://127.0.0.1:8000/api/cars/")
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
        // .get("/api/cartypes/")
        .get("http://127.0.0.1:8000/api/cartypes/")
        .then((res) => setCarType(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      throw new Error(error);
    }
  };

  const queryRentals = async () => {
    try {
      axios
        // .get("/api/rentals")
        .get("http://127.0.0.1:8000/api/rentals/")
        .then((res) => setRentals(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      throw new Error(error);
    }
  };

  const queryBranch = async () => {
    try {
      axios
        .get("http://127.0.0.1:8000/api/branches/")
        .then((res) => {
          setPickUpBranch(
            res.data.filter((branch) => {
              return branch.id === parseInt(pickuplocation);
            })
          );
          setReturnBranch(
            res.data.filter((branch) => {
              return branch.id === parseInt(returnlocation);
            })
          )
        })
        .catch((err) => console.log(err));
    } catch (error) {
      throw new Error(error);
    }
  }

  const queryCustomers = async() => {
    // if (user.id !== null) {
      try {
        axios
          .get("http://127.0.0.1:8000/api/customers/")
          .then((res) => {
            setCustomers(res.data)
          })
          .catch((err) => console.log(err));
      } catch (error) {
        throw new Error(error);
      }
    // }
  }


  // handle fetching of data here
  useEffect(() => {
    if (!isSignedIn) {
      alert("Error: Please sign in to continue");
      navigate('/login');
    }
  
    if (location.state == null) {
      alert("Error: No query passed for car selection");
      navigate('/home');
    }
    (async () => {
      await queryRentals();
    })();
    (async () => {
      await queryCars();
    })();
    (async () => {
      await queryCarTypes();
    })();
    (async () => {
      await queryBranch();
    })();
    (async () => {
      await queryCustomers();
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

  }, [rentals, cars, customers]);

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

      document.addEventListener("click",documentClickHandler);
      return () => {
        document.removeEventListener("click",documentClickHandler);
      }
    }
  }, [filteredcars, cartype, rentals]);

  const documentClickHandler = (event) => {
    setShowList(false);
  }

  const inputClick = (event) => {
    setShowList(true);
    event.preventDefault();
    event.stopPropagation();
  }

  const itemClickHandler = (type,event) => {
    const result = `${type.description}`;
    setTextInput(result);
    setRequestedCarType(type.car_type_id);
    setShowList(false);
    let carfiltered = filteredcars.filter((car) => {
      return car.car_type === type.car_type_id;
    })
    setFilters({ ...filters, cards: carfiltered });
    if (isSignedIn && customer.gold_member) {
      setUpgrades(true);
    }
  }

  const clearSearch = () => {
    setTextInput("");
    setFilters({ ...filters, cards: filteredcars });
  }

  // handles the manufacturer filters in filter box
  const handleManufacturerFilterChange = useCallback(
    (event) => {
      setFilters((prevFilter) => {
        let filteredmanufacturers = new Set(prevFilter.filteredmanufacturers);
        let filteredfueltype = new Set(prevFilter.filteredfueltype);
        let filteredcartype = new Set(prevFilter.filteredcartype);
        let cards = filteredcars;

        if (event.target.checked)  {
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

  const toggleUpgrades = () => {
    setUpgrades(!upgrades);
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
      {/* Section 1: Progress */}
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
      {/* Section 2: Reserve Summary */}
      <section className="container">
        <ReserveSummary
          pickuplocation={pickUpBranch}
          returnlocation={returnBranch}
          pickupdate={pickupdate}
          returndate={returndate}
        />
      </section>
      {/* Section 3: Car Type Selection */}
      <section className="container">
        <div className="row" id="request-type">
          <div className="col-12 field-no-border">
              <h5 id="selected">Requested Car Type</h5>
              <input 
                placeholder="Enter Car Type"
                name="entercartype"
                type="text"
                value={textInput}
                onClick={inputClick}
                required
              />
              {cartype && cartype.length && showList && <div className="auto-complete-items">
                {cartype.map((type,index) => {
                  return <div
                          className="item"
                          key={index}
                          value={type.id}
                          onClick={(event) => itemClickHandler(type,event)}>
                    {type.description}
                  </div>
                })}
              </div>}
              <div>
                <Button className="col-10 car-btn" size="lg" onClick={clearSearch}>Clear</Button>
              </div>
          </div>
        </div>
        {upgrades && <Modal isOpen={upgrades} toggle={toggleUpgrades} contentClassName="modal">
            <ModalHeader toggle={toggleUpgrades}>Gold Member Perk</ModalHeader>
            <ModalBody>
              <p>Unfortunately, your requested car type is not available. However, since you are a gold member, you are eligible for a free upgrade!
              </p>
              <p>Simply select an available car of a car type with a higher price point and you will be able to rent with the same base cost as your requested car type.</p>
            </ModalBody>
          </Modal>}
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
                  requestedcartype={requestedCarType}
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