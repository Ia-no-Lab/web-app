import React from "react";
import "./Terms.css";
import {Link } from "@chakra-ui/react"
import { LuExternalLink } from "react-icons/lu"

function Terms() {
  return (
    <div className="bigBoxTerms">
      <h1>Normas</h1>
      <p>
        Ia no Lab é um website de código aberto, então o modo que usamos seus dados está mostrado de forma transparente. 
      </p>
     <h2>
      <Link
        variant="underline"
        fontSize = "2xl"
        href="https://github.com/Ia-no-Lab" 
        color="#24201bff">Visite o código<LuExternalLink/></Link>
      </h2>

    </div>
  );
}

export default Terms;
