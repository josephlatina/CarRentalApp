import React, { useState, useEffect } from "react";
import Jumbotron from "../Jumbotron";
import EnterLocation from "../EnterLocation";
import HeroBanner from "../HeroBanner";
import Header from "../Header";
import Airport from "../Airport";
import Business from "../Business";
import Personal from "../Personal";
import "./HomePage.css";
import locationIcon from "../../assets/location-1-2@2x.png"
import calenderIcon from "../../assets/calendar-icon-1-2@2x.png"
import InstaIcon from "../../assets/pngegg-6--1-1@2x.png"
import FacebookIcon from "../../assets/pngegg-7--1-1@2x.png"
import JumbotronPic from "../../assets/car-banner.jpg"
import { Button } from "reactstrap";
import { Link } from "react-router-dom";




function Homepage() {

const homepageData = {  
    pickUpLocation: "Pick-Up Location",
    pickUpDate: "Pick-Up Date",
    inputType2: "date",
    inputPlaceholder2: "Enter Date",
    pickUpTime: "Pick-Up Time",
    inputType1: "time",
    time: "12:00pm",
    returnLocation: "Return Location",
    returnDate: "Return Date",
    returnTime: "Return Time",
    experience: "Experience it now.",
    follow: "Follow us on our social media",
    copyright: "All Rights Reserved. © xxx",
    enterLocation1: "Enter Location",
};

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    const getBranch = async () => {
      console.log("Response here");
      const response = await fetch("/api/branches");
      console.log("Response here");
      console.log(response);
      const getData = await response.json();
      setBranch(getData);
      console.log(getData);
      
    };
    getBranch();
  }, []);
// console.log("Home O");
  

return (
    
    <div className="container-center-horizontal">
      <form
        className="homepage-mockup screen"
        name="form2"
        action="form2"
        method="post"
      >
        {/* Jumbotron section */}
        <div className="overlap-group6">
          <div
            className="jumbotron"
            style={{ backgroundImage: JumbotronPic }}
          >
            <Jumbotron />
          </div>
          <div className="group-14">
            <div className="heading-div">
              <div className="left-top poppins-normal-caribbean-green-17px">
                <h4>{homepageData.pickUpLocation}</h4>
                <div className="autocomplete-div">
                  <EnterLocation className="location-input"
                    inputType="text"
                    inputPlaceholder={homepageData.enterLocation1}
                    branches={branch}
                  />
                  <img
                    className="icon-location_pin"
                    src={locationIcon}
                    alt="icon-location_pin"
                  />
                </div>
              </div>

              <div className="right-top poppins-normal-caribbean-green-17px">
                <h4 >{homepageData.returnLocation}</h4>
                <div className="autocomplete-div">
                  <EnterLocation
                    id="right"
                    inputType="text"
                    inputPlaceholder={homepageData.enterLocation1}
                    branches={branch}
                  />

                  <img
                    className="icon-location_pin-1"
                    src={locationIcon}
                    alt="icon-location_pin"
                  />
                </div>
              </div>
            </div>

            <div className="bottom-div">
              <div className="bottom-left">
                <div className="date">
                  <img className="calendar-size" src={calenderIcon} alt="icon-calendar" />
                  <h4>{homepageData.pickUpDate}</h4>
                  <input
                    name="enterdate"
                    placeholder={homepageData.inputPlaceholder2}
                    type="date"
                    required
                  />
                </div>
                <div className="time">
                  <h4>{homepageData.pickUpTime}</h4>
                  <input
                    name="12_00pm"
                    placeholder={homepageData.time}
                    type="time"
                    required
                  />
                </div>
              </div>
              <div className="bottom-right">
                <div className="date">
                  <img className="calendar-size" src={calenderIcon} alt="icon-calendar" />
                  <h4>{homepageData.pickUpDate}</h4>
                  <input
                    name="enterdate"
                    placeholder={homepageData.inputPlaceholder2}
                    type={homepageData.inputType2}
                    required
                  />
                </div>
                <div className="time">
                  <h4>{homepageData.pickUpTime}</h4>
                  <input
                    name="12_00pm"
                    placeholder={homepageData.time}
                    type="time"
                    required
                  />
                </div>
              </div>
            </div>
            <Link to= "/car">
              <Button className="col-10 car-btn" size="lg">Search</Button>
            </Link>
          </div>
          <div className="banner">
            <HeroBanner>
              <React.Fragment>Premium Service for<br />Personal Needs</React.Fragment>
            </HeroBanner>
            <div className="experience-it-now">{homepageData.experience}</div>
          </div>
          <Header  />
        </div>
        <div className="item-container">
          <Airport />
          <Business />
          <Personal />
        </div>
        <div className="footer">
          <div className="overlap-group5 poppins-medium-white-25px">
            <p className="follow-us-on-our-social-media">{homepageData.follow}</p>
            <div className="icon-container">
              <img
                className="icon-instagram"
                src={InstaIcon}
                alt="icon-instagram"
              />
              <img
                className="icon-facebook"
                src={FacebookIcon}
                alt="icon-facebook"
              />
            </div>
            <p className="copyright">{homepageData.copyright}</p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Homepage;
