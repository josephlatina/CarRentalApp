import React, { useState, useEffect } from "react";
import planeIcon from "../../assets/airplane-1-1@2x.png";
import personIcon from "../../assets/person-1-1@2x.png";
import caseIcon from "../../assets/suitcase-1-1@2x.png";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./HomePage.module.css";
import LocationInput from "../LocationInput/LocationInput";
import locationIcon from "../../assets/location-1-2@2x.png";
import calenderIcon from "../../assets/calendar-icon-1-2@2x.png";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

const Home = () => {
  const homepageData = {
    pickUpLocation: "Pick-Up Location",
    pickUpDate: "Pick-Up Date",
    dropDate: "Drop-off Date",
    dropTime: "Drop-off Time",
    inputType2: "date",
    inputPlaceholder2: "Enter Date",
    pickUpTime: "Pick-Up Time",
    inputType1: "time",
    time: "12:00pm",
    returnLocation: "Return Location",
    returnDate: "Return Date",
    returnTime: "Return Time",
    enterLocation1: "Enter Location",
  };

  const [branch, setBranch] = useState([]);
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");
  const [pickUpDate, setPickUpDate] = useState("");
  const [dropOffDate, setDropOffDate] = useState("");

  //navigate and handleSearch button
  const navigate = useNavigate();

  const handleSearch = () => {
    let dateNow = new Date();
    if (
      pickUpLocation === "" ||
      dropOffLocation === "" ||
      pickUpDate === "" ||
      dropOffDate === ""
    ) {
      alert("Please fill out all fields");
    } else if (
      pickUpDate.getTime() < dateNow.getTime() ||
      dropOffDate < pickUpDate
    ) {
      alert(
        `Please enter valid dates. Pick up date cannot be before ${dateNow}`
      );
    } else {
      navigate("/car", {
        state: {
          pickUpLocation: pickUpLocation,
          dropOffLocation: dropOffLocation,
          pickUpDate: pickUpDate,
          dropOffDate: dropOffDate,
        },
      });
    }
  };

  useEffect(() => {
    const getBranch = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/branches");
      const getData = await response.json();
      setBranch(getData);
    };
    getBranch();
  }, []);

  return (
    <div className={styles.mainCon}>
      <div className={styles.banner}></div>
      <div className={styles.bannerText}>
        <h1>Premium Service For Personal Needs</h1>
        <h3>Experience it now</h3>
        <div className={styles.middleCon}>
          <div className={styles.heading_div}>
            <div
              className="poppins-normal-caribbean-green-17px"
              id={styles.left_top}
            >
              <h4>
                <span>
                  <img
                    className={styles.icon_location_pin_1}
                    src={locationIcon}
                    alt="icon-location_pin"
                  />
                </span>
                {homepageData.pickUpLocation}
              </h4>

              <div className={styles.autocomplete_div}>
                <LocationInput
                  className="location-input"
                  inputType="text"
                  inputPlaceholder={homepageData.enterLocation1}
                  branches={branch}
                  onChange={(branch) => setPickUpLocation(branch?.id)}
                />
              </div>
            </div>

            <div
              className="poppins-normal-caribbean-green-17px"
              id={styles.right_top}
            >
              <h4>
                <span>
                  <img
                    className={styles.icon_location_pin_1}
                    src={locationIcon}
                    alt="icon_location_pin"
                  />
                </span>
                {homepageData.returnLocation}
              </h4>

              <div className={styles.autocomplete_div}>
                <LocationInput
                  id="right"
                  inputType="text"
                  inputPlaceholder={homepageData.enterLocation1}
                  branches={branch}
                  onChange={(branch) => setDropOffLocation(branch?.id)}
                />
              </div>
            </div>
          </div>

          <div className={styles.bottom_div}>
            <div className={styles.bottom_left}>
              <div className={styles.date}>
                <h4>
                  <span>
                    <img
                      className={styles.calendar_size}
                      src={calenderIcon}
                      alt="icon-calendar"
                    />
                  </span>
                  {homepageData.pickUpDate}
                </h4>
                <DatePicker
                  selected={pickUpDate}
                  onChange={(date) => setPickUpDate(date)}
                  placeholderText="Enter Date"
                />
              </div>
            </div>
            <div className={styles.bottom_right}>
              <div className={styles.date}>
                <h4>
                  <span>
                    {" "}
                    <img
                      className={styles.calendar_size}
                      src={calenderIcon}
                      alt="icon-calendar"
                    />
                  </span>{" "}
                  {homepageData.dropDate}
                </h4>

                <DatePicker
                  selected={dropOffDate}
                  onChange={(date) => setDropOffDate(date)}
                  placeholderText="Enter Date"
                />
              </div>
            </div>
          </div>
          <button className={styles.searchBtn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div className={styles.blackCon}>
        <div className={styles.airport}>
          <img className="icon-plane" src={planeIcon} alt="icon-plane" />
          <h4>To and From Airport</h4>
          <p>Convenienient pick up and drop off in any major city.</p>
        </div>
        <div className={styles.airport}>
          <img className="icon-plane" src={caseIcon} alt="icon-plane" />
          <h4>Business Trips</h4>
          <p>Reliability and varied selection are guaranteed.</p>
        </div>
        <div className={styles.airport}>
          <img className="icon-plane" src={personIcon} alt="icon-plane" />
          <h4>Personal Trips</h4>
          <p>
            Anywhere you want to go, you can count on us to help you get there.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
