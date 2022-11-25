import React from "react";
import "./Business.css";
import suitCaseIcon from '../../assets/suitcase-1-1@2x.png'

function Business() {
  return (
    <div className="business">
      <img className="suitcase-1" src={suitCaseIcon} alt="suitcase 1" />
      <div className="business-trips poppins-normal-pear-20px">Business Trips</div>
      <p className="lorem-ipsum-dolor-si-1 poppins-normal-white-17px-2">
        Reliability and varied selection are guaranteed.
      </p>
    </div>
  );
}

export default Business;