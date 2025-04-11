import React from "react";
import logo from "../assets/big-logo.png";

function BigLogo({ size }) {
  return <img src={logo} alt="Big Logo" width={size} height={size} />;
}

export default BigLogo;
