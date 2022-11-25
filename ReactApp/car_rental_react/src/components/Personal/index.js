import React from "react";
import "./Personal.css";
import persojIcon from '../../assets/person-1-1@2x.png'

function Personal() {
  return (
    <div className="personal">
      <img className="person-icon" src={persojIcon} alt="icon-musical_note" />
      <div className="personal-trips poppins-normal-pear-20px">Personal Trips</div>
      <p className="text-blurb poppins-normal-white-17px-2">
        Anywhere you want to go, you can count on us to help you get there.
      </p>
    </div>
  );
}

export default Personal;
