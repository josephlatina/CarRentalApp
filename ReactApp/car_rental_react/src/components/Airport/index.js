import React from "react";
import "./Airport.css";
import planeIcon from '../../assets/airplane-1-1@2x.png'
function Airport() {
    return (
      <div className="airport">
        <img className="icon-plane" src={planeIcon} alt="icon-plane" />
        <div className="to-and-from-airport poppins-normal-pear-20px">To and From Airport</div>
        <p className="airport-blurb poppins-normal-white-17px-2">
          Convenienient pick up and drop off in any major city.
        </p>
      </div>
    );
  }
  
  export default Airport;