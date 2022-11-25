import React from "react";
import "./Header.css";
import personIcon from '../../assets/person-icon-1@2x.png'
import { Link } from "react-router-dom";


function Header() {

  return (
    <div className="header">
      <a href="car">
        <Link to="/auth">
          <img className="person-icon-1" src={personIcon} alt="person-icon 1" />
        </Link>
        
      </a>
    </div>
  );
}

export default Header;  