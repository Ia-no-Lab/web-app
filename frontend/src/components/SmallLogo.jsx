import React from "react";
import logo from "../assets/small-logo.png";

function SmallLogo({ size }) {
  return <img src={logo} alt="Small Logo" width={size} height={size} />;
}

export default SmallLogo;
