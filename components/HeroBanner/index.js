import React from "react";
import "./HeroBanner.css";

function HeroBanner(props) {
  const { children } = props;

  return <h1 className="premium-service-for-personal-needs">{children}</h1>;
}

export default HeroBanner;
